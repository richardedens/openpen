import * as express from "express";
import * as fs from "fs";
import * as path from "path";

const router = express.Router();

let paragraphs = [];
let baseDir = path.join(__dirname, "../../../../../../.mendix/project/");

function p(value, styleName) {
    if (styleName === undefined) {
        styleName = "normal";
    }
    paragraphs.push({
        "style": styleName,
        "value": value
    });
}

function findRolebasedHomepage(project, role) {
    let navigationJSON = fs.readFileSync(baseDir + project + "/navigation/b62986ab-1ec9-5c84-9d33-1f0829ffce9b.json").toString();
    let navigation = JSON.parse(navigationJSON);
    let homepageToUse = { "$ID": null, "$Type": null, page: null, microflow: null, role: role };
    
    navigation.profiles[0].roleBasedHomePages.map((homepage, index) => {
        if (homepage.userRole == role) {
            homepageToUse = homepage;
        }
    });

    return homepageToUse;
}

function readPage(project, moduleName, pageName) {
    //let homepageJSON = fs.readFileSync(baseDir + project + "/" + moduleName + "/pages/" + pageName + ".json").toString();
    //let homepage = JSON.parse(homepageJSON);
    console.log(baseDir + project + "/" + moduleName + "/pages/" + pageName + ".json");
}

/* GET home page. */
// @ts-ignore
router.get('/:project', function (req, res, next) {
    const project = req.params.project;

    paragraphs = [];

    let securityJSON = fs.readFileSync(baseDir + project + "/security/security.json").toString();
    let security = JSON.parse(securityJSON);

    /**
     * Document application roles.
     */
    p("Application roles", "Heading 1");
    p("Within this documentation we are about to explain the application roles we see for project \"" + project + "\"", "normal");
    p("At this moment we have found \"" + Object.keys(security).length + "\" application roles.", "normal");

    let roles = Object.keys(security);
    roles.map((role, index) => {
        let moduleRoles = security[role];
        p("Application role \"" + role + "\" is connected to \"" + moduleRoles.length + "\" Mendix modules." , "normal");
    });

    /**
     * Document roles!
     */
    roles.map((role, index) => {
        let homepage = findRolebasedHomepage(project, role);
        let homepageName = (homepage.microflow !== null) ? homepage.microflow : (homepage.page !== null) ? homepage.page : "";
        p("", "PAGEBREAK");
        p("Application Role: " + role, "Heading 1");
        if (homepageName !== "") {
            p("The homepage of role \"" + role + "\" is \"" + homepageName + "\".", "normal");
        } else {
            p("We could not find a role based homepage for: \"" + role + "\".", "normal");
        }
        if (homepage.page !== null) {
            let homepageParts = homepageName.split(".");
            readPage(project, homepageParts[0], homepageParts[1]);
        }
    });

    res.json({
        "success": "true",
        "paragraphs": paragraphs
    });
});

export default router;