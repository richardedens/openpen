"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET users listing. */
// @ts-ignore
router.get('/', function (req, res, next) {
    res.json({
        success: "ok",
        project: "fake project"
    });
});
module.exports = router;
//# sourceMappingURL=projects.js.map