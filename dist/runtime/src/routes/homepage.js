"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var hasJwt_1 = require("../middlewares/hasJwt");
var HomepageController_1 = require("../controllers/HomepageController");
var router = express.Router();
/* GET home page. */
router.get('/', [hasJwt_1.hasJwt], HomepageController_1.default.show);
exports.default = router;
//# sourceMappingURL=homepage.js.map