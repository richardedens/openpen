"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes = require("../src/routes");
var chai_1 = require("chai");
require("mocha");
describe("Router should be of type object", function () {
    it("Return of routes should be of type IRouter", function () {
        chai_1.expect(routes).to.be.an("Object");
    });
});
//# sourceMappingURL=server.spec.js.map