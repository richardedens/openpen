"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require("prompt");
var clear = require("clear");
var fs = require("fs");
var intro_1 = require("../../shared/util/intro");
var lang_1 = require("../../shared/resources/lang");
var MXModelSDK_1 = require("./mendix/MXModelSDK");
// Chalk is really incompatible with TypeScript.
// @ts-ignore
var chalk = require("chalk");
var resource = new lang_1.Resources().lang("en_EN");
var Cli = /** @class */ (function () {
    function Cli() {
    }
    Cli.prototype.push = function () {
        // TODO push something
    };
    Cli.prototype.intro = function () {
        clear();
        var intro = new intro_1.Intro();
        intro.show(resource.CLI_INFO, function () {
            console.log(resource.CLI_SLOGAN);
            console.log(resource.CLI_HELP_ASSIST);
            console.log(resource.EMPTY);
        });
    };
    Cli.prototype.pwd = function () {
        console.log(process.cwd());
    };
    Cli.prototype.init = function () {
        clear();
        var intro = new intro_1.Intro();
        intro.show(resource.CLI_INFO, function () {
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
                }], function (err, result) {
                var directory = (process.cwd() + '/.mendix');
                try {
                    fs.statSync(directory);
                    fs.unlinkSync(directory);
                    fs.mkdirSync(directory);
                }
                catch (e) {
                    fs.mkdirSync(directory);
                }
                fs.writeFileSync(directory + '/config.json', JSON.stringify(result));
                console.log(resource.EMPTY);
                console.log(result);
            });
        });
    };
    Cli.prototype.fetch = function (projectName) {
        if (projectName === void 0) { projectName = ""; }
        clear();
        var intro = new intro_1.Intro();
        function createDir(name) {
            console.log('Setting up project folder:' + name);
            try {
                fs.statSync(name);
            }
            catch (e) {
                fs.mkdirSync(name);
            }
        }
        intro.show(resource.CLI_INFO, function () {
            console.log(resource.EMPTY);
            console.log(resource.CLI_FETCH);
            var mx = new MXModelSDK_1.MXModelSDK();
            var directory = (process.cwd() + "/.mendix");
            // First create the project directory.
            var projectDirectory = directory + "/project/";
            createDir(projectDirectory);
            // Secondly alter the path to a named project if this is provided.
            var projectNamedDirectory = "";
            if (projectName !== "") {
                projectNamedDirectory = projectDirectory + projectName + "/";
                projectDirectory = projectNamedDirectory;
                createDir(projectDirectory);
            }
            var configuration = require(directory + "/config.json");
            mx.init(projectDirectory, configuration.mendixusername, configuration.mendixapikey, configuration.mendixproject, configuration.mendixprojectid, configuration.branch, configuration.revision);
        });
    };
    return Cli;
}());
exports.Cli = Cli;
//# sourceMappingURL=cli.js.map