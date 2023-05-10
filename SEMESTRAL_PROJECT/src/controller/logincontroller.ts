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
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from "./icontroller";
import Redirect from "../utils/redirect";
import ejs from "ejs";
import path from "path";
import fs from 'fs';
import { UserModel, IUser } from "../model/user";
import {createHash} from "crypto";
import DateUtils from "../utils/dateutils";

/**
 * Class which represents controller of login page
 */
export default class LoginController implements IController
{
    async takeControl(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, method: "GET" | "POST" | "PUT" | "DELETE", data: any): Promise<string | number | Redirect> {
        let reti: string | number | Redirect = 405;
        let templateData: ejs.Data = new class implements ejs.Data{};
        if (method == "GET")
        {
            let user: IUser | null | undefined = req.session.user;
            if (typeof(user) != "undefined" && user != null)
            {
                let today: Date = new Date();
                let year: string = today.getFullYear().toString();
                let month: string = ((today.getMonth() + 1) < 10) ? "0" + (today.getMonth() + 1).toString() : today.getMonth().toString();
                let day: string = ((today.getDate() + 1) < 10) ? "0" + (today.getDate() + 1).toString() : today.getDate().toString();
                reti = new Redirect("/my/" + year  +"-" + month + "-" + day);
            }
            else
            {
                let info: string[] = req.flash("info");
                if (info.length > 0)
                {
                    templateData.info = info[0];
                }
                let error: string[] = req.flash("error");
                if (error.length > 0)
                {
                    templateData.error = error[0];
                }
                reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "login.ejs"), "utf-8"), templateData);
            }
        }
        else if (method == "POST")
        {
            let user: IUser | null = await UserModel.getByUsername(req.body.username);
            let password: string = createHash("sha512").update(req.body.password).digest("hex").toString();
            let loggedIn: boolean = false;
            if (user != null)
            {
                if (user.password == password)
                {
                    loggedIn = true;
                }
            }
            if (loggedIn == false)
            {
                templateData.error = "Chyba přihlášení - na zadané uživatelské jméno nebo heslo nebyl nalezen žádný uživatel!";
                reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "login.ejs"), "utf-8"), templateData);
            }
            else
            {
                req.session.user = user;
                reti = new Redirect("/my/" + DateUtils.formatDate(new Date()));
            }
        }
        return reti;
    }

}
