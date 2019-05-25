import { Request, Response } from "express";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

class MendixDocumentGeneratorController {
    static renderWordDocument = async (req: Request, res: Response) => {

        const source = "./.mendix/project/";
        const isDirectory = source => lstatSync(source).isDirectory()
        const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)

        const projectPaths = getDirectories(source);
        let projects = [];

        let html = `<ul class="file-tree">`;
        projectPaths.map((projectPath, index) => {

            // Create project node.
            let project = projectPath.replace(".mendix\\project\\", "");
            html += "<li><a href=\"#\">" + projectPath.replace(".mendix\\project\\", "") + "</a>";
            html += `<ul>`;

            // Create module nodes.
            const modulePaths = getDirectories(projectPath);
            modulePaths.map((modulePath, index) => {

                let moduleName = modulePath.replace(".mendix\\project\\" + project + "\\", "");
                html += "<li><a href=\"#\">" + modulePath.replace(".mendix\\project\\" + project + "\\", "") + "</a>";
                html += `<ul>`;

                // Create module sub parts.
                const moduleSubPartsPaths = getDirectories(modulePath);
                moduleSubPartsPaths.map((moduleSubPartsPath, index) => {
                    html += "<li><a href=\"#\" data-project=\"\">" + moduleSubPartsPath.replace(".mendix\\project\\" + project + "\\" + moduleName + "\\", "") + "</a></li>";
                });

                html += `</ul></li>`;

            });

            html += `</ul></li>`;
        });

        html += `</ul>`;

    };
}

export default MendixDocumentGeneratorController;