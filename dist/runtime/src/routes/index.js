"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var homepage_1 = require("./homepage");
var signin_1 = require("./signin");
var auth_1 = require("./auth");
var vs_1 = require("./vs");
var user_1 = require("./user");
var bpmn_1 = require("./bpmn");
var app_1 = require("./app");
var dashboard_1 = require("./dashboard");
// API
var documentation_1 = require("./api/v1/documentation");
var mendix_1 = require("./api/v1/mendix");
var routes = express_1.Router();
// API
routes.use("/api/v1/documentation", documentation_1.default);
routes.use("/api/v1/mendix", mendix_1.default);
// Page
routes.use("/", homepage_1.default);
routes.use("/signin", signin_1.default);
routes.use("/auth", auth_1.default);
routes.use("/user", user_1.default);
routes.use("/bpmn", bpmn_1.default);
routes.use("/vs", vs_1.default);
routes.use("/dashboard", dashboard_1.default);
routes.use("/dock", app_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map