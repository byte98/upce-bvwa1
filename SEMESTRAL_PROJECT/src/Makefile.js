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

// This file handles building of whole project

const rimraf = require("rimraf");
const fs = require("fs");
const {execSync} = require("child_process");
const uglify = require("uglify-js");
const prompt = require("prompt-sync")();
const {UserModel} = require("../dist/model/user");
const {EventModel} = require("../dist/model/event");
const { exit } = require("process");

/**
 * Variable holding user when creating demo data
 */
var user;

/**
 * Array with events for demonstration dataset
 */
const events = [
    "Výročí založení firmy",
    "Večeře s přáteli",
    "Sportovní utkání",
    "Schůzka s potenciálním investorem",
    "Výlet do hor",
    "Návštěva lékaře",
    "Rodinná oslava",
    "Výlet na koni",
    "Festival hudby a kultury",
    "Nákupní maraton s kamarádkou",
    "Schůzka se školním psychologem",
    "Představení v divadle",
    "Návštěva zahrady",
    "Sraz s bývalými spolužáky",
    "Návštěva kadeřníka",
    "Výlet do zámku",
    "Závod aut",
    "Návštěva knihovny",
    "Piknik v parku",
    "Výlet na motorce",
    "Výročí svatby rodičů",
    "Výlet na kole",
    "Výlet na loďce",
    "Návštěva výstavy",
    "Výlet do kina",
    "Výlet do zoologické zahrady",
    "Návštěva památek",
    "Zahradní party",
    "Návštěva planetária",
    "Setkání s přáteli z dětství",
    "Kurz vaření",
    "Prohlídka města",
    "Návštěva bazénu",
    "Výroba vlastních dekorací",
    "Sraz s týmem",
    "Výlet na rozhlednu",
    "Návštěva knihovny",
    "Rodinný grilovací večer",
    "Setkání se starým kamarádem",
    "Návštěva dětského koutku",
    "Výlet do akvaparku",
    "Výlet na ryby",
    "Výlet na festival",
    "Výlet do přírody",
    "Návštěva vinotéky",
    "Návštěva muzea",
    "Návštěva botanické zahrady",
    "Návštěva památky",
    "Návštěva závodu psů",
    "Návštěva dětského divadla",
    "Tréninková střelba",
    "Návštěva kina",
    "Přednáška na konferenci",
    "Výroba vánočních ozdob",
    "Výlet do lázní",
    "Rodinné grilování",
    "Návštěva zvířecího útulku",
    "Výlet na horské kolo",
    "Výlet na rafting",
    "Koncert v hudebním klubu",
    "Výroba vlastních šperků",
    "Výlet na farmu",
    "Návštěva kostela",
    "Výlet na skateboardu",
    "Výlet na in-line bruslích",
    "Výroba vánočního cukroví",
    "Výlet na kolejiště",
    "Návštěva kavárny",
    "Výlet na elektrickém kole",
    "Výlet na kajaku",
    "Výlet na snowboardu",
    "Výlet na běžkách",
    "Návštěva zimního stadionu",
    "Výlet na horské dráze",
    "Výlet na koni",
    "Návštěva minigolfu",
    "Výlet na skateboardovou dráhu",
    "Výlet na hřiště",
    "Návštěva planetária",
    "Výlet na ledovou plochu",
    "Výlet na bouldering",
    "Výlet na lanovku",
    "Výlet na airsoft",
    "Výlet na zimní turistiku",
    "Výlet na horský hrad",
    "Výlet na rozhlednu",
    "Návštěva kavárny s knihovnou",
    "Výlet na paintball",
    "Výlet na zimní rybolov",
    "Výlet na zábavní park",
    "Návštěva dětského koutku v nákupním centru",
    "Výlet na aquapark",
    "Výlet na hokejový zápas",
    "Návštěva památníku",
    "Návštěva arény",
    "Výlet na farní sbor",
    "Výlet na vodopády",
    "Návštěva hřbitova",
    "Výlet na kolečkové brusle"
  ];

/**
 * Main function of building program
 * @param {string[]} args Arguments of program
 */
async function main(args){
    if (args.length <= 2)
    {
        printHelp();
    }
    else if (args.length >= 3)
    {
        let command = args[2].toLowerCase();
        process.stdout.write("--- Semestral project building system ---\n Target: " + command.toUpperCase() + "\n\n");
        console.time("Execution finished in");
        if (command == "?")
        {
            printHelp();
        }
        else if (command == "prod")
        {
            installDependencies();
            prepareOut();
            buildTS();
            copyFiles();
            minifyJS();
        }
        else if (command == "debug")
        {
            installDependencies();
            prepareOut();
            buildTS();
            copyFiles();
        }
        else if (command == "demo")
        {
            installDependencies();
            prepareOut();
            buildTS();
            copyFiles();
            await createUser();
            await createEvents();
        }
        else
        {
            process.stdout.write("⚠️  Unknown target (" + command.toUpperCase() + ")\n\n");
            printHelp();
        }
        process.stdout.write("\n--- Finished ---\n");
        console.timeEnd("Execution finished in");
        exit(0);
    }
}

/**
 * Prints help for building
 */
function printHelp()
{
    process.stdout.write("===== Help for building process of semestral project =====\n");
    process.stdout.write("Syntax: MAKE <COMMAND>\n");
    process.stdout.write("\n");
    process.stdout.write("List of available COMMANDs:\n");
    process.stdout.write("?          - Prints this help\n");
    process.stdout.write("PROD       - Builds project ready for production\n");
    process.stdout.write("DEBUG      - Builds project with debugging mode enabled\n");
    process.stdout.write("DEMO       - Builds project with debugging mode enabled\n             and filled with demonstration data\n");
}

/**
 * Installs all NodeJS dependencies
 */
function installDependencies()
{
    process.stdout.write("Installing dependencies...\t\t");
    try
    {
        execSync("npm install");
    }
    catch (e)
    {
        process.stdout.write("❌\n");
        process.stderr.write(e.message + "\n");
        return;
    }
    process.stdout.write("✅\n");
}

/**
 * Prepares output directory
 */
function prepareOut()
{
    process.stdout.write("Preparing output directory (./dist)...\t");
    if (rimraf.rimrafSync("./dist"))
    {
        fs.mkdirSync("./dist");
        process.stdout.write("✅\n");
    }
    else
    {
        process.stdout.write("❌\n");
        process.stderr.write("Deleting directory ./dist failed!" + "\n");
        return;
    }
}

/**
 * Builds all typescript files
 */
function buildTS()
{
    process.stdout.write("Building TypeScript files...\t\t");
    try
    {
        execSync("npx tsc --build");
    }
    catch (e)
    {
        process.stdout.write("❌\n");
        process.stderr.write(e.message + "\n");
        return;
    }
    process.stdout.write("✅\n");
}

/**
 * Copies all necessary files
 */
function copyFiles()
{
    try
    {
        process.stdout.write("Copiing styles...\t\t\t");
        execSync("npx copyfiles -f ./src/public/styles/*.* ./dist/public/styles/");
        process.stdout.write("✅\n");
        process.stdout.write("Copiing scripts...\t\t\t");
        execSync("npx copyfiles -f ./src/public/scripts/*.* ./dist/public/scripts/");
        process.stdout.write("✅\n");
        process.stdout.write("Copiing views...\t\t\t");
        execSync("npx copyfiles -f ./src/view/*.* ./dist/view/");
        process.stdout.write("✅\n");
    }
    catch (e)
    {
        process.stdout.write("❌\n");
        process.stderr.write(e.message + "\n");
        return;
    }
}

/**
 * Minifies javascript files
 */
function minifyJS()
{
    process.stdout.write("Minifiing JavaScript files...\t\t");
    traverse("./dist").forEach(function(file){
        if (file.toLowerCase().endsWith(".js")) // Is javascript file?
        {
            let content = fs.readFileSync(file);
            let result = uglify.minify(content.toString());
            if (result.error != undefined)
            {
                process.stdout.write("❌\n");
                process.stderr.write("Minifiing file " + file + " failed! " + result.error + "\n");
                return;
            }
            else
            {
                if (rimraf.rimrafSync(file))
                {
                    fs.writeFileSync(file, result.code);
                }
                else
                {
                    process.stdout.write("❌\n");
                    process.stderr.write("Minifiing file " + file + " failed (deleting of original file failed)!\n");
                    return;
                }
            }
        }
    });
    process.stdout.write("✅\n");
}

/**
 * Creates demonstration user
 */
async function createUser()
{
    process.stdout.write("Creating user in dataset...\t\n");
    let uname = prompt("Enter username: ");
    let inSysUser = await UserModel.getByUsername(uname);
    while(inSysUser != null)
    {
        process.stdout.write("⛔️ Entered user is already in database!");
        uname = prompt("Enter username: ");
        inSysUser = await UserModel.getByUsername(uname);
    }
    let passwd = prompt("Enter password: ");
    await UserModel.create("Demo", "User", uname, "demo@contoso.com", passwd);
    user = await UserModel.getByUsername(uname);
    process.stdout.write("User created\t\t\t\t✅\n");
}

/**
 * Creates events
 */
async function createEvents()
{
    process.stdout.write("Creating events in dataset...\t\t");
    let now = new Date();
    let start = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0);
    let end = new Date(now.getFullYear() + 1, 11, 31, 0, 0, 0);
    let colors = ["NONE", "RED", "YELLOW", "GREEN", "BLUE"];
    for (let d = start; d <= end; d.setDate(d.getDate() +1))
    {
        let eventCount = Math.random() * 11; // Max 10 events in one day
        for (let i = 0; i < eventCount; i++)
        {
            let name = events[Math.floor(Math.random() * events.length)];
            let color = colors[Math.floor(Math.random() * colors.length)];
            let date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
            await EventModel.create(name, color, date, user);
        }
    }
    process.stdout.write("✅\n");
}

/**
 * Traverses all files in directory recursively
 * @param {string} path Path which will be traversed
 * @returns {string[]} All files in directory and its subdirectories
 */
function traverse(path)
{
    let reti = [];
    let files = fs.readdirSync(path);
    files.forEach(function(file){
        if (fs.lstatSync(path + "/" + file).isDirectory())
        {
            let subdir = traverse(path + "/" + file);
            subdir.forEach(function(subfile){
                reti.push(subfile);
            });
        }
        else
        {
            reti.push(path + "/" + file);
        }
    });
    return reti;
}

main(process.argv);
