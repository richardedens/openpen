"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mendixmodelsdk_1 = require("mendixmodelsdk");
var mendixplatformsdk_1 = require("mendixplatformsdk");
var fs = require("fs");
var MXModelSDK = /** @class */ (function () {
    function MXModelSDK() {
    }
    MXModelSDK.prototype.init = function (path, mxUsername, mxApiKey, projectName, projectId, branchName, revisionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            function createDir(path) {
                console.log('Setting up project folder:' + path);
                try {
                    fs.statSync(path);
                }
                catch (e) {
                    fs.mkdirSync(path);
                }
            }
            function getModule(element) {
                var current = element.unit;
                while (current) {
                    if (current instanceof mendixmodelsdk_1.projects.Module) {
                        return current;
                    }
                    current = current.container;
                }
                // @ts-ignore
                return current;
            }
            var client, project, branch, revision, workingCopy, securityModel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mendixplatformsdk_1.MendixSdkClient(mxUsername, mxApiKey);
                        project = new mendixplatformsdk_1.Project(client, projectId, projectName);
                        branch = new mendixplatformsdk_1.Branch(project, branchName);
                        revision = new mendixplatformsdk_1.Revision(revisionNumber, branch);
                        createDir(path + "/navigation/");
                        createDir(path + "/menus/");
                        createDir(path + "/security/");
                        return [4 /*yield*/, project.createWorkingCopy(revision)];
                    case 1:
                        workingCopy = _a.sent();
                        securityModel = {};
                        workingCopy.model().allProjectSecurities().forEach(function (projectSecurity) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                projectSecurity.load(function (loadedProjectSecurity) {
                                    loadedProjectSecurity.userRoles.forEach(function (userRole) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            userRole.load(function (loadedUserRole) {
                                                console.log("> Found user role: " + loadedUserRole.name);
                                                securityModel[loadedUserRole.name] = [];
                                                loadedUserRole.moduleRoles.forEach(function (moduleRole) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        try {
                                                            securityModel[loadedUserRole.name].push({
                                                                "module": getModule(moduleRole).name,
                                                                "moduleRole": moduleRole.name
                                                            });
                                                            fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
                                                            console.log(">> Found module roles for user role: " + loadedUserRole.name + " - " + getModule(moduleRole).name + "." + moduleRole.name);
                                                        }
                                                        catch (error) {
                                                            console.log(">> Continueing but still: error: " + error);
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); });
                                                fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
                                            }, true);
                                            return [2 /*return*/];
                                        });
                                    }); });
                                    fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
                                }, true);
                                return [2 /*return*/];
                            });
                        }); });
                        workingCopy.model().allDomainModels().forEach(function (domainModel) { return __awaiter(_this, void 0, void 0, function () {
                            var modulePath, navigationModels, menuModels, entityModels, securityModels, microflowModels, pageModels, layoutModels, i, _a, _b, _i, error_1, _c, _d, _e, error_2, _f, _g, _h, error_3, _j, _k, _l, error_4, _m, _o, _p, error_5, _q, _r, _s, error_6, _t, _u, _v, error_7;
                            return __generator(this, function (_w) {
                                switch (_w.label) {
                                    case 0:
                                        modulePath = path + getModule(domainModel).name;
                                        createDir(modulePath);
                                        createDir(modulePath + "/entities/");
                                        createDir(modulePath + "/microflows/");
                                        createDir(modulePath + "/pages/");
                                        createDir(modulePath + "/layouts/");
                                        createDir(modulePath + "/security/");
                                        navigationModels = workingCopy.model().allNavigationDocuments();
                                        menuModels = workingCopy.model().allMenuDocuments();
                                        entityModels = workingCopy.model().allDomainModels().filter(function (obj) {
                                            return getModule(obj).name === getModule(domainModel).name;
                                        });
                                        securityModels = workingCopy.model().allModuleSecurities().filter(function (obj) {
                                            return getModule(obj).name === getModule(domainModel).name;
                                        });
                                        microflowModels = workingCopy.model().allMicroflows().filter(function (obj) {
                                            return getModule(obj).name === getModule(domainModel).name;
                                        });
                                        pageModels = workingCopy.model().allPages().filter(function (obj) {
                                            return getModule(obj).name === getModule(domainModel).name;
                                        });
                                        layoutModels = workingCopy.model().allLayouts().filter(function (obj) {
                                            return getModule(obj).name === getModule(domainModel).name;
                                        });
                                        console.log("We have setup directory: " + modulePath);
                                        console.log("-> We have found: " + pageModels.length + " of pages.");
                                        _w.label = 1;
                                    case 1:
                                        _w.trys.push([1, 6, , 7]);
                                        _a = [];
                                        for (_b in menuModels)
                                            _a.push(_b);
                                        _i = 0;
                                        _w.label = 2;
                                    case 2:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        i = _a[_i];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(menuModels[i]).then(function (menuModel) {
                                                var menuPath = path + "/menus/" + menuModel.id + '.js';
                                                fs.writeFileSync(menuPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(menuModel));
                                                var menuJsonPath = path + "/menus/" + menuModel.id + '.json';
                                                fs.writeFileSync(menuJsonPath, JSON.stringify(menuModel, null, 4));
                                                console.log('Written navigation: /menus/' + menuModel.id + '.js / .json');
                                            })];
                                    case 3:
                                        _w.sent();
                                        _w.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        error_1 = _w.sent();
                                        console.log("error: " + error_1);
                                        return [3 /*break*/, 7];
                                    case 7:
                                        _w.trys.push([7, 12, , 13]);
                                        _c = [];
                                        for (_d in navigationModels)
                                            _c.push(_d);
                                        _e = 0;
                                        _w.label = 8;
                                    case 8:
                                        if (!(_e < _c.length)) return [3 /*break*/, 11];
                                        i = _c[_e];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(navigationModels[i]).then(function (navigationModel) {
                                                var navigationPath = path + "/navigation/" + navigationModel.id + '.js';
                                                fs.writeFileSync(navigationPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(navigationModel));
                                                var navigationJsonPath = path + "/navigation/" + navigationModel.id + '.json';
                                                fs.writeFileSync(navigationJsonPath, JSON.stringify(navigationModel, null, 4));
                                                console.log('Written navigation: /navigation/' + navigationModel.id + '.js / .json');
                                            })];
                                    case 9:
                                        _w.sent();
                                        _w.label = 10;
                                    case 10:
                                        _e++;
                                        return [3 /*break*/, 8];
                                    case 11: return [3 /*break*/, 13];
                                    case 12:
                                        error_2 = _w.sent();
                                        console.log("error: " + error_2);
                                        return [3 /*break*/, 13];
                                    case 13:
                                        _w.trys.push([13, 18, , 19]);
                                        _f = [];
                                        for (_g in securityModels)
                                            _f.push(_g);
                                        _h = 0;
                                        _w.label = 14;
                                    case 14:
                                        if (!(_h < _f.length)) return [3 /*break*/, 17];
                                        i = _f[_h];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(entityModels[i]).then(function (securityModel) {
                                                var securityPath = modulePath + "/security/" + securityModel.id + '.js';
                                                fs.writeFileSync(securityPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(securityModel));
                                                var securityJsonPath = modulePath + "/security/" + securityModel.id + '.json';
                                                fs.writeFileSync(securityJsonPath, JSON.stringify(securityModel, null, 4));
                                                console.log('Written module security: ' + getModule(securityModel).name + '/security/' + securityModel.id + '.js / .json');
                                            })];
                                    case 15:
                                        _w.sent();
                                        _w.label = 16;
                                    case 16:
                                        _h++;
                                        return [3 /*break*/, 14];
                                    case 17: return [3 /*break*/, 19];
                                    case 18:
                                        error_3 = _w.sent();
                                        console.log("error: " + error_3);
                                        return [3 /*break*/, 19];
                                    case 19:
                                        _w.trys.push([19, 24, , 25]);
                                        _j = [];
                                        for (_k in entityModels)
                                            _j.push(_k);
                                        _l = 0;
                                        _w.label = 20;
                                    case 20:
                                        if (!(_l < _j.length)) return [3 /*break*/, 23];
                                        i = _j[_l];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(entityModels[i]).then(function (entityModel) {
                                                var entityPath = modulePath + "/entities/" + entityModel.id + '.js';
                                                fs.writeFileSync(entityPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(entityModel));
                                                var entityJsonPath = modulePath + "/entities/" + entityModel.id + '.json';
                                                fs.writeFileSync(entityJsonPath, JSON.stringify(entityModel, null, 4));
                                                console.log('Written entity: ' + getModule(entityModel).name + '/entities/' + entityModel.id + '.js / .json');
                                            })];
                                    case 21:
                                        _w.sent();
                                        _w.label = 22;
                                    case 22:
                                        _l++;
                                        return [3 /*break*/, 20];
                                    case 23: return [3 /*break*/, 25];
                                    case 24:
                                        error_4 = _w.sent();
                                        console.log("error: " + error_4);
                                        return [3 /*break*/, 25];
                                    case 25:
                                        _w.trys.push([25, 30, , 31]);
                                        _m = [];
                                        for (_o in microflowModels)
                                            _m.push(_o);
                                        _p = 0;
                                        _w.label = 26;
                                    case 26:
                                        if (!(_p < _m.length)) return [3 /*break*/, 29];
                                        i = _m[_p];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(microflowModels[i]).then(function (microflowModel) {
                                                var microflowPath = modulePath + "/microflows/" + microflowModel.name + '.js';
                                                fs.writeFileSync(microflowPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(microflowModel));
                                                var microflowJsonPath = modulePath + "/microflows/" + microflowModel.name + '.json';
                                                fs.writeFileSync(microflowJsonPath, JSON.stringify(microflowModel, null, 4));
                                                console.log('Written microflow: ' + getModule(microflowModel).name + '/microflow/' + microflowModel.name + '.js / .json');
                                            })];
                                    case 27:
                                        _w.sent();
                                        _w.label = 28;
                                    case 28:
                                        _p++;
                                        return [3 /*break*/, 26];
                                    case 29: return [3 /*break*/, 31];
                                    case 30:
                                        error_5 = _w.sent();
                                        console.log("error: " + error_5);
                                        return [3 /*break*/, 31];
                                    case 31:
                                        _w.trys.push([31, 36, , 37]);
                                        _q = [];
                                        for (_r in pageModels)
                                            _q.push(_r);
                                        _s = 0;
                                        _w.label = 32;
                                    case 32:
                                        if (!(_s < _q.length)) return [3 /*break*/, 35];
                                        i = _q[_s];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(pageModels[i]).then(function (pageModel) {
                                                var pagePath = modulePath + "/pages/" + pageModel.name + '.js';
                                                fs.writeFileSync(pagePath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(pageModel));
                                                var pageJsonPath = modulePath + "/pages/" + pageModel.name + '.json';
                                                fs.writeFileSync(pageJsonPath, JSON.stringify(pageModel, null, 4));
                                                console.log('Written page: ' + getModule(pageModel).name + '/pages/' + pageModel.name + '.js / .json');
                                            })];
                                    case 33:
                                        _w.sent();
                                        _w.label = 34;
                                    case 34:
                                        _s++;
                                        return [3 /*break*/, 32];
                                    case 35: return [3 /*break*/, 37];
                                    case 36:
                                        error_6 = _w.sent();
                                        console.log("error: " + error_6);
                                        return [3 /*break*/, 37];
                                    case 37:
                                        _w.trys.push([37, 42, , 43]);
                                        _t = [];
                                        for (_u in layoutModels)
                                            _t.push(_u);
                                        _v = 0;
                                        _w.label = 38;
                                    case 38:
                                        if (!(_v < _t.length)) return [3 /*break*/, 41];
                                        i = _t[_v];
                                        return [4 /*yield*/, mendixplatformsdk_1.loadAsPromise(layoutModels[i]).then(function (layoutModel) {
                                                var layoutPath = modulePath + "/layouts/" + layoutModel.name + '.js';
                                                fs.writeFileSync(layoutPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(layoutModel));
                                                var layoutJsonPath = modulePath + "/layouts/" + layoutModel.name + '.json';
                                                fs.writeFileSync(layoutJsonPath, JSON.stringify(layoutModel, null, 4));
                                                console.log('Written layout: ' + getModule(layoutModel).name + '/layouts/' + layoutModel.name + '.js / .json');
                                            })];
                                    case 39:
                                        _w.sent();
                                        _w.label = 40;
                                    case 40:
                                        _v++;
                                        return [3 /*break*/, 38];
                                    case 41: return [3 /*break*/, 43];
                                    case 42:
                                        error_7 = _w.sent();
                                        console.log("error: " + error_7);
                                        return [3 /*break*/, 43];
                                    case 43: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return MXModelSDK;
}());
exports.MXModelSDK = MXModelSDK;
//# sourceMappingURL=MXModelSDK.js.map