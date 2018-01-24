"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./lib/utils");
var hkAdapter = require("./yahka.ioBroker-adapter");
var yahkaAdapter = new hkAdapter.TIOBrokerAdapter(utils.adapter({ name: 'yahka', systemConfig: true }), utils.controllerDir);
//# sourceMappingURL=main.js.map