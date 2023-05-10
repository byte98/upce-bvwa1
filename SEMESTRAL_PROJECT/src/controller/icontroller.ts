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

import express from 'express';
import Redirect from '../utils/redirect';

/**
 * Interface declaring contract for all controllers
 */
export default interface IController
{
    /**
     * Tells controller to take control of processing request
     * @param req Structure with information about request
     * @param method HTTP method 
     * @param data Any additional data which can be passed to controller
     * @returns Content which will be sent to the user or HTTP response code, if request cannot be handled or redirection to another page
     */
    takeControl(req: express.Request, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any): Promise<string | number | Redirect>;
}
