/**
 *
 * iobroker.yahka adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "iobroker.yahka",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js iobroker.yahka Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@iobroker.yahka.com>"
 *          ]
 *          "desc":         "iobroker.yahka adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42
 *      }
 *  }
 *
 */

import * as debug from 'debug';
debug.enable('EventedHTTPServer,HAPServer,Accessory,AccessoryLoader');

// you have to require the utils module and call adapter function
import { Adapter, getAbsoluteDefaultDataDir } from '@iobroker/adapter-core';
import { TIOBrokerAdapter } from './yahka.ioBroker-adapter';
require('./yahka.functions/functions.import');

function startAdapter(options: any = {}) {
	const ioAdapter = Adapter({ ...options, name: 'yahka', systemConfig: true });

    new TIOBrokerAdapter(ioAdapter, getAbsoluteDefaultDataDir());

    return ioAdapter;
}

if (module && module.parent) {
	// Export startAdapter in compact mode
	module.exports = startAdapter;
} else {
	// Otherwise start the adapter immediately
	startAdapter();
}



