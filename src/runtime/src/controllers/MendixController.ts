import { Request } from "express";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

class MendixController {
    static renderProjectOverview = async (req: Request) => {

        const source = "./.mendix/project/";
        const isDirectory = source => lstatSync(source).isDirectory()
        const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)

        const projectPaths = getDirectories(source);
        let projects = [];

        let html = `<ul class="file-tree">`;
        projectPaths.map((projectPath, index) => {

            // Create project node.
            let project = projectPath.replace(".mendix\\project\\", "");
            html += "<li><a href=\"#\" class=\"btn-project\" data-project=\"" + projectPath.replace(".mendix\\project\\", "") + "\">" + projectPath.replace(".mendix\\project\\", "") + "</a>";
            html += `</li>`;
        });

        html += `</ul>`;

        return html;
    };
}

export default MendixController;