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

import EventController from "./controller/eventcontroller";
import IController from "./controller/icontroller";
import LoginController from "./controller/logincontroller";
import LogoutController from "./controller/logoutcontroller";
import MyController from "./controller/mycontroller";
import RegisterController from "./controller/registercontroller";
import RootController from "./controller/rootcontroller";

/**
 * Class which holds whole configuration of server
 */
export default class Configuration
{
    /**
     * Flag, wherher debugging messages should be emitted (TRUE) or not (FALSE)
     */
    public static debug: boolean = false;

    /**
     * Definition of correct controller for each path
     */
    public static readonly routes: Array<{path: string, controller: IController}> =  [
        {path: "/", controller: new RootController()},
        {path: "/login", controller: new LoginController()},
        {path: "/register", controller: new RegisterController()},
        {path: "/my", controller: new MyController()},
        {path: "/my/:year-:month-:day", controller: new MyController()},
        {path: "/logout", controller: new LogoutController()},
        {path: "/my/event", controller: new EventController()},
        {path: "/my/event/:year-:month-:day", controller: new EventController()},
        {path: "/my/event/:id", controller: new EventController()}
    ];

    /**
     * Port on which will server run
     */
    public static readonly port: string = process.env.PORT || "8080";

    /**
     * Connection string to database
     */
    public static readonly db: string = "mongodb://127.0.0.1:27017/calendar";

    /**
     * Secret used when operating over sessions
     */
    public static readonly sessionSecret: string = "MySuperSessionSecret";

}
