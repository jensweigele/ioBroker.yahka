![Logo](admin/yahka.png)
# iobroker.yahka
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.yahka)

***This adapter needs at least nodejs 4.x***

## Installation and Usage

For details on how to install and configure this adapter, please see the [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Changelog

### 0.6.0
  (jw) add support for IP-Cameras
  (jw) included iOS 11 device definitions
  (jw) allowed negative temperatures for temperature sensors
  (jw) fixed crashes due to duplicate device names
  (oliverschulze) added conversion functions "hue" and "level255"
  (jw) added conversion functions scaleInt, scaleFloat and inverse
  (jw) devices are now sorted by name in the admin panel

### 0.5.5
  (bluefox) allow select ID in configuration dialog

### 0.5.4
  (jw) improve logoutput
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping

### 0.5.3
  (jw) internal release

### 0.5.2
  (jw) fixed issues with empty characteristic values
  (jw) fixed issue with empty adapter.systemConfig.system object

### 0.5.1
  (jw) fixed issue with wrongly displayed logo

### 0.5.0
  (jw) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Jens Weigele (iobroker.yahka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
