import * as prompt from "prompt";
import * as clear from "clear";
import * as fs from "fs";

import { Intro } from "../../shared/util/intro";
import { Resources } from "../../shared/resources/lang";
import { MXModelSDK } from "./mendix/MXModelSDK";

// Chalk is really incompatible with TypeScript.
// @ts-ignore
const chalk = require("chalk");

let resource = new Resources().lang("en_EN");

class Cli {

    push() {
        // TODO push something
    }

    intro() {
        clear();
        let intro = new Intro();
        intro.show(resource.CLI_INFO, () => {
            console.log(resource.CLI_SLOGAN);
            console.log(resource.CLI_HELP_ASSIST);
            console.log(resource.EMPTY);
        });
    }

    pwd() {
        console.log(process.cwd());
    }

    init() {
        clear();
        let intro = new Intro();
        intro.show(resource.CLI_INFO, () => {
            console.log(resource.EMPTY);
            console.log(resource.CLI_PROJECT_SETTINGS);
            prompt.start();
            prompt.message = resource.EMPTY;
            prompt.delimiter = chalk.green(" >> ");
            prompt.get([{
                name: "name",
                required: true
            }, {
                name: "version",
                required: true
            }, {
                name: "author",
                required: true
            }, {
                name: "mendixusername",
                required: true
            }, {
                name: "mendixapikey",
                required: true
            }, {
                name: "mendixproject",
                required: true
            }, {
                name: "mendixprojectid",
                required: true
            }], (err: string, result: object) => {

                const directory = (process.cwd() + '/.mendix');

                try {
                    fs.statSync(directory);
                    fs.unlinkSync(directory);
                    fs.mkdirSync(directory);
                } catch (e) {
                    fs.mkdirSync(directory);
                }

                fs.writeFileSync(directory + '/config.json', JSON.stringify(result));

                console.log(resource.EMPTY);
                console.log(result);

            });
        });
    }

    fetch(projectName:String = "") {
        clear();
        let intro = new Intro();

        function createDir(name) {
            console.log('Setting up project folder:' + name);
            try {
                fs.statSync(name);
            } catch (e) {
                fs.mkdirSync(name);
            }
        }

        intro.show(resource.CLI_INFO, () => {
            console.log(resource.EMPTY);
            console.log(resource.CLI_FETCH);

            const mx = new MXModelSDK();
            const directory = (process.cwd() + "/.mendix");

            // First create the project directory.
            let projectDirectory = directory + "/project/";
            createDir(projectDirectory);

            // Secondly alter the path to a named project if this is provided.
            let projectNamedDirectory = "";
            if (projectName !== "") {
                projectNamedDirectory = projectDirectory + projectName + "/";
                projectDirectory = projectNamedDirectory;
                createDir(projectDirectory);
            }

            const configuration = require(directory + "/config.json");

            mx.init(projectDirectory, configuration.mendixusername, configuration.mendixapikey, configuration.mendixproject, configuration.mendixprojectid, configuration.branch, configuration.revision);
        });
    }
}

export { Cli };