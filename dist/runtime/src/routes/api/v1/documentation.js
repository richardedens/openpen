"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var path = require("path");
var router = express.Router();
var paragraphs = [];
var baseDir = path.join(__dirname, "../../../../../../.mendix/project/");
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
    var navigationJSON = fs.readFileSync(baseDir + project + "/navigation/b62986ab-1ec9-5c84-9d33-1f0829ffce9b.json").toString();
    var navigation = JSON.parse(navigationJSON);
    var homepageToUse = { "$ID": null, "$Type": null, page: null, microflow: null, role: role };
    navigation.profiles[0].roleBasedHomePages.map(function (homepage, index) {
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
    var project = req.params.project;
    paragraphs = [];
    var securityJSON = fs.readFileSync(baseDir + project + "/security/security.json").toString();
    var security = JSON.parse(securityJSON);
    /**
     * Document application roles.
     */
    p("Application roles", "Heading 1");
    p("Within this documentation we are about to explain the application roles we see for project \"" + project + "\"", "normal");
    p("At this moment we have found \"" + Object.keys(security).length + "\" application roles.", "normal");
    var roles = Object.keys(security);
    roles.map(function (role, index) {
        var moduleRoles = security[role];
        p("Application role \"" + role + "\" is connected to \"" + moduleRoles.length + "\" Mendix modules.", "normal");
    });
    /**
     * Document roles!
     */
    roles.map(function (role, index) {
        var homepage = findRolebasedHomepage(project, role);
        var homepageName = (homepage.microflow !== null) ? homepage.microflow : (homepage.page !== null) ? homepage.page : "";
        p("", "PAGEBREAK");
        p("Application Role: " + role, "Heading 1");
        if (homepageName !== "") {
            p("The homepage of role \"" + role + "\" is \"" + homepageName + "\".", "normal");
        }
        else {
            p("We could not find a role based homepage for: \"" + role + "\".", "normal");
        }
        if (homepage.page !== null) {
            var homepageParts = homepageName.split(".");
            readPage(project, homepageParts[0], homepageParts[1]);
        }
    });
    res.json({
        "success": "true",
        "paragraphs": paragraphs
    });
});
exports.default = router;
//# sourceMappingURL=documentation.js.map