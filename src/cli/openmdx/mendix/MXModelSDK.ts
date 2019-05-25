import { ModelSdkClient, IModel, projects, IModelUnit, domainmodels, JavaScriptSerializer, IStructure } from "mendixmodelsdk";
import { MendixSdkClient, Project, OnlineWorkingCopy, loadAsPromise, Revision, Branch } from "mendixplatformsdk";
import * as fs from "fs";

class MXModelSDK {

    async init(path: string, mxUsername: string, mxApiKey: string, projectName: string, projectId: string, branchName: string, revisionNumber: any) {

        let client = new MendixSdkClient(mxUsername, mxApiKey);
        let project = new Project(client, projectId, projectName);
        let branch = new Branch(project, branchName);
        let revision = new Revision(revisionNumber, branch);

        function createDir(path) {
            console.log('Setting up project folder:' + path);
            try {
                fs.statSync(path);
            } catch (e) {
                fs.mkdirSync(path);
            }
        }
        
        createDir(path + "/navigation/");
        createDir(path + "/menus/");
        createDir(path + "/security/");

        // Get that Mendix Model!
        const workingCopy = await project.createWorkingCopy(revision);

        // Create security model... save at the very end..
        let securityModel = {};
        workingCopy.model().allProjectSecurities().forEach(async projectSecurity => {
            projectSecurity.load((loadedProjectSecurity) => {
                loadedProjectSecurity.userRoles.forEach(async userRole => {
                    userRole.load((loadedUserRole) => {
                        console.log("> Found user role: " + loadedUserRole.name);
                        securityModel[loadedUserRole.name] = [];
                        loadedUserRole.moduleRoles.forEach(async moduleRole => {
                            try {
                                securityModel[loadedUserRole.name].push({
                                    "module": getModule(moduleRole).name,
                                    "moduleRole": moduleRole.name
                                })
                                fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
                                console.log(">> Found module roles for user role: " + loadedUserRole.name + " - " + getModule(moduleRole).name + "." + moduleRole.name);
                            } catch (error) {
                                console.log(`>> Continueing but still: error: ${error}`);
                            }
                        });
                        fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
                    }, true);
                    
                });
                fs.writeFileSync(path + "/security/security.json", JSON.stringify(securityModel, null, 4));
            },true);
        });

        workingCopy.model().allDomainModels().forEach(async domainModel => {

            let modulePath = path + getModule(domainModel).name;

            createDir(modulePath);
            createDir(modulePath + "/entities/");
            createDir(modulePath + "/microflows/");
            createDir(modulePath + "/pages/");
            createDir(modulePath + "/layouts/");
            createDir(modulePath + "/security/");

            const navigationModels = workingCopy.model().allNavigationDocuments();

            const menuModels = workingCopy.model().allMenuDocuments();

            const entityModels = workingCopy.model().allDomainModels().filter(obj => {
                return getModule(obj).name === getModule(domainModel).name;
            });
            
            const securityModels = workingCopy.model().allModuleSecurities().filter(obj => {
                return getModule(obj).name === getModule(domainModel).name;
            });

            const microflowModels = workingCopy.model().allMicroflows().filter(obj => {
                return getModule(obj).name === getModule(domainModel).name;
            });

            const pageModels = workingCopy.model().allPages().filter(obj => {
                return getModule(obj).name === getModule(domainModel).name;
            });

            const layoutModels = workingCopy.model().allLayouts().filter(obj => {
                return getModule(obj).name === getModule(domainModel).name;
            });

            console.log("We have setup directory: " + modulePath);
            console.log("-> We have found: " + pageModels.length + " of pages.");

            let i: any;
            
            try {
                for (i in menuModels) {
                    await loadAsPromise(menuModels[i]).then((menuModel) => {

                        let menuPath = path + "/menus/" + menuModel.id + '.js';
                        fs.writeFileSync(menuPath, JavaScriptSerializer.serializeToJs(menuModel));

                        let menuJsonPath = path + "/menus/" + menuModel.id + '.json';
                        fs.writeFileSync(menuJsonPath, JSON.stringify(menuModel, null, 4));

                        console.log('Written navigation: /menus/' + menuModel.id + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }
            
            try {
                for (i in navigationModels) {
                    await loadAsPromise(navigationModels[i]).then((navigationModel) => {

                        let navigationPath = path + "/navigation/" + navigationModel.id + '.js';
                        fs.writeFileSync(navigationPath, JavaScriptSerializer.serializeToJs(navigationModel));

                        let navigationJsonPath = path + "/navigation/" + navigationModel.id + '.json';
                        fs.writeFileSync(navigationJsonPath, JSON.stringify(navigationModel, null, 4));

                        console.log('Written navigation: /navigation/' + navigationModel.id + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

            try {
                for (i in securityModels) {
                    await loadAsPromise(entityModels[i]).then((securityModel) => {

                        let securityPath = modulePath + "/security/" + securityModel.id + '.js';
                        fs.writeFileSync(securityPath, JavaScriptSerializer.serializeToJs(securityModel));

                        let securityJsonPath = modulePath + "/security/" + securityModel.id + '.json';
                        fs.writeFileSync(securityJsonPath, JSON.stringify(securityModel, null, 4));

                        console.log('Written module security: ' + getModule(securityModel).name + '/security/' + securityModel.id + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

            try {
                for (i in entityModels) {
                    await loadAsPromise(entityModels[i]).then((entityModel) => {

                        let entityPath = modulePath + "/entities/" + entityModel.id + '.js';
                        fs.writeFileSync(entityPath, JavaScriptSerializer.serializeToJs(entityModel));

                        let entityJsonPath = modulePath + "/entities/" + entityModel.id + '.json';
                        fs.writeFileSync(entityJsonPath, JSON.stringify(entityModel, null, 4));

                        console.log('Written entity: ' + getModule(entityModel).name + '/entities/' + entityModel.id + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }
            
            try {
                for (i in microflowModels) {
                    await loadAsPromise(microflowModels[i]).then((microflowModel) => {

                        let microflowPath = modulePath + "/microflows/" + microflowModel.name + '.js';
                        fs.writeFileSync(microflowPath, JavaScriptSerializer.serializeToJs(microflowModel));

                        let microflowJsonPath = modulePath + "/microflows/" + microflowModel.name + '.json';
                        fs.writeFileSync(microflowJsonPath, JSON.stringify(microflowModel, null, 4));

                        console.log('Written microflow: ' + getModule(microflowModel).name + '/microflow/' + microflowModel.name + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

            try {
                for (i in pageModels) {
                    await loadAsPromise(pageModels[i]).then((pageModel) => {

                        let pagePath = modulePath + "/pages/" + pageModel.name + '.js';
                        fs.writeFileSync(pagePath, JavaScriptSerializer.serializeToJs(pageModel));

                        let pageJsonPath = modulePath + "/pages/" + pageModel.name + '.json';
                        fs.writeFileSync(pageJsonPath, JSON.stringify(pageModel, null, 4));

                        console.log('Written page: ' + getModule(pageModel).name + '/pages/' + pageModel.name + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

            try {
                for (i in layoutModels) {
                    await loadAsPromise(layoutModels[i]).then((layoutModel) => {

                    let layoutPath = modulePath + "/layouts/" + layoutModel.name + '.js';
                    fs.writeFileSync(layoutPath, JavaScriptSerializer.serializeToJs(layoutModel));

                    let layoutJsonPath = modulePath + "/layouts/" + layoutModel.name + '.json';
                    fs.writeFileSync(layoutJsonPath, JSON.stringify(layoutModel, null, 4));

                    console.log('Written layout: ' + getModule(layoutModel).name + '/layouts/' + layoutModel.name + '.js / .json');
                    });
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

        });

        

        function getModule(element: IStructure): projects.Module {
            let current = element.unit;
            while (current) {
                if (current instanceof projects.Module) {
                    return current;
                }
                current = current.container;
            }
            // @ts-ignore
            return current;
        }
    }

}

export { MXModelSDK };