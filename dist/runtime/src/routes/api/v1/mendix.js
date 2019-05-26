"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var MendixController_1 = require("../../../controllers/MendixController");
var router = express.Router();
/* GET home page. */
// @ts-ignore
router.get('/projects/', function (req, res, next) {
    MendixController_1.default.renderProjectOverview(req).then(function (html) {
        res.send(html);
    });
});
/* GET home page. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.render('mendix', {
        title: 'CED - Process Manager',
        cachebust: ('v=' + +new Date),
        projects: MendixController_1.default.renderProjectOverview(req)
    });
});
exports.default = router;
//# sourceMappingURL=mendix.js.map