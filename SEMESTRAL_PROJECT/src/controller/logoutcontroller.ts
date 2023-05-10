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
import Redirect from "../utils/redirect";
import IController from "./icontroller";
import { IUser } from "../model/user";
import { Session } from "express-session";

/**
 * Class which handles logout of user
 */
export default class LogoutController implements IController
{
    async takeControl(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, method: "GET" | "POST" | "PUT" | "DELETE", data: any): Promise<string | number | Redirect> {
        let reti: string | number | Redirect = 405;
        if (method == "POST")
        {
            let user: IUser | null | undefined = req.session.user;
            if (typeof (user) != "undefined" && user != null)
            {
                await this.regenerateSession(req.session);
                reti = new Redirect("/");
                reti.setMessage("INFO", "Uživatel byl úspěšně odhlášen.");
            }
            else
            {
                reti = new Redirect("/");
            }
        }
        return reti;
    }

    /**
     * Regenerates session
     * @param session Session which will be regenerated
     */
    private regenerateSession(session: Session): Promise<void>
    {
        return new Promise(resolve => {
            session.regenerate(function(){
                resolve();
            });
        });
    }
    
}
