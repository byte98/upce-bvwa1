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

import { Dictionary } from "./dictionary";

/**
 * Class which represents redirection to another page
 */
export default class Redirect
{

    /**
     * HTTP status code of redirection (default: 302 FOUND)
     */
    private readonly httpCode: number;

    /**
     * Target of redirection
     */
    private readonly target: string;

    /**
     * Messages send to target
     */
    private readonly messages: Dictionary<string | null>;

    /**
     * Creates new redirection to another pahe
     * @param target Target of redirection
     * @param httpCode HTTP status code of redirection
     */
    public constructor(target: string, httpCode: number = 302)
    {
        this.target = target;
        this.httpCode = httpCode;
        this.messages = 
        {
            "INFO": null,
            "WARNING": null
        }
    }

    /**
     * Gets text of message
     * @param type Type of message
     * @returns Text of message with defined type or NULL, if no such message is defined
     */
    public getMessage(type: "INFO" | "ERROR"):string | null {
        return this.messages[type];
    }

    /**
     * Sets text of message
     * @param type Type of message
     * @param text Text of message
     */
    public setMessage(type: "INFO" |"ERROR", text: string): void{
        this.messages[type] = text;
    }

    /**
     * Gets HTTP status code of redirection
     * @returns HTTP status code of redirection
     */
    public getStatus(): number
    {
        return this.httpCode;
    }

    /**
     * Gets target of redirection
     * @returns Path to target of redirection
     */
    public getTarget(): string
    {
        return this.target;
    }
}
