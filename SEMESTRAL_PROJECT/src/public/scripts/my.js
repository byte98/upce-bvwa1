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

$(document).ready(function(){
    $("a.delete").on("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        $(this).find("form").trigger("submit");
    });
});
