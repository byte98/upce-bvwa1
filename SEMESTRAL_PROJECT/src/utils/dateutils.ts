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

/**
 * Class which contains utility functions to work with dates
 */
export default class DateUtils
{
    /**
     * Gets allways valid date
     * @param yearStr String containing year
     * @param monthStr String containing month
     * @param dayStr String containing day
     * @returns Valid date from entered values or today date
     */
    public static getValid(yearStr: string | undefined, monthStr: string | undefined, dayStr: string | undefined): Date
    {
        // Date validation (at the end, if not valid date is entered, today date will be used)
        let today: Date = new Date();
        let reti: Date = today;
        if (typeof(yearStr) != "undefined" && typeof(monthStr) != "undefined" && typeof(dayStr) != "undefined")
        {
            if (monthStr.length < 2) monthStr = '0' + monthStr;
            if (dayStr.length < 2) dayStr = '0' + dayStr;
            let day: number = (isNaN(Number(dayStr))) ? today.getDate() : Number(dayStr);
            let month: number = (isNaN(Number(monthStr))) ? today.getMonth() :Number(monthStr) - 1;
            let year: number = (isNaN(Number(yearStr))) ? today.getFullYear(): Number(yearStr);
            reti = new Date(year, month, day);
            if (isNaN(Number(reti)))
            {
                reti = today;
            }
        }
        return reti;
    }


    /**
     * Formats date to string usable in links
     * @param date Date which will be formatted into string
     * @returns String containing date in format usable in links
     */
    public static formatDate(date: Date): string{
        let dayStr: string = date.getDate().toString();
        if (dayStr.length < 2) dayStr = '0' + dayStr;
        let monthStr: string = (date.getMonth() + 1).toString();
        if (monthStr.length < 2) monthStr = '0' + monthStr;
        let yearStr: string = date.getFullYear().toString();
        while (yearStr.length < 2)
        {
            yearStr = '0' + yearStr;
        }
        return yearStr + "-" + monthStr + "-" + dayStr;
    }

    /**
     * Formats time into zero-leading form
     * @param date Date containing time which will be formatted
     * @returns String containing formatted time
     */
    public static formatTime(date: Date): string{
        let hStr: string = date.getHours().toString();
        if (hStr.length < 2) hStr = '0' + hStr;
        let mStr: string = date.getMinutes().toString();
        if (mStr.length < 2) mStr = '0' + mStr;
        return hStr + ":" + mStr;
    }
}
