"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var SignInController_1 = require("../controllers/SignInController");
var router = express.Router();
/* GET home page. */
router.get('/signin', SignInController_1.default.show);
exports.default = router;
//# sourceMappingURL=signin.js.map