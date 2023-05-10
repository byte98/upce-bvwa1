// Copyright (C) 2023 Jiri Skoda <jiri.skoda@student.upce.cz>
// 
// This file is part of b22l-skoda-bvwa1-semestral-project.
// 
// b22l-skoda-bvwa1-semestral-project is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
// 
// b22l-skoda-bvwa1-semestral-project is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with b22l-skoda-bvwa1-semestral-project.  If not, see <http://www.gnu.org/licenses/>.

import { Request } from "express";
import IController from "./icontroller";
import ejs from "ejs";
import path from "path";
import fs from 'fs';
import { IUser, UserModel } from "../model/user";
import Redirect from "../utils/redirect";

/**
 * Class which controls behaviour of register page
 */
export default class RegisterController implements IController
{
    async takeControl(req: Request, method: "GET" | "POST" | "PUT" | "DELETE", data: any): Promise<string | number | Redirect> {
        let reti: string | number | Redirect = 405;
        let templateData: ejs.Data = new class implements ejs.Data{};
        if (method === "GET")
        {
            reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "register.ejs"), "utf-8"));
        }
        else if (method == "PUT")
        {
            templateData.name = req.body.name;
            templateData.surname = req.body.surname;
            templateData.username = req.body.username;
            templateData.email = req.body.email;
            let user: IUser | null = await UserModel.getByEmail(req.body.email);
            if (user == null)
            {
                user = await UserModel.getByUsername(req.body.username);
            }
            else
            {
                templateData.email = undefined;
            }
            if (user == null)
            {
                if (req.body.password != req.body.passworda)
                {
                    templateData.error = "Chyba registrace - zadaná hesla neodpovídají!";
                    reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "register.ejs"), "utf-8"), templateData);
                }
                else
                {
                    UserModel.create(
                        req.body.name,
                        req.body.surname,
                        req.body.username,
                        req.body.email,
                        req.body.password
                    );
                    reti = new Redirect("/login");
                    reti.setMessage("INFO", "Uživatel byl úspěšně zaregistrován. Nyní se lze přihlásit.");
                }
            }
            else
            {
                templateData.username = undefined;
                templateData.error = "Chyba registrace - na zadaný e-mail či uživatelské jméno již existuje uživatel!";
                reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "register.ejs"), "utf-8"), templateData);
            }
        }
        return reti;
    }
    
}
