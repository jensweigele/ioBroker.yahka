"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:unified-signatures
// tslint:disable:no-var-requires
var fs = require("fs");
// Get js-controller directory to load libs
function getControllerDir(isInstall) {
    // Find the js-controller location
    // tslint:disable-next-line:no-shadowed-variable
    var controllerDir = __dirname.replace(/\\/g, "/");
    controllerDir = controllerDir.split("/");
    if (controllerDir[controllerDir.length - 4] === "adapter") {
        controllerDir.splice(controllerDir.length - 4, 4);
        controllerDir = controllerDir.join("/");
    }
    else if (controllerDir[controllerDir.length - 4] === "node_modules") {
        controllerDir.splice(controllerDir.length - 4, 4);
        controllerDir = controllerDir.join("/");
        if (fs.existsSync(controllerDir + "/node_modules/iobroker.js-controller")) {
            controllerDir += "/node_modules/iobroker.js-controller";
        }
        else if (fs.existsSync(controllerDir + "/node_modules/ioBroker.js-controller")) {
            controllerDir += "/node_modules/ioBroker.js-controller";
        }
        else if (!fs.existsSync(controllerDir + "/controller.js")) {
            if (!isInstall) {
                console.log("Cannot find js-controller");
                process.exit(10);
            }
            else {
                process.exit();
            }
        }
    }
    else {
        if (!isInstall) {
            console.log("Cannot find js-controller");
            process.exit(10);
        }
        else {
            process.exit();
        }
    }
    return controllerDir;
}
// Read controller configuration file
var controllerDir = getControllerDir(typeof process !== "undefined" && process.argv && process.argv.indexOf("--install") !== -1);
function getConfig() {
    return JSON.parse(fs.readFileSync(controllerDir + "/conf/iobroker.json", "utf8"));
}
var adapter = require(controllerDir + "/lib/adapter.js");
exports.default = {
    controllerDir: controllerDir,
    getConfig: getConfig,
    adapter: adapter,
};
//# sourceMappingURL=utils.js.map
