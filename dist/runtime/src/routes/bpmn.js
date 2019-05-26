"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.render('bpmn', {
        title: 'CED - Process Manager',
        cachebust: ('v=' + +new Date)
    });
});
exports.default = router;
//# sourceMappingURL=bpmn.js.map