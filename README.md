![Logo](admin/yahka.png)
# iobroker.yahka
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.yahka)

## Installation
Sometimes additonal libriaries are required:

```
sudo apt-get install libavahi-compat-libdnssd-dev
```
if you have error :
```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```
install avahi-daemin
```
sudo apt-get install avahi-daemon -y
```
and edit avahi-daemon.conf 
```
sudo nano avahi-daemon.conf 
```
set:
```
host-name=orangepi2plus
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```
## Usage

What is???:
- ioBroker.State.Defered
- ioBroker.State.OnlyACK
- ioBroker.homematic.WindowCovering.TargetPosition

- passthrough
- HomematicDirectionToHomekitPositionState
- HomematicControlModeToHomekitHeathingCoolingState

## Changelog

### 0.5.5 (2017.05.04)
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
