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

import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";
import { IUser } from "./user";
import Configuration from "../configuration";

/**
 * Interface defining contract for event data objects
 */
export interface IEvent
{
    /**
     * Name of event
     */
    name: string;

    /**
     * Date of the event
     */
    date: Date;

    /**
     * Color of event
     */
    color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE";

    /**
     * Identifier of user which has created event
     */
    user: string;

    /**
     * Identifier of event
     */
    ident: string;
}

/**
 * Schema of event in database
 */
const eventSchema = new Schema<IEvent>({
    name: {type: String, required: true},
    color: {type: String, required: true},
    user: {type: String, required: true},
    date: {type: Date, required: true},
});

/**
 * Model of event in database
 */
export const Event = model<IEvent>("Event", eventSchema);

/**
 * Class which handles all operations over events
 */
export class EventModel{

    /**
     * Creates new event
     * @param name Name of event
     * @param color Color of event
     * @param date Date of event
     * @param user Author of event
     */
    public static async create(
        name: string, color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE", date: Date, user: IUser
    )
    {
        await mongoose.connect(Configuration.db);
        const event = new Event({
            name: name,
            color: color,
            date: date,
            user: user.ident
        });
        await event.save();
    }

    /**
     * Gets all users events for specified date
     * @param user User whose events will be returned
     * @param date Date of events
     * @returns Array with all users events for specified date
     */
    public static async get(user: IUser, date: Date): Promise<Array<IEvent>>
    {
        let reti: Array<IEvent> = new Array<IEvent>();
        let connection: typeof mongoose;
        connection =  await mongoose.connect(Configuration.db);
        let start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        let end   = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        let query :mongoose.Query<any | null, {}, {}, IEvent> =  Event.find({user: user.ident, date: {$gte: start, $lte: end}}).sort("date");
        let result: Array<any> | null = await query.exec();
        if (result != null && result.length > 0)
        {
            for (let i: number = 0; i < result.length; i++)
            {
                let item: any = result[i];
                reti.push(new class implements IEvent{
                    name: string = item.name;
                    color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE" = item.color;
                    date: Date = item.date;
                    user: string = item.user;
                    ident: string = item._id.toString();
                });
            }
        }
        return reti;
    }

    /**
     * Gets all user events for specified date and color
     * @param user User whose events will be returned
     * @param date Date of events
     * @param color Color of events
     * @returns Array with all users events for specified date and color
     */
    public static async getByColor(user: IUser, date: Date, color: "NONE" | "RED" | "YELLOW" | "GREEN" | "BLUE"): Promise<Array<IEvent>>
    {
        let reti: Array<IEvent> = new Array<IEvent>();
        let connection: typeof mongoose;
        connection =  await mongoose.connect(Configuration.db);
        let start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        let end   = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        let query :mongoose.Query<any | null, {}, {}, IEvent> =  Event.find({user: user.ident, date: {$gte: start, $lte: end}, color: color}).sort("date");
        let result: Array<IEvent> | null = await query.exec();
        if (result != null && result.length > 0)
        {
            for (let i: number = 0; i < result.length; i++)
            {
                let item: any = result[i];
                reti.push(new class implements IEvent{
                    name: string = item.name;
                    color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE" = item.color;
                    date: Date = item.date;
                    user: string = item.user;
                    ident: string = item._id.toString();
                });
            }
        }
        return reti;
    }

    /**
     * Gets event by its identifier
     * @param id Identifier of event
     * @returns Event with searched identifier or NULL, if there is no such event
     */
    public static async getById(id: string): Promise<IEvent | null>
    {
        let reti: IEvent | null = null;
        let connection: typeof mongoose;
        connection =  await mongoose.connect(Configuration.db);
        let query :mongoose.Query<any | null, {}, {}, IEvent> =  Event.findById(id);
        let result: any | null = await query.exec();
        if (result != null)
        {
            reti = new class implements IEvent{
                name: string = result.name;
                color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE" = result.color;
                date: Date = result.date;
                user: string = result.user;
                ident: string = result._id.toString();
            };
        }
        return reti;
    }

    /**
     * Updates event
     * @param event Event which will be updated
     * @param name New name of event
     * @param color New color of event
     * @param date New date and time of event
     */
    public static async update(event: IEvent, name: string, color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "NONE", date: Date): Promise<void>
    {
        let connection: typeof mongoose;
        connection =  await mongoose.connect(Configuration.db);
        let query :mongoose.Query<any | null, {}, {}, IEvent> =  Event.findByIdAndUpdate(event.ident, {name: name, color: color, date: date});
        await query.exec();
    }

    /**
     * Deletes event
     * @param event Event which will be deleted
     */
    public static async delete(event: IEvent): Promise<void>
    {
        let connection: typeof mongoose;
        connection =  await mongoose.connect(Configuration.db);
        let query :mongoose.Query<any | null, {}, {}, IEvent> =  Event.findByIdAndDelete(event.ident);
        await query.exec();
    }
}
