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
import ejs from "ejs";
import path from "path";
import fs from 'fs';
import DateUtils from "../utils/dateutils";
import { EventModel, IEvent } from "../model/event";

/**
 * Class which controls my calendar page
 */
export default class MyController implements IController{
    async takeControl(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, method: "GET" | "POST" | "PUT" | "DELETE", data: any): Promise<string | number | Redirect> {
        let reti: string | number | Redirect = 405;
        let user: IUser | null | undefined = req.session.user;
        let templateData: ejs.Data = new class implements ejs.Data{};
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
        if (method == "GET")
        {
            if (typeof (user) != "undefined" && user != null)
            {
                // User is logged in
                templateData.username = user.name + " " + user.surname + " (" + user.username + ")"

                let date = DateUtils.getValid(req.params.year, req.params.month, req.params.day);
                let today = new Date();

                const options: Intl.DateTimeFormatOptions = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                };

                const calendarDateOptions: Intl.DateTimeFormatOptions = {
                    month: "long",
                    year: "numeric"
                }

                let dayBefore   = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
                let dayAfter    = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                let monthBefore = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
                let monthAfter  = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()); 

                templateData.date = date.toLocaleDateString("cs-CZ", options);
                templateData.dayBefore = "/my/" + DateUtils.formatDate(dayBefore);
                templateData.dayAfter = "/my/" + DateUtils.formatDate(dayAfter);
                templateData.monthBefore = "/my/" + DateUtils.formatDate(monthBefore);
                templateData.monthAfter = "/my/" + DateUtils.formatDate(monthAfter);
                templateData.calendar = await this.generateCalendar(date, user);
                templateData.calendarDate = date.toLocaleDateString("cs-CZ", calendarDateOptions);
                templateData.showToday = false;
                templateData.newEventLink = "/my/event/" + DateUtils.formatDate(date);
                if (date.getDate() != today.getDate() || date.getMonth() != today.getMonth() || date.getFullYear() != today.getFullYear())
                {
                    templateData.showToday = true;
                    templateData.todayLink = "/my/" + DateUtils.formatDate(today);
                }

                templateData.hasEvents = false;
                let events: Array<IEvent> = await EventModel.get(user, date);
                if (events.length > 0)
                {
                    templateData.hasEvents = true;
                    templateData.events = Array();
                    for (let i: number = 0; i < events.length; i++)
                    {
                        templateData.events.push(this.stringifyEvent(events[i]));
                    }
                }
                reti = ejs.render(fs.readFileSync(path.join(process.cwd(), "dist", "view", "my.ejs"), "utf-8"), templateData);
            }
            else
            {
                // User is not logged in
                reti = new Redirect("/login");
                reti.setMessage("ERROR", "Pro pokračování se, prosím, přihlašte.");
            }
        }
        return reti;
    }

    /**
     * Stringifies event into HTML string
     * @param event Event which will be transformed into string
     * @returns String containing HTML representation of event
     */
    private stringifyEvent(event: IEvent): string
    {
        let reti: string =
        "<span class=\"event " + event.color.toLowerCase() + "\">"
            + "<span class=\"time\">"
                + DateUtils.formatTime(event.date)
            + "</span>"
            + "<span class=\"name\">"
                + event.name
                    + "<span class=\"actions\">"
                        +"<a href=\"/my/event/" + event.ident + "\" title=\"Upravit událost\">"
                            + "✏️"
                        + "</a>"
                        +"<a class=\"delete\" href=\"/my/event/" + event.ident + "\" title=\"Smazat událost\">"
                            + "❌"
                            + "<form method=\"POST\" action=\"/my/event/" + event.ident + "?_method=DELETE\"></form>"
                        + "</a>"
                    +"</span>"
            +"</span>"
        +"</span>";
        
        return reti;
    }

    /**
     * Generates HTML table with calendar for defined month
     * @param date Date for which will be month calendar generated
     * @param user User whose calendar will be generated
     * @returns HTML table with calendar for defined month
     */
    private async generateCalendar(date: Date, user: IUser): Promise<string> {
        const currentMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
      
        let reti: string = "<table>";      
        reti += "<thead><tr>";
        reti += "<th>Po</th><th>Út</th><th>St</th><th>Čt</th><th>Pá</th><th>So</th><th>Ne</th>";
        reti += "</tr></thead>";
        reti += "<tbody>";
        while (currentMonth.getMonth() === date.getMonth()) {
          reti += "<tr>";
          for (let i: number = 1; i <= 7; i++) {
            if (currentMonth.getDay() === i % 7 && currentMonth.getFullYear() === date.getFullYear() && currentMonth.getMonth() === date.getMonth()) {
            let noneCount: number = (await EventModel.getByColor(user, currentMonth, "NONE")).length;
            let redCount: number = (await EventModel.getByColor(user, currentMonth, "RED")).length;
            let yellowCount: number = (await EventModel.getByColor(user, currentMonth, "YELLOW")).length;
            let greenCount: number = (await EventModel.getByColor(user, currentMonth, "GREEN")).length;
            let blueCount: number = (await EventModel.getByColor(user, currentMonth, "BLUE")).length;
              reti += `<td` + (currentMonth.getDate() === date.getDate() ? ` class="actual"` : ``) + `>
                <a href="/my/` + DateUtils.formatDate(currentMonth) + `">
                    <span class="day">${currentMonth.getDate()}</span>
                    <span class="events">
                        <span class="red` + (redCount == 0 ? ` hidden` : ``) +`">` + redCount.toString() + `</span>
                        <span class="yellow` + (yellowCount == 0 ? ` hidden` : ``) +`">` + yellowCount.toString() + `</span>
                        <span class="green` + (greenCount == 0 ? ` hidden` : ``) +`">` + greenCount.toString() + `</span>
                        <span class="blue` + (blueCount == 0 ? ` hidden` : ``) +`">` + blueCount.toString() + `</span>
                        <span class="none` + (noneCount == 0 ? ` hidden` : ``) +`">` + noneCount.toString() + `</span>
                    </span>
                </a>
            </td>`;
              currentMonth.setDate(currentMonth.getDate() + 1);
            } else {
              reti += "<td></td>";
            }
          }
          reti += "</tr>";
        }
        reti += "</tbody></table>";
      
        return reti;
      }
      
}
