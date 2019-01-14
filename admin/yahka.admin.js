var yahkaAdmin =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin/yahka.admin.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/base64-js/index.js":
/*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../node_modules/buffer-shims/index.js":
/*!*********************************************!*\
  !*** ../node_modules/buffer-shims/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var buffer = __webpack_require__(/*! buffer */ "../node_modules/node-libs-browser/node_modules/buffer/index.js");
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/decimal.js/decimal.mjs":
/*!**********************************************!*\
  !*** ../node_modules/decimal.js/decimal.mjs ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 *
 *  decimal.js v7.5.1
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 *  https://github.com/MikeMcl/decimal.js/LICENCE
 *
 */


// -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


  // The maximum exponent magnitude.
  // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
var EXP_LIMIT = 9e15,                      // 0 to 9e15

  // The limit on the value of `precision`, and on the value of the first argument to
  // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
  MAX_DIGITS = 1e9,                        // 0 to 1e9

  // Base conversion alphabet.
  NUMERALS = '0123456789abcdef',

  // The natural logarithm of 10 (1025 digits).
  ln10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

  // Pi (1025 digits).
  pi = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


  // The initial configuration properties of the Decimal constructor.
  defaults = {

    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed at run-time using the `Decimal.config` method.

    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,                         // 1 to MAX_DIGITS

    // The rounding mode used when rounding to `precision`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,                           // 0 to 8

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP         0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN  6 The IEEE 754 remainder function.
    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
    //
    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
    // division (9) are commonly used for the modulus operation. The other rounding modes can also
    // be used, but they may not give useful results.
    modulo: 1,                             // 0 to 9

    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,                          // 0 to -EXP_LIMIT

    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos:  21,                         // 0 to EXP_LIMIT

    // The minimum exponent value, beneath which underflow to zero occurs.
    // JavaScript numbers: -324  (5e-324)
    minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

    // The maximum exponent value, above which overflow to Infinity occurs.
    // JavaScript numbers: 308  (1.7976931348623157e+308)
    maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

    // Whether to use cryptographically-secure random number generation, if available.
    crypto: false                          // true/false
  },


// ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


  Decimal, LN10, PI, inexact, quadrant,
  external = true,

  decimalError = '[DecimalError] ',
  invalidArgument = decimalError + 'Invalid argument: ',
  precisionLimitExceeded = decimalError + 'Precision limit exceeded',
  cryptoUnavailable = decimalError + 'crypto unavailable',

  mathfloor = Math.floor,
  mathpow = Math.pow,

  isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

  BASE = 1e7,
  LOG_BASE = 7,
  MAX_SAFE_INTEGER = 9007199254740991,

  LN10_PRECISION = ln10.length - 1,
  PI_PRECISION = pi.length - 1,

  // Decimal.prototype object
  P = {};


// Decimal prototype methods


/*
 *  absoluteValue             abs
 *  ceil
 *  comparedTo                cmp
 *  cosine                    cos
 *  cubeRoot                  cbrt
 *  decimalPlaces             dp
 *  dividedBy                 div
 *  dividedToIntegerBy        divToInt
 *  equals                    eq
 *  floor
 *  greaterThan               gt
 *  greaterThanOrEqualTo      gte
 *  hyperbolicCosine          cosh
 *  hyperbolicSine            sinh
 *  hyperbolicTangent         tanh
 *  inverseCosine             acos
 *  inverseHyperbolicCosine   acosh
 *  inverseHyperbolicSine     asinh
 *  inverseHyperbolicTangent  atanh
 *  inverseSine               asin
 *  inverseTangent            atan
 *  isFinite
 *  isInteger                 isInt
 *  isNaN
 *  isNegative                isNeg
 *  isPositive                isPos
 *  isZero
 *  lessThan                  lt
 *  lessThanOrEqualTo         lte
 *  logarithm                 log
 *  [maximum]                 [max]
 *  [minimum]                 [min]
 *  minus                     sub
 *  modulo                    mod
 *  naturalExponential        exp
 *  naturalLogarithm          ln
 *  negated                   neg
 *  plus                      add
 *  precision                 sd
 *  round
 *  sine                      sin
 *  squareRoot                sqrt
 *  tangent                   tan
 *  times                     mul
 *  toBinary
 *  toDecimalPlaces           toDP
 *  toExponential
 *  toFixed
 *  toFraction
 *  toHexadecimal             toHex
 *  toNearest
 *  toNumber
 *  toOctal
 *  toPower                   pow
 *  toPrecision
 *  toSignificantDigits       toSD
 *  toString
 *  truncated                 trunc
 *  valueOf                   toJSON
 */


/*
 * Return a new Decimal whose value is the absolute value of this Decimal.
 *
 */
P.absoluteValue = P.abs = function () {
  var x = new this.constructor(this);
  if (x.s < 0) x.s = 1;
  return finalise(x);
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of positive Infinity.
 *
 */
P.ceil = function () {
  return finalise(new this.constructor(this), this.e + 1, 2);
};


/*
 * Return
 *   1    if the value of this Decimal is greater than the value of `y`,
 *  -1    if the value of this Decimal is less than the value of `y`,
 *   0    if they have the same value,
 *   NaN  if the value of either Decimal is NaN.
 *
 */
P.comparedTo = P.cmp = function (y) {
  var i, j, xdL, ydL,
    x = this,
    xd = x.d,
    yd = (y = new x.constructor(y)).d,
    xs = x.s,
    ys = y.s;

  // Either NaN or ±Infinity?
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }

  // Either zero?
  if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

  // Signs differ?
  if (xs !== ys) return xs;

  // Compare exponents.
  if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

  xdL = xd.length;
  ydL = yd.length;

  // Compare digit by digit.
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }

  // Compare lengths.
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};


/*
 * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * cos(0)         = 1
 * cos(-0)        = 1
 * cos(Infinity)  = NaN
 * cos(-Infinity) = NaN
 * cos(NaN)       = NaN
 *
 */
P.cosine = P.cos = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.d) return new Ctor(NaN);

  // cos(0) = cos(-0) = 1
  if (!x.d[0]) return new Ctor(1);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;

  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};


/*
 *
 * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 *  cbrt(0)  =  0
 *  cbrt(-0) = -0
 *  cbrt(1)  =  1
 *  cbrt(-1) = -1
 *  cbrt(N)  =  N
 *  cbrt(-I) = -I
 *  cbrt(I)  =  I
 *
 * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
 *
 */
P.cubeRoot = P.cbrt = function () {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  external = false;

  // Initial estimate.
  s = x.s * Math.pow(x.s * x, 1 / 3);

   // Math.cbrt underflow/overflow?
   // Pass x to Math.pow as integer, then adjust the exponent of the result.
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;

    // Adjust n exponent so it is a multiple of 3 away from x exponent.
    if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
    s = Math.pow(n, 1 / 3);

    // Rarely, e may be one less than the result exponent value.
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

    if (s == 1 / 0) {
      n = '5e' + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf('e') + 1) + e;
    }

    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }

  sd = (e = Ctor.precision) + 3;

  // Halley's method.
  // TODO? Compare Newton's method.
  for (;;) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

    // TODO? Replace with for-loop and checkRoundingDigits.
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);

      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
      // , i.e. approaching a rounding boundary, continue the iteration.
      if (n == '9999' || !rep && n == '4999') {

        // On the first iteration only, check to see if rounding up gives the exact result as the
        // nines may infinitely repeat.
        if (!rep) {
          finalise(t, e + 1, 0);

          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }

        sd += 4;
        rep = 1;
      } else {

        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
        // If not, then there are further digits and m will be truthy.
        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

          // Truncate to the first rounding digit.
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }

        break;
      }
    }
  }

  external = true;

  return finalise(r, e, Ctor.rounding, m);
};


/*
 * Return the number of decimal places of the value of this Decimal.
 *
 */
P.decimalPlaces = P.dp = function () {
  var w,
    d = this.d,
    n = NaN;

  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last word.
    w = d[w];
    if (w) for (; w % 10 == 0; w /= 10) n--;
    if (n < 0) n = 0;
  }

  return n;
};


/*
 *  n / 0 = I
 *  n / N = N
 *  n / I = 0
 *  0 / n = 0
 *  0 / 0 = N
 *  0 / N = N
 *  0 / I = 0
 *  N / n = N
 *  N / 0 = N
 *  N / N = N
 *  N / I = N
 *  I / n = I
 *  I / 0 = I
 *  I / N = N
 *  I / I = N
 *
 * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 */
P.dividedBy = P.div = function (y) {
  return divide(this, new this.constructor(y));
};


/*
 * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
 * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
 *
 */
P.dividedToIntegerBy = P.divToInt = function (y) {
  var x = this,
    Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};


/*
 * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
 *
 */
P.equals = P.eq = function (y) {
  return this.cmp(y) === 0;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of negative Infinity.
 *
 */
P.floor = function () {
  return finalise(new this.constructor(this), this.e + 1, 3);
};


/*
 * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
 * false.
 *
 */
P.greaterThan = P.gt = function (y) {
  return this.cmp(y) > 0;
};


/*
 * Return true if the value of this Decimal is greater than or equal to the value of `y`,
 * otherwise return false.
 *
 */
P.greaterThanOrEqualTo = P.gte = function (y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};


/*
 * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [1, Infinity]
 *
 * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
 *
 * cosh(0)         = 1
 * cosh(-0)        = 1
 * cosh(Infinity)  = Infinity
 * cosh(-Infinity) = Infinity
 * cosh(NaN)       = NaN
 *
 *  x        time taken (ms)   result
 * 1000      9                 9.8503555700852349694e+433
 * 10000     25                4.4034091128314607936e+4342
 * 100000    171               1.4033316802130615897e+43429
 * 1000000   3817              1.5166076984010437725e+434294
 * 10000000  abandoned after 2 minute wait
 *
 * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
 *
 */
P.hyperbolicCosine = P.cosh = function () {
  var k, n, pr, rm, len,
    x = this,
    Ctor = x.constructor,
    one = new Ctor(1);

  if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero()) return one;

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;

  // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
  // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

  // Estimate the optimum number of times to use the argument reduction.
  // TODO? Estimation reused from cosine() and may not be optimal here.
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = Math.pow(4, -k).toString();
  } else {
    k = 16;
    n = '2.3283064365386962890625e-10';
  }

  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

  // Reverse argument reduction
  var cosh2_x,
    i = k,
    d8 = new Ctor(8);
  for (; i--;) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }

  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};


/*
 * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
 *
 * sinh(0)         = 0
 * sinh(-0)        = -0
 * sinh(Infinity)  = Infinity
 * sinh(-Infinity) = -Infinity
 * sinh(NaN)       = NaN
 *
 * x        time taken (ms)
 * 10       2 ms
 * 100      5 ms
 * 1000     14 ms
 * 10000    82 ms
 * 100000   886 ms            1.4033316802130615897e+43429
 * 200000   2613 ms
 * 300000   5407 ms
 * 400000   8824 ms
 * 500000   13026 ms          8.7080643612718084129e+217146
 * 1000000  48543 ms
 *
 * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
 *
 */
P.hyperbolicSine = P.sinh = function () {
  var k, pr, rm, len,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;

  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {

    // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
    // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
    // 3 multiplications and 1 addition

    // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
    // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
    // 4 multiplications and 2 additions

    // Estimate the optimum number of times to use the argument reduction.
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;

    x = x.times(Math.pow(5, -k));

    x = taylorSeries(Ctor, 2, x, x, true);

    // Reverse argument reduction
    var sinh2_x,
      d5 = new Ctor(5),
      d16 = new Ctor(16),
      d20 = new Ctor(20);
    for (; k--;) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(x, pr, rm, true);
};


/*
 * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * tanh(x) = sinh(x) / cosh(x)
 *
 * tanh(0)         = 0
 * tanh(-0)        = -0
 * tanh(Infinity)  = 1
 * tanh(-Infinity) = -1
 * tanh(NaN)       = NaN
 *
 */
P.hyperbolicTangent = P.tanh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(x.s);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;

  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};


/*
 * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
 * this Decimal.
 *
 * Domain: [-1, 1]
 * Range: [0, pi]
 *
 * acos(x) = pi/2 - asin(x)
 *
 * acos(0)       = pi/2
 * acos(-0)      = pi/2
 * acos(1)       = 0
 * acos(-1)      = pi
 * acos(1/2)     = pi/3
 * acos(-1/2)    = 2*pi/3
 * acos(|x| > 1) = NaN
 * acos(NaN)     = NaN
 *
 */
P.inverseCosine = P.acos = function () {
  var halfPi,
    x = this,
    Ctor = x.constructor,
    k = x.abs().cmp(1),
    pr = Ctor.precision,
    rm = Ctor.rounding;

  if (k !== -1) {
    return k === 0
      // |x| is 1
      ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
      // |x| > 1 or x is NaN
      : new Ctor(NaN);
  }

  if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

  // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

  Ctor.precision = pr + 6;
  Ctor.rounding = 1;

  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return halfPi.minus(x);
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
 * value of this Decimal.
 *
 * Domain: [1, Infinity]
 * Range: [0, Infinity]
 *
 * acosh(x) = ln(x + sqrt(x^2 - 1))
 *
 * acosh(x < 1)     = NaN
 * acosh(NaN)       = NaN
 * acosh(Infinity)  = Infinity
 * acosh(-Infinity) = NaN
 * acosh(0)         = NaN
 * acosh(-0)        = NaN
 * acosh(1)         = 0
 * acosh(-1)        = NaN
 *
 */
P.inverseHyperbolicCosine = P.acosh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;

  x = x.times(x).minus(1).sqrt().plus(x);

  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.ln();
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
 * of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * asinh(x) = ln(x + sqrt(x^2 + 1))
 *
 * asinh(NaN)       = NaN
 * asinh(Infinity)  = Infinity
 * asinh(-Infinity) = -Infinity
 * asinh(0)         = 0
 * asinh(-0)        = -0
 *
 */
P.inverseHyperbolicSine = P.asinh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;

  x = x.times(x).plus(1).sqrt().plus(x);

  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.ln();
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
 * value of this Decimal.
 *
 * Domain: [-1, 1]
 * Range: [-Infinity, Infinity]
 *
 * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
 *
 * atanh(|x| > 1)   = NaN
 * atanh(NaN)       = NaN
 * atanh(Infinity)  = NaN
 * atanh(-Infinity) = NaN
 * atanh(0)         = 0
 * atanh(-0)        = -0
 * atanh(1)         = Infinity
 * atanh(-1)        = -Infinity
 *
 */
P.inverseHyperbolicTangent = P.atanh = function () {
  var pr, rm, wpr, xsd,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();

  if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

  Ctor.precision = wpr = xsd - x.e;

  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

  Ctor.precision = pr + 4;
  Ctor.rounding = 1;

  x = x.ln();

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.times(0.5);
};


/*
 * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi/2, pi/2]
 *
 * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
 *
 * asin(0)       = 0
 * asin(-0)      = -0
 * asin(1/2)     = pi/6
 * asin(-1/2)    = -pi/6
 * asin(1)       = pi/2
 * asin(-1)      = -pi/2
 * asin(|x| > 1) = NaN
 * asin(NaN)     = NaN
 *
 * TODO? Compare performance of Taylor series.
 *
 */
P.inverseSine = P.asin = function () {
  var halfPi, k,
    pr, rm,
    x = this,
    Ctor = x.constructor;

  if (x.isZero()) return new Ctor(x);

  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;

  if (k !== -1) {

    // |x| is 1
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }

    // |x| > 1 or x is NaN
    return new Ctor(NaN);
  }

  // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

  Ctor.precision = pr + 6;
  Ctor.rounding = 1;

  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.times(2);
};


/*
 * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
 * of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi/2, pi/2]
 *
 * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
 *
 * atan(0)         = 0
 * atan(-0)        = -0
 * atan(1)         = pi/4
 * atan(-1)        = -pi/4
 * atan(Infinity)  = pi/2
 * atan(-Infinity) = -pi/2
 * atan(NaN)       = NaN
 *
 */
P.inverseTangent = P.atan = function () {
  var i, j, k, n, px, t, r, wpr, x2,
    x = this,
    Ctor = x.constructor,
    pr = Ctor.precision,
    rm = Ctor.rounding;

  if (!x.isFinite()) {
    if (!x.s) return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }

  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;

  // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

  // Argument reduction
  // Ensure |x| < 0.42
  // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

  k = Math.min(28, wpr / LOG_BASE + 2 | 0);

  for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

  external = false;

  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;

  // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
  for (; i !== -1;) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));

    px = px.times(x2);
    r = t.plus(px.div(n += 2));

    if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
  }

  if (k) r = r.times(2 << (k - 1));

  external = true;

  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};


/*
 * Return true if the value of this Decimal is a finite number, otherwise return false.
 *
 */
P.isFinite = function () {
  return !!this.d;
};


/*
 * Return true if the value of this Decimal is an integer, otherwise return false.
 *
 */
P.isInteger = P.isInt = function () {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};


/*
 * Return true if the value of this Decimal is NaN, otherwise return false.
 *
 */
P.isNaN = function () {
  return !this.s;
};


/*
 * Return true if the value of this Decimal is negative, otherwise return false.
 *
 */
P.isNegative = P.isNeg = function () {
  return this.s < 0;
};


/*
 * Return true if the value of this Decimal is positive, otherwise return false.
 *
 */
P.isPositive = P.isPos = function () {
  return this.s > 0;
};


/*
 * Return true if the value of this Decimal is 0 or -0, otherwise return false.
 *
 */
P.isZero = function () {
  return !!this.d && this.d[0] === 0;
};


/*
 * Return true if the value of this Decimal is less than `y`, otherwise return false.
 *
 */
P.lessThan = P.lt = function (y) {
  return this.cmp(y) < 0;
};


/*
 * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
 *
 */
P.lessThanOrEqualTo = P.lte = function (y) {
  return this.cmp(y) < 1;
};


/*
 * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * If no base is specified, return log[10](arg).
 *
 * log[base](arg) = ln(arg) / ln(base)
 *
 * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
 * otherwise:
 *
 * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
 * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
 * between the result and the correctly rounded result will be one ulp (unit in the last place).
 *
 * log[-b](a)       = NaN
 * log[0](a)        = NaN
 * log[1](a)        = NaN
 * log[NaN](a)      = NaN
 * log[Infinity](a) = NaN
 * log[b](0)        = -Infinity
 * log[b](-0)       = -Infinity
 * log[b](-a)       = NaN
 * log[b](1)        = 0
 * log[b](Infinity) = Infinity
 * log[b](NaN)      = NaN
 *
 * [base] {number|string|Decimal} The base of the logarithm.
 *
 */
P.logarithm = P.log = function (base) {
  var isBase10, d, denominator, k, inf, num, sd, r,
    arg = this,
    Ctor = arg.constructor,
    pr = Ctor.precision,
    rm = Ctor.rounding,
    guard = 5;

  // Default base is 10.
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;

    // Return NaN if base is negative, or non-finite, or is 0 or 1.
    if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

    isBase10 = base.eq(10);
  }

  d = arg.d;

  // Is arg negative, non-finite, 0 or 1?
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }

  // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
  // integer power of 10.
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0;) k /= 10;
      inf = k !== 1;
    }
  }

  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

  // The result will have 5 rounding digits.
  r = divide(num, denominator, sd, 1);

  // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
  // calculate 10 further digits.
  //
  // If the result is known to have an infinite decimal expansion, repeat this until it is clear
  // that the result is above or below the boundary. Otherwise, if after calculating the 10
  // further digits, the last 14 are nines, round up and assume the result is exact.
  // Also assume the result is exact if the last 14 are zero.
  //
  // Example of a result that will be incorrectly rounded:
  // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
  // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
  // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
  // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
  // place is still 2.6.
  if (checkRoundingDigits(r.d, k = pr, rm)) {

    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);

      if (!inf) {

        // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }

        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }

  external = true;

  return finalise(r, pr, rm);
};


/*
 * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
 *
 * arguments {number|string|Decimal}
 *
P.max = function () {
  Array.prototype.push.call(arguments, this);
  return maxOrMin(this.constructor, arguments, 'lt');
};
 */


/*
 * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
 *
 * arguments {number|string|Decimal}
 *
P.min = function () {
  Array.prototype.push.call(arguments, this);
  return maxOrMin(this.constructor, arguments, 'gt');
};
 */


/*
 *  n - 0 = n
 *  n - N = N
 *  n - I = -I
 *  0 - n = -n
 *  0 - 0 = 0
 *  0 - N = N
 *  0 - I = -I
 *  N - n = N
 *  N - 0 = N
 *  N - N = N
 *  N - I = N
 *  I - n = I
 *  I - 0 = I
 *  I - N = N
 *  I - I = N
 *
 * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P.minus = P.sub = function (y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // If either is not finite...
  if (!x.d || !y.d) {

    // Return NaN if either is NaN.
    if (!x.s || !y.s) y = new Ctor(NaN);

    // Return y negated if x is finite and y is ±Infinity.
    else if (x.d) y.s = -y.s;

    // Return x if y is finite and x is ±Infinity.
    // Return x if both are ±Infinity with different signs.
    // Return NaN if both are ±Infinity with the same sign.
    else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

    return y;
  }

  // If signs differ...
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }

  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;

  // If either is zero...
  if (!xd[0] || !yd[0]) {

    // Return y negated if x is zero and y is non-zero.
    if (yd[0]) y.s = -y.s;

    // Return x if y is zero and x is non-zero.
    else if (xd[0]) y = new Ctor(x);

    // Return zero if both are zero.
    // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
    else return new Ctor(rm === 3 ? -0 : 0);

    return external ? finalise(y, pr, rm) : y;
  }

  // x and y are finite, non-zero numbers with the same sign.

  // Calculate base 1e7 exponents.
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);

  xd = xd.slice();
  k = xe - e;

  // If base 1e7 exponents differ...
  if (k) {
    xLTy = k < 0;

    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }

    // Numbers with massively different exponents would result in a very high number of
    // zeros needing to be prepended, but this can be avoided while still ensuring correct
    // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

    if (k > i) {
      k = i;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents.
    d.reverse();
    for (i = k; i--;) d.push(0);
    d.reverse();

  // Base 1e7 exponents equal.
  } else {

    // Check digits to determine which is the bigger number.

    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;

    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }

    k = 0;
  }

  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }

  len = xd.length;

  // Append zeros to `xd` if shorter.
  // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

  // Subtract yd from xd.
  for (i = yd.length; i > k;) {

    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }

    xd[i] -= yd[i];
  }

  // Remove trailing zeros.
  for (; xd[--len] === 0;) xd.pop();

  // Remove leading zeros and adjust exponent accordingly.
  for (; xd[0] === 0; xd.shift()) --e;

  // Zero?
  if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

  y.d = xd;
  y.e = getBase10Exponent(xd, e);

  return external ? finalise(y, pr, rm) : y;
};


/*
 *   n % 0 =  N
 *   n % N =  N
 *   n % I =  n
 *   0 % n =  0
 *  -0 % n = -0
 *   0 % 0 =  N
 *   0 % N =  N
 *   0 % I =  0
 *   N % n =  N
 *   N % 0 =  N
 *   N % N =  N
 *   N % I =  N
 *   I % n =  N
 *   I % 0 =  N
 *   I % N =  N
 *   I % I =  N
 *
 * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * The result depends on the modulo mode.
 *
 */
P.modulo = P.mod = function (y) {
  var q,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
  if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

  // Return x if y is ±Infinity or x is ±0.
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }

  // Prevent rounding of intermediate calculations.
  external = false;

  if (Ctor.modulo == 9) {

    // Euclidian division: q = sign(y) * floor(x / abs(y))
    // result = x - q * y    where  0 <= result < abs(y)
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }

  q = q.times(y);

  external = true;

  return x.minus(q);
};


/*
 * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
 * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P.naturalExponential = P.exp = function () {
  return naturalExponential(this);
};


/*
 * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
 * rounded to `precision` significant digits using rounding mode `rounding`.
 *
 */
P.naturalLogarithm = P.ln = function () {
  return naturalLogarithm(this);
};


/*
 * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
 * -1.
 *
 */
P.negated = P.neg = function () {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};


/*
 *  n + 0 = n
 *  n + N = N
 *  n + I = I
 *  0 + n = n
 *  0 + 0 = 0
 *  0 + N = N
 *  0 + I = I
 *  N + n = N
 *  N + 0 = N
 *  N + N = N
 *  N + I = N
 *  I + n = I
 *  I + 0 = I
 *  I + N = N
 *  I + I = I
 *
 * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P.plus = P.add = function (y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // If either is not finite...
  if (!x.d || !y.d) {

    // Return NaN if either is NaN.
    if (!x.s || !y.s) y = new Ctor(NaN);

    // Return x if y is finite and x is ±Infinity.
    // Return x if both are ±Infinity with the same sign.
    // Return NaN if both are ±Infinity with different signs.
    // Return y if x is finite and y is ±Infinity.
    else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

    return y;
  }

   // If signs differ...
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }

  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;

  // If either is zero...
  if (!xd[0] || !yd[0]) {

    // Return x if y is zero.
    // Return y if y is non-zero.
    if (!yd[0]) y = new Ctor(x);

    return external ? finalise(y, pr, rm) : y;
  }

  // x and y are finite, non-zero numbers with the same sign.

  // Calculate base 1e7 exponents.
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);

  xd = xd.slice();
  i = k - e;

  // If base 1e7 exponents differ...
  if (i) {

    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }

    // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;

    if (i > len) {
      i = len;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
    d.reverse();
    for (; i--;) d.push(0);
    d.reverse();
  }

  len = xd.length;
  i = yd.length;

  // If yd is longer than xd, swap xd and yd so xd points to the longer array.
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }

  // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
  for (carry = 0; i;) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }

  if (carry) {
    xd.unshift(carry);
    ++e;
  }

  // Remove trailing zeros.
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  for (len = xd.length; xd[--len] == 0;) xd.pop();

  y.d = xd;
  y.e = getBase10Exponent(xd, e);

  return external ? finalise(y, pr, rm) : y;
};


/*
 * Return the number of significant digits of the value of this Decimal.
 *
 * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
 *
 */
P.precision = P.sd = function (z) {
  var k,
    x = this;

  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k) k = x.e + 1;
  } else {
    k = NaN;
  }

  return k;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
 * rounding mode `rounding`.
 *
 */
P.round = function () {
  var x = this,
    Ctor = x.constructor;

  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};


/*
 * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * sin(x) = x - x^3/3! + x^5/5! - ...
 *
 * sin(0)         = 0
 * sin(-0)        = -0
 * sin(Infinity)  = NaN
 * sin(-Infinity) = NaN
 * sin(NaN)       = NaN
 *
 */
P.sine = P.sin = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;

  x = sine(Ctor, toLessThanHalfPi(Ctor, x));

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};


/*
 * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 *  sqrt(-n) =  N
 *  sqrt(N)  =  N
 *  sqrt(-I) =  N
 *  sqrt(I)  =  I
 *  sqrt(0)  =  0
 *  sqrt(-0) = -0
 *
 */
P.squareRoot = P.sqrt = function () {
  var m, n, sd, r, rep, t,
    x = this,
    d = x.d,
    e = x.e,
    s = x.s,
    Ctor = x.constructor;

  // Negative/NaN/Infinity/zero?
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }

  external = false;

  // Initial estimate.
  s = Math.sqrt(+x);

  // Math.sqrt underflow/overflow?
  // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);

    if ((n.length + e) % 2 == 0) n += '0';
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

    if (s == 1 / 0) {
      n = '1e' + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf('e') + 1) + e;
    }

    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }

  sd = (e = Ctor.precision) + 3;

  // Newton-Raphson iteration.
  for (;;) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

    // TODO? Replace with for-loop and checkRoundingDigits.
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);

      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
      // 4999, i.e. approaching a rounding boundary, continue the iteration.
      if (n == '9999' || !rep && n == '4999') {

        // On the first iteration only, check to see if rounding up gives the exact result as the
        // nines may infinitely repeat.
        if (!rep) {
          finalise(t, e + 1, 0);

          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }

        sd += 4;
        rep = 1;
      } else {

        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
        // If not, then there are further digits and m will be truthy.
        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

          // Truncate to the first rounding digit.
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }

        break;
      }
    }
  }

  external = true;

  return finalise(r, e, Ctor.rounding, m);
};


/*
 * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * tan(0)         = 0
 * tan(-0)        = -0
 * tan(Infinity)  = NaN
 * tan(-Infinity) = NaN
 * tan(NaN)       = NaN
 *
 */
P.tangent = P.tan = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;

  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};


/*
 *  n * 0 = 0
 *  n * N = N
 *  n * I = I
 *  0 * n = 0
 *  0 * 0 = 0
 *  0 * N = N
 *  0 * I = N
 *  N * n = N
 *  N * 0 = N
 *  N * N = N
 *  N * I = N
 *  I * n = I
 *  I * 0 = N
 *  I * N = N
 *  I * I = I
 *
 * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 */
P.times = P.mul = function (y) {
  var carry, e, i, k, r, rL, t, xdL, ydL,
    x = this,
    Ctor = x.constructor,
    xd = x.d,
    yd = (y = new Ctor(y)).d;

  y.s *= x.s;

   // If either is NaN, ±Infinity or ±0...
  if (!xd || !xd[0] || !yd || !yd[0]) {

    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

      // Return NaN if either is NaN.
      // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
      ? NaN

      // Return ±Infinity if either is ±Infinity.
      // Return ±0 if either is ±0.
      : !xd || !yd ? y.s / 0 : y.s * 0);
  }

  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;

  // Ensure xd points to the longer array.
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }

  // Initialise the result array with zeros.
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--;) r.push(0);

  // Multiply!
  for (i = ydL; --i >= 0;) {
    carry = 0;
    for (k = xdL + i; k > i;) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }

    r[k] = (r[k] + carry) % BASE | 0;
  }

  // Remove trailing zeros.
  for (; !r[--rL];) r.pop();

  if (carry) ++e;
  else r.shift();

  y.d = r;
  y.e = getBase10Exponent(r, e);

  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};


/*
 * Return a string representing the value of this Decimal in base 2, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toBinary = function (sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
 * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
 *
 * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toDecimalPlaces = P.toDP = function (dp, rm) {
  var x = this,
    Ctor = x.constructor;

  x = new Ctor(x);
  if (dp === void 0) return x;

  checkInt32(dp, 0, MAX_DIGITS);

  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);

  return finalise(x, dp + x.e + 1, rm);
};


/*
 * Return a string representing the value of this Decimal in exponential notation rounded to
 * `dp` fixed decimal places using rounding mode `rounding`.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toExponential = function (dp, rm) {
  var str,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a string representing the value of this Decimal in normal (fixed-point) notation to
 * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
 * omitted.
 *
 * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 * (-0).toFixed(3) is '0.000'.
 * (-0.5).toFixed(0) is '-0'.
 *
 */
P.toFixed = function (dp, rm) {
  var str, y,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }

  // To determine whether to add the minus sign look at the value before it was rounded,
  // i.e. look at `x` rather than `y`.
  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return an array representing the value of this Decimal as a simple fraction with an integer
 * numerator and an integer denominator.
 *
 * The denominator will be a positive non-zero value less than or equal to the specified maximum
 * denominator. If a maximum denominator is not specified, the denominator will be the lowest
 * value necessary to represent the number exactly.
 *
 * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
 *
 */
P.toFraction = function (maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
    x = this,
    xd = x.d,
    Ctor = x.constructor;

  if (!xd) return new Ctor(x);

  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);

  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

  if (maxD == null) {

    // d is 10**e, the minimum max-denominator needed.
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
    maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
  }

  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;

  for (;;)  {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1) break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }

  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;

  // Determine which fraction is closer to x, n0/d0 or n1/d1?
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
      ? [n1, d1] : [n0, d0];

  Ctor.precision = pr;
  external = true;

  return r;
};


/*
 * Return a string representing the value of this Decimal in base 16, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toHexadecimal = P.toHex = function (sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};



/*
 * Returns a new Decimal whose value is the nearest multiple of the magnitude of `y` to the value
 * of this Decimal.
 *
 * If the value of this Decimal is equidistant from two multiples of `y`, the rounding mode `rm`,
 * or `Decimal.rounding` if `rm` is omitted, determines the direction of the nearest multiple.
 *
 * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
 * (ROUND_UP), and so on.
 *
 * The return value will always have the same sign as this Decimal, unless either this Decimal
 * or `y` is NaN, in which case the return value will be also be NaN.
 *
 * The return value is not affected by the value of `precision`.
 *
 * y {number|string|Decimal} The magnitude to round to a multiple of.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toNearest() rounding mode not an integer: {rm}'
 * 'toNearest() rounding mode out of range: {rm}'
 *
 */
P.toNearest = function (y, rm) {
  var x = this,
    Ctor = x.constructor;

  x = new Ctor(x);

  if (y == null) {

    // If x is not finite, return x.
    if (!x.d) return x;

    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm !== void 0) checkInt32(rm, 0, 8);

    // If x is not finite, return x if y is not NaN, else NaN.
    if (!x.d) return y.s ? x : y;

    // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
    if (!y.d) {
      if (y.s) y.s = x.s;
      return y;
    }
  }

  // If y is not zero, calculate the nearest multiple of y to x.
  if (y.d[0]) {
    external = false;
    if (rm < 4) rm = [4, 5, 7, 8][rm];
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);

  // If y is zero, return zero with the sign of x.
  } else {
    y.s = x.s;
    x = y;
  }

  return x;
};


/*
 * Return the value of this Decimal converted to a number primitive.
 * Zero keeps its sign.
 *
 */
P.toNumber = function () {
  return +this;
};


/*
 * Return a string representing the value of this Decimal in base 8, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toOctal = function (sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};


/*
 * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
 * to `precision` significant digits using rounding mode `rounding`.
 *
 * ECMAScript compliant.
 *
 *   pow(x, NaN)                           = NaN
 *   pow(x, ±0)                            = 1

 *   pow(NaN, non-zero)                    = NaN
 *   pow(abs(x) > 1, +Infinity)            = +Infinity
 *   pow(abs(x) > 1, -Infinity)            = +0
 *   pow(abs(x) == 1, ±Infinity)           = NaN
 *   pow(abs(x) < 1, +Infinity)            = +0
 *   pow(abs(x) < 1, -Infinity)            = +Infinity
 *   pow(+Infinity, y > 0)                 = +Infinity
 *   pow(+Infinity, y < 0)                 = +0
 *   pow(-Infinity, odd integer > 0)       = -Infinity
 *   pow(-Infinity, even integer > 0)      = +Infinity
 *   pow(-Infinity, odd integer < 0)       = -0
 *   pow(-Infinity, even integer < 0)      = +0
 *   pow(+0, y > 0)                        = +0
 *   pow(+0, y < 0)                        = +Infinity
 *   pow(-0, odd integer > 0)              = -0
 *   pow(-0, even integer > 0)             = +0
 *   pow(-0, odd integer < 0)              = -Infinity
 *   pow(-0, even integer < 0)             = +Infinity
 *   pow(finite x < 0, finite non-integer) = NaN
 *
 * For non-integer or very large exponents pow(x, y) is calculated using
 *
 *   x^y = exp(y*ln(x))
 *
 * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
 * probability of an incorrectly rounded result
 * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
 * i.e. 1 in 250,000,000,000,000
 *
 * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
 *
 * y {number|string|Decimal} The power to which to raise this Decimal.
 *
 */
P.toPower = P.pow = function (y) {
  var e, k, pr, r, rm, s,
    x = this,
    Ctor = x.constructor,
    yn = +(y = new Ctor(y));

  // Either ±Infinity, NaN or ±0?
  if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

  x = new Ctor(x);

  if (x.eq(1)) return x;

  pr = Ctor.precision;
  rm = Ctor.rounding;

  if (y.eq(1)) return finalise(x, pr, rm);

  // y exponent
  e = mathfloor(y.e / LOG_BASE);

  // If y is a small integer use the 'exponentiation by squaring' algorithm.
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }

  s = x.s;

  // if x is negative
  if (s < 0) {

    // if y is not an integer
    if (e < y.d.length - 1) return new Ctor(NaN);

    // Result is positive if x is negative and the last digit of integer y is even.
    if ((y.d[e] & 1) == 0) s = 1;

    // if x.eq(-1)
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }

  // Estimate result exponent.
  // x^y = 10^e,  where e = y * log10(x)
  // log10(x) = log10(x_significand) + x_exponent
  // log10(x_significand) = ln(x_significand) / ln(10)
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k)
    ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
    : new Ctor(k + '').e;

  // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

  // Overflow/underflow?
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

  external = false;
  Ctor.rounding = x.s = 1;

  // Estimate the extra guard digits needed to ensure five correct rounding digits from
  // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
  // new Decimal(2.32456).pow('2087987436534566.46411')
  // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
  k = Math.min(12, (e + '').length);

  // r = x^y = exp(y*ln(x))
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

  // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
  if (r.d) {

    // Truncate to the required precision plus five rounding digits.
    r = finalise(r, pr + 5, 1);

    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
    // the result.
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;

      // Truncate to the increased precision plus five rounding digits.
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }

  r.s = s;
  external = true;
  Ctor.rounding = rm;

  return finalise(r, pr, rm);
};


/*
 * Return a string representing the value of this Decimal rounded to `sd` significant digits
 * using rounding mode `rounding`.
 *
 * Return exponential notation if `sd` is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toPrecision = function (sd, rm) {
  var str,
    x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
 * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
 * omitted.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toSD() digits out of range: {sd}'
 * 'toSD() digits not an integer: {sd}'
 * 'toSD() rounding mode not an integer: {rm}'
 * 'toSD() rounding mode out of range: {rm}'
 *
 */
P.toSignificantDigits = P.toSD = function (sd, rm) {
  var x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }

  return finalise(new Ctor(x), sd, rm);
};


/*
 * Return a string representing the value of this Decimal.
 *
 * Return exponential notation if this Decimal has a positive exponent equal to or greater than
 * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
 *
 */
P.toString = function () {
  var x = this,
    Ctor = x.constructor,
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
 *
 */
P.truncated = P.trunc = function () {
  return finalise(new this.constructor(this), this.e + 1, 1);
};


/*
 * Return a string representing the value of this Decimal.
 * Unlike `toString`, negative zero will include the minus sign.
 *
 */
P.valueOf = P.toJSON = function () {
  var x = this,
    Ctor = x.constructor,
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

  return x.isNeg() ? '-' + str : str;
};


/*
// Add aliases to match BigDecimal method names.
// P.add = P.plus;
P.subtract = P.minus;
P.multiply = P.times;
P.divide = P.div;
P.remainder = P.mod;
P.compareTo = P.cmp;
P.negate = P.neg;
 */


// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


/*
 *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
 *                           finiteToString, naturalExponential, naturalLogarithm
 *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
 *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
 *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
 *  convertBase              toStringBinary, parseOther
 *  cos                      P.cos
 *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
 *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
 *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
 *                           taylorSeries, atan2, parseOther
 *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
 *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
 *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
 *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
 *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
 *                           P.truncated, divide, getLn10, getPi, naturalExponential,
 *                           naturalLogarithm, ceil, floor, round, trunc
 *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
 *                           toStringBinary
 *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
 *  getLn10                  P.logarithm, naturalLogarithm
 *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
 *  getPrecision             P.precision, P.toFraction
 *  getZeroString            digitsToString, finiteToString
 *  intPow                   P.toPower, parseOther
 *  isOdd                    toLessThanHalfPi
 *  maxOrMin                 max, min
 *  naturalExponential       P.naturalExponential, P.toPower
 *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
 *                           P.toPower, naturalExponential
 *  nonFiniteToString        finiteToString, toStringBinary
 *  parseDecimal             Decimal
 *  parseOther               Decimal
 *  sin                      P.sin
 *  taylorSeries             P.cosh, P.sinh, cos, sin
 *  toLessThanHalfPi         P.cos, P.sin
 *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
 *  truncate                 intPow
 *
 *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
 *                           naturalLogarithm, config, parseOther, random, Decimal
 */


function digitsToString(d) {
  var i, k, ws,
    indexOfLastWord = d.length - 1,
    str = '',
    w = d[0];

  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }

    w = d[i];
    ws = w + '';
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return '0';
  }

  // Remove trailing zeros of last w.
  for (; w % 10 === 0;) w /= 10;

  return str + w;
}


function checkInt32(i, min, max) {
  if (i !== ~~i || i < min || i > max) {
    throw Error(invalidArgument + i);
  }
}


/*
 * Check 5 rounding digits if `repeating` is null, 4 otherwise.
 * `repeating == null` if caller is `log` or `pow`,
 * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
 */
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;

  // Get the length of the first word of the array d.
  for (k = d[0]; k >= 10; k /= 10) --i;

  // Is the rounding digit in the first word of d?
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }

  // i is the index (0 - 6) of the rounding digit.
  // E.g. if within the word 3487563 the first rounding digit is 5,
  // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;

  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
        (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
          (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1000 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k ||
      (!repeating && rm > 3) && rd + 1 == k / 2) &&
        (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
    }
  }

  return r;
}


// Convert string of `baseIn` to an array of numbers of `baseOut`.
// Eg. convertBase('255', 10, 16) returns [15, 15].
// Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
function convertBase(str, baseIn, baseOut) {
  var j,
    arr = [0],
    arrL,
    i = 0,
    strL = str.length;

  for (; i < strL;) {
    for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0) arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }

  return arr.reverse();
}


/*
 * cos(x) = 1 - x^2/2! + x^4/4! - ...
 * |x| < pi/2
 *
 */
function cosine(Ctor, x) {
  var k, y,
    len = x.d.length;

  // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
  // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

  // Estimate the optimum number of times to use the argument reduction.
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = Math.pow(4, -k).toString();
  } else {
    k = 16;
    y = '2.3283064365386962890625e-10';
  }

  Ctor.precision += k;

  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

  // Reverse argument reduction
  for (var i = k; i--;) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }

  Ctor.precision -= k;

  return x;
}


/*
 * Perform division in the specified base.
 */
var divide = (function () {

  // Assumes non-zero x and k, and hence non-zero result.
  function multiplyInteger(x, k, base) {
    var temp,
      carry = 0,
      i = x.length;

    for (x = x.slice(); i--;) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }

    if (carry) x.unshift(carry);

    return x;
  }

  function compare(a, b, aL, bL) {
    var i, r;

    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }

    return r;
  }

  function subtract(a, b, aL, base) {
    var i = 0;

    // Subtract b from a.
    for (; aL--;) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }

    // Remove leading zeros.
    for (; !a[0] && a.length > 1;) a.shift();
  }

  return function (x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
      yL, yz,
      Ctor = x.constructor,
      sign = x.s == y.s ? 1 : -1,
      xd = x.d,
      yd = y.d;

    // Either NaN, Infinity or 0?
    if (!xd || !xd[0] || !yd || !yd[0]) {

      return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

        // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
        xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
    }

    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }

    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign);
    qd = q.d = [];

    // Result exponent may be one less than e.
    // The digit array of a Decimal from toStringBinary may have trailing zeros.
    for (i = 0; yd[i] == (xd[i] || 0); i++);

    if (yd[i] > (xd[i] || 0)) e--;

    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }

    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {

      // Convert precision in number of base 10 digits to base 1e7 digits.
      sd = sd / logBase + 2 | 0;
      i = 0;

      // divisor < 1e7
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;

        // k is the carry.
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }

        more = k || i < xL;

      // divisor >= 1e7
      } else {

        // Normalise xd and yd so highest order digit of yd is >= base/2
        k = base / (yd[0] + 1) | 0;

        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }

        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL;) rem[remL++] = 0;

        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];

        if (yd[1] >= base / 2) ++yd0;

        do {
          k = 0;

          // Compare divisor and remainder.
          cmp = compare(yd, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, k.
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // k will be how many times the divisor goes into the current remainder.
            k = rem0 / yd0 | 0;

            //  Algorithm:
            //  1. product = divisor * trial digit (k)
            //  2. if product > remainder: product -= divisor, k--
            //  3. remainder -= product
            //  4. if product was < remainder at 2:
            //    5. compare new remainder and divisor
            //    6. If remainder > divisor: remainder -= divisor, k++

            if (k > 1) {
              if (k >= base) k = base - 1;

              // product = divisor * trial digit.
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              cmp = compare(prod, rem, prodL, remL);

              // product > remainder.
              if (cmp == 1) {
                k--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {

              // cmp is -1.
              // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
              // to avoid it. If k is 1 there is a need to compare yd and rem again below.
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }

            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);

            // If product was < previous remainder.
            if (cmp == -1) {
              remL = rem.length;

              // Compare divisor and new remainder.
              cmp = compare(yd, rem, yL, remL);

              // If divisor < new remainder, subtract divisor from remainder.
              if (cmp < 1) {
                k++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }

            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }    // if cmp === 1, k will be 0

          // Add the next digit, k, to the result array.
          qd[i++] = k;

          // Update the remainder.
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }

        } while ((xi++ < xL || rem[0] !== void 0) && sd--);

        more = rem[0] !== void 0;
      }

      // Leading zero?
      if (!qd[0]) qd.shift();
    }

    // logBase is 1 when divide is being used for base conversion.
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {

      // To calculate q.e, first get the number of digits of qd[0].
      for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
      q.e = i + e * logBase - 1;

      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }

    return q;
  };
})();


/*
 * Round `x` to `sd` significant digits using rounding mode `rm`.
 * Check for over/under-flow.
 */
 function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi,
    Ctor = x.constructor;

  // Don't round if sd is null or undefined.
  out: if (sd != null) {
    xd = x.d;

    // Infinity/NaN.
    if (!xd) return x;

    // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
    // w: the word of xd containing rd, a base 1e7 number.
    // xdi: the index of w within xd.
    // digits: the number of digits of w.
    // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
    // they had leading zeros)
    // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

    // Get the length of the first word of the digits array xd.
    for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
    i = sd - digits;

    // Is the rounding digit in the first word of xd?
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];

      // Get the rounding digit at index j of w.
      rd = w / mathpow(10, digits - j - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) {
        if (isTruncated) {

          // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
          for (; k++ <= xdi;) xd.push(0);
          w = rd = 0;
          digits = 1;
          i %= LOG_BASE;
          j = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w = k = xd[xdi];

        // Get the number of digits of w.
        for (digits = 1; k >= 10; k /= 10) digits++;

        // Get the index of rd within w.
        i %= LOG_BASE;

        // Get the index of rd within w, adjusted for leading zeros.
        // The number of leading zeros of w is given by LOG_BASE - digits.
        j = i - LOG_BASE + digits;

        // Get the rounding digit at index j of w.
        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
      }
    }

    // Are there any non-zero digits after the rounding digit?
    isTruncated = isTruncated || sd < 0 ||
      xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

    // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
    // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
    // will give 714.

    roundUp = rm < 4
      ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
      : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

        // Check whether the digit to the left of the rounding digit is odd.
        ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
          rm == (x.s < 0 ? 8 : 7));

    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {

        // Convert sd to decimal places.
        sd -= x.e + 1;

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = -sd || 0;
      } else {

        // Zero.
        xd[0] = x.e = 0;
      }

      return x;
    }

    // Remove excess digits.
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);

      // E.g. 56700 becomes 56000 if 7 is the rounding digit.
      // j > 0 means i > number of leading zeros of w.
      xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
    }

    if (roundUp) {
      for (;;) {

        // Is the digit to be rounded up in the first word of xd?
        if (xdi == 0) {

          // i will be the length of xd[0] before k is added.
          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
          j = xd[0] += k;
          for (k = 1; j >= 10; j /= 10) k++;

          // if i != k the length has increased.
          if (i != k) {
            x.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }

          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }

    // Remove trailing zeros.
    for (i = xd.length; xd[--i] === 0;) xd.pop();
  }

  if (external) {

    // Overflow?
    if (x.e > Ctor.maxE) {

      // Infinity.
      x.d = null;
      x.e = NaN;

    // Underflow?
    } else if (x.e < Ctor.minE) {

      // Zero.
      x.e = 0;
      x.d = [0];
      // Ctor.underflow = true;
    } // else Ctor.underflow = false;
  }

  return x;
}


function finiteToString(x, isExp, sd) {
  if (!x.isFinite()) return nonFiniteToString(x);
  var k,
    e = x.e,
    str = digitsToString(x.d),
    len = str.length;

  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + '.' + str.slice(1);
    }

    str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
  } else if (e < 0) {
    str = '0.' + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += '.';
      str += getZeroString(k);
    }
  }

  return str;
}


// Calculate the base 10 exponent from the base 1e7 exponent.
function getBase10Exponent(digits, e) {
  var w = digits[0];

  // Add the number of digits of the first word of the digits array.
  for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
  return e;
}


function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {

    // Reset global state in case the exception is caught.
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}


function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}


function getPrecision(digits) {
  var w = digits.length - 1,
    len = w * LOG_BASE + 1;

  w = digits[w];

  // If non-zero...
  if (w) {

    // Subtract the number of trailing zeros of the last word.
    for (; w % 10 == 0; w /= 10) len--;

    // Add the number of digits of the first word.
    for (w = digits[0]; w >= 10; w /= 10) len++;
  }

  return len;
}


function getZeroString(k) {
  var zs = '';
  for (; k--;) zs += '0';
  return zs;
}


/*
 * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
 * integer of type number.
 *
 * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
 *
 */
function intPow(Ctor, x, n, pr) {
  var isTruncated,
    r = new Ctor(1),

    // Max n of 9007199254740991 takes 53 loop iterations.
    // Maximum digits array length; leaves [28, 34] guard digits.
    k = Math.ceil(pr / LOG_BASE + 4);

  external = false;

  for (;;) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k)) isTruncated = true;
    }

    n = mathfloor(n / 2);
    if (n === 0) {

      // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }

    x = x.times(x);
    truncate(x.d, k);
  }

  external = true;

  return r;
}


function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}


/*
 * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
 */
function maxOrMin(Ctor, args, ltgt) {
  var y,
    x = new Ctor(args[0]),
    i = 0;

  for (; ++i < args.length;) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }

  return x;
}


/*
 * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
 * digits.
 *
 * Taylor/Maclaurin series.
 *
 * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
 *
 * Argument reduction:
 *   Repeat x = x / 32, k += 5, until |x| < 0.1
 *   exp(x) = exp(x / 2^k)^(2^k)
 *
 * Previously, the argument was initially reduced by
 * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
 * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
 * found to be slower than just dividing repeatedly by 32 as above.
 *
 * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
 * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
 * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
 *
 *  exp(Infinity)  = Infinity
 *  exp(-Infinity) = 0
 *  exp(NaN)       = NaN
 *  exp(±0)        = 1
 *
 *  exp(x) is non-terminating for any finite, non-zero x.
 *
 *  The result will always be correctly rounded.
 *
 */
function naturalExponential(x, sd) {
  var denominator, guard, j, pow, sum, t, wpr,
    rep = 0,
    i = 0,
    k = 0,
    Ctor = x.constructor,
    rm = Ctor.rounding,
    pr = Ctor.precision;

  // 0/NaN/Infinity?
  if (!x.d || !x.d[0] || x.e > 17) {

    return new Ctor(x.d
      ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
      : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }

  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }

  t = new Ctor(0.03125);

  // while abs(x) >= 0.1
  while (x.e > -2) {

    // x = x / 2^5
    x = x.times(t);
    k += 5;
  }

  // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
  // necessary to ensure the first 4 rounding digits are correct.
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow = sum = new Ctor(1);
  Ctor.precision = wpr;

  for (;;) {
    pow = finalise(pow.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum.plus(divide(pow, denominator, wpr, 1));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      j = k;
      while (j--) sum = finalise(sum.times(sum), wpr, 1);

      // Check to see if the first 4 rounding digits are [49]999.
      // If so, repeat the summation with a higher precision, otherwise
      // e.g. with precision: 18, rounding: 1
      // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
      // `wpr - guard` is the index of first rounding digit.
      if (sd == null) {

        if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum;
      }
    }

    sum = t;
  }
}


/*
 * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
 * digits.
 *
 *  ln(-n)        = NaN
 *  ln(0)         = -Infinity
 *  ln(-0)        = -Infinity
 *  ln(1)         = 0
 *  ln(Infinity)  = Infinity
 *  ln(-Infinity) = NaN
 *  ln(NaN)       = NaN
 *
 *  ln(n) (n != 1) is non-terminating.
 *
 */
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
    n = 1,
    guard = 10,
    x = y,
    xd = x.d,
    Ctor = x.constructor,
    rm = Ctor.rounding,
    pr = Ctor.precision;

  // Is x negative or Infinity, NaN, 0 or 1?
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }

  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }

  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);

  if (Math.abs(e = x.e) < 1.5e15) {

    // Argument reduction.
    // The series converges faster the closer the argument is to 1, so using
    // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
    // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
    // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
    // later be divided by this number, then separate out the power of 10 using
    // ln(a*10^b) = ln(a) + b*ln(10).

    // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
    //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
    // max n is 6 (gives 0.7 - 1.3)
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }

    e = x.e;

    if (c0 > 1) {
      x = new Ctor('0.' + c);
      e++;
    } else {
      x = new Ctor(c0 + '.' + c.slice(1));
    }
  } else {

    // The argument reduction method above may result in overflow if the argument y is a massive
    // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
    // function using ln(x*10^e) = ln(x) + e*ln(10).
    t = getLn10(Ctor, wpr + 2, pr).times(e + '');
    x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;

    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }

  // x1 is x reduced to a value near 1.
  x1 = x;

  // Taylor series.
  // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
  // where x = (y - 1)/(y + 1)    (|x| < 1)
  sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;

  for (;;) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      sum = sum.times(2);

      // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
      // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
      if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
      sum = divide(sum, new Ctor(n), wpr, 1);

      // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
      // been repeated previously) and the first 4 rounding digits 9999?
      // If so, restart the summation with a higher precision, otherwise
      // e.g. with precision: 12, rounding: 1
      // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
      // `wpr - guard` is the index of first rounding digit.
      if (sd == null) {
        if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum;
      }
    }

    sum = t;
    denominator += 2;
  }
}


// ±Infinity, NaN.
function nonFiniteToString(x) {
  // Unsigned.
  return String(x.s * x.s / 0);
}


/*
 * Parse the value of a new Decimal `x` from string `str`.
 */
function parseDecimal(x, str) {
  var e, i, len;

  // Decimal point?
  if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

  // Exponential form?
  if ((i = str.search(/e/i)) > 0) {

    // Determine exponent.
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {

    // Integer.
    e = str.length;
  }

  // Determine leading zeros.
  for (i = 0; str.charCodeAt(i) === 48; i++);

  // Determine trailing zeros.
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
  str = str.slice(i, len);

  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];

    // Transform base

    // e is the base 10 exponent.
    // i is where to slice str to get the first word of the digits array.
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;

    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }

    for (; i--;) str += '0';
    x.d.push(+str);

    if (external) {

      // Overflow?
      if (x.e > x.constructor.maxE) {

        // Infinity.
        x.d = null;
        x.e = NaN;

      // Underflow?
      } else if (x.e < x.constructor.minE) {

        // Zero.
        x.e = 0;
        x.d = [0];
        // x.constructor.underflow = true;
      } // else x.constructor.underflow = false;
    }
  } else {

    // Zero.
    x.e = 0;
    x.d = [0];
  }

  return x;
}


/*
 * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
 */
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

  if (str === 'Infinity' || str === 'NaN') {
    if (!+str) x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }

  if (isHex.test(str))  {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str))  {
    base = 2;
  } else if (isOctal.test(str))  {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }

  // Is there a binary exponent part?
  i = str.search(/p/i);

  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }

  // Convert `str` as an integer then divide the result by `base` raised to a power such that the
  // fraction part will be restored.
  i = str.indexOf('.');
  isFloat = i >= 0;
  Ctor = x.constructor;

  if (isFloat) {
    str = str.replace('.', '');
    len = str.length;
    i = len - i;

    // log[10](16) = 1.2041... , log[10](88) = 1.9444....
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }

  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;

  // Remove trailing zeros.
  for (i = xe; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;

  // At what precision to perform the division to ensure exact conversion?
  // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
  // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
  // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
  // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
  // Therefore using 4 * the number of digits of str will always be enough.
  if (isFloat) x = divide(x, divisor, len * 4);

  // Multiply by the binary exponent part if present.
  if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
  external = true;

  return x;
}


/*
 * sin(x) = x - x^3/3! + x^5/5! - ...
 * |x| < pi/2
 *
 */
function sine(Ctor, x) {
  var k,
    len = x.d.length;

  if (len < 3) return taylorSeries(Ctor, 2, x, x);

  // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
  // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
  // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

  // Estimate the optimum number of times to use the argument reduction.
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;

  // Max k before Math.pow precision loss is 22
  x = x.times(Math.pow(5, -k));
  x = taylorSeries(Ctor, 2, x, x);

  // Reverse argument reduction
  var sin2_x,
    d5 = new Ctor(5),
    d16 = new Ctor(16),
    d20 = new Ctor(20);
  for (; k--;) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }

  return x;
}


// Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2,
    i = 1,
    pr = Ctor.precision,
    k = Math.ceil(pr / LOG_BASE);

  external = false;
  x2 = x.times(x);
  u = new Ctor(y);

  for (;;) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);

    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--;);
      if (j == -1) break;
    }

    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }

  external = true;
  t.d.length = k + 1;

  return t;
}


// Return the absolute value of `x` reduced to less than or equal to half pi.
function toLessThanHalfPi(Ctor, x) {
  var t,
    isNeg = x.s < 0,
    pi = getPi(Ctor, Ctor.precision, 1),
    halfPi = pi.times(0.5);

  x = x.abs();

  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }

  t = x.divToInt(pi);

  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));

    // 0 <= x < pi
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
      return x;
    }

    quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
  }

  return x.minus(pi).abs();
}


/*
 * Return the value of Decimal `x` as a string in base `baseOut`.
 *
 * If the optional `sd` argument is present include a binary exponent suffix.
 */
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y,
    Ctor = x.constructor,
    isExp = sd !== void 0;

  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }

  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf('.');

    // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
    // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
    // minBinaryExponent = floor(decimalExponent * log[2](10))
    // log[2](10) = 3.321928094887362347870319429489390175864

    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }

    // Convert the number as an integer then divide the result by its base raised to a power such
    // that the fraction part will be restored.

    // Non-integer.
    if (i >= 0) {
      str = str.replace('.', '');
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }

    xd = convertBase(str, 10, base);
    e = len = xd.length;

    // Remove trailing zeros.
    for (; xd[--len] == 0;) xd.pop();

    if (!xd[0]) {
      str = isExp ? '0p+0' : '0';
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }

      // The rounding digit, i.e. the digit after the digit that may be rounded up.
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;

      roundUp = rm < 4
        ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
        : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
          rm === (x.s < 0 ? 8 : 7));

      xd.length = sd;

      if (roundUp) {

        // Rounding up may mean the previous digit has to be rounded up and so on.
        for (; ++xd[--sd] > base - 1;) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }

      // Determine trailing zeros.
      for (len = xd.length; !xd[len - 1]; --len);

      // E.g. [4, 11, 15] becomes 4bf.
      for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

      // Add binary exponent suffix?
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += '0';
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len);

            // xd[0] will always be be 1
            for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + '.' + str.slice(1);
          }
        }

        str =  str + (e < 0 ? 'p' : 'p+') + e;
      } else if (e < 0) {
        for (; ++e;) str = '0' + str;
        str = '0.' + str;
      } else {
        if (++e > len) for (e -= len; e-- ;) str += '0';
        else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
  }

  return x.s < 0 ? '-' + str : str;
}


// Does not strip trailing zeros.
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}


// Decimal methods


/*
 *  abs
 *  acos
 *  acosh
 *  add
 *  asin
 *  asinh
 *  atan
 *  atanh
 *  atan2
 *  cbrt
 *  ceil
 *  clone
 *  config
 *  cos
 *  cosh
 *  div
 *  exp
 *  floor
 *  hypot
 *  ln
 *  log
 *  log2
 *  log10
 *  max
 *  min
 *  mod
 *  mul
 *  pow
 *  random
 *  round
 *  set
 *  sign
 *  sin
 *  sinh
 *  sqrt
 *  sub
 *  tan
 *  tanh
 *  trunc
 */


/*
 * Return a new Decimal whose value is the absolute value of `x`.
 *
 * x {number|string|Decimal}
 *
 */
function abs(x) {
  return new this(x).abs();
}


/*
 * Return a new Decimal whose value is the arccosine in radians of `x`.
 *
 * x {number|string|Decimal}
 *
 */
function acos(x) {
  return new this(x).acos();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function acosh(x) {
  return new this(x).acosh();
}


/*
 * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 * y {number|string|Decimal}
 *
 */
function add(x, y) {
  return new this(x).plus(y);
}


/*
 * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function asin(x) {
  return new this(x).asin();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function asinh(x) {
  return new this(x).asinh();
}


/*
 * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function atan(x) {
  return new this(x).atan();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function atanh(x) {
  return new this(x).atanh();
}


/*
 * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
 * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi, pi]
 *
 * y {number|string|Decimal} The y-coordinate.
 * x {number|string|Decimal} The x-coordinate.
 *
 * atan2(±0, -0)               = ±pi
 * atan2(±0, +0)               = ±0
 * atan2(±0, -x)               = ±pi for x > 0
 * atan2(±0, x)                = ±0 for x > 0
 * atan2(-y, ±0)               = -pi/2 for y > 0
 * atan2(y, ±0)                = pi/2 for y > 0
 * atan2(±y, -Infinity)        = ±pi for finite y > 0
 * atan2(±y, +Infinity)        = ±0 for finite y > 0
 * atan2(±Infinity, x)         = ±pi/2 for finite x
 * atan2(±Infinity, -Infinity) = ±3*pi/4
 * atan2(±Infinity, +Infinity) = ±pi/4
 * atan2(NaN, x) = NaN
 * atan2(y, NaN) = NaN
 *
 */
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r,
    pr = this.precision,
    rm = this.rounding,
    wpr = pr + 4;

  // Either NaN
  if (!y.s || !x.s) {
    r = new this(NaN);

  // Both ±Infinity
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;

  // x is ±Infinity or y is ±0
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;

  // y is ±Infinity or x is ±0
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;

  // Both non-zero and finite
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }

  return r;
}


/*
 * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function cbrt(x) {
  return new this(x).cbrt();
}


/*
 * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
 *
 * x {number|string|Decimal}
 *
 */
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}


/*
 * Configure global settings for a Decimal constructor.
 *
 * `obj` is an object with one or more of the following properties,
 *
 *   precision  {number}
 *   rounding   {number}
 *   toExpNeg   {number}
 *   toExpPos   {number}
 *   maxE       {number}
 *   minE       {number}
 *   modulo     {number}
 *   crypto     {boolean|number}
 *
 * E.g. Decimal.config({ precision: 20, rounding: 4 })
 *
 */
function config(obj) {
  if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
  var i, p, v,
    ps = [
      'precision', 1, MAX_DIGITS,
      'rounding', 0, 8,
      'toExpNeg', -EXP_LIMIT, 0,
      'toExpPos', 0, EXP_LIMIT,
      'maxE', 0, EXP_LIMIT,
      'minE', -EXP_LIMIT, 0,
      'modulo', 0, 9
    ];

  for (i = 0; i < ps.length; i += 3) {
    if ((v = obj[p = ps[i]]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ': ' + v);
    }
  }

  if ((v = obj[p = 'crypto']) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != 'undefined' && crypto &&
          (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ': ' + v);
    }
  }

  return this;
}


/*
 * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function cos(x) {
  return new this(x).cos();
}


/*
 * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function cosh(x) {
  return new this(x).cosh();
}


/*
 * Create and return a Decimal constructor with the same configuration properties as this Decimal
 * constructor.
 *
 */
function clone(obj) {
  var i, p, ps;

  /*
   * The Decimal constructor and exported function.
   * Return a new Decimal instance.
   *
   * v {number|string|Decimal} A numeric value.
   *
   */
  function Decimal(v) {
    var e, i, t,
      x = this;

    // Decimal called without new.
    if (!(x instanceof Decimal)) return new Decimal(v);

    // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
    // which points to Object.
    x.constructor = Decimal;

    // Duplicate.
    if (v instanceof Decimal) {
      x.s = v.s;
      x.e = v.e;
      x.d = (v = v.d) ? v.slice() : v;
      return;
    }

    t = typeof v;

    if (t === 'number') {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }

      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }

      // Fast path for small integers.
      if (v === ~~v && v < 1e7) {
        for (e = 0, i = v; i >= 10; i /= 10) e++;
        x.e = e;
        x.d = [v];
        return;

      // Infinity, NaN.
      } else if (v * 0 !== 0) {
        if (!v) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }

      return parseDecimal(x, v.toString());

    } else if (t !== 'string') {
      throw Error(invalidArgument + v);
    }

    // Minus sign?
    if (v.charCodeAt(0) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      x.s = 1;
    }

    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }

  Decimal.prototype = P;

  Decimal.ROUND_UP = 0;
  Decimal.ROUND_DOWN = 1;
  Decimal.ROUND_CEIL = 2;
  Decimal.ROUND_FLOOR = 3;
  Decimal.ROUND_HALF_UP = 4;
  Decimal.ROUND_HALF_DOWN = 5;
  Decimal.ROUND_HALF_EVEN = 6;
  Decimal.ROUND_HALF_CEIL = 7;
  Decimal.ROUND_HALF_FLOOR = 8;
  Decimal.EUCLID = 9;

  Decimal.config = Decimal.set = config;
  Decimal.clone = clone;

  Decimal.abs = abs;
  Decimal.acos = acos;
  Decimal.acosh = acosh;        // ES6
  Decimal.add = add;
  Decimal.asin = asin;
  Decimal.asinh = asinh;        // ES6
  Decimal.atan = atan;
  Decimal.atanh = atanh;        // ES6
  Decimal.atan2 = atan2;
  Decimal.cbrt = cbrt;          // ES6
  Decimal.ceil = ceil;
  Decimal.cos = cos;
  Decimal.cosh = cosh;          // ES6
  Decimal.div = div;
  Decimal.exp = exp;
  Decimal.floor = floor;
  Decimal.hypot = hypot;        // ES6
  Decimal.ln = ln;
  Decimal.log = log;
  Decimal.log10 = log10;        // ES6
  Decimal.log2 = log2;          // ES6
  Decimal.max = max;
  Decimal.min = min;
  Decimal.mod = mod;
  Decimal.mul = mul;
  Decimal.pow = pow;
  Decimal.random = random;
  Decimal.round = round;
  Decimal.sign = sign;          // ES6
  Decimal.sin = sin;
  Decimal.sinh = sinh;          // ES6
  Decimal.sqrt = sqrt;
  Decimal.sub = sub;
  Decimal.tan = tan;
  Decimal.tanh = tanh;          // ES6
  Decimal.trunc = trunc;        // ES6

  if (obj === void 0) obj = {};
  if (obj) {
    ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
    for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
  }

  Decimal.config(obj);

  return Decimal;
}


/*
 * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 * y {number|string|Decimal}
 *
 */
function div(x, y) {
  return new this(x).div(y);
}


/*
 * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} The power to which to raise the base of the natural log.
 *
 */
function exp(x) {
  return new this(x).exp();
}


/*
 * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
 *
 * x {number|string|Decimal}
 *
 */
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}


/*
 * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
 * rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
 *
 */
function hypot() {
  var i, n,
    t = new this(0);

  external = false;

  for (i = 0; i < arguments.length;) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }

  external = true;

  return t.sqrt();
}


/*
 * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function ln(x) {
  return new this(x).ln();
}


/*
 * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
 * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * log[y](x)
 *
 * x {number|string|Decimal} The argument of the logarithm.
 * y {number|string|Decimal} The base of the logarithm.
 *
 */
function log(x, y) {
  return new this(x).log(y);
}


/*
 * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function log2(x) {
  return new this(x).log(2);
}


/*
 * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function log10(x) {
  return new this(x).log(10);
}


/*
 * Return a new Decimal whose value is the maximum of the arguments.
 *
 * arguments {number|string|Decimal}
 *
 */
function max() {
  return maxOrMin(this, arguments, 'lt');
}


/*
 * Return a new Decimal whose value is the minimum of the arguments.
 *
 * arguments {number|string|Decimal}
 *
 */
function min() {
  return maxOrMin(this, arguments, 'gt');
}


/*
 * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 * y {number|string|Decimal}
 *
 */
function mod(x, y) {
  return new this(x).mod(y);
}


/*
 * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 * y {number|string|Decimal}
 *
 */
function mul(x, y) {
  return new this(x).mul(y);
}


/*
 * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} The base.
 * y {number|string|Decimal} The exponent.
 *
 */
function pow(x, y) {
  return new this(x).pow(y);
}


/*
 * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
 * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
 * are produced).
 *
 * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
 *
 */
function random(sd) {
  var d, e, k, n,
    i = 0,
    r = new this(1),
    rd = [];

  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);

  k = Math.ceil(sd / LOG_BASE);

  if (!this.crypto) {
    for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

  // Browsers supporting crypto.getRandomValues.
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));

    for (; i < k;) {
      n = d[i];

      // 0 <= n < 4294967296
      // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
      if (n >= 4.29e9) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {

        // 0 <= n <= 4289999999
        // 0 <= (n % 1e7) <= 9999999
        rd[i++] = n % 1e7;
      }
    }

  // Node.js supporting crypto.randomBytes.
  } else if (crypto.randomBytes) {

    // buffer
    d = crypto.randomBytes(k *= 4);

    for (; i < k;) {

      // 0 <= n < 2147483648
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

      // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
      if (n >= 2.14e9) {
        crypto.randomBytes(4).copy(d, i);
      } else {

        // 0 <= n <= 2139999999
        // 0 <= (n % 1e7) <= 9999999
        rd.push(n % 1e7);
        i += 4;
      }
    }

    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }

  k = rd[--i];
  sd %= LOG_BASE;

  // Convert trailing digits to zeros according to sd.
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }

  // Remove trailing words which are zero.
  for (; rd[i] === 0; i--) rd.pop();

  // Zero?
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;

    // Remove leading words which are zero and adjust exponent accordingly.
    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

    // Count the digits of the first word of rd to determine leading zeros.
    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

    // Adjust the exponent for leading zeros of the first word of rd.
    if (k < LOG_BASE) e -= LOG_BASE - k;
  }

  r.e = e;
  r.d = rd;

  return r;
}


/*
 * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
 *
 * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
 *
 * x {number|string|Decimal}
 *
 */
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}


/*
 * Return
 *   1    if x > 0,
 *  -1    if x < 0,
 *   0    if x is 0,
 *  -0    if x is -0,
 *   NaN  otherwise
 *
 */
function sign(x) {
  x = new this(x);
  return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
}


/*
 * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function sin(x) {
  return new this(x).sin();
}


/*
 * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function sinh(x) {
  return new this(x).sinh();
}


/*
 * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 *
 */
function sqrt(x) {
  return new this(x).sqrt();
}


/*
 * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|Decimal}
 * y {number|string|Decimal}
 *
 */
function sub(x, y) {
  return new this(x).sub(y);
}


/*
 * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function tan(x) {
  return new this(x).tan();
}


/*
 * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|Decimal} A value in radians.
 *
 */
function tanh(x) {
  return new this(x).tanh();
}


/*
 * Return a new Decimal whose value is `x` truncated to an integer.
 *
 * x {number|string|Decimal}
 *
 */
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}


// Create and configure initial Decimal constructor.
Decimal = clone(defaults);

Decimal['default'] = Decimal.Decimal = Decimal;

// Create the internal constants from their string values.
LN10 = new Decimal(ln10);
PI = new Decimal(pi);

/* harmony default export */ __webpack_exports__["default"] = (Decimal);


/***/ }),

/***/ "../node_modules/events/events.js":
/*!****************************************!*\
  !*** ../node_modules/events/events.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "../node_modules/hap-nodejs-community-types/types.js":
/*!***********************************************************!*\
  !*** ../node_modules/hap-nodejs-community-types/types.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(/*! util */ "../node_modules/util/util.js").inherits;
var Service, Characteristic;

module.exports = function(homebridge, options) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  var CommunityTypes = {};

  if (!options) options = {};


  // Characteristics

  CommunityTypes.Timestamp = function() {
    Characteristic.call(this, "Timestamp", CommunityTypes.Timestamp.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Timestamp.UUID = 'FF000001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.Timestamp, Characteristic);

  CommunityTypes.AudioDataURL = function() {
    Characteristic.call(this, "Audio URL", CommunityTypes.AudioDataURL.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
  };
  CommunityTypes.AudioDataURL.UUID = 'FF000002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioDataURL, Characteristic);

  CommunityTypes.VideoDataURL = function() {
    Characteristic.call(this, "Video URL", CommunityTypes.VideoDataURL.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
  };
  CommunityTypes.VideoDataURL.UUID = 'FF000003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.VideoDataURL, Characteristic);

  CommunityTypes.AudioVolume = function() {
    Characteristic.call(this, 'Audio Volume', CommunityTypes.AudioVolume.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit: Characteristic.Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AudioVolume.UUID = '00001001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioVolume, Characteristic);

  CommunityTypes.Muting = function() {
    Characteristic.call(this, 'Muting', CommunityTypes.Muting.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Muting.UUID = '00001002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.Muting, Characteristic);

  CommunityTypes.PlaybackState = function() {
    Characteristic.call(this, 'Playback State', CommunityTypes.PlaybackState.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.PlaybackState.UUID = '00002001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackState, Characteristic);
  CommunityTypes.PlaybackState.PLAYING = 0;
  CommunityTypes.PlaybackState.PAUSED = 1;
  CommunityTypes.PlaybackState.STOPPED = 2;

  CommunityTypes.SkipForward = function() {
    Characteristic.call(this, 'Skip Forward', CommunityTypes.SkipForward.UUID);
    this.setProps({
      format:   Characteristic.Formats.BOOL,
      perms: [ Characteristic.Perms.WRITE ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SkipForward.UUID = '00002002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SkipForward, Characteristic);

  CommunityTypes.SkipBackward = function() {
    Characteristic.call(this, 'Skip Backward', CommunityTypes.SkipBackward.UUID);
    this.setProps({
      format:   Characteristic.Formats.BOOL,
      perms: [ Characteristic.Perms.WRITE ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SkipBackward.UUID = '00002003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SkipBackward, Characteristic);

  CommunityTypes.ShuffleMode = function() {
    Characteristic.call(this, 'Shuffle Mode', CommunityTypes.ShuffleMode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.ShuffleMode.UUID = '00002004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.ShuffleMode, Characteristic);
  //NOTE: If GROUP or SET is not supported, accessories should coerce to ALBUM.
  // If ALBUM is not supported, coerce to ITEM.
  // In general, it is recommended for apps to only assume OFF, ITEM, and ALBUM
  // are supported unless it is known that the accessory supports other settings.
  CommunityTypes.ShuffleMode.OFF = 0;
  //NOTE: INDIVIDUAL is deprecated.
  CommunityTypes.ShuffleMode.ITEM = CommunityTypes.ShuffleMode.INDIVIDUAL = 1;
  CommunityTypes.ShuffleMode.GROUP = 2; // e.g. iTunes "Groupings"
  CommunityTypes.ShuffleMode.ALBUM = 3; // e.g. album or season
  CommunityTypes.ShuffleMode.SET = 4; // e.g. T.V. Series or album box set

  CommunityTypes.RepeatMode = function() {
    Characteristic.call(this, 'Repeat Mode', CommunityTypes.RepeatMode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.RepeatMode.UUID = '00002005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.RepeatMode, Characteristic);
  CommunityTypes.RepeatMode.OFF = 0;
  CommunityTypes.RepeatMode.ONE = 1;
  CommunityTypes.RepeatMode.ALL = 2;

  CommunityTypes.PlaybackSpeed = function() {
    Characteristic.call(this, 'Playback Speed', CommunityTypes.PlaybackSpeed.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.PlaybackSpeed.UUID = '00002006-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackSpeed, Characteristic);

  CommunityTypes.MediaCurrentPosition = function() {
    Characteristic.call(this, 'Media Current Position', CommunityTypes.MediaCurrentPosition.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT, // In seconds
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaCurrentPosition.UUID = '00002007-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaCurrentPosition, Characteristic);

  CommunityTypes.MediaItemName = function() {
    Characteristic.call(this, 'Media Name', CommunityTypes.MediaItemName.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemName.UUID = '00003001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemName, Characteristic);

  CommunityTypes.MediaItemAlbumName = function() {
    Characteristic.call(this, 'Media Album Name', CommunityTypes.MediaItemAlbumName.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemAlbumName.UUID = '00003002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemAlbumName, Characteristic);

  CommunityTypes.MediaItemArtist = function() {
    Characteristic.call(this, 'Media Artist', CommunityTypes.MediaItemArtist.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemArtist.UUID = '00003003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemArtist, Characteristic);

  CommunityTypes.MediaItemDuration = function() {
    Characteristic.call(this, 'Media Duration', CommunityTypes.MediaItemDuration.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT, // In seconds
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaItemDuration.UUID = '00003005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaItemDuration, Characteristic);

  CommunityTypes.StillImage = function() {
    Characteristic.call(this, 'Still Image', CommunityTypes.StillImage.UUID);
    this.setProps({
      format:   Characteristic.Formats.DATA,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.StillImage.UUID = '00004001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.StillImage, Characteristic);

  // Also known as MIME type...
  CommunityTypes.MediaTypeIdentifier = function() {
    Characteristic.call(this, 'Media Type Identifier', CommunityTypes.MediaTypeIdentifier.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaTypeIdentifier.UUID = '00004002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaTypeIdentifier, Characteristic);

  CommunityTypes.MediaWidth = function() {
    Characteristic.call(this, 'Media Width', CommunityTypes.MediaWidth.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaWidth.UUID = '00004003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaWidth, Characteristic);

  CommunityTypes.MediaHeight = function() {
    Characteristic.call(this, 'Media Width', CommunityTypes.MediaHeight.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.MediaHeight.UUID = '00004004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaHeight, Characteristic);
  
// courtesy of https://gist.github.com/gomfunkel/b1a046d729757120907c
  CommunityTypes.Volts = function() {
    Characteristic.call(this, 'Volts', CommunityTypes.Volts.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "V",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Volts.UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Volts, Characteristic);

  CommunityTypes.Amperes = function() {
    Characteristic.call(this, 'Amps', CommunityTypes.Amperes.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "A",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Amperes.UUID = 'E863F126-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Amperes, Characteristic);

  CommunityTypes.Watts = function() {
    Characteristic.call(this, 'Consumption', CommunityTypes.Watts.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "W",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Watts.UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.Watts, Characteristic);

  CommunityTypes.VoltAmperes = function() {
    Characteristic.call(this, 'Apparent Power', CommunityTypes.VoltAmperes.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit:     "VA",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VoltAmperes.UUID = 'E863F110-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.VoltAmperes, Characteristic);

  CommunityTypes.KilowattHours = function() {
    Characteristic.call(this, 'Total Consumption', CommunityTypes.KilowattHours.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      unit:     "kWh",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.KilowattHours.UUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.KilowattHours, Characteristic);

  CommunityTypes.KilowattVoltAmpereHour = function() {
    Characteristic.call(this, 'Apparent Energy', CommunityTypes.KilowattVoltAmpereHour.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      unit:     "kVAh",
      minValue: 0,
      maxValue: 65535,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.KilowattVoltAmpereHour.UUID = 'E863F127-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.KilowattVoltAmpereHour, Characteristic);

  CommunityTypes.BatteryLevel = function() {
    Characteristic.call(this, 'Battery Level', CommunityTypes.BatteryLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT16,
      unit: Characteristic.Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.BatteryLevel.UUID = 'E863F11B-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.BatteryLevel, Characteristic);

  CommunityTypes.EveAirQuality = function () {
    Characteristic.call(this, 'Eve Air Quality', CommunityTypes.EveAirQuality.UUID);
    this.setProps({
      format: Characteristic.Formats.UINT16,
      unit: "ppm",
      maxValue: 5000,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ],
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.EveAirQuality.UUID = 'E863F10B-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.EveAirQuality, Characteristic);

// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors

  CommunityTypes.AtmosphericPressureLevel = function () {
    Characteristic.call(this, 'Barometric Pressure', CommunityTypes.AtmosphericPressureLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "mbar",
      minValue: 800,
      maxValue: 1200,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AtmosphericPressureLevel.UUID = '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB';
  inherits(CommunityTypes.AtmosphericPressureLevel, Characteristic);

  CommunityTypes.NoiseLevel = function () {
    Characteristic.call(this, 'Noise Level', CommunityTypes.NoiseLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "dB",
      minValue: 0,
      maxValue: 200,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NoiseLevel.UUID = '2CD7B6FD-419A-4740-8995-E3BFE43735AB';
  inherits(CommunityTypes.NoiseLevel, Characteristic);

// courtesy of https://github.com/homespun/homebridge-platform-snmp

  CommunityTypes.AirFlow = function () {
    Characteristic.call(this, 'Air Flow', CommunityTypes.AirFlow.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      unit:     "m/s",
      minValue: 0,
      maxValue: 135,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.AirFlow.UUID = '49C8AE5A-A3A5-41AB-BF1F-12D5654F9F41';
  inherits(CommunityTypes.AirFlow, Characteristic);

  CommunityTypes.NitrogenDioxideDetected = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Detected', CommunityTypes.NitrogenDioxideDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxideDetected.UUID = 'D737B40A-3AF0-4316-950F-76090B98C5CF';
  inherits(CommunityTypes.NitrogenDioxideDetected, Characteristic);

  CommunityTypes.NitrogenDioxideDetected.NO2_LEVELS_NORMAL = 0;
  CommunityTypes.NitrogenDioxideDetected.NO2_LEVELS_ABNORMAL = 1;

  CommunityTypes.NitrogenDioxideLevel = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Level', CommunityTypes.NitrogenDioxideLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppm",
      minValue: 0,
      maxValue: 1500,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxideLevel.UUID = 'B762A2AF-D9D0-4A79-814A-E9EBAB0ED290';
  inherits(CommunityTypes.NitrogenDioxideLevel, Characteristic);

  CommunityTypes.NitrogenDioxidePeakLevel = function () {
    Characteristic.call(this, 'Nitrogen Dioxide Peak Level', CommunityTypes.NitrogenDioxidePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppm",
      minValue: 0,
      maxValue: 1500,
      minStep:  1,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NitrogenDioxidePeakLevel.UUID = 'B6594847-7B88-496C-A1A0-B7860F3D7601';
  inherits(CommunityTypes.NitrogenDioxidePeakLevel, Characteristic);

// courtesy of https://github.com/homespun/homebridge-platform-aqe
  CommunityTypes.OzoneDetected = function () {
    Characteristic.call(this, 'Ozone Detected', CommunityTypes.OzoneDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzoneDetected.UUID = '0168FA60-5CF4-4314-AA45-0F84E389A093';
  inherits(CommunityTypes.OzoneDetected, Characteristic);

  CommunityTypes.OzoneDetected.O3_LEVELS_NORMAL = 0;
  CommunityTypes.OzoneDetected.O3_LEVELS_ABNORMAL = 1;

  CommunityTypes.OzoneLevel = function () {
    Characteristic.call(this, 'Ozone Level', CommunityTypes.OzoneLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzoneLevel.UUID = '03C17FD9-672E-42F5-8DD4-30C6822C739A';
  inherits(CommunityTypes.OzoneLevel, Characteristic);

  CommunityTypes.OzonePeakLevel = function () {
    Characteristic.call(this, 'Ozone Peak Level', CommunityTypes.OzonePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.OzonePeakLevel.UUID = '550EE1FF-FC66-4BB6-A1C1-4B0A07109AE3';
  inherits(CommunityTypes.OzonePeakLevel, Characteristic);

  CommunityTypes.SodiumDioxideDetected = function () {
    Characteristic.call(this, 'Sodium Dioxide Detected', CommunityTypes.SodiumDioxideDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxideDetected.UUID = '4D237DAB-1CB6-4D52-B446-4667F58F7D28';
  inherits(CommunityTypes.SodiumDioxideDetected, Characteristic);

  CommunityTypes.SodiumDioxideDetected.SO2_LEVELS_NORMAL = 0;
  CommunityTypes.SodiumDioxideDetected.SO2_LEVELS_ABNORMAL = 1;

  CommunityTypes.SodiumDioxideLevel = function () {
    Characteristic.call(this, 'Sodium Dioxide Level', CommunityTypes.SodiumDioxideLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxideLevel.UUID = '66C4D315-FBEF-470E-9434-B047679F1141';
  inherits(CommunityTypes.SodiumDioxideLevel, Characteristic);

  CommunityTypes.SodiumDioxidePeakLevel = function () {
    Characteristic.call(this, 'Sodium Dioxide Peak Level', CommunityTypes.SodiumDioxidePeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.SodiumDioxidePeakLevel.UUID = '4CD6F648-2F92-43D8-86DF-0E8DE75E033B';
  inherits(CommunityTypes.SodiumDioxidePeakLevel, Characteristic);

  CommunityTypes.VolatileOrganicCompoundDetected = function () {
    Characteristic.call(this, 'Volatile Organic Compound Detected', CommunityTypes.VolatileOrganicCompoundDetected.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundDetected.UUID = '65DBC0F5-C40B-4E04-ADED-DC70031B0B82';
  inherits(CommunityTypes.VolatileOrganicCompoundDetected, Characteristic);

  CommunityTypes.VolatileOrganicCompoundDetected.VOC_LEVELS_NORMAL = 0;
  CommunityTypes.VolatileOrganicCompoundDetected.VOC_LEVELS_ABNORMAL = 1;

  CommunityTypes.VolatileOrganicCompoundLevel = function () {
    Characteristic.call(this, 'Volatile Organic Compound Level', CommunityTypes.VolatileOrganicCompoundLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundLevel.UUID = '35C4C797-193D-4998-879F-A08514E87897';
  inherits(CommunityTypes.VolatileOrganicCompoundLevel, Characteristic);

  CommunityTypes.VolatileOrganicCompoundPeakLevel = function () {
    Characteristic.call(this, 'Volatile Organic Compound Peak Level', CommunityTypes.VolatileOrganicCompoundPeakLevel.UUID);
    this.setProps({
      format:   Characteristic.Formats.FLOAT,
      unit:     "ppb",
      minValue: 0,
      maxValue: 1500,
      minStep:  0.01,
      perms:    [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.VolatileOrganicCompoundPeakLevel.UUID = 'A62CB784-1916-4BDF-B840-BDB9F8A264E9';
  inherits(CommunityTypes.VolatileOrganicCompoundPeakLevel, Characteristic);

  CommunityTypes.NotificationCode = function() {
    Characteristic.call(this, 'Notification Code', CommunityTypes.NotificationCode.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT8,
      maxValue: 255,
      minValue: 0,
      minStep: 1,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY ]
    });
    this.value = 255;
  };
  CommunityTypes.NotificationCode.UUID = '381C47A3-CB06-4177-8E3D-A1B4C22EB031';
  inherits(CommunityTypes.NotificationCode, Characteristic);

  CommunityTypes.NotificationText = function() {
    Characteristic.call(this, 'Notification Text', CommunityTypes.NotificationText.UUID);
    this.setProps({
      format:   Characteristic.Formats.STRING,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.NotificationText.UUID = 'e244ca80-813e-423a-86bd-02f293b857a0';
  inherits(CommunityTypes.NotificationText, Characteristic);

// used by Elgato Eve, number of seconds since the epoch...
  CommunityTypes.LastEventTime = function() {
    Characteristic.call(this, 'Last Event Time', CommunityTypes.LastEventTime.UUID);
    this.setProps({
      format:   Characteristic.Formats.UINT32,
      perms: [ Characteristic.Perms.READ, Characteristic.Perms.NOTIFY ]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.LastEventTime.UUID = 'E863F11A-079E-48FF-8F27-9C2605A29F52';
  inherits(CommunityTypes.LastEventTime, Characteristic);

// courtesy of https://github.com/SeydX/homebridge-broadband

  CommunityTypes.DownloadSpeed = function() {
    Characteristic.call(this, 'Download Speed', CommunityTypes.DownloadSpeed.UUID);
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: (options.units && options.units.DownloadSpeed) || 'Mbps',
      maxValue: 1024,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.DownloadSpeed.UUID = 'DA70DA1F-DA72-4DB3-81C2-99F158A15A9A';
  inherits(CommunityTypes.DownloadSpeed, Characteristic);

  CommunityTypes.UploadSpeed = function() {
    Characteristic.call(this, 'Upload Speed', CommunityTypes.UploadSpeed.UUID);
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: 'Mbps',
      maxValue: 1024,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.UploadSpeed.UUID = 'AB74289E-D516-4A12-B2AE-1B32A74C035F';
  inherits(CommunityTypes.UploadSpeed, Characteristic);

  CommunityTypes.Ping = function() {
    Characteristic.call(this, 'Ping', CommunityTypes.Ping.UUID);
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: 'ms',
      maxValue: 999,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Ping.UUID = 'CC65A09A-E052-410C-981D-C11BDE2C3F60';
  inherits(CommunityTypes.Ping, Characteristic);


  CommunityTypes.Latency = function() {
    Characteristic.call(this, 'Latency', CommunityTypes.Latency.UUID);
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: 'ms',
      maxValue: 999,
      minValue: 0,
      minStep: 0.001,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  CommunityTypes.Latency.UUID = '60EC80F9-F799-4E8E-B613-098E7EBCBB0B';
  inherits(CommunityTypes.Latency, Characteristic);


  // Services

  CommunityTypes.AudioDeviceService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AudioDeviceService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AudioVolume);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.Muting);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AudioDeviceService.UUID = '00000001-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.AudioDeviceService, Service);

  CommunityTypes.PlaybackDeviceService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.PlaybackDeviceService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.PlaybackState);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.SkipForward);
    this.addOptionalCharacteristic(CommunityTypes.SkipBackward);
    this.addOptionalCharacteristic(CommunityTypes.ShuffleMode);
    this.addOptionalCharacteristic(CommunityTypes.RepeatMode);
    this.addOptionalCharacteristic(CommunityTypes.PlaybackSpeed);
    this.addOptionalCharacteristic(CommunityTypes.MediaCurrentPosition);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemAlbumName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemArtist);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemDuration);
    this.addOptionalCharacteristic(Characteristic.Name);
    // Artwork characteristics...would be better reported in a separate service?
    this.addOptionalCharacteristic(CommunityTypes.StillImage);
    this.addOptionalCharacteristic(CommunityTypes.MediaTypeIdentifier);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
  };
  CommunityTypes.PlaybackDeviceService.UUID = '00000002-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.PlaybackDeviceService, Service);

  // A media information service that has no playback controls, for e.g. DAB radio...
  CommunityTypes.MediaInformationService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.MediaInformationService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.MediaItemName);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.MediaItemAlbumName);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemArtist);
    this.addOptionalCharacteristic(CommunityTypes.MediaItemDuration);
    this.addOptionalCharacteristic(CommunityTypes.MediaCurrentPosition);
    this.addOptionalCharacteristic(Characteristic.Name);
    // Artwork characteristics...would be better reported in a separate service?
    this.addOptionalCharacteristic(CommunityTypes.StillImage);
    this.addOptionalCharacteristic(CommunityTypes.MediaTypeIdentifier);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
  };
  CommunityTypes.MediaInformationService.UUID = '00000003-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.MediaInformationService, Service);

  CommunityTypes.StillImageService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.StillImageService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.StillImage);
    this.addCharacteristic(CommunityTypes.MediaTypeIdentifier);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.StillImageService.UUID = '00000004-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.StillImageService, Service);

  CommunityTypes.SecurityCameraService = function(displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.SecurityCameraService.UUID, subtype);
    // Required Characteristics
    this.addCharacteristic(CommunityTypes.StillImageService);
    this.addCharacteristic(CommunityTypes.MediaTypeIdentifier);

    // Optional Characteristics
    this.addOptionalCharacteristic(CommunityTypes.Timestamp);
    this.addOptionalCharacteristic(CommunityTypes.MediaWidth);
    this.addOptionalCharacteristic(CommunityTypes.MediaHeight);
    this.addOptionalCharacteristic(CommunityTypes.VideoDataURL);
    this.addOptionalCharacteristic(CommunityTypes.AudioDataURL);
    this.addOptionalCharacteristic(Characteristic.MotionDetected);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.SecurityCameraService.UUID = '00000005-0000-1000-8000-135D67EC4377';
  inherits(CommunityTypes.SecurityCameraService, Service);

// courtesy of https://github.com/robi-van-kinobi/homebridge-cubesensors
  CommunityTypes.AtmosphericPressureSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AtmosphericPressureSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AtmosphericPressureLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AtmosphericPressureSensor.UUID = 'B77831FD-D66A-46A4-B66D-FD7EE8DFE3CE';
  inherits(CommunityTypes.AtmosphericPressureSensor, Service);

  CommunityTypes.NoiseLevelSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NoiseLevelSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NoiseLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.NoiseLevelSensor.UUID = '28FDA6BC-9C2A-4DEA-AAFD-B49DB6D155AB';
  inherits(CommunityTypes.NoiseLevelSensor, Service);

// courtesy of https://github.com/homespun/homebridge-platform-snmp

  CommunityTypes.AirFlowSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.AirFlowSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.AirFlow);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.AirFlowSensor.UUID = 'AF5C192E-420F-4A13-AB67-B8F3968A4935';
  inherits(CommunityTypes.AirFlowSensor, Service);

  CommunityTypes.NitrogenDioxideSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NitrogenDioxideSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NitrogenDioxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.NitrogenDioxideLevel);
    this.addOptionalCharacteristic(CommunityTypes.NitrogenDioxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.NitrogenDioxideSensor.UUID = '9F6B797D-D43B-4C88-9AA0-57018AB8A91E';
  inherits(CommunityTypes.NitrogenDioxideSensor, Service);

// courtesy of https://github.com/homespun/homebridge-platform-aqe
  CommunityTypes.OzoneSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.OzoneSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.OzoneDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.OzoneLevel);
    this.addOptionalCharacteristic(CommunityTypes.OzonePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.OzoneSensor.UUID = 'B91C2BD6-D071-4F49-A23B-20721AC6CCEB';
  inherits(CommunityTypes.OzoneSensor, Service);

  CommunityTypes.SodiumDioxideSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.SodiumDioxideSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.SodiumDioxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.SodiumDioxideLevel);
    this.addOptionalCharacteristic(CommunityTypes.SodiumDioxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.SodiumDioxideSensor.UUID = 'FE7CFB1F-12D0-405D-86FD-7E268D65C453';
  inherits(CommunityTypes.SodiumDioxideSensor, Service);

  CommunityTypes.VolatileOrganicCompoundSensor = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.VolatileOrganicCompoundSensor.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.VolatileOrganicCompoundDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(CommunityTypes.VolatileOrganicCompoundLevel);
    this.addOptionalCharacteristic(CommunityTypes.VolatileOrganicCompoundPeakLevel);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  };
  CommunityTypes.VolatileOrganicCompoundSensor.UUID = '776E34BC-1660-46EC-A33D-2DFE5B958699';
  inherits(CommunityTypes.VolatileOrganicCompoundSensor, Service);

  CommunityTypes.NotificationService = function (displayName, subtype) {
    Service.call(this, displayName, CommunityTypes.NotificationService.UUID, subtype);

    // Required Characteristics
    this.addCharacteristic(CommunityTypes.NotificationCode);
    this.addCharacteristic(CommunityTypes.NotificationText);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(CommunityTypes.LastEventTime);
  };
  CommunityTypes.NotificationService.UUID = '074D8CE9-5B4B-48D5-9990-D98850C2F3FE';
  inherits(CommunityTypes.NotificationService, Service);


  return CommunityTypes;
};



/***/ }),

/***/ "../node_modules/hap-nodejs/lib/Characteristic.js":
/*!********************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/Characteristic.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(/*! util */ "../node_modules/util/util.js").inherits;
var EventEmitter = __webpack_require__(/*! events */ "../node_modules/events/events.js").EventEmitter;
var once = __webpack_require__(/*! ./util/once */ "../node_modules/hap-nodejs/lib/util/once.js").once;
var Decimal = __webpack_require__(/*! decimal.js */ "../node_modules/decimal.js/decimal.mjs");
var bufferShim = __webpack_require__(/*! buffer-shims */ "../node_modules/buffer-shims/index.js");

module.exports = {
  Characteristic: Characteristic
};


/**
 * Characteristic represents a particular typed variable that can be assigned to a Service. For instance, a
 * "Hue" Characteristic might store a 'float' value of type 'arcdegrees'. You could add the Hue Characteristic
 * to a Service in order to store that value. A particular Characteristic is distinguished from others by its
 * UUID. HomeKit provides a set of known Characteristic UUIDs defined in HomeKitTypes.js along with a
 * corresponding concrete subclass.
 *
 * You can also define custom Characteristics by providing your own UUID. Custom Characteristics can be added
 * to any native or custom Services, but Siri will likely not be able to work with these.
 *
 * Note that you can get the "value" of a Characteristic by accessing the "value" property directly, but this
 * is really a "cached value". If you want to fetch the latest value, which may involve doing some work, then
 * call getValue().
 *
 * @event 'get' => function(callback(err, newValue), context) { }
 *        Emitted when someone calls getValue() on this Characteristic and desires the latest non-cached
 *        value. If there are any listeners to this event, one of them MUST call the callback in order
 *        for the value to ever be delivered. The `context` object is whatever was passed in by the initiator
 *        of this event (for instance whomever called `getValue`).
 *
 * @event 'set' => function(newValue, callback(err), context) { }
 *        Emitted when someone calls setValue() on this Characteristic with a desired new value. If there
 *        are any listeners to this event, one of them MUST call the callback in order for this.value to
 *        actually be set. The `context` object is whatever was passed in by the initiator of this change
 *        (for instance, whomever called `setValue`).
 *
 * @event 'change' => function({ oldValue, newValue, context }) { }
 *        Emitted after a change in our value has occurred. The new value will also be immediately accessible
 *        in this.value. The event object contains the new value as well as the context object originally
 *        passed in by the initiator of this change (if known).
 */

function Characteristic(displayName, UUID, props) {
  this.displayName = displayName;
  this.UUID = UUID;
  this.iid = null; // assigned by our containing Service
  this.value = null;
  this.status = null;
  this.eventOnlyCharacteristic = false;
  this.props = props || {
    format: null,
    unit: null,
    minValue: null,
    maxValue: null,
    minStep: null,
    perms: []
  };

  this.subscriptions = 0;
}

inherits(Characteristic, EventEmitter);

// Known HomeKit formats
Characteristic.Formats = {
  BOOL: 'bool',
  INT: 'int',
  FLOAT: 'float',
  STRING: 'string',
  UINT8: 'uint8',
  UINT16: 'uint16',
  UINT32: 'uint32',
  UINT64: 'uint64',
  DATA: 'data',
  TLV8: 'tlv8',
  ARRAY: 'array', //Not in HAP Spec
  DICTIONARY: 'dict' //Not in HAP Spec
}

// Known HomeKit unit types
Characteristic.Units = {
  // HomeKit only defines Celsius, for Fahrenheit, it requires iOS app to do the conversion.
  CELSIUS: 'celsius',
  PERCENTAGE: 'percentage',
  ARC_DEGREE: 'arcdegrees',
  LUX: 'lux',
  SECONDS: 'seconds'
}

// Known HomeKit permission types
Characteristic.Perms = {
  READ: 'pr', //Kept for backwards compatability
  PAIRED_READ: 'pr', //Added to match HAP's terminology
  WRITE: 'pw', //Kept for backwards compatability
  PAIRED_WRITE: 'pw', //Added to match HAP's terminology
  NOTIFY: 'ev', //Kept for backwards compatability
  EVENTS: 'ev', //Added to match HAP's terminology
  ADDITIONAL_AUTHORIZATION: 'aa',
  TIMED_WRITE: 'tw', //Not currently supported by IP
  HIDDEN: 'hd'
}

/**
 * Copies the given properties to our props member variable,
 * and returns 'this' for chaining.
 *
 * @param 'props' {
 *   format: <one of Characteristic.Formats>,
 *   unit: <one of Characteristic.Units>,
 *   perms: array of [Characteristic.Perms] like [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
 *   ev: <Event Notifications Enabled Boolean>, (Optional)
 *   description: <String of description>, (Optional)
 *   minValue: <minimum value for numeric characteristics>, (Optional)
 *   maxValue: <maximum value for numeric characteristics>, (Optional)
 *   minStep: <smallest allowed increment for numeric characteristics>, (Optional)
 *   maxLen: <max length of string up to 256>, (Optional default: 64)
 *   maxDataLen: <max length of data>, (Optional default: 2097152)
 *   valid-values: <array of numbers>, (Optional)
 *   valid-values-range: <array of two numbers for start and end range> (Optional)
 * }
 */

Characteristic.prototype.setProps = function(props) {
  for (var key in (props || {}))
    if (Object.prototype.hasOwnProperty.call(props, key))
      this.props[key] = props[key];
  return this;
}


Characteristic.prototype.subscribe = function () {
  if (this.subscriptions === 0) {
    this.emit('subscribe');
  }
  this.subscriptions++;
}

Characteristic.prototype.unsubscribe = function() {
  var wasOne = this.subscriptions === 1;
  this.subscriptions--;
  this.subscriptions = Math.max(this.subscriptions, 0);
  if (wasOne) {
    this.emit('unsubscribe');
  }
}

Characteristic.prototype.getValue = function(callback, context, connectionID) {
  // Handle special event only characteristics.
  if (this.eventOnlyCharacteristic === true) {
    if (callback) {
      callback(null, null);
    }

    return;
  }

  if (this.listeners('get').length > 0) {

    // allow a listener to handle the fetching of this value, and wait for completion
    this.emit('get', once(function(err, newValue) {
      this.status = err;
      if (err) {
        // pass the error along to our callback
        if (callback) callback(err);
      }
      else {
        newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
        if (newValue === undefined || newValue === null)
          newValue = this.getDefaultValue();

        // getting the value was a success; we can pass it along and also update our cached value
        var oldValue = this.value;
        this.value = newValue;
        if (callback) callback(null, newValue);

        // emit a change event if necessary
        if (oldValue !== newValue)
          this.emit('change', { oldValue:oldValue, newValue:newValue, context:context });
      }

    }.bind(this)), context, connectionID);
  }
  else {

    // no one is listening to the 'get' event, so just return the cached value
    if (callback)
      callback(this.status, this.value);
  }
}

Characteristic.prototype.validateValue = function(newValue) {

 var isNumericType = false;
 var minValue_resolved = 0;
 var maxValue_resolved = 0;
 var minStep_resolved = undefined;
 var stepDecimals = 0;

  switch(this.props.format) {
    case 'int':
      minStep_resolved=1;
      minValue_resolved=-2147483648;
      maxValue_resolved=2147483647;
      isNumericType=true;
      break;
    case 'float':
      minStep_resolved=undefined;
      minValue_resolved=undefined;
      maxValue_resolved=undefined;
      isNumericType=true;
      break;
    case 'uint8':
      minStep_resolved=1;
      minValue_resolved=0;
      maxValue_resolved=255;
      isNumericType=true;
      break;
    case 'uint16':
      minStep_resolved=1;
      minValue_resolved=0;
      maxValue_resolved=65535;
      isNumericType=true;
      break;
    case 'uint32':
      minStep_resolved=1;
      minValue_resolved=0;
      maxValue_resolved=4294967295;
      isNumericType=true;
      break;
    case 'uint64':
      minStep_resolved=1;
      minValue_resolved=0;
      maxValue_resolved=18446744073709551615;
      isNumericType=true;
      break;
    //All of the following datatypes return from this switch.
     case 'bool':
      return (newValue == true); //We don't need to make sure this returns true or false
      break;
    case 'string':
      var myString = newValue || ''; //If null or undefined or anything odd, make it a blank string
      myString = String(myString);
      var maxLength = this.props.maxLen;
      if (maxLength === undefined) maxLength=64; //Default Max Length is 64.
      if (myString.length>maxLength) myString = myString.substring(0,maxLength); //Truncate strings that are too long
      return myString; //We don't need to do any validation after having truncated the string
      break;
    case 'data':
      var maxLength = this.props.maxDataLen;
      if (maxLength===undefined) maxLength=2097152; //Default Max Length is 2097152.
      //if (newValue.length>maxLength) //I don't know the best way to handle this since it's unknown binary data.
      //I suspect that it will crash HomeKit for this bridge if the length is too long.
      return newValue;
      break;
    case 'tlv8':
      //Should we parse this to make sure the tlv8 is valid?
      break;
    default: //Datatype out of HAP Spec encountered. We'll assume the developer knows what they're doing.
      return newValue;
    };

  if (isNumericType) {
    if (isNaN(newValue)) return this.value; //This is not a number so we'll just pass out the last value.
    if (newValue === false) return 0;
    if (newValue === true) return 1;
    if ((!isNaN(this.props.maxValue))&&(this.props.maxValue!==null)) maxValue_resolved=this.props.maxValue;
    if ((!isNaN(this.props.minValue))&&(this.props.minValue!==null)) minValue_resolved=this.props.minValue;
    if ((!isNaN(this.props.minStep))&&(this.props.minStep!==null)) minStep_resolved=this.props.minStep;

    if (newValue<minValue_resolved) newValue = minValue_resolved; //Fails Minimum Value Test
    if (newValue>maxValue_resolved) newValue = maxValue_resolved; //Fails Maximum Value Test
    if (minStep_resolved!==undefined) {
      //Determine how many decimals we need to display
      if (Math.floor(minStep_resolved) === minStep_resolved)
        stepDecimals = 0;
      else
        stepDecimals = minStep_resolved.toString().split(".")[1].length || 0;

      //Use Decimal to detemine the lowest value within the step.
      try {
        var decimalVal = new Decimal(newValue);
        var decimalDiff = decimalVal.mod(minStep_resolved);
        decimalVal = decimalVal.minus(decimalDiff);
        if (stepDecimals === 0) {
          newValue = parseInt(decimalVal.toFixed(0));
        } else {
          newValue = parseFloat(decimalVal.toFixed(stepDecimals)); //Convert it to a fixed decimal
        }
      } catch (e) {
        return this.value; //If we had an error, return the current value.
      }
    }

    if (this['valid-values']!==undefined)
      if (!this['valid-values'].includes(newValue)) return this.value; //Fails Valid Values Test
    if (this['valid-values-range']!==undefined) { //This is another way Apple has to handle min/max
      if (newValue<this['valid-values-range'][0]) newValue=this['valid-values-range'][0];
      if (newValue>this['valid-values-range'][1]) newValue=this['valid-values-range'][1];
    }
  }
  return newValue;
}

Characteristic.prototype.setValue = function(newValue, callback, context, connectionID) {

  if ( newValue instanceof Error ) {
    this.status = newValue
  } else {
    this.status = null;
  }

  newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.

  if (this.listeners('set').length > 0) {

    // allow a listener to handle the setting of this value, and wait for completion
    this.emit('set', newValue, once(function(err) {
      this.status = err;
      if (err) {
        // pass the error along to our callback
        if (callback) callback(err);
      }
      else {
        if (newValue === undefined || newValue === null)
          newValue = this.getDefaultValue();
        // setting the value was a success; so we can cache it now
        var oldValue = this.value;
        this.value = newValue;
        if (callback) callback();

        if (this.eventOnlyCharacteristic === true || oldValue !== newValue)
          this.emit('change', { oldValue:oldValue, newValue:newValue, context:context });
      }

    }.bind(this)), context, connectionID);

  }
  else {
    if (newValue === undefined || newValue === null)
      newValue = this.getDefaultValue();
    // no one is listening to the 'set' event, so just assign the value blindly
    var oldValue = this.value;
    this.value = newValue;
    if (callback) callback();

    if (this.eventOnlyCharacteristic === true || oldValue !== newValue)
      this.emit('change', { oldValue:oldValue, newValue:newValue, context:context });
  }

  return this; // for chaining
}

Characteristic.prototype.updateValue = function(newValue, callback, context) {

  if ( newValue instanceof Error ) {
    this.status = newValue
  } else {
    this.status = null;
  }

  newValue = this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.

  if (newValue === undefined || newValue === null)
    newValue = this.getDefaultValue();
    // no one is listening to the 'set' event, so just assign the value blindly
  var oldValue = this.value;
  this.value = newValue;
  if (callback) callback();

  if (this.eventOnlyCharacteristic === true || oldValue !== newValue)
    this.emit('change', { oldValue:oldValue, newValue:newValue, context:context });
  return this; // for chaining
}

Characteristic.prototype.getDefaultValue = function() {
  switch (this.props.format) {
    case Characteristic.Formats.BOOL: return false;
    case Characteristic.Formats.STRING: return "";
    case Characteristic.Formats.DATA: return null; // who knows!
    case Characteristic.Formats.TLV8: return null; // who knows!
    case Characteristic.Formats.DICTIONARY: return {};
    case Characteristic.Formats.ARRAY: return [];
    default: return this.props.minValue || 0;
  }
}

Characteristic.prototype._assignID = function(identifierCache, accessoryName, serviceUUID, serviceSubtype) {

  // generate our IID based on our UUID
  this.iid = identifierCache.getIID(accessoryName, serviceUUID, serviceSubtype, this.UUID);
}

/**
 * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
 */
Characteristic.prototype.toHAP = function(opt) {

  // ensure our value fits within our constraints if present
  var value = this.value;
  if (this.props.minValue != null && value < this.props.minValue) value = this.props.minValue;
  if (this.props.maxValue != null && value > this.props.maxValue) value = this.props.maxValue;
  if (this.props.format != null) {
    if (this.props.format === Characteristic.Formats.INT)
      value = parseInt(value);
    else if (this.props.format === Characteristic.Formats.UINT8)
      value = parseInt(value);
    else if (this.props.format === Characteristic.Formats.UINT16)
      value = parseInt(value);
    else if (this.props.format === Characteristic.Formats.UINT32)
      value = parseInt(value);
    else if (this.props.format === Characteristic.Formats.UINT64)
      value = parseInt(value);
    else if (this.props.format === Characteristic.Formats.FLOAT) {
      value = parseFloat(value);
      if (this.props.minStep != null) {
        var pow = Math.pow(10, decimalPlaces(this.props.minStep));
        value = Math.round(value * pow) / pow;
      }
    }
  }

  if (this.eventOnlyCharacteristic === true) {
    value = null;
  }

  var hap = {
    iid: this.iid,
    type: this.UUID,
    perms: this.props.perms,
    format: this.props.format,
    value: value,
    description: this.displayName

    // These properties used to be sent but do not seem to be used:
    //
    // events: false,
    // bonjour: false
  };

  if (this.props.validValues != null && this.props.validValues.length > 0) {
    hap['valid-values'] = this.props.validValues;
  }

  if (this.props.validValueRanges != null && this.props.validValueRanges.length > 0 && !(this.props.validValueRanges.length & 1)) {
    hap['valid-values-range'] = this.props.validValueRanges;
  }

  // extra properties
  if (this.props.unit != null) hap.unit = this.props.unit;
  if (this.props.maxValue != null) hap.maxValue = this.props.maxValue;
  if (this.props.minValue != null) hap.minValue = this.props.minValue;
  if (this.props.minStep != null) hap.minStep = this.props.minStep;

  // add maxLen if string length is > 64 bytes and trim to max 256 bytes
  if (this.props.format === Characteristic.Formats.STRING) {
    var str = bufferShim.from(value, 'utf8'),
        len = str.byteLength;
    if (len > 256) { // 256 bytes is the max allowed length
      hap.value = str.toString('utf8', 0, 256);
      hap.maxLen = 256;
    } else if (len > 64) { // values below can be ommited
      hap.maxLen = len;
    }
  }

  // if we're not readable, omit the "value" property - otherwise iOS will complain about non-compliance
  if (this.props.perms.indexOf(Characteristic.Perms.READ) == -1)
    delete hap.value;

  // delete the "value" property anyway if we were asked to
  if (opt && opt.omitValues)
    delete hap.value;

  return hap;
}

// Mike Samuel
// http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
function decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}


/***/ }),

/***/ "../node_modules/hap-nodejs/lib/Service.js":
/*!*************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/Service.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(/*! util */ "../node_modules/util/util.js").inherits;
var clone = __webpack_require__(/*! ./util/clone */ "../node_modules/hap-nodejs/lib/util/clone.js").clone;
var EventEmitter = __webpack_require__(/*! events */ "../node_modules/events/events.js").EventEmitter;
var Characteristic = __webpack_require__(/*! ./Characteristic */ "../node_modules/hap-nodejs/lib/Characteristic.js").Characteristic;

module.exports = {
  Service: Service
};

/**
 * Service represents a set of grouped values necessary to provide a logical function. For instance, a
 * "Door Lock Mechanism" service might contain two values, one for the "desired lock state" and one for the
 * "current lock state". A particular Service is distinguished from others by its "type", which is a UUID.
 * HomeKit provides a set of known Service UUIDs defined in HomeKitTypes.js along with a corresponding
 * concrete subclass that you can instantiate directly to setup the necessary values. These natively-supported
 * Services are expected to contain a particular set of Characteristics.
 *
 * Unlike Characteristics, where you cannot have two Characteristics with the same UUID in the same Service,
 * you can actually have multiple Services with the same UUID in a single Accessory. For instance, imagine
 * a Garage Door Opener with both a "security light" and a "backlight" for the display. Each light could be
 * a "Lightbulb" Service with the same UUID. To account for this situation, we define an extra "subtype"
 * property on Service, that can be a string or other string-convertible object that uniquely identifies the
 * Service among its peers in an Accessory. For instance, you might have `service1.subtype = 'security_light'`
 * for one and `service2.subtype = 'backlight'` for the other.
 *
 * You can also define custom Services by providing your own UUID for the type that you generate yourself.
 * Custom Services can contain an arbitrary set of Characteristics, but Siri will likely not be able to
 * work with these.
 *
 * @event 'characteristic-change' => function({characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of our Characteristics has occurred.
 */

function Service(displayName, UUID, subtype) {

  if (!UUID) throw new Error("Services must be created with a valid UUID.");

  this.displayName = displayName;
  this.UUID = UUID;
  this.subtype = subtype;
  this.iid = null; // assigned later by our containing Accessory
  this.characteristics = [];
  this.optionalCharacteristics = [];

  this.isHiddenService = false;
  this.isPrimaryService = false;
  this.linkedServices = [];

  // every service has an optional Characteristic.Name property - we'll set it to our displayName
  // if one was given
  // if you don't provide a display name, some HomeKit apps may choose to hide the device.
  if (displayName) {
    // create the characteristic if necessary
    var nameCharacteristic =
      this.getCharacteristic(Characteristic.Name) ||
      this.addCharacteristic(Characteristic.Name);

    nameCharacteristic.setValue(displayName);
  }
}

inherits(Service, EventEmitter);

Service.prototype.addCharacteristic = function (characteristic) {
  // characteristic might be a constructor like `Characteristic.Brightness` instead of an instance
  // of Characteristic. Coerce if necessary.
  if (typeof characteristic === 'function') {
    characteristic = new (Function.prototype.bind.apply(characteristic, arguments));
  }
  // check for UUID conflict
  for (var index in this.characteristics) {
    var existing = this.characteristics[index];
    if (existing.UUID === characteristic.UUID) {
      if (characteristic.UUID === '00000052-0000-1000-8000-0026BB765291') {
        //This is a special workaround for the Firmware Revision characteristic.
        return existing;
      }
      throw new Error("Cannot add a Characteristic with the same UUID as another Characteristic in this Service: " + existing.UUID);
    }
  }

  // listen for changes in characteristics and bubble them up
  characteristic.on('change', function (change) {
    // make a new object with the relevant characteristic added, and bubble it up
    this.emit('characteristic-change', clone(change, { characteristic: characteristic }));
  }.bind(this));

  this.characteristics.push(characteristic);

  this.emit('service-configurationChange', clone({ service: this }));

  return characteristic;
}

//Defines this service as hidden
Service.prototype.setHiddenService = function (isHidden) {
  this.isHiddenService = isHidden;
  this.emit('service-configurationChange', clone({ service: this }));
}

//Allows setting other services that link to this one.
Service.prototype.addLinkedService = function (newLinkedService) {
  //TODO: Add a check if the service is on the same accessory.
  if (!this.linkedServices.includes(newLinkedService))
    this.linkedServices.push(newLinkedService);
  this.emit('service-configurationChange', clone({ service: this }));
}

Service.prototype.removeLinkedService = function (oldLinkedService) {
  //TODO: Add a check if the service is on the same accessory.
  if (this.linkedServices.includes(oldLinkedService))
    this.linkedServices.splice(this.linkedServices.indexOf(oldLinkedService), 1);
  this.emit('service-configurationChange', clone({ service: this }));
}

Service.prototype.removeCharacteristic = function (characteristic) {
  var targetCharacteristicIndex;

  for (var index in this.characteristics) {
    var existingCharacteristic = this.characteristics[index];

    if (existingCharacteristic === characteristic) {
      targetCharacteristicIndex = index;
      break;
    }
  }

  if (targetCharacteristicIndex) {
    this.characteristics.splice(targetCharacteristicIndex, 1);
    characteristic.removeAllListeners();

    this.emit('service-configurationChange', clone({ service: this }));
  }
}

Service.prototype.getCharacteristic = function (name) {
  // returns a characteristic object from the service
  // If  Service.prototype.getCharacteristic(Characteristic.Type)  does not find the characteristic,
  // but the type is in optionalCharacteristics, it adds the characteristic.type to the service and returns it.
  var index, characteristic;
  for (index in this.characteristics) {
    characteristic = this.characteristics[index];
    if (typeof name === 'string' && characteristic.displayName === name) {
      return characteristic;
    }
    else if (typeof name === 'function' && ((characteristic instanceof name) || (name.UUID === characteristic.UUID))) {
      return characteristic;
    }
  }
  if (typeof name === 'function') {
    for (index in this.optionalCharacteristics) {
      characteristic = this.optionalCharacteristics[index];
      if ((characteristic instanceof name) || (name.UUID === characteristic.UUID)) {
        return this.addCharacteristic(name);
      }
    }
    //Not found in optional Characteristics. Adding anyway, but warning about it if it isn't the Name.
    if (name !== Characteristic.Name) {
      console.warn("HAP Warning: Characteristic %s not in required or optional characteristics for service %s. Adding anyway.", name.UUID, this.UUID);
      return this.addCharacteristic(name);
    }
  }
};

Service.prototype.testCharacteristic = function (name) {
  // checks for the existence of a characteristic object in the service
  var index, characteristic;
  for (index in this.characteristics) {
    characteristic = this.characteristics[index];
    if (typeof name === 'string' && characteristic.displayName === name) {
      return true;
    }
    else if (typeof name === 'function' && ((characteristic instanceof name) || (name.UUID === characteristic.UUID))) {
      return true;
    }
  }
  return false;
}

Service.prototype.setCharacteristic = function (name, value) {
  this.getCharacteristic(name).setValue(value);
  return this; // for chaining
}

// A function to only updating the remote value, but not firiring the 'set' event.
Service.prototype.updateCharacteristic = function (name, value) {
  this.getCharacteristic(name).updateValue(value);
  return this;
}

Service.prototype.addOptionalCharacteristic = function (characteristic) {
  // characteristic might be a constructor like `Characteristic.Brightness` instead of an instance
  // of Characteristic. Coerce if necessary.
  if (typeof characteristic === 'function')
    characteristic = new characteristic();

  this.optionalCharacteristics.push(characteristic);
}

Service.prototype.getCharacteristicByIID = function (iid) {
  for (var index in this.characteristics) {
    var characteristic = this.characteristics[index];
    if (characteristic.iid === iid)
      return characteristic;
  }
}

Service.prototype._assignIDs = function (identifierCache, accessoryName, baseIID) {
  if (baseIID === undefined) {
    baseIID = 0;
  }
  // the Accessory Information service must have a (reserved by IdentifierCache) ID of 1
  if (this.UUID === '0000003E-0000-1000-8000-0026BB765291') {
    this.iid = 1;
  }
  else {
    // assign our own ID based on our UUID
    this.iid = baseIID + identifierCache.getIID(accessoryName, this.UUID, this.subtype);
  }

  // assign IIDs to our Characteristics
  for (var index in this.characteristics) {
    var characteristic = this.characteristics[index];
    characteristic._assignID(identifierCache, accessoryName, this.UUID, this.subtype);
  }
}

/**
 * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
 */
Service.prototype.toHAP = function (opt) {

  var characteristicsHAP = [];

  for (var index in this.characteristics) {
    var characteristic = this.characteristics[index];
    characteristicsHAP.push(characteristic.toHAP(opt));
  }

  var hap = {
    iid: this.iid,
    type: this.UUID,
    characteristics: characteristicsHAP
  };

  if (this.isPrimaryService !== undefined) {
    hap['primary'] = this.isPrimaryService;
  }

  if (this.isHiddenService !== undefined) {
    hap['hidden'] = this.isHiddenService;
  }

  if (this.linkedServices.length > 0) {
    hap['linked'] = [];
    for (var index in this.linkedServices) {
      var otherService = this.linkedServices[index];
      hap['linked'].push(otherService.iid);
    }
  }

  return hap;
}

Service.prototype._setupCharacteristic = function (characteristic) {
  // listen for changes in characteristics and bubble them up
  characteristic.on('change', function (change) {
    // make a new object with the relevant characteristic added, and bubble it up
    this.emit('characteristic-change', clone(change, { characteristic: characteristic }));
  }.bind(this));
}

Service.prototype._sideloadCharacteristics = function (targetCharacteristics) {
  for (var index in targetCharacteristics) {
    var target = targetCharacteristics[index];
    this._setupCharacteristic(target);
  }

  this.characteristics = targetCharacteristics.slice();
}


/***/ }),

/***/ "../node_modules/hap-nodejs/lib/gen/HomeKitTypes-Bridge.js":
/*!*****************************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/gen/HomeKitTypes-Bridge.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Removed from new HAS

var inherits = __webpack_require__(/*! util */ "../node_modules/util/util.js").inherits;
var Characteristic = __webpack_require__(/*! ../Characteristic */ "../node_modules/hap-nodejs/lib/Characteristic.js").Characteristic;
var Service = __webpack_require__(/*! ../Service */ "../node_modules/hap-nodejs/lib/Service.js").Service;

/**
 * 
 * Removed in IOS 11
 * 
 */

/**
 * Characteristic "App Matching Identifier"
 */

Characteristic.AppMatchingIdentifier = function() {
  Characteristic.call(this, 'App Matching Identifier', '000000A4-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AppMatchingIdentifier, Characteristic);

Characteristic.AppMatchingIdentifier.UUID = '000000A4-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Programmable Switch Output State"
 */

Characteristic.ProgrammableSwitchOutputState = function() {
  Characteristic.call(this, 'Programmable Switch Output State', '00000074-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ProgrammableSwitchOutputState, Characteristic);

Characteristic.ProgrammableSwitchOutputState.UUID = '00000074-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Software Revision"
 */

Characteristic.SoftwareRevision = function() {
  Characteristic.call(this, 'Software Revision', '00000054-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SoftwareRevision, Characteristic);

Characteristic.SoftwareRevision.UUID = '00000054-0000-1000-8000-0026BB765291';

/**
 * Service "Camera Control"
 */

Service.CameraControl = function(displayName, subtype) {
  Service.call(this, displayName, '00000111-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.CurrentHorizontalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.CurrentVerticalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.TargetHorizontalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.TargetVerticalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.NightVision);
  this.addOptionalCharacteristic(Characteristic.OpticalZoom);
  this.addOptionalCharacteristic(Characteristic.DigitalZoom);
  this.addOptionalCharacteristic(Characteristic.ImageRotation);
  this.addOptionalCharacteristic(Characteristic.ImageMirroring);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.CameraControl, Service);

Service.CameraControl.UUID = '00000111-0000-1000-8000-0026BB765291';

/**
 * Service "Stateful Programmable Switch"
 */

Service.StatefulProgrammableSwitch = function(displayName, subtype) {
  Service.call(this, displayName, '00000088-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);
  this.addCharacteristic(Characteristic.ProgrammableSwitchOutputState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.StatefulProgrammableSwitch, Service);

Service.StatefulProgrammableSwitch.UUID = '00000088-0000-1000-8000-0026BB765291';


// Aliases
Characteristic.SelectedStreamConfiguration = Characteristic.SelectedRTPStreamConfiguration;
Service.Label = Service.ServiceLabel;
Characteristic.LabelNamespace = Characteristic.ServiceLabelNamespace;
Characteristic.LabelIndex = Characteristic.ServiceLabelIndex;

//Renamed Enums:
Characteristic.TargetHumidifierDehumidifierState.AUTO = 0; //Is Now HUMIDIFIER_OR_DEHUMIDIFIER







/**
 * 
 * Removed in IOS 10
 * 
 */

/**
 * Characteristic "Accessory Identifier"
 */

Characteristic.AccessoryIdentifier = function() {
  Characteristic.call(this, 'Accessory Identifier', '00000057-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AccessoryIdentifier, Characteristic);

Characteristic.AccessoryIdentifier.UUID = '00000057-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Category"
 */

Characteristic.Category = function() {
  Characteristic.call(this, 'Category', '000000A3-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT16,
    maxValue: 16,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Category, Characteristic);

Characteristic.Category.UUID = '000000A3-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Configure Bridged Accessory"
 */

Characteristic.ConfigureBridgedAccessory = function() {
  Characteristic.call(this, 'Configure Bridged Accessory', '000000A0-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ConfigureBridgedAccessory, Characteristic);

Characteristic.ConfigureBridgedAccessory.UUID = '000000A0-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Configure Bridged Accessory Status"
 */

Characteristic.ConfigureBridgedAccessoryStatus = function() {
  Characteristic.call(this, 'Configure Bridged Accessory Status', '0000009D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ConfigureBridgedAccessoryStatus, Characteristic);

Characteristic.ConfigureBridgedAccessoryStatus.UUID = '0000009D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Time"
 */

Characteristic.CurrentTime = function() {
  Characteristic.call(this, 'Current Time', '0000009B-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentTime, Characteristic);

Characteristic.CurrentTime.UUID = '0000009B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Day of the Week"
 */

Characteristic.DayoftheWeek = function() {
  Characteristic.call(this, 'Day of the Week', '00000098-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 7,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.DayoftheWeek, Characteristic);

Characteristic.DayoftheWeek.UUID = '00000098-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Discover Bridged Accessories"
 */

Characteristic.DiscoverBridgedAccessories = function() {
  Characteristic.call(this, 'Discover Bridged Accessories', '0000009E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.DiscoverBridgedAccessories, Characteristic);

Characteristic.DiscoverBridgedAccessories.UUID = '0000009E-0000-1000-8000-0026BB765291';

// The value property of DiscoverBridgedAccessories must be one of the following:
Characteristic.DiscoverBridgedAccessories.START_DISCOVERY = 0;
Characteristic.DiscoverBridgedAccessories.STOP_DISCOVERY = 1;

/**
 * Characteristic "Discovered Bridged Accessories"
 */

Characteristic.DiscoveredBridgedAccessories = function() {
  Characteristic.call(this, 'Discovered Bridged Accessories', '0000009F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT16,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.DiscoveredBridgedAccessories, Characteristic);

Characteristic.DiscoveredBridgedAccessories.UUID = '0000009F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Link Quality"
 */

Characteristic.LinkQuality = function() {
  Characteristic.call(this, 'Link Quality', '0000009C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 4,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LinkQuality, Characteristic);

Characteristic.LinkQuality.UUID = '0000009C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Reachable"
 */

Characteristic.Reachable = function() {
  Characteristic.call(this, 'Reachable', '00000063-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Reachable, Characteristic);

Characteristic.Reachable.UUID = '00000063-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Relay Control Point"
 */

Characteristic.RelayControlPoint = function() {
  Characteristic.call(this, 'Relay Control Point', '0000005E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RelayControlPoint, Characteristic);

Characteristic.RelayControlPoint.UUID = '0000005E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Relay Enabled"
 */

Characteristic.RelayEnabled = function() {
  Characteristic.call(this, 'Relay Enabled', '0000005B-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RelayEnabled, Characteristic);

Characteristic.RelayEnabled.UUID = '0000005B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Relay State"
 */

Characteristic.RelayState = function() {
  Characteristic.call(this, 'Relay State', '0000005C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RelayState, Characteristic);

Characteristic.RelayState.UUID = '0000005C-0000-1000-8000-0026BB765291';


/**
 * Characteristic "Time Update"
 */

Characteristic.TimeUpdate = function() {
  Characteristic.call(this, 'Time Update', '0000009A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TimeUpdate, Characteristic);

Characteristic.TimeUpdate.UUID = '0000009A-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunnel Connection Timeout "
 */

Characteristic.TunnelConnectionTimeout = function() {
  Characteristic.call(this, 'Tunnel Connection Timeout ', '00000061-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TunnelConnectionTimeout, Characteristic);

Characteristic.TunnelConnectionTimeout.UUID = '00000061-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory Advertising"
 */

Characteristic.TunneledAccessoryAdvertising = function() {
  Characteristic.call(this, 'Tunneled Accessory Advertising', '00000060-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TunneledAccessoryAdvertising, Characteristic);

Characteristic.TunneledAccessoryAdvertising.UUID = '00000060-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory Connected"
 */

Characteristic.TunneledAccessoryConnected = function() {
  Characteristic.call(this, 'Tunneled Accessory Connected', '00000059-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TunneledAccessoryConnected, Characteristic);

Characteristic.TunneledAccessoryConnected.UUID = '00000059-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory State Number"
 */

Characteristic.TunneledAccessoryStateNumber = function() {
  Characteristic.call(this, 'Tunneled Accessory State Number', '00000058-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TunneledAccessoryStateNumber, Characteristic);

Characteristic.TunneledAccessoryStateNumber.UUID = '00000058-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Version"
 */

Characteristic.Version = function() {
  Characteristic.call(this, 'Version', '00000037-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Version, Characteristic);

Characteristic.Version.UUID = '00000037-0000-1000-8000-0026BB765291';

/**
 * Service "Bridge Configuration"
 */

Service.BridgeConfiguration = function(displayName, subtype) {
  Service.call(this, displayName, '000000A1-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ConfigureBridgedAccessoryStatus);
  this.addCharacteristic(Characteristic.DiscoverBridgedAccessories);
  this.addCharacteristic(Characteristic.DiscoveredBridgedAccessories);
  this.addCharacteristic(Characteristic.ConfigureBridgedAccessory);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.BridgeConfiguration, Service);

Service.BridgeConfiguration.UUID = '000000A1-0000-1000-8000-0026BB765291';

/**
 * Service "Bridging State"
 */

Service.BridgingState = function(displayName, subtype) {
  Service.call(this, displayName, '00000062-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Reachable);
  this.addCharacteristic(Characteristic.LinkQuality);
  this.addCharacteristic(Characteristic.AccessoryIdentifier);
  this.addCharacteristic(Characteristic.Category);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.BridgingState, Service);

Service.BridgingState.UUID = '00000062-0000-1000-8000-0026BB765291';

/**
 * Service "Pairing"
 */

Service.Pairing = function(displayName, subtype) {
  Service.call(this, displayName, '00000055-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.PairSetup);
  this.addCharacteristic(Characteristic.PairVerify);
  this.addCharacteristic(Characteristic.PairingFeatures);
  this.addCharacteristic(Characteristic.PairingPairings);

  // Optional Characteristics
};

inherits(Service.Pairing, Service);

Service.Pairing.UUID = '00000055-0000-1000-8000-0026BB765291';

/**
 * Service "Protocol Information"
 */

Service.ProtocolInformation = function(displayName, subtype) {
  Service.call(this, displayName, '000000A2-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Version);

  // Optional Characteristics
};

inherits(Service.ProtocolInformation, Service);

Service.ProtocolInformation.UUID = '000000A2-0000-1000-8000-0026BB765291';

/**
 * Service "Relay"
 */

Service.Relay = function(displayName, subtype) {
  Service.call(this, displayName, '0000005A-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.RelayEnabled);
  this.addCharacteristic(Characteristic.RelayState);
  this.addCharacteristic(Characteristic.RelayControlPoint);

  // Optional Characteristics
};

inherits(Service.Relay, Service);

Service.Relay.UUID = '0000005A-0000-1000-8000-0026BB765291';

/**
 * Service "Time Information"
 */

Service.TimeInformation = function(displayName, subtype) {
  Service.call(this, displayName, '00000099-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentTime);
  this.addCharacteristic(Characteristic.DayoftheWeek);
  this.addCharacteristic(Characteristic.TimeUpdate);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.TimeInformation, Service);

Service.TimeInformation.UUID = '00000099-0000-1000-8000-0026BB765291';

/**
 * Service "Tunneled BTLE Accessory Service"
 */

Service.TunneledBTLEAccessoryService = function(displayName, subtype) {
  Service.call(this, displayName, '00000056-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Name);
  this.addCharacteristic(Characteristic.AccessoryIdentifier);
  this.addCharacteristic(Characteristic.TunneledAccessoryStateNumber);
  this.addCharacteristic(Characteristic.TunneledAccessoryConnected);
  this.addCharacteristic(Characteristic.TunneledAccessoryAdvertising);
  this.addCharacteristic(Characteristic.TunnelConnectionTimeout);

  // Optional Characteristics
};

inherits(Service.TunneledBTLEAccessoryService, Service);

Service.TunneledBTLEAccessoryService.UUID = '00000056-0000-1000-8000-0026BB765291';


/***/ }),

/***/ "../node_modules/hap-nodejs/lib/gen/HomeKitTypes.js":
/*!**********************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/gen/HomeKitTypes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY

var inherits = __webpack_require__(/*! util */ "../node_modules/util/util.js").inherits;
var Characteristic = __webpack_require__(/*! ../Characteristic */ "../node_modules/hap-nodejs/lib/Characteristic.js").Characteristic;
var Service = __webpack_require__(/*! ../Service */ "../node_modules/hap-nodejs/lib/Service.js").Service;

/**
 * Characteristic "Accessory Flags"
 */

Characteristic.AccessoryFlags = function() {
  Characteristic.call(this, 'Accessory Flags', '000000A6-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AccessoryFlags, Characteristic);

Characteristic.AccessoryFlags.UUID = '000000A6-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Active"
 */

Characteristic.Active = function() {
  Characteristic.call(this, 'Active', '000000B0-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Active, Characteristic);

Characteristic.Active.UUID = '000000B0-0000-1000-8000-0026BB765291';

// The value property of Active must be one of the following:
Characteristic.Active.INACTIVE = 0;
Characteristic.Active.ACTIVE = 1;

/**
 * Characteristic "Administrator Only Access"
 */

Characteristic.AdministratorOnlyAccess = function() {
  Characteristic.call(this, 'Administrator Only Access', '00000001-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AdministratorOnlyAccess, Characteristic);

Characteristic.AdministratorOnlyAccess.UUID = '00000001-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Air Particulate Density"
 */

Characteristic.AirParticulateDensity = function() {
  Characteristic.call(this, 'Air Particulate Density', '00000064-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AirParticulateDensity, Characteristic);

Characteristic.AirParticulateDensity.UUID = '00000064-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Air Particulate Size"
 */

Characteristic.AirParticulateSize = function() {
  Characteristic.call(this, 'Air Particulate Size', '00000065-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AirParticulateSize, Characteristic);

Characteristic.AirParticulateSize.UUID = '00000065-0000-1000-8000-0026BB765291';

// The value property of AirParticulateSize must be one of the following:
Characteristic.AirParticulateSize._2_5_M = 0;
Characteristic.AirParticulateSize._10_M = 1;

/**
 * Characteristic "Air Quality"
 */

Characteristic.AirQuality = function() {
  Characteristic.call(this, 'Air Quality', '00000095-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 5,
    minValue: 0,
    validValues: [0,1,2,3,4,5],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AirQuality, Characteristic);

Characteristic.AirQuality.UUID = '00000095-0000-1000-8000-0026BB765291';

// The value property of AirQuality must be one of the following:
Characteristic.AirQuality.UNKNOWN = 0;
Characteristic.AirQuality.EXCELLENT = 1;
Characteristic.AirQuality.GOOD = 2;
Characteristic.AirQuality.FAIR = 3;
Characteristic.AirQuality.INFERIOR = 4;
Characteristic.AirQuality.POOR = 5;

/**
 * Characteristic "Audio Feedback"
 */

Characteristic.AudioFeedback = function() {
  Characteristic.call(this, 'Audio Feedback', '00000005-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.AudioFeedback, Characteristic);

Characteristic.AudioFeedback.UUID = '00000005-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Battery Level"
 */

Characteristic.BatteryLevel = function() {
  Characteristic.call(this, 'Battery Level', '00000068-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.BatteryLevel, Characteristic);

Characteristic.BatteryLevel.UUID = '00000068-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Brightness"
 */

Characteristic.Brightness = function() {
  Characteristic.call(this, 'Brightness', '00000008-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Brightness, Characteristic);

Characteristic.Brightness.UUID = '00000008-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Dioxide Detected"
 */

Characteristic.CarbonDioxideDetected = function() {
  Characteristic.call(this, 'Carbon Dioxide Detected', '00000092-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonDioxideDetected, Characteristic);

Characteristic.CarbonDioxideDetected.UUID = '00000092-0000-1000-8000-0026BB765291';

// The value property of CarbonDioxideDetected must be one of the following:
Characteristic.CarbonDioxideDetected.CO2_LEVELS_NORMAL = 0;
Characteristic.CarbonDioxideDetected.CO2_LEVELS_ABNORMAL = 1;

/**
 * Characteristic "Carbon Dioxide Level"
 */

Characteristic.CarbonDioxideLevel = function() {
  Characteristic.call(this, 'Carbon Dioxide Level', '00000093-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100000,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonDioxideLevel, Characteristic);

Characteristic.CarbonDioxideLevel.UUID = '00000093-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Dioxide Peak Level"
 */

Characteristic.CarbonDioxidePeakLevel = function() {
  Characteristic.call(this, 'Carbon Dioxide Peak Level', '00000094-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100000,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonDioxidePeakLevel, Characteristic);

Characteristic.CarbonDioxidePeakLevel.UUID = '00000094-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Monoxide Detected"
 */

Characteristic.CarbonMonoxideDetected = function() {
  Characteristic.call(this, 'Carbon Monoxide Detected', '00000069-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonMonoxideDetected, Characteristic);

Characteristic.CarbonMonoxideDetected.UUID = '00000069-0000-1000-8000-0026BB765291';

// The value property of CarbonMonoxideDetected must be one of the following:
Characteristic.CarbonMonoxideDetected.CO_LEVELS_NORMAL = 0;
Characteristic.CarbonMonoxideDetected.CO_LEVELS_ABNORMAL = 1;

/**
 * Characteristic "Carbon Monoxide Level"
 */

Characteristic.CarbonMonoxideLevel = function() {
  Characteristic.call(this, 'Carbon Monoxide Level', '00000090-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonMonoxideLevel, Characteristic);

Characteristic.CarbonMonoxideLevel.UUID = '00000090-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Monoxide Peak Level"
 */

Characteristic.CarbonMonoxidePeakLevel = function() {
  Characteristic.call(this, 'Carbon Monoxide Peak Level', '00000091-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CarbonMonoxidePeakLevel, Characteristic);

Characteristic.CarbonMonoxidePeakLevel.UUID = '00000091-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Charging State"
 */

Characteristic.ChargingState = function() {
  Characteristic.call(this, 'Charging State', '0000008F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ChargingState, Characteristic);

Characteristic.ChargingState.UUID = '0000008F-0000-1000-8000-0026BB765291';

// The value property of ChargingState must be one of the following:
Characteristic.ChargingState.NOT_CHARGING = 0;
Characteristic.ChargingState.CHARGING = 1;
Characteristic.ChargingState.NOT_CHARGEABLE = 2;

/**
 * Characteristic "Color Temperature"
 */

Characteristic.ColorTemperature = function() {
  Characteristic.call(this, 'Color Temperature', '000000CE-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    maxValue: 500,
    minValue: 140,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ColorTemperature, Characteristic);

Characteristic.ColorTemperature.UUID = '000000CE-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Contact Sensor State"
 */

Characteristic.ContactSensorState = function() {
  Characteristic.call(this, 'Contact Sensor State', '0000006A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ContactSensorState, Characteristic);

Characteristic.ContactSensorState.UUID = '0000006A-0000-1000-8000-0026BB765291';

// The value property of ContactSensorState must be one of the following:
Characteristic.ContactSensorState.CONTACT_DETECTED = 0;
Characteristic.ContactSensorState.CONTACT_NOT_DETECTED = 1;

/**
 * Characteristic "Cooling Threshold Temperature"
 */

Characteristic.CoolingThresholdTemperature = function() {
  Characteristic.call(this, 'Cooling Threshold Temperature', '0000000D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.CELSIUS,
    maxValue: 35,
    minValue: 10,
    minStep: 0.1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CoolingThresholdTemperature, Characteristic);

Characteristic.CoolingThresholdTemperature.UUID = '0000000D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Air Purifier State"
 */

Characteristic.CurrentAirPurifierState = function() {
  Characteristic.call(this, 'Current Air Purifier State', '000000A9-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentAirPurifierState, Characteristic);

Characteristic.CurrentAirPurifierState.UUID = '000000A9-0000-1000-8000-0026BB765291';

// The value property of CurrentAirPurifierState must be one of the following:
Characteristic.CurrentAirPurifierState.INACTIVE = 0;
Characteristic.CurrentAirPurifierState.IDLE = 1;
Characteristic.CurrentAirPurifierState.PURIFYING_AIR = 2;

/**
 * Characteristic "Current Ambient Light Level"
 */

Characteristic.CurrentAmbientLightLevel = function() {
  Characteristic.call(this, 'Current Ambient Light Level', '0000006B-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.LUX,
    maxValue: 100000,
    minValue: 0.0001,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentAmbientLightLevel, Characteristic);

Characteristic.CurrentAmbientLightLevel.UUID = '0000006B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Door State"
 */

Characteristic.CurrentDoorState = function() {
  Characteristic.call(this, 'Current Door State', '0000000E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 4,
    minValue: 0,
    validValues: [0,1,2,3,4],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentDoorState, Characteristic);

Characteristic.CurrentDoorState.UUID = '0000000E-0000-1000-8000-0026BB765291';

// The value property of CurrentDoorState must be one of the following:
Characteristic.CurrentDoorState.OPEN = 0;
Characteristic.CurrentDoorState.CLOSED = 1;
Characteristic.CurrentDoorState.OPENING = 2;
Characteristic.CurrentDoorState.CLOSING = 3;
Characteristic.CurrentDoorState.STOPPED = 4;

/**
 * Characteristic "Current Fan State"
 */

Characteristic.CurrentFanState = function() {
  Characteristic.call(this, 'Current Fan State', '000000AF-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentFanState, Characteristic);

Characteristic.CurrentFanState.UUID = '000000AF-0000-1000-8000-0026BB765291';

// The value property of CurrentFanState must be one of the following:
Characteristic.CurrentFanState.INACTIVE = 0;
Characteristic.CurrentFanState.IDLE = 1;
Characteristic.CurrentFanState.BLOWING_AIR = 2;

/**
 * Characteristic "Current Heater Cooler State"
 */

Characteristic.CurrentHeaterCoolerState = function() {
  Characteristic.call(this, 'Current Heater Cooler State', '000000B1-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentHeaterCoolerState, Characteristic);

Characteristic.CurrentHeaterCoolerState.UUID = '000000B1-0000-1000-8000-0026BB765291';

// The value property of CurrentHeaterCoolerState must be one of the following:
Characteristic.CurrentHeaterCoolerState.INACTIVE = 0;
Characteristic.CurrentHeaterCoolerState.IDLE = 1;
Characteristic.CurrentHeaterCoolerState.HEATING = 2;
Characteristic.CurrentHeaterCoolerState.COOLING = 3;

/**
 * Characteristic "Current Heating Cooling State"
 */

Characteristic.CurrentHeatingCoolingState = function() {
  Characteristic.call(this, 'Current Heating Cooling State', '0000000F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentHeatingCoolingState, Characteristic);

Characteristic.CurrentHeatingCoolingState.UUID = '0000000F-0000-1000-8000-0026BB765291';

// The value property of CurrentHeatingCoolingState must be one of the following:
Characteristic.CurrentHeatingCoolingState.OFF = 0;
Characteristic.CurrentHeatingCoolingState.HEAT = 1;
Characteristic.CurrentHeatingCoolingState.COOL = 2;

/**
 * Characteristic "Current Horizontal Tilt Angle"
 */

Characteristic.CurrentHorizontalTiltAngle = function() {
  Characteristic.call(this, 'Current Horizontal Tilt Angle', '0000006C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentHorizontalTiltAngle, Characteristic);

Characteristic.CurrentHorizontalTiltAngle.UUID = '0000006C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Humidifier Dehumidifier State"
 */

Characteristic.CurrentHumidifierDehumidifierState = function() {
  Characteristic.call(this, 'Current Humidifier Dehumidifier State', '000000B3-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentHumidifierDehumidifierState, Characteristic);

Characteristic.CurrentHumidifierDehumidifierState.UUID = '000000B3-0000-1000-8000-0026BB765291';

// The value property of CurrentHumidifierDehumidifierState must be one of the following:
Characteristic.CurrentHumidifierDehumidifierState.INACTIVE = 0;
Characteristic.CurrentHumidifierDehumidifierState.IDLE = 1;
Characteristic.CurrentHumidifierDehumidifierState.HUMIDIFYING = 2;
Characteristic.CurrentHumidifierDehumidifierState.DEHUMIDIFYING = 3;

/**
 * Characteristic "Current Position"
 */

Characteristic.CurrentPosition = function() {
  Characteristic.call(this, 'Current Position', '0000006D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentPosition, Characteristic);

Characteristic.CurrentPosition.UUID = '0000006D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Relative Humidity"
 */

Characteristic.CurrentRelativeHumidity = function() {
  Characteristic.call(this, 'Current Relative Humidity', '00000010-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentRelativeHumidity, Characteristic);

Characteristic.CurrentRelativeHumidity.UUID = '00000010-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Slat State"
 */

Characteristic.CurrentSlatState = function() {
  Characteristic.call(this, 'Current Slat State', '000000AA-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentSlatState, Characteristic);

Characteristic.CurrentSlatState.UUID = '000000AA-0000-1000-8000-0026BB765291';

// The value property of CurrentSlatState must be one of the following:
Characteristic.CurrentSlatState.FIXED = 0;
Characteristic.CurrentSlatState.JAMMED = 1;
Characteristic.CurrentSlatState.SWINGING = 2;

/**
 * Characteristic "Current Temperature"
 */

Characteristic.CurrentTemperature = function() {
  Characteristic.call(this, 'Current Temperature', '00000011-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.CELSIUS,
    maxValue: 100,
    minValue: 0,
    minStep: 0.1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentTemperature, Characteristic);

Characteristic.CurrentTemperature.UUID = '00000011-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Tilt Angle"
 */

Characteristic.CurrentTiltAngle = function() {
  Characteristic.call(this, 'Current Tilt Angle', '000000C1-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentTiltAngle, Characteristic);

Characteristic.CurrentTiltAngle.UUID = '000000C1-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Vertical Tilt Angle"
 */

Characteristic.CurrentVerticalTiltAngle = function() {
  Characteristic.call(this, 'Current Vertical Tilt Angle', '0000006E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.CurrentVerticalTiltAngle, Characteristic);

Characteristic.CurrentVerticalTiltAngle.UUID = '0000006E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Digital Zoom"
 */

Characteristic.DigitalZoom = function() {
  Characteristic.call(this, 'Digital Zoom', '0000011D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.DigitalZoom, Characteristic);

Characteristic.DigitalZoom.UUID = '0000011D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Filter Change Indication"
 */

Characteristic.FilterChangeIndication = function() {
  Characteristic.call(this, 'Filter Change Indication', '000000AC-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.FilterChangeIndication, Characteristic);

Characteristic.FilterChangeIndication.UUID = '000000AC-0000-1000-8000-0026BB765291';

// The value property of FilterChangeIndication must be one of the following:
Characteristic.FilterChangeIndication.FILTER_OK = 0;
Characteristic.FilterChangeIndication.CHANGE_FILTER = 1;

/**
 * Characteristic "Filter Life Level"
 */

Characteristic.FilterLifeLevel = function() {
  Characteristic.call(this, 'Filter Life Level', '000000AB-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.FilterLifeLevel, Characteristic);

Characteristic.FilterLifeLevel.UUID = '000000AB-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Firmware Revision"
 */

Characteristic.FirmwareRevision = function() {
  Characteristic.call(this, 'Firmware Revision', '00000052-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.FirmwareRevision, Characteristic);

Characteristic.FirmwareRevision.UUID = '00000052-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hardware Revision"
 */

Characteristic.HardwareRevision = function() {
  Characteristic.call(this, 'Hardware Revision', '00000053-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.HardwareRevision, Characteristic);

Characteristic.HardwareRevision.UUID = '00000053-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Heating Threshold Temperature"
 */

Characteristic.HeatingThresholdTemperature = function() {
  Characteristic.call(this, 'Heating Threshold Temperature', '00000012-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.CELSIUS,
    maxValue: 25,
    minValue: 0,
    minStep: 0.1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.HeatingThresholdTemperature, Characteristic);

Characteristic.HeatingThresholdTemperature.UUID = '00000012-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hold Position"
 */

Characteristic.HoldPosition = function() {
  Characteristic.call(this, 'Hold Position', '0000006F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.HoldPosition, Characteristic);

Characteristic.HoldPosition.UUID = '0000006F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hue"
 */

Characteristic.Hue = function() {
  Characteristic.call(this, 'Hue', '00000013-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 360,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Hue, Characteristic);

Characteristic.Hue.UUID = '00000013-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Identify"
 */

Characteristic.Identify = function() {
  Characteristic.call(this, 'Identify', '00000014-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Identify, Characteristic);

Characteristic.Identify.UUID = '00000014-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Image Mirroring"
 */

Characteristic.ImageMirroring = function() {
  Characteristic.call(this, 'Image Mirroring', '0000011F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ImageMirroring, Characteristic);

Characteristic.ImageMirroring.UUID = '0000011F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Image Rotation"
 */

Characteristic.ImageRotation = function() {
  Characteristic.call(this, 'Image Rotation', '0000011E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 270,
    minValue: 0,
    minStep: 90,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ImageRotation, Characteristic);

Characteristic.ImageRotation.UUID = '0000011E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "In Use"
 */

Characteristic.InUse = function() {
  Characteristic.call(this, 'In Use', '000000D2-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.InUse, Characteristic);

Characteristic.InUse.UUID = '000000D2-0000-1000-8000-0026BB765291';

// The value property of InUse must be one of the following:
Characteristic.InUse.NOT_IN_USE = 0;
Characteristic.InUse.IN_USE = 1;

/**
 * Characteristic "Is Configured"
 */

Characteristic.IsConfigured = function() {
  Characteristic.call(this, 'Is Configured', '000000D6-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.IsConfigured, Characteristic);

Characteristic.IsConfigured.UUID = '000000D6-0000-1000-8000-0026BB765291';

// The value property of IsConfigured must be one of the following:
Characteristic.IsConfigured.NOT_CONFIGURED = 0;
Characteristic.IsConfigured.CONFIGURED = 1;

/**
 * Characteristic "Leak Detected"
 */

Characteristic.LeakDetected = function() {
  Characteristic.call(this, 'Leak Detected', '00000070-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LeakDetected, Characteristic);

Characteristic.LeakDetected.UUID = '00000070-0000-1000-8000-0026BB765291';

// The value property of LeakDetected must be one of the following:
Characteristic.LeakDetected.LEAK_NOT_DETECTED = 0;
Characteristic.LeakDetected.LEAK_DETECTED = 1;

/**
 * Characteristic "Lock Control Point"
 */

Characteristic.LockControlPoint = function() {
  Characteristic.call(this, 'Lock Control Point', '00000019-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockControlPoint, Characteristic);

Characteristic.LockControlPoint.UUID = '00000019-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Lock Current State"
 */

Characteristic.LockCurrentState = function() {
  Characteristic.call(this, 'Lock Current State', '0000001D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockCurrentState, Characteristic);

Characteristic.LockCurrentState.UUID = '0000001D-0000-1000-8000-0026BB765291';

// The value property of LockCurrentState must be one of the following:
Characteristic.LockCurrentState.UNSECURED = 0;
Characteristic.LockCurrentState.SECURED = 1;
Characteristic.LockCurrentState.JAMMED = 2;
Characteristic.LockCurrentState.UNKNOWN = 3;

/**
 * Characteristic "Lock Last Known Action"
 */

Characteristic.LockLastKnownAction = function() {
  Characteristic.call(this, 'Lock Last Known Action', '0000001C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 8,
    minValue: 0,
    validValues: [0,1,2,3,4,5,6,7,8],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockLastKnownAction, Characteristic);

Characteristic.LockLastKnownAction.UUID = '0000001C-0000-1000-8000-0026BB765291';

// The value property of LockLastKnownAction must be one of the following:
Characteristic.LockLastKnownAction.SECURED_PHYSICALLY_INTERIOR = 0;
Characteristic.LockLastKnownAction.UNSECURED_PHYSICALLY_INTERIOR = 1;
Characteristic.LockLastKnownAction.SECURED_PHYSICALLY_EXTERIOR = 2;
Characteristic.LockLastKnownAction.UNSECURED_PHYSICALLY_EXTERIOR = 3;
Characteristic.LockLastKnownAction.SECURED_BY_KEYPAD = 4;
Characteristic.LockLastKnownAction.UNSECURED_BY_KEYPAD = 5;
Characteristic.LockLastKnownAction.SECURED_REMOTELY = 6;
Characteristic.LockLastKnownAction.UNSECURED_REMOTELY = 7;
Characteristic.LockLastKnownAction.SECURED_BY_AUTO_SECURE_TIMEOUT = 8;

/**
 * Characteristic "Lock Management Auto Security Timeout"
 */

Characteristic.LockManagementAutoSecurityTimeout = function() {
  Characteristic.call(this, 'Lock Management Auto Security Timeout', '0000001A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    unit: Characteristic.Units.SECONDS,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockManagementAutoSecurityTimeout, Characteristic);

Characteristic.LockManagementAutoSecurityTimeout.UUID = '0000001A-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Lock Physical Controls"
 */

Characteristic.LockPhysicalControls = function() {
  Characteristic.call(this, 'Lock Physical Controls', '000000A7-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockPhysicalControls, Characteristic);

Characteristic.LockPhysicalControls.UUID = '000000A7-0000-1000-8000-0026BB765291';

// The value property of LockPhysicalControls must be one of the following:
Characteristic.LockPhysicalControls.CONTROL_LOCK_DISABLED = 0;
Characteristic.LockPhysicalControls.CONTROL_LOCK_ENABLED = 1;

/**
 * Characteristic "Lock Target State"
 */

Characteristic.LockTargetState = function() {
  Characteristic.call(this, 'Lock Target State', '0000001E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.LockTargetState, Characteristic);

Characteristic.LockTargetState.UUID = '0000001E-0000-1000-8000-0026BB765291';

// The value property of LockTargetState must be one of the following:
Characteristic.LockTargetState.UNSECURED = 0;
Characteristic.LockTargetState.SECURED = 1;

/**
 * Characteristic "Logs"
 */

Characteristic.Logs = function() {
  Characteristic.call(this, 'Logs', '0000001F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Logs, Characteristic);

Characteristic.Logs.UUID = '0000001F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Manufacturer"
 */

Characteristic.Manufacturer = function() {
  Characteristic.call(this, 'Manufacturer', '00000020-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Manufacturer, Characteristic);

Characteristic.Manufacturer.UUID = '00000020-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Model"
 */

Characteristic.Model = function() {
  Characteristic.call(this, 'Model', '00000021-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Model, Characteristic);

Characteristic.Model.UUID = '00000021-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Motion Detected"
 */

Characteristic.MotionDetected = function() {
  Characteristic.call(this, 'Motion Detected', '00000022-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.MotionDetected, Characteristic);

Characteristic.MotionDetected.UUID = '00000022-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Mute"
 */

Characteristic.Mute = function() {
  Characteristic.call(this, 'Mute', '0000011A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Mute, Characteristic);

Characteristic.Mute.UUID = '0000011A-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Name"
 */

Characteristic.Name = function() {
  Characteristic.call(this, 'Name', '00000023-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Name, Characteristic);

Characteristic.Name.UUID = '00000023-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Night Vision"
 */

Characteristic.NightVision = function() {
  Characteristic.call(this, 'Night Vision', '0000011B-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.NightVision, Characteristic);

Characteristic.NightVision.UUID = '0000011B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Nitrogen Dioxide Density"
 */

Characteristic.NitrogenDioxideDensity = function() {
  Characteristic.call(this, 'Nitrogen Dioxide Density', '000000C4-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.NitrogenDioxideDensity, Characteristic);

Characteristic.NitrogenDioxideDensity.UUID = '000000C4-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Obstruction Detected"
 */

Characteristic.ObstructionDetected = function() {
  Characteristic.call(this, 'Obstruction Detected', '00000024-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ObstructionDetected, Characteristic);

Characteristic.ObstructionDetected.UUID = '00000024-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Occupancy Detected"
 */

Characteristic.OccupancyDetected = function() {
  Characteristic.call(this, 'Occupancy Detected', '00000071-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.OccupancyDetected, Characteristic);

Characteristic.OccupancyDetected.UUID = '00000071-0000-1000-8000-0026BB765291';

// The value property of OccupancyDetected must be one of the following:
Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED = 0;
Characteristic.OccupancyDetected.OCCUPANCY_DETECTED = 1;

/**
 * Characteristic "On"
 */

Characteristic.On = function() {
  Characteristic.call(this, 'On', '00000025-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.On, Characteristic);

Characteristic.On.UUID = '00000025-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Optical Zoom"
 */

Characteristic.OpticalZoom = function() {
  Characteristic.call(this, 'Optical Zoom', '0000011C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.OpticalZoom, Characteristic);

Characteristic.OpticalZoom.UUID = '0000011C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Outlet In Use"
 */

Characteristic.OutletInUse = function() {
  Characteristic.call(this, 'Outlet In Use', '00000026-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.OutletInUse, Characteristic);

Characteristic.OutletInUse.UUID = '00000026-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Ozone Density"
 */

Characteristic.OzoneDensity = function() {
  Characteristic.call(this, 'Ozone Density', '000000C3-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.OzoneDensity, Characteristic);

Characteristic.OzoneDensity.UUID = '000000C3-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pair Setup"
 */

Characteristic.PairSetup = function() {
  Characteristic.call(this, 'Pair Setup', '0000004C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PairSetup, Characteristic);

Characteristic.PairSetup.UUID = '0000004C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pair Verify"
 */

Characteristic.PairVerify = function() {
  Characteristic.call(this, 'Pair Verify', '0000004E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PairVerify, Characteristic);

Characteristic.PairVerify.UUID = '0000004E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pairing Features"
 */

Characteristic.PairingFeatures = function() {
  Characteristic.call(this, 'Pairing Features', '0000004F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PairingFeatures, Characteristic);

Characteristic.PairingFeatures.UUID = '0000004F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pairing Pairings"
 */

Characteristic.PairingPairings = function() {
  Characteristic.call(this, 'Pairing Pairings', '00000050-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PairingPairings, Characteristic);

Characteristic.PairingPairings.UUID = '00000050-0000-1000-8000-0026BB765291';

/**
 * Characteristic "PM10 Density"
 */

Characteristic.PM10Density = function() {
  Characteristic.call(this, 'PM10 Density', '000000C7-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PM10Density, Characteristic);

Characteristic.PM10Density.UUID = '000000C7-0000-1000-8000-0026BB765291';

/**
 * Characteristic "PM2.5 Density"
 */

Characteristic.PM2_5Density = function() {
  Characteristic.call(this, 'PM2.5 Density', '000000C6-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PM2_5Density, Characteristic);

Characteristic.PM2_5Density.UUID = '000000C6-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Position State"
 */

Characteristic.PositionState = function() {
  Characteristic.call(this, 'Position State', '00000072-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.PositionState, Characteristic);

Characteristic.PositionState.UUID = '00000072-0000-1000-8000-0026BB765291';

// The value property of PositionState must be one of the following:
Characteristic.PositionState.DECREASING = 0;
Characteristic.PositionState.INCREASING = 1;
Characteristic.PositionState.STOPPED = 2;

/**
 * Characteristic "Program Mode"
 */

Characteristic.ProgramMode = function() {
  Characteristic.call(this, 'Program Mode', '000000D1-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ProgramMode, Characteristic);

Characteristic.ProgramMode.UUID = '000000D1-0000-1000-8000-0026BB765291';

// The value property of ProgramMode must be one of the following:
Characteristic.ProgramMode.NO_PROGRAM_SCHEDULED = 0;
Characteristic.ProgramMode.PROGRAM_SCHEDULED = 1;
Characteristic.ProgramMode.PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;

/**
 * Characteristic "Programmable Switch Event"
 */

Characteristic.ProgrammableSwitchEvent = function() {
  Characteristic.call(this, 'Programmable Switch Event', '00000073-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.eventOnlyCharacteristic = true; //Manual addition.
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ProgrammableSwitchEvent, Characteristic);

Characteristic.ProgrammableSwitchEvent.UUID = '00000073-0000-1000-8000-0026BB765291';

// The value property of ProgrammableSwitchEvent must be one of the following:
Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS = 0;
Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS = 1;
Characteristic.ProgrammableSwitchEvent.LONG_PRESS = 2;

/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */

Characteristic.RelativeHumidityDehumidifierThreshold = function() {
  Characteristic.call(this, 'Relative Humidity Dehumidifier Threshold', '000000C9-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RelativeHumidityDehumidifierThreshold, Characteristic);

Characteristic.RelativeHumidityDehumidifierThreshold.UUID = '000000C9-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */

Characteristic.RelativeHumidityHumidifierThreshold = function() {
  Characteristic.call(this, 'Relative Humidity Humidifier Threshold', '000000CA-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RelativeHumidityHumidifierThreshold, Characteristic);

Characteristic.RelativeHumidityHumidifierThreshold.UUID = '000000CA-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Remaining Duration"
 */

Characteristic.RemainingDuration = function() {
  Characteristic.call(this, 'Remaining Duration', '000000D4-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    maxValue: 3600,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RemainingDuration, Characteristic);

Characteristic.RemainingDuration.UUID = '000000D4-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Reset Filter Indication"
 */

Characteristic.ResetFilterIndication = function() {
  Characteristic.call(this, 'Reset Filter Indication', '000000AD-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ResetFilterIndication, Characteristic);

Characteristic.ResetFilterIndication.UUID = '000000AD-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Rotation Direction"
 */

Characteristic.RotationDirection = function() {
  Characteristic.call(this, 'Rotation Direction', '00000028-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RotationDirection, Characteristic);

Characteristic.RotationDirection.UUID = '00000028-0000-1000-8000-0026BB765291';

// The value property of RotationDirection must be one of the following:
Characteristic.RotationDirection.CLOCKWISE = 0;
Characteristic.RotationDirection.COUNTER_CLOCKWISE = 1;

/**
 * Characteristic "Rotation Speed"
 */

Characteristic.RotationSpeed = function() {
  Characteristic.call(this, 'Rotation Speed', '00000029-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.RotationSpeed, Characteristic);

Characteristic.RotationSpeed.UUID = '00000029-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Saturation"
 */

Characteristic.Saturation = function() {
  Characteristic.call(this, 'Saturation', '0000002F-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Saturation, Characteristic);

Characteristic.Saturation.UUID = '0000002F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Security System Alarm Type"
 */

Characteristic.SecuritySystemAlarmType = function() {
  Characteristic.call(this, 'Security System Alarm Type', '0000008E-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SecuritySystemAlarmType, Characteristic);

Characteristic.SecuritySystemAlarmType.UUID = '0000008E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Security System Current State"
 */

Characteristic.SecuritySystemCurrentState = function() {
  Characteristic.call(this, 'Security System Current State', '00000066-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 4,
    minValue: 0,
    validValues: [0,1,2,3,4],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SecuritySystemCurrentState, Characteristic);

Characteristic.SecuritySystemCurrentState.UUID = '00000066-0000-1000-8000-0026BB765291';

// The value property of SecuritySystemCurrentState must be one of the following:
Characteristic.SecuritySystemCurrentState.STAY_ARM = 0;
Characteristic.SecuritySystemCurrentState.AWAY_ARM = 1;
Characteristic.SecuritySystemCurrentState.NIGHT_ARM = 2;
Characteristic.SecuritySystemCurrentState.DISARMED = 3;
Characteristic.SecuritySystemCurrentState.ALARM_TRIGGERED = 4;

/**
 * Characteristic "Security System Target State"
 */

Characteristic.SecuritySystemTargetState = function() {
  Characteristic.call(this, 'Security System Target State', '00000067-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SecuritySystemTargetState, Characteristic);

Characteristic.SecuritySystemTargetState.UUID = '00000067-0000-1000-8000-0026BB765291';

// The value property of SecuritySystemTargetState must be one of the following:
Characteristic.SecuritySystemTargetState.STAY_ARM = 0;
Characteristic.SecuritySystemTargetState.AWAY_ARM = 1;
Characteristic.SecuritySystemTargetState.NIGHT_ARM = 2;
Characteristic.SecuritySystemTargetState.DISARM = 3;

/**
 * Characteristic "Selected RTP Stream Configuration"
 */

Characteristic.SelectedRTPStreamConfiguration = function() {
  Characteristic.call(this, 'Selected RTP Stream Configuration', '00000117-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SelectedRTPStreamConfiguration, Characteristic);

Characteristic.SelectedRTPStreamConfiguration.UUID = '00000117-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Serial Number"
 */

Characteristic.SerialNumber = function() {
  Characteristic.call(this, 'Serial Number', '00000030-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SerialNumber, Characteristic);

Characteristic.SerialNumber.UUID = '00000030-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Service Label Index"
 */

Characteristic.ServiceLabelIndex = function() {
  Characteristic.call(this, 'Service Label Index', '000000CB-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 255,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ServiceLabelIndex, Characteristic);

Characteristic.ServiceLabelIndex.UUID = '000000CB-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Service Label Namespace"
 */

Characteristic.ServiceLabelNamespace = function() {
  Characteristic.call(this, 'Service Label Namespace', '000000CD-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ServiceLabelNamespace, Characteristic);

Characteristic.ServiceLabelNamespace.UUID = '000000CD-0000-1000-8000-0026BB765291';

// The value property of ServiceLabelNamespace must be one of the following:
Characteristic.ServiceLabelNamespace.DOTS = 0;
Characteristic.ServiceLabelNamespace.ARABIC_NUMERALS = 1;

/**
 * Characteristic "Set Duration"
 */

Characteristic.SetDuration = function() {
  Characteristic.call(this, 'Set Duration', '000000D3-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT32,
    maxValue: 3600,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SetDuration, Characteristic);

Characteristic.SetDuration.UUID = '000000D3-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Setup Endpoints"
 */

Characteristic.SetupEndpoints = function() {
  Characteristic.call(this, 'Setup Endpoints', '00000118-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SetupEndpoints, Characteristic);

Characteristic.SetupEndpoints.UUID = '00000118-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Slat Type"
 */

Characteristic.SlatType = function() {
  Characteristic.call(this, 'Slat Type', '000000C0-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SlatType, Characteristic);

Characteristic.SlatType.UUID = '000000C0-0000-1000-8000-0026BB765291';

// The value property of SlatType must be one of the following:
Characteristic.SlatType.HORIZONTAL = 0;
Characteristic.SlatType.VERTICAL = 1;

/**
 * Characteristic "Smoke Detected"
 */

Characteristic.SmokeDetected = function() {
  Characteristic.call(this, 'Smoke Detected', '00000076-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SmokeDetected, Characteristic);

Characteristic.SmokeDetected.UUID = '00000076-0000-1000-8000-0026BB765291';

// The value property of SmokeDetected must be one of the following:
Characteristic.SmokeDetected.SMOKE_NOT_DETECTED = 0;
Characteristic.SmokeDetected.SMOKE_DETECTED = 1;

/**
 * Characteristic "Status Active"
 */

Characteristic.StatusActive = function() {
  Characteristic.call(this, 'Status Active', '00000075-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.BOOL,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StatusActive, Characteristic);

Characteristic.StatusActive.UUID = '00000075-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Status Fault"
 */

Characteristic.StatusFault = function() {
  Characteristic.call(this, 'Status Fault', '00000077-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StatusFault, Characteristic);

Characteristic.StatusFault.UUID = '00000077-0000-1000-8000-0026BB765291';

// The value property of StatusFault must be one of the following:
Characteristic.StatusFault.NO_FAULT = 0;
Characteristic.StatusFault.GENERAL_FAULT = 1;

/**
 * Characteristic "Status Jammed"
 */

Characteristic.StatusJammed = function() {
  Characteristic.call(this, 'Status Jammed', '00000078-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StatusJammed, Characteristic);

Characteristic.StatusJammed.UUID = '00000078-0000-1000-8000-0026BB765291';

// The value property of StatusJammed must be one of the following:
Characteristic.StatusJammed.NOT_JAMMED = 0;
Characteristic.StatusJammed.JAMMED = 1;

/**
 * Characteristic "Status Low Battery"
 */

Characteristic.StatusLowBattery = function() {
  Characteristic.call(this, 'Status Low Battery', '00000079-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StatusLowBattery, Characteristic);

Characteristic.StatusLowBattery.UUID = '00000079-0000-1000-8000-0026BB765291';

// The value property of StatusLowBattery must be one of the following:
Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL = 0;
Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW = 1;

/**
 * Characteristic "Status Tampered"
 */

Characteristic.StatusTampered = function() {
  Characteristic.call(this, 'Status Tampered', '0000007A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StatusTampered, Characteristic);

Characteristic.StatusTampered.UUID = '0000007A-0000-1000-8000-0026BB765291';

// The value property of StatusTampered must be one of the following:
Characteristic.StatusTampered.NOT_TAMPERED = 0;
Characteristic.StatusTampered.TAMPERED = 1;

/**
 * Characteristic "Streaming Status"
 */

Characteristic.StreamingStatus = function() {
  Characteristic.call(this, 'Streaming Status', '00000120-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.StreamingStatus, Characteristic);

Characteristic.StreamingStatus.UUID = '00000120-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Sulphur Dioxide Density"
 */

Characteristic.SulphurDioxideDensity = function() {
  Characteristic.call(this, 'Sulphur Dioxide Density', '000000C5-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SulphurDioxideDensity, Characteristic);

Characteristic.SulphurDioxideDensity.UUID = '000000C5-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Supported Audio Stream Configuration"
 */

Characteristic.SupportedAudioStreamConfiguration = function() {
  Characteristic.call(this, 'Supported Audio Stream Configuration', '00000115-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SupportedAudioStreamConfiguration, Characteristic);

Characteristic.SupportedAudioStreamConfiguration.UUID = '00000115-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Supported RTP Configuration"
 */

Characteristic.SupportedRTPConfiguration = function() {
  Characteristic.call(this, 'Supported RTP Configuration', '00000116-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SupportedRTPConfiguration, Characteristic);

Characteristic.SupportedRTPConfiguration.UUID = '00000116-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Supported Video Stream Configuration"
 */

Characteristic.SupportedVideoStreamConfiguration = function() {
  Characteristic.call(this, 'Supported Video Stream Configuration', '00000114-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.TLV8,
    perms: [Characteristic.Perms.READ]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SupportedVideoStreamConfiguration, Characteristic);

Characteristic.SupportedVideoStreamConfiguration.UUID = '00000114-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Swing Mode"
 */

Characteristic.SwingMode = function() {
  Characteristic.call(this, 'Swing Mode', '000000B6-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.SwingMode, Characteristic);

Characteristic.SwingMode.UUID = '000000B6-0000-1000-8000-0026BB765291';

// The value property of SwingMode must be one of the following:
Characteristic.SwingMode.SWING_DISABLED = 0;
Characteristic.SwingMode.SWING_ENABLED = 1;

/**
 * Characteristic "Target Air Purifier State"
 */

Characteristic.TargetAirPurifierState = function() {
  Characteristic.call(this, 'Target Air Purifier State', '000000A8-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetAirPurifierState, Characteristic);

Characteristic.TargetAirPurifierState.UUID = '000000A8-0000-1000-8000-0026BB765291';

// The value property of TargetAirPurifierState must be one of the following:
Characteristic.TargetAirPurifierState.MANUAL = 0;
Characteristic.TargetAirPurifierState.AUTO = 1;

/**
 * Characteristic "Target Air Quality"
 */

Characteristic.TargetAirQuality = function() {
  Characteristic.call(this, 'Target Air Quality', '000000AE-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetAirQuality, Characteristic);

Characteristic.TargetAirQuality.UUID = '000000AE-0000-1000-8000-0026BB765291';

// The value property of TargetAirQuality must be one of the following:
Characteristic.TargetAirQuality.EXCELLENT = 0;
Characteristic.TargetAirQuality.GOOD = 1;
Characteristic.TargetAirQuality.FAIR = 2;

/**
 * Characteristic "Target Door State"
 */

Characteristic.TargetDoorState = function() {
  Characteristic.call(this, 'Target Door State', '00000032-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetDoorState, Characteristic);

Characteristic.TargetDoorState.UUID = '00000032-0000-1000-8000-0026BB765291';

// The value property of TargetDoorState must be one of the following:
Characteristic.TargetDoorState.OPEN = 0;
Characteristic.TargetDoorState.CLOSED = 1;

/**
 * Characteristic "Target Fan State"
 */

Characteristic.TargetFanState = function() {
  Characteristic.call(this, 'Target Fan State', '000000BF-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetFanState, Characteristic);

Characteristic.TargetFanState.UUID = '000000BF-0000-1000-8000-0026BB765291';

// The value property of TargetFanState must be one of the following:
Characteristic.TargetFanState.MANUAL = 0;
Characteristic.TargetFanState.AUTO = 1;

/**
 * Characteristic "Target Heater Cooler State"
 */

Characteristic.TargetHeaterCoolerState = function() {
  Characteristic.call(this, 'Target Heater Cooler State', '000000B2-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetHeaterCoolerState, Characteristic);

Characteristic.TargetHeaterCoolerState.UUID = '000000B2-0000-1000-8000-0026BB765291';

// The value property of TargetHeaterCoolerState must be one of the following:
Characteristic.TargetHeaterCoolerState.AUTO = 0;
Characteristic.TargetHeaterCoolerState.HEAT = 1;
Characteristic.TargetHeaterCoolerState.COOL = 2;

/**
 * Characteristic "Target Heating Cooling State"
 */

Characteristic.TargetHeatingCoolingState = function() {
  Characteristic.call(this, 'Target Heating Cooling State', '00000033-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetHeatingCoolingState, Characteristic);

Characteristic.TargetHeatingCoolingState.UUID = '00000033-0000-1000-8000-0026BB765291';

// The value property of TargetHeatingCoolingState must be one of the following:
Characteristic.TargetHeatingCoolingState.OFF = 0;
Characteristic.TargetHeatingCoolingState.HEAT = 1;
Characteristic.TargetHeatingCoolingState.COOL = 2;
Characteristic.TargetHeatingCoolingState.AUTO = 3;

/**
 * Characteristic "Target Horizontal Tilt Angle"
 */

Characteristic.TargetHorizontalTiltAngle = function() {
  Characteristic.call(this, 'Target Horizontal Tilt Angle', '0000007B-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetHorizontalTiltAngle, Characteristic);

Characteristic.TargetHorizontalTiltAngle.UUID = '0000007B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Humidifier Dehumidifier State"
 */

Characteristic.TargetHumidifierDehumidifierState = function() {
  Characteristic.call(this, 'Target Humidifier Dehumidifier State', '000000B4-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 2,
    minValue: 0,
    validValues: [0,1,2],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetHumidifierDehumidifierState, Characteristic);

Characteristic.TargetHumidifierDehumidifierState.UUID = '000000B4-0000-1000-8000-0026BB765291';

// The value property of TargetHumidifierDehumidifierState must be one of the following:
Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER = 0;
Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER = 1;
Characteristic.TargetHumidifierDehumidifierState.DEHUMIDIFIER = 2;

/**
 * Characteristic "Target Position"
 */

Characteristic.TargetPosition = function() {
  Characteristic.call(this, 'Target Position', '0000007C-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetPosition, Characteristic);

Characteristic.TargetPosition.UUID = '0000007C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Relative Humidity"
 */

Characteristic.TargetRelativeHumidity = function() {
  Characteristic.call(this, 'Target Relative Humidity', '00000034-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetRelativeHumidity, Characteristic);

Characteristic.TargetRelativeHumidity.UUID = '00000034-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Slat State"
 */

Characteristic.TargetSlatState = function() {
  Characteristic.call(this, 'Target Slat State', '000000BE-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetSlatState, Characteristic);

Characteristic.TargetSlatState.UUID = '000000BE-0000-1000-8000-0026BB765291';

// The value property of TargetSlatState must be one of the following:
Characteristic.TargetSlatState.MANUAL = 0;
Characteristic.TargetSlatState.AUTO = 1;

/**
 * Characteristic "Target Temperature"
 */

Characteristic.TargetTemperature = function() {
  Characteristic.call(this, 'Target Temperature', '00000035-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    unit: Characteristic.Units.CELSIUS,
    maxValue: 38,
    minValue: 10,
    minStep: 0.1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetTemperature, Characteristic);

Characteristic.TargetTemperature.UUID = '00000035-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Tilt Angle"
 */

Characteristic.TargetTiltAngle = function() {
  Characteristic.call(this, 'Target Tilt Angle', '000000C2-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetTiltAngle, Characteristic);

Characteristic.TargetTiltAngle.UUID = '000000C2-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Vertical Tilt Angle"
 */

Characteristic.TargetVerticalTiltAngle = function() {
  Characteristic.call(this, 'Target Vertical Tilt Angle', '0000007D-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.INT,
    unit: Characteristic.Units.ARC_DEGREE,
    maxValue: 90,
    minValue: -90,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TargetVerticalTiltAngle, Characteristic);

Characteristic.TargetVerticalTiltAngle.UUID = '0000007D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Temperature Display Units"
 */

Characteristic.TemperatureDisplayUnits = function() {
  Characteristic.call(this, 'Temperature Display Units', '00000036-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 1,
    minValue: 0,
    validValues: [0,1],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.TemperatureDisplayUnits, Characteristic);

Characteristic.TemperatureDisplayUnits.UUID = '00000036-0000-1000-8000-0026BB765291';

// The value property of TemperatureDisplayUnits must be one of the following:
Characteristic.TemperatureDisplayUnits.CELSIUS = 0;
Characteristic.TemperatureDisplayUnits.FAHRENHEIT = 1;

/**
 * Characteristic "Valve Type"
 */

Characteristic.ValveType = function() {
  Characteristic.call(this, 'Valve Type', '000000D5-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 3,
    minValue: 0,
    validValues: [0,1,2,3],
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ValveType, Characteristic);

Characteristic.ValveType.UUID = '000000D5-0000-1000-8000-0026BB765291';

// The value property of ValveType must be one of the following:
Characteristic.ValveType.GENERIC_VALVE = 0;
Characteristic.ValveType.IRRIGATION = 1;
Characteristic.ValveType.SHOWER_HEAD = 2;
Characteristic.ValveType.WATER_FAUCET = 3;

/**
 * Characteristic "Version"
 */

Characteristic.Version = function() {
  Characteristic.call(this, 'Version', '00000037-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Version, Characteristic);

Characteristic.Version.UUID = '00000037-0000-1000-8000-0026BB765291';

/**
 * Characteristic "VOC Density"
 */

Characteristic.VOCDensity = function() {
  Characteristic.call(this, 'VOC Density', '000000C8-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 1000,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.VOCDensity, Characteristic);

Characteristic.VOCDensity.UUID = '000000C8-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Volume"
 */

Characteristic.Volume = function() {
  Characteristic.call(this, 'Volume', '00000119-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    unit: Characteristic.Units.PERCENTAGE,
    maxValue: 100,
    minValue: 0,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.Volume, Characteristic);

Characteristic.Volume.UUID = '00000119-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Water Level"
 */

Characteristic.WaterLevel = function() {
  Characteristic.call(this, 'Water Level', '000000B5-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.FLOAT,
    maxValue: 100,
    minValue: 0,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.WaterLevel, Characteristic);

Characteristic.WaterLevel.UUID = '000000B5-0000-1000-8000-0026BB765291';

/**
 * Service "Accessory Information"
 */

Service.AccessoryInformation = function(displayName, subtype) {
  Service.call(this, displayName, '0000003E-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Identify);
  this.addCharacteristic(Characteristic.Manufacturer);
  this.addCharacteristic(Characteristic.Model);
  this.addCharacteristic(Characteristic.Name);
  this.addCharacteristic(Characteristic.SerialNumber);
  this.addCharacteristic(Characteristic.FirmwareRevision);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.HardwareRevision);
  this.addOptionalCharacteristic(Characteristic.AccessoryFlags);
};

inherits(Service.AccessoryInformation, Service);

Service.AccessoryInformation.UUID = '0000003E-0000-1000-8000-0026BB765291';

/**
 * Service "Air Purifier"
 */

Service.AirPurifier = function(displayName, subtype) {
  Service.call(this, displayName, '000000BB-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);
  this.addCharacteristic(Characteristic.CurrentAirPurifierState);
  this.addCharacteristic(Characteristic.TargetAirPurifierState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.SwingMode);
  this.addOptionalCharacteristic(Characteristic.RotationSpeed);
};

inherits(Service.AirPurifier, Service);

Service.AirPurifier.UUID = '000000BB-0000-1000-8000-0026BB765291';

/**
 * Service "Air Quality Sensor"
 */

Service.AirQualitySensor = function(displayName, subtype) {
  Service.call(this, displayName, '0000008D-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.AirQuality);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.OzoneDensity);
  this.addOptionalCharacteristic(Characteristic.NitrogenDioxideDensity);
  this.addOptionalCharacteristic(Characteristic.SulphurDioxideDensity);
  this.addOptionalCharacteristic(Characteristic.PM2_5Density);
  this.addOptionalCharacteristic(Characteristic.PM10Density);
  this.addOptionalCharacteristic(Characteristic.VOCDensity);
  this.addOptionalCharacteristic(Characteristic.CarbonMonoxideLevel);
  this.addOptionalCharacteristic(Characteristic.CarbonDioxideLevel);
};

inherits(Service.AirQualitySensor, Service);

Service.AirQualitySensor.UUID = '0000008D-0000-1000-8000-0026BB765291';

/**
 * Service "Battery Service"
 */

Service.BatteryService = function(displayName, subtype) {
  Service.call(this, displayName, '00000096-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.BatteryLevel);
  this.addCharacteristic(Characteristic.ChargingState);
  this.addCharacteristic(Characteristic.StatusLowBattery);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.BatteryService, Service);

Service.BatteryService.UUID = '00000096-0000-1000-8000-0026BB765291';

/**
 * Service "Camera RTP Stream Management"
 */

Service.CameraRTPStreamManagement = function(displayName, subtype) {
  Service.call(this, displayName, '00000110-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.SupportedVideoStreamConfiguration);
  this.addCharacteristic(Characteristic.SupportedAudioStreamConfiguration);
  this.addCharacteristic(Characteristic.SupportedRTPConfiguration);
  this.addCharacteristic(Characteristic.SelectedRTPStreamConfiguration);
  this.addCharacteristic(Characteristic.StreamingStatus);
  this.addCharacteristic(Characteristic.SetupEndpoints);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.CameraRTPStreamManagement, Service);

Service.CameraRTPStreamManagement.UUID = '00000110-0000-1000-8000-0026BB765291';

/**
 * Service "Carbon Dioxide Sensor"
 */

Service.CarbonDioxideSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000097-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CarbonDioxideDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.CarbonDioxideLevel);
  this.addOptionalCharacteristic(Characteristic.CarbonDioxidePeakLevel);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.CarbonDioxideSensor, Service);

Service.CarbonDioxideSensor.UUID = '00000097-0000-1000-8000-0026BB765291';

/**
 * Service "Carbon Monoxide Sensor"
 */

Service.CarbonMonoxideSensor = function(displayName, subtype) {
  Service.call(this, displayName, '0000007F-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CarbonMonoxideDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.CarbonMonoxideLevel);
  this.addOptionalCharacteristic(Characteristic.CarbonMonoxidePeakLevel);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.CarbonMonoxideSensor, Service);

Service.CarbonMonoxideSensor.UUID = '0000007F-0000-1000-8000-0026BB765291';

/**
 * Service "Contact Sensor"
 */

Service.ContactSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000080-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ContactSensorState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.ContactSensor, Service);

Service.ContactSensor.UUID = '00000080-0000-1000-8000-0026BB765291';

/**
 * Service "Door"
 */

Service.Door = function(displayName, subtype) {
  Service.call(this, displayName, '00000081-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentPosition);
  this.addCharacteristic(Characteristic.PositionState);
  this.addCharacteristic(Characteristic.TargetPosition);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.HoldPosition);
  this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Door, Service);

Service.Door.UUID = '00000081-0000-1000-8000-0026BB765291';

/**
 * Service "Doorbell"
 */

Service.Doorbell = function(displayName, subtype) {
  Service.call(this, displayName, '00000121-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Brightness);
  this.addOptionalCharacteristic(Characteristic.Volume);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Doorbell, Service);

Service.Doorbell.UUID = '00000121-0000-1000-8000-0026BB765291';

/**
 * Service "Fan"
 */

Service.Fan = function(displayName, subtype) {
  Service.call(this, displayName, '00000040-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.RotationDirection);
  this.addOptionalCharacteristic(Characteristic.RotationSpeed);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Fan, Service);

Service.Fan.UUID = '00000040-0000-1000-8000-0026BB765291';

/**
 * Service "Fan v2"
 */

Service.Fanv2 = function(displayName, subtype) {
  Service.call(this, displayName, '000000B7-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.CurrentFanState);
  this.addOptionalCharacteristic(Characteristic.TargetFanState);
  this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.RotationDirection);
  this.addOptionalCharacteristic(Characteristic.RotationSpeed);
  this.addOptionalCharacteristic(Characteristic.SwingMode);
};

inherits(Service.Fanv2, Service);

Service.Fanv2.UUID = '000000B7-0000-1000-8000-0026BB765291';

/**
 * Service "Filter Maintenance"
 */

Service.FilterMaintenance = function(displayName, subtype) {
  Service.call(this, displayName, '000000BA-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.FilterChangeIndication);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.FilterLifeLevel);
  this.addOptionalCharacteristic(Characteristic.ResetFilterIndication);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.FilterMaintenance, Service);

Service.FilterMaintenance.UUID = '000000BA-0000-1000-8000-0026BB765291';

/**
 * Service "Faucet"
 */

Service.Faucet = function(displayName, subtype) {
  Service.call(this, displayName, '000000D7-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
};

inherits(Service.Faucet, Service);

Service.Faucet.UUID = '000000D7-0000-1000-8000-0026BB765291';

/**
 * Service "Garage Door Opener"
 */

Service.GarageDoorOpener = function(displayName, subtype) {
  Service.call(this, displayName, '00000041-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentDoorState);
  this.addCharacteristic(Characteristic.TargetDoorState);
  this.addCharacteristic(Characteristic.ObstructionDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.LockCurrentState);
  this.addOptionalCharacteristic(Characteristic.LockTargetState);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.GarageDoorOpener, Service);

Service.GarageDoorOpener.UUID = '00000041-0000-1000-8000-0026BB765291';

/**
 * Service "Heater Cooler"
 */

Service.HeaterCooler = function(displayName, subtype) {
  Service.call(this, displayName, '000000BC-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);
  this.addCharacteristic(Characteristic.CurrentHeaterCoolerState);
  this.addCharacteristic(Characteristic.TargetHeaterCoolerState);
  this.addCharacteristic(Characteristic.CurrentTemperature);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.SwingMode);
  this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
  this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
  this.addOptionalCharacteristic(Characteristic.TemperatureDisplayUnits);
  this.addOptionalCharacteristic(Characteristic.RotationSpeed);
};

inherits(Service.HeaterCooler, Service);

Service.HeaterCooler.UUID = '000000BC-0000-1000-8000-0026BB765291';

/**
 * Service "Humidifier Dehumidifier"
 */

Service.HumidifierDehumidifier = function(displayName, subtype) {
  Service.call(this, displayName, '000000BD-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentRelativeHumidity);
  this.addCharacteristic(Characteristic.CurrentHumidifierDehumidifierState);
  this.addCharacteristic(Characteristic.TargetHumidifierDehumidifierState);
  this.addCharacteristic(Characteristic.Active);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.SwingMode);
  this.addOptionalCharacteristic(Characteristic.WaterLevel);
  this.addOptionalCharacteristic(Characteristic.RelativeHumidityDehumidifierThreshold);
  this.addOptionalCharacteristic(Characteristic.RelativeHumidityHumidifierThreshold);
  this.addOptionalCharacteristic(Characteristic.RotationSpeed);
};

inherits(Service.HumidifierDehumidifier, Service);

Service.HumidifierDehumidifier.UUID = '000000BD-0000-1000-8000-0026BB765291';

/**
 * Service "Humidity Sensor"
 */

Service.HumiditySensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000082-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentRelativeHumidity);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.HumiditySensor, Service);

Service.HumiditySensor.UUID = '00000082-0000-1000-8000-0026BB765291';

/**
 * Service "Irrigation System"
 */

Service.IrrigationSystem = function(displayName, subtype) {
  Service.call(this, displayName, '000000CF-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);
  this.addCharacteristic(Characteristic.ProgramMode);
  this.addCharacteristic(Characteristic.InUse);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.RemainingDuration);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
};

inherits(Service.IrrigationSystem, Service);

Service.IrrigationSystem.UUID = '000000CF-0000-1000-8000-0026BB765291';

/**
 * Service "Leak Sensor"
 */

Service.LeakSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000083-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.LeakDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.LeakSensor, Service);

Service.LeakSensor.UUID = '00000083-0000-1000-8000-0026BB765291';

/**
 * Service "Light Sensor"
 */

Service.LightSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000084-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentAmbientLightLevel);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.LightSensor, Service);

Service.LightSensor.UUID = '00000084-0000-1000-8000-0026BB765291';

/**
 * Service "Lightbulb"
 */

Service.Lightbulb = function(displayName, subtype) {
  Service.call(this, displayName, '00000043-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Brightness);
  this.addOptionalCharacteristic(Characteristic.Hue);
  this.addOptionalCharacteristic(Characteristic.Saturation);
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.ColorTemperature); //Manual fix to add temperature
};

inherits(Service.Lightbulb, Service);

Service.Lightbulb.UUID = '00000043-0000-1000-8000-0026BB765291';

/**
 * Service "Lock Management"
 */

Service.LockManagement = function(displayName, subtype) {
  Service.call(this, displayName, '00000044-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.LockControlPoint);
  this.addCharacteristic(Characteristic.Version);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Logs);
  this.addOptionalCharacteristic(Characteristic.AudioFeedback);
  this.addOptionalCharacteristic(Characteristic.LockManagementAutoSecurityTimeout);
  this.addOptionalCharacteristic(Characteristic.AdministratorOnlyAccess);
  this.addOptionalCharacteristic(Characteristic.LockLastKnownAction);
  this.addOptionalCharacteristic(Characteristic.CurrentDoorState);
  this.addOptionalCharacteristic(Characteristic.MotionDetected);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.LockManagement, Service);

Service.LockManagement.UUID = '00000044-0000-1000-8000-0026BB765291';

/**
 * Service "Lock Mechanism"
 */

Service.LockMechanism = function(displayName, subtype) {
  Service.call(this, displayName, '00000045-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.LockCurrentState);
  this.addCharacteristic(Characteristic.LockTargetState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.LockMechanism, Service);

Service.LockMechanism.UUID = '00000045-0000-1000-8000-0026BB765291';

/**
 * Service "Microphone"
 */

Service.Microphone = function(displayName, subtype) {
  Service.call(this, displayName, '00000112-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Mute);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Volume);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Microphone, Service);

Service.Microphone.UUID = '00000112-0000-1000-8000-0026BB765291';

/**
 * Service "Motion Sensor"
 */

Service.MotionSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000085-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.MotionDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.MotionSensor, Service);

Service.MotionSensor.UUID = '00000085-0000-1000-8000-0026BB765291';

/**
 * Service "Occupancy Sensor"
 */

Service.OccupancySensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000086-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.OccupancyDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.OccupancySensor, Service);

Service.OccupancySensor.UUID = '00000086-0000-1000-8000-0026BB765291';

/**
 * Service "Outlet"
 */

Service.Outlet = function(displayName, subtype) {
  Service.call(this, displayName, '00000047-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.On);
  this.addCharacteristic(Characteristic.OutletInUse);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Outlet, Service);

Service.Outlet.UUID = '00000047-0000-1000-8000-0026BB765291';

/**
 * Service "Security System"
 */

Service.SecuritySystem = function(displayName, subtype) {
  Service.call(this, displayName, '0000007E-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.SecuritySystemCurrentState);
  this.addCharacteristic(Characteristic.SecuritySystemTargetState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.SecuritySystemAlarmType);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.SecuritySystem, Service);

Service.SecuritySystem.UUID = '0000007E-0000-1000-8000-0026BB765291';

/**
 * Service "Service Label"
 */

Service.ServiceLabel = function(displayName, subtype) {
  Service.call(this, displayName, '000000CC-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ServiceLabelNamespace);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.ServiceLabel, Service);

Service.ServiceLabel.UUID = '000000CC-0000-1000-8000-0026BB765291';

/**
 * Service "Slat"
 */

Service.Slat = function(displayName, subtype) {
  Service.call(this, displayName, '000000B9-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.SlatType);
  this.addCharacteristic(Characteristic.CurrentSlatState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.CurrentTiltAngle);
  this.addOptionalCharacteristic(Characteristic.TargetTiltAngle);
  this.addOptionalCharacteristic(Characteristic.SwingMode);
};

inherits(Service.Slat, Service);

Service.Slat.UUID = '000000B9-0000-1000-8000-0026BB765291';

/**
 * Service "Smoke Sensor"
 */

Service.SmokeSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000087-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.SmokeDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.SmokeSensor, Service);

Service.SmokeSensor.UUID = '00000087-0000-1000-8000-0026BB765291';

/**
 * Service "Speaker"
 */

Service.Speaker = function(displayName, subtype) {
  Service.call(this, displayName, '00000113-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Mute);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Volume);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Speaker, Service);

Service.Speaker.UUID = '00000113-0000-1000-8000-0026BB765291';

/**
 * Service "Stateless Programmable Switch"
 */

Service.StatelessProgrammableSwitch = function(displayName, subtype) {
  Service.call(this, displayName, '00000089-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
  this.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);
};

inherits(Service.StatelessProgrammableSwitch, Service);

Service.StatelessProgrammableSwitch.UUID = '00000089-0000-1000-8000-0026BB765291';

/**
 * Service "Switch"
 */

Service.Switch = function(displayName, subtype) {
  Service.call(this, displayName, '00000049-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Switch, Service);

Service.Switch.UUID = '00000049-0000-1000-8000-0026BB765291';

/**
 * Service "Temperature Sensor"
 */

Service.TemperatureSensor = function(displayName, subtype) {
  Service.call(this, displayName, '0000008A-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentTemperature);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.TemperatureSensor, Service);

Service.TemperatureSensor.UUID = '0000008A-0000-1000-8000-0026BB765291';

/**
 * Service "Thermostat"
 */

Service.Thermostat = function(displayName, subtype) {
  Service.call(this, displayName, '0000004A-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentHeatingCoolingState);
  this.addCharacteristic(Characteristic.TargetHeatingCoolingState);
  this.addCharacteristic(Characteristic.CurrentTemperature);
  this.addCharacteristic(Characteristic.TargetTemperature);
  this.addCharacteristic(Characteristic.TemperatureDisplayUnits);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.CurrentRelativeHumidity);
  this.addOptionalCharacteristic(Characteristic.TargetRelativeHumidity);
  this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
  this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Thermostat, Service);

Service.Thermostat.UUID = '0000004A-0000-1000-8000-0026BB765291';

/**
 * Service "Valve"
 */

Service.Valve = function(displayName, subtype) {
  Service.call(this, displayName, '000000D0-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.Active);
  this.addCharacteristic(Characteristic.InUse);
  this.addCharacteristic(Characteristic.ValveType);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.SetDuration);
  this.addOptionalCharacteristic(Characteristic.RemainingDuration);
  this.addOptionalCharacteristic(Characteristic.IsConfigured);
  this.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Valve, Service);

Service.Valve.UUID = '000000D0-0000-1000-8000-0026BB765291';

/**
 * Service "Window"
 */

Service.Window = function(displayName, subtype) {
  Service.call(this, displayName, '0000008B-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentPosition);
  this.addCharacteristic(Characteristic.TargetPosition);
  this.addCharacteristic(Characteristic.PositionState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.HoldPosition);
  this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.Window, Service);

Service.Window.UUID = '0000008B-0000-1000-8000-0026BB765291';

/**
 * Service "Window Covering"
 */

Service.WindowCovering = function(displayName, subtype) {
  Service.call(this, displayName, '0000008C-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.CurrentPosition);
  this.addCharacteristic(Characteristic.TargetPosition);
  this.addCharacteristic(Characteristic.PositionState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.HoldPosition);
  this.addOptionalCharacteristic(Characteristic.TargetHorizontalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.TargetVerticalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.CurrentHorizontalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.CurrentVerticalTiltAngle);
  this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
  this.addOptionalCharacteristic(Characteristic.Name);
};

inherits(Service.WindowCovering, Service);

Service.WindowCovering.UUID = '0000008C-0000-1000-8000-0026BB765291';

var HomeKitTypesBridge = __webpack_require__(/*! ./HomeKitTypes-Bridge */ "../node_modules/hap-nodejs/lib/gen/HomeKitTypes-Bridge.js");



/***/ }),

/***/ "../node_modules/hap-nodejs/lib/util/clone.js":
/*!****************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/util/clone.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  clone: clone
};


/**
 * A simple clone function that also allows you to pass an "extend" object whose properties will be
 * added to the cloned copy of the original object passed.
 */
function clone(object, extend) {

  var cloned = {};

  for (var key in object) {
    cloned[key] = object[key];
  }

  for (var key in extend) {
    cloned[key] = extend[key];
  }

  return cloned;
};


/***/ }),

/***/ "../node_modules/hap-nodejs/lib/util/once.js":
/*!***************************************************!*\
  !*** ../node_modules/hap-nodejs/lib/util/once.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  once: once
};

function once(func) {
  var called = false;

  return function() {
    if (called) {
      throw new Error("This callback function has already been called by someone else; it can only be called one time.");
    }
    else {
      called = true;
      return func.apply(this, arguments);
    }
  };
}


/***/ }),

/***/ "../node_modules/ieee754/index.js":
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../node_modules/inherits/inherits_browser.js":
/*!****************************************************!*\
  !*** ../node_modules/inherits/inherits_browser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../node_modules/isarray/index.js":
/*!****************************************!*\
  !*** ../node_modules/isarray/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../node_modules/node-libs-browser/node_modules/buffer/index.js":
/*!**********************************************************************!*\
  !*** ../node_modules/node-libs-browser/node_modules/buffer/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/util/support/isBufferBrowser.js":
/*!*******************************************************!*\
  !*** ../node_modules/util/support/isBufferBrowser.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../node_modules/util/util.js":
/*!************************************!*\
  !*** ../node_modules/util/util.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./admin/admin.defaults.ts":
/*!*********************************!*\
  !*** ./admin/admin.defaults.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Defaults;
(function (Defaults) {
    Defaults.defaultCommandLine = {
        stream: [
            '-re',
            '-i', '${source}',
            '-threads', '0',
            '-vcodec', '${codec}',
            '-an',
            '-pix_fmt', 'yuv420p',
            '-r', '${fps}',
            '-f', 'rawvideo',
            '-tune', 'zerolatency',
            '-vf', 'scale=${width}:${height}',
            '-b:v', '${bitrate}k',
            '-bufsize', '${bitrate}k',
            '-payload_type', '99',
            '-ssrc', '1',
            '-f', 'rtp',
            '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params', '${videokey}',
            'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=1378'
        ],
        snapshot: [
            '-re',
            '-i', '${source}',
            '-t', '1',
            '-s', '${width}x${height}',
            '-f', 'image2',
            '-'
        ]
    };
    Defaults.webcamCommandLine = {
        stream: [
            '-re',
            '-f', 'dshow',
            '-i', '${source}',
            '-threads', '0',
            '-vcodec', '${codec}',
            '-an',
            '-pix_fmt', 'yuv420p',
            '-r', '${fps}',
            '-f', 'rawvideo',
            '-tune', 'zerolatency',
            '-vf', 'scale=${width}:${height}',
            '-b:v', '${bitrate}k',
            '-bufsize', '${bitrate}k',
            '-payload_type', '99',
            '-ssrc', '1',
            '-f', 'rtp',
            '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params', '${videokey}',
            'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=1378'
        ],
        snapshot: [
            '-re',
            '-f', 'dshow',
            '-i', '${source}',
            '-t', '1',
            '-s', '${width}x${height}',
            '-f', 'image2',
            '-'
        ]
    };
    Defaults.ffmpegCommandLines = {
        default: Defaults.defaultCommandLine,
        webcam: Defaults.webcamCommandLine
    };
})(Defaults = exports.Defaults || (exports.Defaults = {}));


/***/ }),

/***/ "./admin/admin.pageLoader.ts":
/*!***********************************!*\
  !*** ./admin/admin.pageLoader.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createTemplateElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
exports.createTemplateElement = createTemplateElement;
function createAndCloneTemplateElement(html) {
    var node = createTemplateElement(html);
    return document.importNode(node.content, true);
}
exports.createAndCloneTemplateElement = createAndCloneTemplateElement;


/***/ }),

/***/ "./admin/admin.translation.ts":
/*!************************************!*\
  !*** ./admin/admin.translation.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(/*! jquery */ "jquery");
function translateFragment(fragment) {
    var elements = fragment.querySelectorAll('.translate');
    if (elements) {
        for (var e = 0; e < elements.length; e++) {
            var text = $(elements[e]).attr('data-lang');
            if (!text) {
                text = $(elements[e]).html();
                $(elements[e]).attr('data-lang', text);
            }
            var transText = translateWord(text);
            if (transText) {
                $(elements[e]).html(transText);
            }
        }
    }
}
exports.translateFragment = translateFragment;


/***/ }),

/***/ "./admin/admin.utils.ts":
/*!******************************!*\
  !*** ./admin/admin.utils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils;
(function (Utils) {
    function getInputValue(input, emptyStringAsUndefined) {
        if (emptyStringAsUndefined === void 0) { emptyStringAsUndefined = true; }
        if (input === undefined || input === null)
            return undefined;
        if ("valueAsDate" in input) {
            var dateValue = input.valueAsDate;
            if (dateValue)
                return dateValue;
        }
        if ("valueAsNumber" in input) {
            var numValue = input.valueAsNumber;
            if (!isNaN(numValue))
                return numValue;
        }
        var stringValue = input.value;
        if ((stringValue === "") && emptyStringAsUndefined)
            return undefined;
        if (stringValue !== "") {
            var strAsNumber = Number(stringValue);
            if (!isNaN(strAsNumber))
                return strAsNumber;
        }
        return stringValue;
    }
    Utils.getInputValue = getInputValue;
    function getSelectInputValue(input) {
        if (input === undefined || input === null)
            return undefined;
        var dateValue = input.valueAsDate;
        if (dateValue)
            return dateValue;
        var numValue = input.valueAsNumber;
        if (!isNaN(numValue))
            return numValue;
        var stringValue = input.value;
        var strAsNumber = Number(stringValue);
        if (!isNaN(strAsNumber))
            return strAsNumber;
        return stringValue;
    }
    Utils.getSelectInputValue = getSelectInputValue;
    function setInputValue(input, value) {
        if (input === undefined || input === null)
            return;
        input.value = ((value !== undefined) && (value !== null)) ? value : "";
    }
    Utils.setInputValue = setInputValue;
})(Utils = exports.Utils || (exports.Utils = {}));


/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.base.ts":
/*!***********************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.base.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigPageBuilder_Base = /** @class */ (function () {
    function ConfigPageBuilder_Base(delegate) {
        this.delegate = delegate;
    }
    ConfigPageBuilder_Base.prototype.refreshSimpleErrorElement = function (errorElement, validator) {
        var errorVisible = false;
        if (validator)
            errorVisible = validator();
        if (errorElement)
            errorElement.classList.toggle('validationError', errorVisible);
    };
    ConfigPageBuilder_Base.prototype.fillSelectByEntryList = function (selectElement, selectListArray) {
        var e_1, _a;
        try {
            for (var selectListArray_1 = __values(selectListArray), selectListArray_1_1 = selectListArray_1.next(); !selectListArray_1_1.done; selectListArray_1_1 = selectListArray_1.next()) {
                var item = selectListArray_1_1.value;
                var optElem = document.createElement('option');
                optElem.value = item.value;
                optElem.text = item.text;
                selectElement.add(optElem);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (selectListArray_1_1 && !selectListArray_1_1.done && (_a = selectListArray_1.return)) _a.call(selectListArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ConfigPageBuilder_Base.prototype.fillSelectByDict = function (selectElement, dictionary) {
        for (var key in dictionary) {
            var optElem = document.createElement('option');
            optElem.value = key;
            optElem.text = dictionary[key].text;
            selectElement.add(optElem);
        }
    };
    ConfigPageBuilder_Base.prototype.fillSelectByListEntries = function (selectElement, entries) {
        if (entries === undefined)
            return;
        if (Array.isArray(entries))
            this.fillSelectByEntryList(selectElement, entries);
        else
            this.fillSelectByDict(selectElement, entries);
    };
    ConfigPageBuilder_Base.prototype.fillSelectByArray = function (selectElement, stringlist) {
        var e_2, _a;
        try {
            for (var stringlist_1 = __values(stringlist), stringlist_1_1 = stringlist_1.next(); !stringlist_1_1.done; stringlist_1_1 = stringlist_1.next()) {
                var itemName = stringlist_1_1.value;
                var optElem = document.createElement('option');
                optElem.value = itemName;
                optElem.text = itemName;
                selectElement.add(optElem);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (stringlist_1_1 && !stringlist_1_1.done && (_a = stringlist_1.return)) _a.call(stringlist_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return ConfigPageBuilder_Base;
}());
exports.ConfigPageBuilder_Base = ConfigPageBuilder_Base;


/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.bridgeConfig.main.inc.html":
/*!******************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.bridgeConfig.main.inc.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div><label class=\"translate\" for=\"name\">Name:</label><span class=\"edit-hint translate\">descriptive\n            only - displayed in homekit apps. Changes are only recognized after readding the bridge in the\n            app.</span></div>\n    <div class=\"errorpanel translate\" id=\"name_error\">A device with this name already exists. Please change\n        the name!</div>\n    <div class=\"input control flex-grow margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"name\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"manufacturer\">Manufacturer:</label><span class=\"edit-hint translate\">descriptive\n            only - displayed in some homekit apps</span></div>\n    <div class=\"input control flex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"manufacturer\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"model\">Model:</label><span class=\"edit-hint translate\">descriptive\n            only - displayed in some homekit apps</span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"model\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"serial\">Serial:</label><span class=\"edit-hint translate\">descriptive\n            only - displayed in some homekit apps</span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"serial\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"firmware\">Firmware:</label><span class=\"edit-hint translate\">descriptive\n            only - displayed in some homekit apps</span></div>\n    <div class=\"input control flex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"firmware\" placeholder=\"leave empty to use Yahka Version\"/>\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"username\">Username:</label><span class=\"edit-hint translate\">needs\n            to be in form of a mac address, e.g: d8:be:54:e7:06:f8. <b>After changing this field, the\n                bridge needs to be reconfigured in the HomeKit database</b></span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"username\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"pincode\">Pincode:</label><span class=\"edit-hint translate\">needs to\n            be in the form of 123-45-678</span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <input class=\"full-size\" type=\"text\" id=\"pincode\" />\n    </div>\n</div>\n<div>\n    <div><label class=\"translate\" for=\"port\">IP/Port:</label><span class=\"edit-hint translate\">Port 0 =\n            random free port assigned by the operation system (default)</span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <select id=\"interface\">\n        </select>\n        <input min=\"0\" max=\"65535\" type=\"number\" id=\"port\" />\n    </div>\n\n</div>\n<div>\n    <div><label class=\"translate\" for=\"verboseLogging\">Verbose Logging:</label><span class=\"edit-hint translate\">true\n            = redirect hap-node logging to adapter logging</span></div>\n    <div class=\"input controlflex-grow  margin10\">\n        <input class=\"\" type=\"checkbox\" id=\"verboseLogging\" />\n    </div>\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.bridgeConfig.ts":
/*!*******************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.bridgeConfig.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/// <reference path="../../typings/index.d.ts" />
var hkBridge = __webpack_require__(/*! ../../shared/yahka.configuration */ "./shared/yahka.configuration.ts");
var pageBuilder_base_1 = __webpack_require__(/*! ./pageBuilder.base */ "./admin/pageBuilder/pageBuilder.base.ts");
var admin_translation_1 = __webpack_require__(/*! ../admin.translation */ "./admin/admin.translation.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var yahka_admin_1 = __webpack_require__(/*! ../yahka.admin */ "./admin/yahka.admin.ts");
var ConfigPageBuilder_BridgeConfig = /** @class */ (function (_super) {
    __extends(ConfigPageBuilder_BridgeConfig, _super);
    function ConfigPageBuilder_BridgeConfig(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = false;
        _this.removeDeviceAvailable = false;
        _this.dupliacteDeviceAvailable = false;
        _this.bridgeConfigPanelTemplate = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.bridgeConfig.main.inc.html */ "./admin/pageBuilder/pageBuilder.bridgeConfig.main.inc.html"));
        return _this;
    }
    ConfigPageBuilder_BridgeConfig.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        return __awaiter(this, void 0, void 0, function () {
            var bridgeConfigFragment, inputHelper, checkboxHelper, ipList, ipListForSelectBox;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!hkBridge.Configuration.isBridgeConfig(config)) {
                            return [2 /*return*/];
                        }
                        bridgeConfigFragment = document.importNode(this.bridgeConfigPanelTemplate.content, true);
                        admin_translation_1.translateFragment(bridgeConfigFragment);
                        inputHelper = function (selector, propertyName, selectList, validator) {
                            if (validator === void 0) { validator = undefined; }
                            var input = bridgeConfigFragment.querySelector(selector);
                            var errorElement = bridgeConfigFragment.querySelector(selector + '_error');
                            _this.fillSelectByListEntries(input, selectList);
                            var value = config[propertyName];
                            if (value !== undefined) {
                                input.value = value;
                            }
                            else {
                                input.value = '';
                            }
                            input.addEventListener("input", _this.handleBridgeMetaDataChange.bind(_this, config, propertyName, errorElement, validator));
                            _this.refreshSimpleErrorElement(errorElement, validator);
                        };
                        checkboxHelper = function (selector, propertyName, validator) {
                            if (validator === void 0) { validator = undefined; }
                            var input = bridgeConfigFragment.querySelector(selector);
                            var errorElement = bridgeConfigFragment.querySelector(selector + '_error');
                            var value = config[propertyName];
                            input.checked = value;
                            input.addEventListener("click", _this.handleBridgeMetaDataChange.bind(_this, config, propertyName, errorElement, validator));
                            _this.refreshSimpleErrorElement(errorElement, validator);
                        };
                        inputHelper('#name', 'name', undefined, function () { return !_this.delegate.deviceIsUnique(config); });
                        inputHelper('#manufacturer', 'manufacturer');
                        inputHelper('#model', 'model');
                        inputHelper('#serial', 'serial');
                        inputHelper('#firmware', 'firmware');
                        inputHelper('#username', 'username');
                        inputHelper('#pincode', 'pincode');
                        inputHelper('#port', 'port');
                        return [4 /*yield*/, yahka_admin_1.ioBrokerInterfaceList];
                    case 1:
                        ipList = _a.sent();
                        ipListForSelectBox = ipList.filter(function (a) { return a.family === "ipv4"; }).map(function (a) { return { value: a.address, text: a.name }; });
                        inputHelper('#interface', 'interface', ipListForSelectBox);
                        checkboxHelper('#verboseLogging', 'verboseLogging');
                        devicePanel.appendChild(bridgeConfigFragment);
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfigPageBuilder_BridgeConfig.prototype.styleListItem = function (listItem, deviceConfig) {
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-tree';
        listItem.classList.add('fg-grayDark');
        return true;
    };
    ConfigPageBuilder_BridgeConfig.prototype.handleBridgeMetaDataChange = function (bridgeConfig, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            bridgeConfig[propertyName] = inputTarget.checked;
        }
        else {
            bridgeConfig[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(bridgeConfig);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_BridgeConfig;
}(pageBuilder_base_1.ConfigPageBuilder_Base));
exports.ConfigPageBuilder_BridgeConfig = ConfigPageBuilder_BridgeConfig;


/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.customDevice.characteristic.propRow.inc.html":
/*!************************************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.customDevice.characteristic.propRow.inc.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"cell\">\n        <span id=\"propName\"></span>\n    </div>\n    <div class=\"cell\">\n        <div class=\"input-container\">\n            <input type=\"text\" id=\"propValue\"></input>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.customDevice.characteristicRow.inc.html":
/*!*******************************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.customDevice.characteristicRow.inc.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tbody id=\"characteristic\" class=\"row-group\">\n    <tr>\n        <td class=\"center\">\n            <label class=\"input-control checkbox small-check\">\n                <input type=\"checkbox\" id=\"characteristic_enabled\">\n                <span class=\"check\"></span>\n            </label>\n        </td>\n        <td>\n            <span id=\"characteristic_name\"></span><a href=\"#\" id=\"toggleProperties\" class=\"\">&nbsp;&nbsp;[properties]</a>\n        </td>\n        <td class=\"right inOut\">\n            <span class=\"translate\">InOut: </span>\n        </td>\n        </td>\n        <td class=\"inOut\">\n            <div class=\"input-control select full-width\">\n                <select id=\"characteristic_inoutfunction\"></select>\n            </div>\n        </td>\n    </tr>\n\n    <tr>\n        <td>\n        </td>\n        <td rowspan=\"3\" class=\"characteristic-property-cell\">\n            <div class=\"no-display\" id=\"characteristic_propertyTable_container\">\n                <span>Characteristic Properties</span>\n                <div class=\"editor-table\" id=\"characteristic_propertyTable\">\n                </div>\n            </div>\n\n\n        </td>\n        <td colspan=\"2\" id=\"characteristic_inoutparams_container\" class=\"editor-container-cell inOut\">\n        </td>\n    </tr>\n\n    <tr>\n        <td>\n        </td>\n        <td class=\"right conversion\">\n            <span class=\"translate\">Conversion: </span>\n        </td>\n        <td class=\"conversion\">\n            <div class=\"input-control select full-width\">\n                <select id=\"characteristic_conversionfunction\"></select>\n            </div>\n        </td>\n    </tr>\n\n    <tr class=\"row\">\n        <td>\n        </td>\n        <td colspan=\"2\" id=\"characteristic_conversionparams_container\" class=\"editor-container-cell conversion\">\n        </td>\n    </tr>\n</tbody>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.customDevice.infoPanel.inc.html":
/*!***********************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.customDevice.infoPanel.inc.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"frame\" id=\"yahka_device_info_panel\">\n    <div class=\"heading\">\n        <span class=\"translate\">Device Properties</span>\n    </div>\n\n    <div class=\"content\">\n        <div>\n            <div><label class=\"translate\" for=\"enabled\">Enabled:</label></div>\n            <div class=\"input control flex-grow margin10\">\n                <input type=\"checkbox\" id=\"enabled\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"name\">Name:</label></div>\n            <div class=\"errorpanel translate\" id=\"name_error\">A device with this name already exists.\n                Please change the name!</div>\n            <div class=\"input control flex-grow margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"name\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"manufacturer\">Manufacturer:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"manufacturer\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"model\">Model:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"model\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"serial\">Serial:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"serial\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"firmware\">Firmware:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"firmware\" />\n            </div>\n        </div>\n\n        <div>\n            <div><label class=\"translate\" for=\"category\">Categeory:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <select class=\"full-size\" id=\"category\"></select>\n            </div>\n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.customDevice.servicePanel.inc.html":
/*!**************************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.customDevice.servicePanel.inc.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"frame\" id=\"yahka_service_panel\">\n    <div class=\"heading\">\n        <span class=\"translate\">Service: </span><span id=\"yahka_service_caption\"></span>\n        <a href=\"#\" class=\"place-right\" id=\"yakha_delete_service\"><span class=\"mif-cross fg-red\"></span></a>\n    </div>\n    <div class=\"content\">\n        <div class=\"flex-container-row flex-grow flex-align-baseline\">\n            <div><label class=\"translate\" for=\"service_name\">Service name:</label></div>\n            <div class=\"input control flex-grow margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"service_name\" />\n            </div>\n            <div><label class=\"translate\" for=\"service_type\">Service Type:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <select class=\"full-size\" id=\"service_type\"></select>\n            </div>\n            <div><label class=\"translate\" for=\"service_subtype\">Service Subtype:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"service_subtype\" />\n            </div>\n        </div>\n        <div><span class=\"translate\">Characteristics Table</span></div>\n        <table class=\"characteristic-table\" id=\"yahka_characteristic_table\">\n            <thead>\n                <th class=\"translate\">Enabled</th>\n                <th class=\"translate\">Name</th>\n                <th></th>\n                <th></th>\n            </thead>\n        </table>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.customDevice.ts":
/*!*******************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.customDevice.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var hkBridge = __webpack_require__(/*! ../../shared/yahka.configuration */ "./shared/yahka.configuration.ts");
var yahka_meta_generator_1 = __webpack_require__(/*! ../yahka.meta-generator */ "./admin/yahka.meta-generator.ts");
var pageBuilder_base_1 = __webpack_require__(/*! ./pageBuilder.base */ "./admin/pageBuilder/pageBuilder.base.ts");
var parameterEditor_factory_1 = __webpack_require__(/*! ../parameterEditor/parameterEditor.factory */ "./admin/parameterEditor/parameterEditor.factory.ts");
var parameterEditor_null_1 = __webpack_require__(/*! ../parameterEditor/parameterEditor.null */ "./admin/parameterEditor/parameterEditor.null.ts");
var admin_translation_1 = __webpack_require__(/*! ../admin.translation */ "./admin/admin.translation.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var accessoryCategories = {};
getObject('yahka.meta._accessoryCategories', function (_, object) {
    accessoryCategories = object.native;
});
var HAPServiceDictionary = yahka_meta_generator_1.generateMetaDataDictionary();
var ConfigPageBuilder_CustomDevice = /** @class */ (function (_super) {
    __extends(ConfigPageBuilder_CustomDevice, _super);
    function ConfigPageBuilder_CustomDevice(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = true;
        _this.removeDeviceAvailable = true;
        _this.dupliacteDeviceAvailable = true;
        _this.deviceInfoPanelTemplate = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.customDevice.infoPanel.inc.html */ "./admin/pageBuilder/pageBuilder.customDevice.infoPanel.inc.html"));
        _this.deviceServicePanelTemplate = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.customDevice.servicePanel.inc.html */ "./admin/pageBuilder/pageBuilder.customDevice.servicePanel.inc.html"));
        _this.characteristicRow = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.customDevice.characteristicRow.inc.html */ "./admin/pageBuilder/pageBuilder.customDevice.characteristicRow.inc.html"));
        _this.characteristicPropRow = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.customDevice.characteristic.propRow.inc.html */ "./admin/pageBuilder/pageBuilder.customDevice.characteristic.propRow.inc.html"));
        return _this;
    }
    ConfigPageBuilder_CustomDevice.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        var e_1, _a;
        if (!hkBridge.Configuration.isDeviceConfig(config)) {
            return;
        }
        var lastPane = this.buildDeviceInformationPanel(config, devicePanel);
        try {
            for (var _b = __values(config.services), _c = _b.next(); !_c.done; _c = _b.next()) {
                var serviceConfig = _c.value;
                var servicePanel = this.createServicePanel(config, serviceConfig);
                devicePanel.appendChild(servicePanel);
                lastPane = servicePanel;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (AFocusLastPanel && lastPane) {
            lastPane.scrollIntoView();
            if (!lastPane.classList.contains('active')) {
                var heading = lastPane.querySelector('.heading');
                if (heading)
                    heading.click();
            }
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.styleListItem = function (listItem, deviceConfig) {
        if (!hkBridge.Configuration.isDeviceConfig(deviceConfig)) {
            return false;
        }
        var iconClass = "mif-question";
        var cat;
        if (accessoryCategories !== undefined) {
            if (cat = accessoryCategories[deviceConfig.category])
                iconClass = cat['icon'];
        }
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = "";
        listIcon.classList.add('list-icon', 'icon', iconClass);
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    };
    ConfigPageBuilder_CustomDevice.prototype.buildDeviceInformationPanel = function (deviceConfig, devicePane) {
        var _this = this;
        var devInfoFragment = document.importNode(this.deviceInfoPanelTemplate.content, true);
        var devInfoPanel = devInfoFragment.querySelector('#yahka_device_info_panel');
        admin_translation_1.translateFragment(devInfoFragment);
        var inputHelper = function (selector, propertyName, selectList, validator) {
            if (validator === void 0) { validator = undefined; }
            var input = devInfoPanel.querySelector(selector);
            var errorElement = devInfoPanel.querySelector(selector + '_error');
            _this.fillSelectByListEntries(input, selectList);
            var value = deviceConfig[propertyName];
            if (input.type === 'checkbox') {
                input.checked = value === undefined ? true : value;
                input.addEventListener('change', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName, errorElement, validator));
            }
            else {
                admin_utils_1.Utils.setInputValue(input, value);
                input.addEventListener('input', _this.handleDeviceMetaDataChange.bind(_this, deviceConfig, propertyName, errorElement, validator));
            }
            _this.refreshSimpleErrorElement(errorElement, validator);
        };
        inputHelper('#name', 'name', undefined, function () { return !_this.delegate.deviceIsUnique(deviceConfig); });
        inputHelper('#enabled', 'enabled');
        inputHelper('#manufacturer', 'manufacturer');
        inputHelper('#model', 'model');
        inputHelper('#serial', 'serial');
        inputHelper('#firmware', 'firmware');
        inputHelper('#category', 'category', accessoryCategories);
        devicePane.appendChild(devInfoFragment);
        return devInfoPanel;
    };
    ConfigPageBuilder_CustomDevice.prototype.createServicePanel = function (deviceConfig, serviceConfig) {
        var _this = this;
        var servicePanel = document.importNode(this.deviceServicePanelTemplate.content, true);
        var frameNode = servicePanel.querySelector('#yahka_service_panel');
        admin_translation_1.translateFragment(servicePanel);
        var inputHelper = function (selector, configName, popuplateServices, eventHandler) {
            var input = frameNode.querySelector(selector);
            if (popuplateServices === true) {
                var selectList = Object.keys(HAPServiceDictionary);
                _this.fillSelectByArray(input, selectList);
            }
            if (serviceConfig)
                admin_utils_1.Utils.setInputValue(input, serviceConfig[configName]);
            if (eventHandler !== undefined)
                input.addEventListener('input', eventHandler);
            else
                input.addEventListener('input', _this.handleServiceMetaDataChange.bind(_this, serviceConfig, frameNode, configName));
        };
        this.refreshServicePanelCaption(serviceConfig, frameNode);
        inputHelper('#service_name', 'name');
        inputHelper('#service_type', 'type', true, this.handleServiceTypeChange.bind(this, serviceConfig, frameNode));
        inputHelper('#service_subtype', 'subType');
        this.buildCharacteristicTable(serviceConfig, frameNode);
        // bind delete buttton
        frameNode.querySelector('#yakha_delete_service').addEventListener('click', function () {
            var idx = deviceConfig.services.indexOf(serviceConfig);
            if (idx > -1) {
                deviceConfig.services.splice(idx, 1);
                _this.delegate.changeCallback();
                frameNode.parentNode.removeChild(frameNode);
            }
            _this.delegate.setSelectedDeviceConfig(undefined, false);
        });
        return frameNode;
    };
    ConfigPageBuilder_CustomDevice.prototype.refreshServicePanelCaption = function (serviceConfig, servicePanel) {
        servicePanel.querySelector('#yahka_service_caption').textContent = serviceConfig.name + '[' + serviceConfig.type + ']';
    };
    ConfigPageBuilder_CustomDevice.prototype.findHAPCharacteristic = function (serviceDef, characteristicName) {
        if (!serviceDef)
            return undefined;
        var x;
        if (x = serviceDef.characteristics[characteristicName])
            return x;
        return undefined;
    };
    ConfigPageBuilder_CustomDevice.prototype.findConfigCharacteristic = function (service, characteristicName) {
        var e_2, _a;
        if (!service) {
            return undefined;
        }
        try {
            for (var _b = __values(service.characteristics), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cfg = _c.value;
                if (cfg.name == characteristicName) {
                    return cfg;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
    };
    ConfigPageBuilder_CustomDevice.prototype.isEmptyCharacteristic = function (charConfig) {
        if (charConfig === undefined)
            return true;
        if (charConfig.name === '')
            return true;
        if ((charConfig['inOutFunction'] === '') || (charConfig['inOutFunction'] === undefined))
            return true;
        return false;
    };
    ConfigPageBuilder_CustomDevice.prototype.removeCharacteristic = function (serviceConfig, charConfig) {
        if (serviceConfig === undefined) {
            return;
        }
        var idx = serviceConfig.characteristics.indexOf(charConfig);
        if (idx > -1) {
            serviceConfig.characteristics.splice(idx, 1);
            this.delegate.changeCallback();
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.buildCharacteristicTable = function (serviceConfig, servicePanel) {
        var e_3, _a, e_4, _b;
        var serviceDef = HAPServiceDictionary[serviceConfig.type];
        var createdCharacteristics = {};
        try {
            for (var _c = __values(serviceConfig.characteristics), _d = _c.next(); !_d.done; _d = _c.next()) {
                var charConfig = _d.value;
                var charDef = this.findHAPCharacteristic(serviceDef, charConfig.name);
                if ((charDef === undefined) && (this.isEmptyCharacteristic(charConfig))) {
                    this.removeCharacteristic(serviceConfig, charConfig);
                    continue;
                }
                var charRow = this.createCharacteristicRow(charDef, serviceConfig, charConfig);
                createdCharacteristics[charConfig.name] = [charConfig.name, charDef ? charDef.optional : false, charRow];
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // add undefined characteristics
        if (serviceDef) {
            for (var charName in serviceDef.characteristics) {
                if (createdCharacteristics[charName] === undefined) {
                    var charDef = serviceDef.characteristics[charName];
                    var charRow = this.createCharacteristicRow(charDef, serviceConfig, undefined);
                    createdCharacteristics[charName] = [charName, charDef.optional, charRow];
                }
            }
        }
        var charRows = [];
        for (var charRow in createdCharacteristics)
            charRows.push(createdCharacteristics[charRow]);
        charRows.sort(function (a, b) {
            if (a[1] != b[1])
                return a[1] ? -1 : 1;
            return a[0].localeCompare(b[0]);
        });
        var table = servicePanel.querySelector('#yahka_characteristic_table');
        while (table.childElementCount > 1) { // first row is the header row
            table.removeChild(table.lastElementChild);
        }
        try {
            for (var charRows_1 = __values(charRows), charRows_1_1 = charRows_1.next(); !charRows_1_1.done; charRows_1_1 = charRows_1.next()) {
                var row = charRows_1_1.value;
                table.appendChild(row[2]);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (charRows_1_1 && !charRows_1_1.done && (_b = charRows_1.return)) _b.call(charRows_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.getParameterEditor = function (functionName, valueChangeCallback, functionMap) {
        if (!functionMap.has(functionName)) {
            return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback);
        }
        var constr = functionMap.get(functionName);
        return new constr(valueChangeCallback);
    };
    ConfigPageBuilder_CustomDevice.prototype.updateParameterEditor = function (functionName, parameterContainer, parameterValue, parameterChangeCallback, functionMap) {
        var editor = this.getParameterEditor(functionName, parameterChangeCallback, functionMap);
        if (editor == undefined)
            return;
        editor.refreshAndShow(parameterContainer, parameterValue);
    };
    ConfigPageBuilder_CustomDevice.prototype.createCharacteristicRow = function (charDef, serviceConfig, charConfig) {
        var _this = this;
        var name = charConfig ? charConfig.name : charDef.name;
        var enabled = charConfig ? charConfig.enabled : false;
        var rowElement = document.importNode(this.characteristicRow.content, true);
        admin_translation_1.translateFragment(rowElement);
        var bracketElement = rowElement.querySelector('#characteristic');
        var checkBox = rowElement.querySelector('#characteristic_enabled');
        checkBox.checked = enabled;
        checkBox.addEventListener('click', this.handleCharacteristicEnabledChange.bind(this, serviceConfig, name, bracketElement));
        this.refreshEnabledClass(bracketElement, enabled);
        this.refershOptionalClass(bracketElement, charDef ? charDef.optional : true);
        rowElement.querySelector('#characteristic_name').textContent = name;
        var functionSelector = function (selector, containerSelector, configName, parameterName, functionMap) {
            var input = rowElement.querySelector(selector);
            var container = rowElement.querySelector(containerSelector);
            if (functionMap !== undefined) {
                var mapKeys = __spread(functionMap.keys());
                _this.fillSelectByArray(input, mapKeys);
            }
            var parameterValue = undefined;
            if (charConfig) {
                admin_utils_1.Utils.setInputValue(input, charConfig[configName]);
                parameterValue = charConfig[parameterName];
            }
            var paramUpdateMethod = function (newValue) {
                var charConfig = _this.findConfigCharacteristic(serviceConfig, name);
                if (charConfig === undefined) {
                    charConfig = { name: name, enabled: false };
                    serviceConfig.characteristics.push(charConfig);
                }
                charConfig[parameterName] = newValue;
                _this.delegate.changeCallback();
            };
            _this.updateParameterEditor(admin_utils_1.Utils.getSelectInputValue(input), container, parameterValue, paramUpdateMethod, functionMap);
            input.addEventListener('input', function (e) {
                _this.handleCharacteristicInputChange(serviceConfig, name, configName, e);
                var charConfig = _this.findConfigCharacteristic(serviceConfig, name);
                _this.updateParameterEditor(admin_utils_1.Utils.getSelectInputValue(input), container, charConfig[parameterName], paramUpdateMethod, functionMap);
                return false;
            });
        };
        functionSelector('#characteristic_inoutfunction', '#characteristic_inoutparams_container', 'inOutFunction', 'inOutParameters', parameterEditor_factory_1.inoutFunctions);
        functionSelector('#characteristic_conversionfunction', '#characteristic_conversionparams_container', 'conversionFunction', 'conversionParameters', parameterEditor_factory_1.convFunctions);
        this.updateCharacteristicProperties(rowElement, serviceConfig, charDef, charConfig);
        return rowElement;
    };
    ConfigPageBuilder_CustomDevice.prototype.updateCharacteristicProperties = function (rowElement, serviceConfig, charDef, charConfig) {
        var charName = charConfig ? charConfig.name : charDef.name;
        var toggleLink = rowElement.querySelector('#toggleProperties');
        var propContainer = rowElement.querySelector('#characteristic_propertyTable_container');
        var hasCustomProperties = charConfig ? (charConfig.properties !== undefined) && (Object.keys(charConfig.properties).length > 0) : false;
        if (toggleLink) {
            toggleLink.addEventListener('click', function () {
                propContainer.classList.toggle('no-display');
            });
            propContainer.classList.toggle('no-display', !hasCustomProperties);
            toggleLink.classList.toggle('properties-defined', hasCustomProperties);
        }
        var propTable = rowElement.querySelector('#characteristic_propertyTable');
        function transformValue(value) {
            var result = value;
            var isObject = false;
            if (typeof result === 'object') {
                result = JSON.stringify(result);
                isObject = true;
            }
            return { asString: result, isObject: isObject };
        }
        for (var propertyName in charDef.properties) {
            var propertyDefaultValue = transformValue(charDef.properties[propertyName]);
            var propElement = document.importNode(this.characteristicPropRow.content, true);
            var nameSpan = propElement.querySelector('#propName');
            nameSpan.id = "";
            nameSpan.textContent = propertyName;
            var propInput = propElement.querySelector('#propValue');
            propInput.id = propertyName;
            propInput.placeholder = propertyDefaultValue.asString;
            if (charConfig !== undefined) {
                if (charConfig.properties !== undefined) {
                    if (charConfig.properties[propertyName] !== undefined) {
                        var charValue = transformValue(charConfig.properties[propertyName]);
                        admin_utils_1.Utils.setInputValue(propInput, charValue.asString);
                    }
                }
            }
            nameSpan.classList.toggle('properties-defined', propInput.value != "");
            propInput.addEventListener('input', this.handleCharacteristicPropertyChange.bind(this, serviceConfig, charName, propertyName, propertyDefaultValue.isObject));
            propTable.appendChild(propElement);
        }
    };
    ConfigPageBuilder_CustomDevice.prototype.refreshEnabledClass = function (row, enabled) {
        row.classList.toggle('disabled', !enabled);
    };
    ConfigPageBuilder_CustomDevice.prototype.refershOptionalClass = function (row, optional) {
        row.classList.toggle('optional-characteristic', optional);
    };
    ConfigPageBuilder_CustomDevice.prototype.handleCharacteristicEnabledChange = function (serviceConfig, charName, charRow, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        charConfig.enabled = inputTarget.checked;
        this.refreshEnabledClass(charRow, charConfig.enabled);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleCharacteristicInputChange = function (serviceConfig, charName, attribute, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        var inputValue = admin_utils_1.Utils.getInputValue(inputTarget);
        charConfig[attribute] = inputValue;
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleCharacteristicPropertyChange = function (serviceConfig, charName, property, isObjectProperty, ev) {
        var charConfig = this.findConfigCharacteristic(serviceConfig, charName);
        if (charConfig === undefined) {
            charConfig = { name: charName, enabled: false };
            serviceConfig.characteristics.push(charConfig);
        }
        var inputTarget = ev.currentTarget;
        var inputValue = admin_utils_1.Utils.getInputValue(inputTarget);
        if (charConfig.properties === undefined)
            charConfig.properties = {};
        if (inputValue !== undefined) {
            if (isObjectProperty) {
                try {
                    charConfig.properties[property] = JSON.parse(inputValue);
                }
                catch (e) {
                    console.log("parsing of", inputValue, " failed with: ", e);
                }
            }
            else {
                charConfig.properties[property] = inputValue;
            }
        }
        else {
            delete charConfig.properties[property];
        }
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleDeviceMetaDataChange = function (deviceConfig, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = (inputTarget.type === 'checkbox') ? inputTarget.checked : inputTarget.value;
        deviceConfig[propertyName] = inputValue;
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(deviceConfig);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleServiceMetaDataChange = function (serviceConfig, servicePanel, attribute, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = admin_utils_1.Utils.getInputValue(inputTarget);
        serviceConfig[attribute] = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_CustomDevice.prototype.handleServiceTypeChange = function (serviceConfig, servicePanel, ev) {
        var inputTarget = ev.currentTarget;
        var inputValue = admin_utils_1.Utils.getInputValue(inputTarget);
        serviceConfig.type = inputValue;
        this.refreshServicePanelCaption(serviceConfig, servicePanel);
        this.buildCharacteristicTable(serviceConfig, servicePanel);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_CustomDevice;
}(pageBuilder_base_1.ConfigPageBuilder_Base));
exports.ConfigPageBuilder_CustomDevice = ConfigPageBuilder_CustomDevice;


/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.ipCam.main.inc.html":
/*!***********************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.ipCam.main.inc.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"frame\">\n    <div class=\"heading\">\n        <span class=\"translate\">Basic Properties</span>\n    </div>\n    <div class=\"content\">\n        <div>\n            <div><label class=\"translate\" for=\"enabled\">Enabled:</label></div>\n            <div class=\"input control flex-grow margin10\">\n                <input type=\"checkbox\" id=\"enabled\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"name\">Device name:</label></div>\n            <div class=\"errorpanel translate\" id=\"name_error\">A device with this name already exists.\n                Please change the name!</div>\n            <div class=\"input control flex-grow margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"name\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"manufacturer\">Manufacturer:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"manufacturer\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"model\">Model:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"model\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"serial\">Serial:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"serial\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"firmware\">Firmware:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"firmware\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"username\">Username:</label><span class=\"edit-hint translate\">needs\n                    to be in form of a mac address, e.g: d8:be:54:e7:06:f8. <b>After changing this field,\n                        the camera needs to be reconfigured in the HomeKit database</b></span></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"username\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"pincode\">Pincode:</label><span class=\"edit-hint translate\">needs\n                    to be in the form of 123-45-678</span></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"pincode\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"port\">IP/Port:</label><span class=\"edit-hint translate\">Port 0 =\n                    random free port assigned by the operation system (default)</span></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <select id=\"interface\"></select>\n                <input min=\"0\" max=\"65535\" type=\"number\" id=\"port\" />\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"frame\">\n    <div class=\"heading\">\n        <span class=\"translate\">Stream Properties</span>\n    </div>\n\n    <div class=\"content\">\n        <div>\n            <div><label class=\"translate\" for=\"source\">Source:</label></div>\n            <div class=\"input control flex-grow margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"source\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"codec\">Codec:</label></div>\n            <div class=\"input control flex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"codec\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"numberOfStreams\">Number of Streams:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"numberOfStreams\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"maxWidth\">maxWidth:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"maxWidth\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"maxHeight\">maxHeight:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"maxHeight\" />\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"maxFPS\">maxFPS:</label></div>\n            <div class=\"input controlflex-grow  margin10\">\n                <input class=\"full-size\" type=\"text\" id=\"maxFPS\" />\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"frame\">\n    <div class=\"heading\">\n        <span class=\"translate\">Advanced Settings</span>\n    </div>\n\n    <div class=\"content\">\n        <div>\n            <div><label class=\"translate\" for=\"ffmpeg_snapshot\">FFMPEG Command Line - Snapshot:</label></div>\n            <div class=\"errorpanel\" id=\"ffmpeg_snapshot_error\"></div>\n            <div class=\"input control flex-grow margin10 flex-container-row\">\n                <textarea rows=8 class=\"flex-grow\" id=\"ffmpeg_snapshot\"></textarea>\n                <div class=\"margin10\"><span class=\"translate\">Available replacers:</span> <br>\n                    <ul class=\"simple-list blue-bullet replace-list\">\n                        <li>${source}</li>\n                        <li>${width}</li>\n                        <li>${height}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div>\n            <div><label class=\"translate\" for=\"ffmpeg_stream\">FFMPEG Command Line - Stream:</label></div>\n            <div class=\"errorpanel\" id=\"ffmpeg_stream_error\"></div>\n            <div class=\"input control flex-grow margin10 flex-container-row\">\n                <textarea rows=8 class=\"flex-grow\" id=\"ffmpeg_stream\"></textarea>\n                <div class=\"margin10\"><span class=\"translate\">Available replacers:</span> <br>\n                    <ul class=\"simple-list blue-bullet replace-list\">\n                        <li>${codec}</li>\n                        <li>${fps}</li>\n                        <li>${width}</li>\n                        <li>${height}</li>\n                        <li>${bitrate}</li>\n                        <li>${videokey}</li>\n                        <li>${targetAddress}</li>\n                        <li>${targetVideoPort}</li>\n                    </ul>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.ipCam.ts":
/*!************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.ipCam.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/// <reference path="../../typings/index.d.ts" />
var hkBridge = __webpack_require__(/*! ../../shared/yahka.configuration */ "./shared/yahka.configuration.ts");
var pageBuilder_base_1 = __webpack_require__(/*! ./pageBuilder.base */ "./admin/pageBuilder/pageBuilder.base.ts");
var admin_translation_1 = __webpack_require__(/*! ../admin.translation */ "./admin/admin.translation.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var yahka_admin_1 = __webpack_require__(/*! ../yahka.admin */ "./admin/yahka.admin.ts");
var ConfigPageBuilder_IPCamera = /** @class */ (function (_super) {
    __extends(ConfigPageBuilder_IPCamera, _super);
    function ConfigPageBuilder_IPCamera(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.delegate = delegate;
        _this.addServiceAvailable = false;
        _this.removeDeviceAvailable = true;
        _this.dupliacteDeviceAvailable = true;
        _this.configPanelTemplate = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.ipCam.main.inc.html */ "./admin/pageBuilder/pageBuilder.ipCam.main.inc.html"));
        return _this;
    }
    ConfigPageBuilder_IPCamera.prototype.refresh = function (config, AFocusLastPanel, devicePanel) {
        return __awaiter(this, void 0, void 0, function () {
            var configFragment, inputHelper, ffmpegHelper, ipList, ipListForSelectBox;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!hkBridge.Configuration.isIPCameraConfig(config)) {
                            return [2 /*return*/];
                        }
                        configFragment = document.importNode(this.configPanelTemplate.content, true);
                        admin_translation_1.translateFragment(configFragment);
                        inputHelper = function (selector, propertyName, selectList, validator) {
                            if (validator === void 0) { validator = undefined; }
                            var input = configFragment.querySelector(selector);
                            var errorElement = configFragment.querySelector(selector + '_error');
                            _this.fillSelectByListEntries(input, selectList);
                            var value = config[propertyName];
                            if (input.type === 'checkbox') {
                                input.checked = value === undefined ? true : value;
                                input.addEventListener('change', _this.handlePropertyChange.bind(_this, config, propertyName, errorElement, validator));
                            }
                            else {
                                if (value !== undefined) {
                                    input.value = value.toString();
                                }
                                else {
                                    input.value = '';
                                }
                                input.addEventListener('input', _this.handlePropertyChange.bind(_this, config, propertyName, errorElement, validator));
                            }
                            _this.refreshSimpleErrorElement(errorElement, validator);
                        };
                        ffmpegHelper = function (selector, propertyName) {
                            var input = configFragment.querySelector(selector);
                            var inputErrorMsg = configFragment.querySelector(selector + '_error');
                            var value = config.ffmpegCommandLine[propertyName];
                            if (value !== undefined) {
                                input.value = JSON.stringify(value, null, 2);
                            }
                            else {
                                input.value = '';
                            }
                            input.addEventListener('input', _this.handleffMpegPropertyChange.bind(_this, config, propertyName, inputErrorMsg));
                        };
                        inputHelper('#enabled', 'enabled');
                        inputHelper('#name', 'name', undefined, function () { return !_this.delegate.deviceIsUnique(config); });
                        inputHelper('#manufacturer', 'manufacturer');
                        inputHelper('#model', 'model');
                        inputHelper('#serial', 'serial');
                        inputHelper('#firmware', 'firmware');
                        inputHelper('#username', 'username');
                        inputHelper('#pincode', 'pincode');
                        inputHelper('#port', 'port');
                        return [4 /*yield*/, yahka_admin_1.ioBrokerInterfaceList];
                    case 1:
                        ipList = _a.sent();
                        ipListForSelectBox = ipList.filter(function (a) { return a.family === "ipv4"; }).map(function (a) { return { value: a.address, text: a.name }; });
                        inputHelper('#interface', 'interface', ipListForSelectBox);
                        inputHelper('#source', 'source');
                        inputHelper('#codec', 'codec');
                        inputHelper('#numberOfStreams', 'numberOfStreams');
                        inputHelper('#maxWidth', 'maxWidth');
                        inputHelper('#maxHeight', 'maxHeight');
                        inputHelper('#maxFPS', 'maxFPS');
                        ffmpegHelper('#ffmpeg_snapshot', 'snapshot');
                        ffmpegHelper('#ffmpeg_stream', 'stream');
                        devicePanel.appendChild(configFragment);
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfigPageBuilder_IPCamera.prototype.styleListItem = function (listItem, deviceConfig) {
        if (!hkBridge.Configuration.isIPCameraConfig(deviceConfig)) {
            return false;
        }
        var listIcon = listItem.querySelector('.list-icon');
        listIcon.className = 'list-icon icon mif-camera';
        listItem.classList.toggle('fg-grayLight', !deviceConfig.enabled);
        listItem.classList.toggle('fg-grayDark', deviceConfig.enabled);
        return true;
    };
    ConfigPageBuilder_IPCamera.prototype.handlePropertyChange = function (config, propertyName, errorElement, validator, ev) {
        var inputTarget = ev.currentTarget;
        if (inputTarget.type == "checkbox") {
            config[propertyName] = inputTarget.checked;
        }
        else {
            config[propertyName] = inputTarget.value;
        }
        this.refreshSimpleErrorElement(errorElement, validator);
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    };
    ConfigPageBuilder_IPCamera.prototype.displayExceptionHint = function (textArea, msgPanel, message) {
        textArea.classList.toggle('validationError', message !== undefined);
        msgPanel.classList.toggle('validationError', message !== undefined);
        msgPanel.innerText = message;
    };
    ConfigPageBuilder_IPCamera.prototype.handleffMpegPropertyChange = function (config, propertyName, inputErrorMsgPanel, ev) {
        var inputTarget = ev.currentTarget;
        try {
            config.ffmpegCommandLine[propertyName] = JSON.parse(inputTarget.value);
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, undefined);
        }
        catch (e) {
            this.displayExceptionHint(inputTarget, inputErrorMsgPanel, e.message);
        }
        this.delegate.refreshDeviceListEntry(config);
        this.delegate.changeCallback();
    };
    return ConfigPageBuilder_IPCamera;
}(pageBuilder_base_1.ConfigPageBuilder_Base));
exports.ConfigPageBuilder_IPCamera = ConfigPageBuilder_IPCamera;


/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.main.deviceListEntry.inc.html":
/*!*********************************************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.main.deviceListEntry.inc.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"list device-entry\">\n    <span class=\"icon list-icon\"></span>\n    <span class=\"list-title\"> </span>\n</div>"

/***/ }),

/***/ "./admin/pageBuilder/pageBuilder.main.ts":
/*!***********************************************!*\
  !*** ./admin/pageBuilder/pageBuilder.main.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var hkBridge = __webpack_require__(/*! ../../shared/yahka.configuration */ "./shared/yahka.configuration.ts");
var $ = __webpack_require__(/*! jquery */ "jquery");
var admin_defaults_1 = __webpack_require__(/*! ../admin.defaults */ "./admin/admin.defaults.ts");
var pageBuilder_base_1 = __webpack_require__(/*! ./pageBuilder.base */ "./admin/pageBuilder/pageBuilder.base.ts");
var pageBuilder_customDevice_1 = __webpack_require__(/*! ./pageBuilder.customDevice */ "./admin/pageBuilder/pageBuilder.customDevice.ts");
var pageBuilder_bridgeConfig_1 = __webpack_require__(/*! ./pageBuilder.bridgeConfig */ "./admin/pageBuilder/pageBuilder.bridgeConfig.ts");
var pageBuilder_ipCam_1 = __webpack_require__(/*! ./pageBuilder.ipCam */ "./admin/pageBuilder/pageBuilder.ipCam.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
function generateRandomUsername() {
    var usr = [];
    for (var i = 0; i < 6; i++)
        usr[i] = ('00' + (Math.floor((Math.random() * 256)).toString(16))).substr(-2);
    return usr.join(':');
}
var ioBroker_YahkaPageBuilder = /** @class */ (function () {
    function ioBroker_YahkaPageBuilder(_bridgeSettings, cameraConfigs, _changeCallback) {
        this._bridgeSettings = _bridgeSettings;
        this.cameraConfigs = cameraConfigs;
        this._changeCallback = _changeCallback;
        this.pageBuilders = new Map();
        this._selectedDeviceConfig = undefined;
        if (!_bridgeSettings.devices)
            _bridgeSettings.devices = [];
        _bridgeSettings.configType = 'bridge';
        this.deviceListHandler = new ioBroker_DeviceListHandler(this);
        this.buttonHandler = new ioBroker_ButtonHandler(this, this.deviceListHandler);
        this.pageBuilders.set('bridge', new pageBuilder_bridgeConfig_1.ConfigPageBuilder_BridgeConfig(this));
        this.pageBuilders.set('customdevice', new pageBuilder_customDevice_1.ConfigPageBuilder_CustomDevice(this));
        this.pageBuilders.set('ipcamera', new pageBuilder_ipCam_1.ConfigPageBuilder_IPCamera(this));
        this.bootstrap();
    }
    ioBroker_YahkaPageBuilder.prototype.bootstrap = function () {
        var bridgeFrame = document.querySelector('#yahka_bridge_frame');
        this.deviceListHandler.buildDeviceList(bridgeFrame);
        this.buttonHandler.bindBridgeButtons(bridgeFrame);
        this.buttonHandler.refreshBridgeButtons(bridgeFrame);
        return bridgeFrame;
    };
    ioBroker_YahkaPageBuilder.prototype.deviceIsUnique = function (deviceConfig) {
        var devList = this.deviceListHandler.getDeviceList();
        return !devList.some(function (a) { return (a.name == deviceConfig.name) && (a !== deviceConfig); });
    };
    ioBroker_YahkaPageBuilder.prototype.getPageBuilderByConfig = function (deviceConfig) {
        if (deviceConfig === undefined) {
            return undefined;
        }
        var configType = deviceConfig.configType;
        if (configType === undefined) {
            if (hkBridge.Configuration.isBridgeConfig(deviceConfig)) {
                configType = 'bridge';
            }
            else if (hkBridge.Configuration.isDeviceConfig(deviceConfig)) {
                configType = 'customdevice';
            }
        }
        return this.pageBuilders.get(configType);
    };
    Object.defineProperty(ioBroker_YahkaPageBuilder.prototype, "bridgeSettings", {
        get: function () {
            return this._bridgeSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ioBroker_YahkaPageBuilder.prototype, "selectedDeviceConfig", {
        get: function () {
            return this._selectedDeviceConfig;
        },
        enumerable: true,
        configurable: true
    });
    ioBroker_YahkaPageBuilder.prototype.refreshDevicePanel = function (deviceConfig, AFocusLastPanel) {
        var pageBuilder = this.getPageBuilderByConfig(deviceConfig);
        var devicePanel = document.querySelector('#yahka_device_details');
        if (devicePanel) {
            devicePanel.innerHTML = '';
        }
        if (pageBuilder) {
            pageBuilder.refresh(deviceConfig, AFocusLastPanel, devicePanel);
        }
    };
    ioBroker_YahkaPageBuilder.prototype.setSelectedDeviceConfig = function (deviceConfig, AFocusLastPanel) {
        this._selectedDeviceConfig = deviceConfig;
        this.refreshDevicePanel(deviceConfig, AFocusLastPanel);
        this.buttonHandler.refreshBridgeButtons(document.body);
    };
    ioBroker_YahkaPageBuilder.prototype.refreshDeviceListEntry = function (deviceConfig) {
        this.deviceListHandler.refreshDeviceList();
    };
    ioBroker_YahkaPageBuilder.prototype.changeCallback = function () {
        return this._changeCallback();
    };
    return ioBroker_YahkaPageBuilder;
}());
exports.ioBroker_YahkaPageBuilder = ioBroker_YahkaPageBuilder;
var ioBroker_DeviceListHandler = /** @class */ (function (_super) {
    __extends(ioBroker_DeviceListHandler, _super);
    function ioBroker_DeviceListHandler(delegate) {
        var _this = _super.call(this, delegate) || this;
        _this.listEntryToConfigMap = new Map();
        _this.deviceListEntryTemplate = admin_pageLoader_1.createTemplateElement(__webpack_require__(/*! ./pageBuilder.main.deviceListEntry.inc.html */ "./admin/pageBuilder/pageBuilder.main.deviceListEntry.inc.html"));
        return _this;
    }
    ioBroker_DeviceListHandler.prototype.getDeviceList = function () {
        var result = [this.delegate.bridgeSettings];
        var devices = [];
        if (this.delegate.bridgeSettings.devices)
            devices = devices.concat(this.delegate.bridgeSettings.devices);
        if (this.delegate.cameraConfigs)
            devices = devices.concat(this.delegate.cameraConfigs);
        return result.concat(devices.sort(function (a, b) { return a.name.localeCompare(b.name); }));
    };
    ioBroker_DeviceListHandler.prototype.createDeviceListEntry = function (deviceConfig) {
        var deviceEntry = document.importNode(this.deviceListEntryTemplate.content, true);
        var listItem = deviceEntry.querySelector('.list');
        this.refreshDeviceListEntry(deviceConfig, listItem);
        return deviceEntry;
    };
    ioBroker_DeviceListHandler.prototype.buildDeviceList = function (bridgeFrame) {
        var e_1, _a;
        var bridge = this.delegate.bridgeSettings;
        var deviceList = bridgeFrame.querySelector('#yahka_deviceList');
        deviceList.innerHTML = "";
        this.listEntryToConfigMap.clear();
        try {
            for (var _b = __values(this.getDeviceList()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var deviceConfig = _c.value;
                var fragment = this.createDeviceListEntry(deviceConfig);
                var node = fragment.querySelector('.list');
                this.listEntryToConfigMap.set(node, deviceConfig);
                deviceList.appendChild(fragment);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        $(deviceList).listview({ onListClick: this.handleDeviceListClick.bind(this) });
    };
    ioBroker_DeviceListHandler.prototype.refreshDeviceList = function () {
        var _this = this;
        this.listEntryToConfigMap.forEach(function (node, element) { return _this.refreshDeviceListEntry(node, element); });
    };
    ioBroker_DeviceListHandler.prototype.refreshDeviceListEntry = function (deviceConfig, listItem) {
        if (!listItem)
            return;
        var pageBuilder = this.delegate.getPageBuilderByConfig(deviceConfig);
        listItem.querySelector('.list-title').textContent = deviceConfig.name;
        listItem.classList.toggle('active', (deviceConfig === this.delegate.selectedDeviceConfig));
        var stylingDone = false;
        if (pageBuilder !== undefined) {
            stylingDone = pageBuilder.styleListItem(listItem, deviceConfig);
        }
        listItem.classList.toggle('error', !this.delegate.deviceIsUnique(deviceConfig));
        if (!stylingDone) {
            var listIcon = listItem.querySelector('.list-icon');
            listIcon.className = 'list-icon icon mif-question';
        }
    };
    ioBroker_DeviceListHandler.prototype.handleDeviceListClick = function (deviceNode) {
        if (!deviceNode)
            return;
        var deviceConfig = this.listEntryToConfigMap.get(deviceNode[0]);
        this.delegate.setSelectedDeviceConfig(deviceConfig, false);
    };
    return ioBroker_DeviceListHandler;
}(pageBuilder_base_1.ConfigPageBuilder_Base));
var ioBroker_ButtonHandler = /** @class */ (function (_super) {
    __extends(ioBroker_ButtonHandler, _super);
    function ioBroker_ButtonHandler(delegate, deviceListHandler) {
        var _this = _super.call(this, delegate) || this;
        _this.deviceListHandler = deviceListHandler;
        return _this;
    }
    ioBroker_ButtonHandler.prototype.bindBridgeButtons = function (bridgePane) {
        var _this = this;
        var bridge = this.delegate.bridgeSettings;
        var elem;
        if (elem = bridgePane.querySelector('#yahka_add_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var newCustomDevice = {
                    configType: "customdevice",
                    manufacturer: "",
                    model: "",
                    name: "<new device " + _this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    firmware: "",
                    enabled: true,
                    category: 1,
                    services: []
                };
                bridge.devices.push(newCustomDevice);
                _this.delegate.setSelectedDeviceConfig(newCustomDevice, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_add_camera')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var newIPCamera = {
                    configType: "ipcamera",
                    ident: "",
                    manufacturer: "",
                    model: "",
                    name: "<new camera " + _this.deviceListHandler.getDeviceList().length + ">",
                    serial: "",
                    firmware: "",
                    port: 0,
                    username: generateRandomUsername(),
                    pincode: "123-45-678",
                    enabled: true,
                    source: "",
                    codec: "libx264",
                    maxWidth: 1920,
                    maxHeight: 1080,
                    maxFPS: 60,
                    verboseLogging: false,
                    numberOfStreams: undefined,
                    ffmpegCommandLine: admin_defaults_1.Defaults.ffmpegCommandLines.default,
                    devices: []
                };
                _this.delegate.cameraConfigs.push(newIPCamera);
                _this.delegate.setSelectedDeviceConfig(newIPCamera, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_add_service')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                if (!hkBridge.Configuration.isDeviceConfig(dev))
                    return;
                dev.services.push({
                    name: '',
                    subType: '',
                    type: '',
                    characteristics: []
                });
                _this.delegate.refreshDevicePanel(dev, true);
                _this.delegate.changeCallback();
            });
        }
        if (elem = bridgePane.querySelector('#yahka_remove_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                if (hkBridge.Configuration.isDeviceConfig(dev)) {
                    var idx = bridge.devices.indexOf(dev);
                    if (idx > -1) {
                        bridge.devices.splice(idx, 1);
                        _this.delegate.changeCallback();
                        _this.delegate.setSelectedDeviceConfig(undefined, false);
                        _this.deviceListHandler.buildDeviceList(bridgePane);
                        _this.delegate.changeCallback();
                    }
                }
                else if (hkBridge.Configuration.isIPCameraConfig(dev)) {
                    var idx = _this.delegate.cameraConfigs.indexOf(dev);
                    if (idx > -1) {
                        _this.delegate.cameraConfigs.splice(idx, 1);
                        _this.delegate.changeCallback();
                        _this.delegate.setSelectedDeviceConfig(undefined, false);
                        _this.deviceListHandler.buildDeviceList(bridgePane);
                        _this.delegate.changeCallback();
                    }
                }
            });
        }
        if (elem = bridgePane.querySelector('#yahka_duplicate_device')) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                var dev = _this.delegate.selectedDeviceConfig;
                var copyOfDevice = $.extend(true, {}, dev);
                copyOfDevice.name = copyOfDevice.name + " copy";
                if (hkBridge.Configuration.isDeviceConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    bridge.devices.push(copyOfDevice);
                }
                else if (hkBridge.Configuration.isIPCameraConfig(copyOfDevice)) {
                    copyOfDevice.serial = "";
                    _this.delegate.cameraConfigs.push(copyOfDevice);
                }
                else {
                    return;
                }
                _this.delegate.setSelectedDeviceConfig(copyOfDevice, true);
                _this.deviceListHandler.buildDeviceList(bridgePane);
                _this.delegate.changeCallback();
            });
        }
    };
    ioBroker_ButtonHandler.prototype.refreshBridgeButtons = function (parent) {
        // let addDeviceButton    = <HTMLElement>document.querySelector('#yahka_add_device');
        var addServiceButton = parent.querySelector('#yahka_add_service');
        var removeDeviceButton = parent.querySelector('#yahka_remove_device');
        var duplicateDeviceButton = parent.querySelector('#yahka_duplicate_device');
        var pageBuilder = this.delegate.getPageBuilderByConfig(this.delegate.selectedDeviceConfig);
        var addServiceEnabled = pageBuilder ? pageBuilder.addServiceAvailable : false;
        var removeDevEnabled = pageBuilder ? pageBuilder.removeDeviceAvailable : false;
        var duplicateDeviceEnabled = pageBuilder ? pageBuilder.dupliacteDeviceAvailable : false;
        if (addServiceEnabled)
            addServiceButton.removeAttribute('disabled');
        else
            addServiceButton.setAttribute('disabled', '');
        if (removeDevEnabled)
            removeDeviceButton.removeAttribute('disabled');
        else
            removeDeviceButton.setAttribute('disabled', '');
        if (duplicateDeviceEnabled)
            duplicateDeviceButton.removeAttribute('disabled');
        else
            duplicateDeviceButton.setAttribute('disabled', '');
    };
    return ioBroker_ButtonHandler;
}(pageBuilder_base_1.ConfigPageBuilder_Base));


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.Map.inc.html":
/*!************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.Map.inc.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-table\">\n    <div class=\"row padding5\">\n            <div class=\"cell padding5\">\n                    ioBroker\n                </div>\n                <div class=\"cell padding5\">\n                        \n                    </div>                \n        <div class=\"cell padding5\">\n            HomeKit\n        </div>\n        <div class=\"cell padding5\">\n            Actions\n        </div>\n\n    </div>\n    <template id=\"mappingRow\">\n        <div class=\"row\">\n            <div class=\"cell padding5\">\n                <div class=\"input-container flex-container-row full-width\">\n                    <input id=\"ioBrokerValue\" type=\"text\"></input>\n                    <div>\n                        <input type=\"checkbox\" id=\"isSimpleValue\" /><span> is simple value</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"cell padding5\">\n                &hArr;\n            </div>\n            <div class=\"cell padding5\">\n                <div class=\"input-container full-width\">\n                    <input id=\"homekitValue\" type=\"text\"></input>\n                </div>\n            </div>\n            <div class=\"cell padding5\">\n                <a id=\"moveUp\" href=\"#\"><span class=\"icon mif-move-up fg-black\"></span></a>\n                <a id=\"moveDown\" href=\"#\"><span class=\"icon mif-move-down fg-black\"></span></a>\n                <a id=\"delRow\" href=\"#\"><span class=\"icon mif-minus fg-red\"></span></a>\n            </div>\n        </div>\n    </template>\n    <div class=\"row\" id=\"lastRow\">\n        <div class=\"cell padding5\">\n            <a id=\"addRow\" href=\"#\"><span class=\"icon mif-plus fg-green\"></span><span class=\"translate\">add new mapping</span></a>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.base.ts":
/*!*******************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.base.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterEditor = /** @class */ (function () {
    function ParameterEditor(valueChangeCallback) {
        this.valueChangeCallback = valueChangeCallback;
    }
    ParameterEditor.prototype.refreshAndShow = function (containerElement, withValue) {
    };
    ParameterEditor.prototype.removeChildren = function (parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    };
    ParameterEditor.prototype.buildNewParameterValue = function () {
        return undefined;
    };
    ParameterEditor.prototype.valueChanged = function () {
        this.valueChangeCallback(this.buildNewParameterValue());
    };
    return ParameterEditor;
}());
exports.ParameterEditor = ParameterEditor;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.const.inc.html":
/*!**************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.const.inc.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-table\" id=\"yahka_characteristic_table\">\n    <div class=\"row\">\n        <div class=\"cell\">\n            <label class=\"translate\">Value:</label>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container\">\n                <textarea id=\"textfield\" rows=1 class=\"full-width stateSelectTarget\"></textarea>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.const.ts":
/*!********************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.const.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var ParameterEditor_Const = /** @class */ (function (_super) {
    __extends(ParameterEditor_Const, _super);
    function ParameterEditor_Const(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.const.inc.html */ "./admin/parameterEditor/parameterEditor.const.inc.html"));
        _this.textField = _this.templateNode.querySelector("#textfield");
        _this.textField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_Const.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        admin_utils_1.Utils.setInputValue(this.textField, parameterValue);
    };
    ParameterEditor_Const.prototype.buildNewParameterValue = function () {
        return admin_utils_1.Utils.getInputValue(this.textField);
    };
    return ParameterEditor_Const;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_Const = ParameterEditor_Const;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.conversionScript.inc.html":
/*!*************************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.conversionScript.inc.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>Explanation: use the variable <b>value</b> to access the sourcevalue. Example: <i>return value * 2;</i><br /></div>\n<div class=\"editor-table\" id=\"yahka_characteristic_table\">\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">To HomeKit:</span>\n        </div>\n        <div class=\"cell\">\n            <span>function(value) {</span>\n            <div class=\"input-container full-width\">\n                <textarea id=\"toHomeKit\" rows=4></textarea>\n            </div>\n            <span>}</span>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">To IOBroker:</span>\n        </div>\n        <div class=\"cell\">\n            <span>function(value) {</span>\n            <div class=\"input-container  auto-height full-width\">\n                <textarea id=\"toIOBroker\" rows=4></textarea>\n            </div>\n            <span>}</span>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.conversionScript.ts":
/*!*******************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.conversionScript.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var ParameterEditor_ConversionScript = /** @class */ (function (_super) {
    __extends(ParameterEditor_ConversionScript, _super);
    function ParameterEditor_ConversionScript(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.conversionScript.inc.html */ "./admin/parameterEditor/parameterEditor.conversionScript.inc.html"));
        _this.txtToHomeKit = _this.templateNode.querySelector("#toHomeKit");
        _this.txtToHomeKit.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtToIOBroker = _this.templateNode.querySelector("#toIOBroker");
        _this.txtToIOBroker.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_ConversionScript.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        if (parameterValue) {
            admin_utils_1.Utils.setInputValue(this.txtToHomeKit, parameterValue["toHomeKit"]);
            admin_utils_1.Utils.setInputValue(this.txtToIOBroker, parameterValue["toIOBroker"]);
        }
        else {
            this.txtToHomeKit.value = "";
            this.txtToIOBroker.value = "";
        }
    };
    ParameterEditor_ConversionScript.prototype.buildNewParameterValue = function () {
        return {
            "toHomeKit": admin_utils_1.Utils.getInputValue(this.txtToHomeKit),
            "toIOBroker": admin_utils_1.Utils.getInputValue(this.txtToIOBroker)
        };
    };
    return ParameterEditor_ConversionScript;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_ConversionScript = ParameterEditor_ConversionScript;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.factory.ts":
/*!**********************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.factory.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_null_1 = __webpack_require__(/*! ./parameterEditor.null */ "./admin/parameterEditor/parameterEditor.null.ts");
var parameterEditor_const_1 = __webpack_require__(/*! ./parameterEditor.const */ "./admin/parameterEditor/parameterEditor.const.ts");
var parameterEditor_singleState_1 = __webpack_require__(/*! ./parameterEditor.singleState */ "./admin/parameterEditor/parameterEditor.singleState.ts");
var parameterEditor_multiState_1 = __webpack_require__(/*! ./parameterEditor.multiState */ "./admin/parameterEditor/parameterEditor.multiState.ts");
var parameterEditor_homeMaticWindowCoveringTargetPosition_1 = __webpack_require__(/*! ./parameterEditor.homeMaticWindowCoveringTargetPosition */ "./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.ts");
var parameterEditor_scaleConversion_1 = __webpack_require__(/*! ./parameterEditor.scaleConversion */ "./admin/parameterEditor/parameterEditor.scaleConversion.ts");
var parameterEditor_conversionScript_1 = __webpack_require__(/*! ./parameterEditor.conversionScript */ "./admin/parameterEditor/parameterEditor.conversionScript.ts");
var parameterEditor_map_1 = __webpack_require__(/*! ./parameterEditor.map */ "./admin/parameterEditor/parameterEditor.map.ts");
exports.inoutFunctions = new Map([
    ["", function (valueChangeCallback) { return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback); }],
    ["const", function (valueChangeCallback) { return new parameterEditor_const_1.ParameterEditor_Const(valueChangeCallback); }],
    ["ioBroker.State", function (valueChangeCallback) { return new parameterEditor_singleState_1.ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.MultiState", function (valueChangeCallback) { return new parameterEditor_multiState_1.ParameterEditor_MultiState(valueChangeCallback); }],
    ["ioBroker.State.Defered", function (valueChangeCallback) { return new parameterEditor_singleState_1.ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.State.OnlyACK", function (valueChangeCallback) { return new parameterEditor_singleState_1.ParameterEditor_SingleState(valueChangeCallback); }],
    ["ioBroker.homematic.WindowCovering.TargetPosition", function (valueChangeCallback) { return new parameterEditor_homeMaticWindowCoveringTargetPosition_1.ParameterEditor_HomeMaticWindowCoveringTargetPosition(valueChangeCallback); }]
]);
exports.convFunctions = new Map([
    ["", function (valueChangeCallback) { return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback); }],
    ["map", function (valueChangeCallback) { return new parameterEditor_map_1.ParameterEditor_Map(valueChangeCallback); }],
    ["hue", function (valueChangeCallback) { return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback); }],
    ["level255", function (valueChangeCallback) { return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback); }],
    ["passthrough", function (valueChangeCallback) { return new parameterEditor_null_1.ParameterEditor_Null(valueChangeCallback); }],
    ["inverse", function (valueChangeCallback) { return new parameterEditor_const_1.ParameterEditor_Const(valueChangeCallback); }],
    ["scaleInt", function (valueChangeCallback) { return new parameterEditor_scaleConversion_1.ParameterEditor_ScaleConversionEditor(valueChangeCallback); }],
    ["scaleFloat", function (valueChangeCallback) { return new parameterEditor_scaleConversion_1.ParameterEditor_ScaleConversionEditor(valueChangeCallback); }],
    ["HomematicDirectionToHomekitPositionState", function (valueChangeCallback) { return new parameterEditor_singleState_1.ParameterEditor_SingleState(valueChangeCallback); }],
    ["HomematicControlModeToHomekitHeathingCoolingState", function (valueChangeCallback) { return new parameterEditor_singleState_1.ParameterEditor_SingleState(valueChangeCallback); }],
    ["script", function (valueChangeCallback) { return new parameterEditor_conversionScript_1.ParameterEditor_ConversionScript(valueChangeCallback); }],
]);


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.inc.html":
/*!**********************************************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.inc.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-table\">\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">Level Datapoint:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container full-width\">\n                <textarea id=\"level\" rows=1 class=\"stateSelectTarget\"></textarea>\n                <button class=\"input-control button id-selector\"><span class=\"mif-more-horiz\"></span></button>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">Working Datapoint:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container full-width\">\n                <textarea id=\"working\" rows=1 class=\"stateSelectTarget\"></textarea>\n                <button class=\"input-control button id-selector\"><span class=\"mif-more-horiz\"></span></button>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.ts":
/*!****************************************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var ParameterEditor_HomeMaticWindowCoveringTargetPosition = /** @class */ (function (_super) {
    __extends(ParameterEditor_HomeMaticWindowCoveringTargetPosition, _super);
    function ParameterEditor_HomeMaticWindowCoveringTargetPosition(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.homeMaticWindowCoveringTargetPosition.inc.html */ "./admin/parameterEditor/parameterEditor.homeMaticWindowCoveringTargetPosition.inc.html"));
        _this.txtLevel = _this.templateNode.querySelector("#level");
        _this.txtLevel.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtWorking = _this.templateNode.querySelector("#working");
        _this.txtWorking.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_HomeMaticWindowCoveringTargetPosition.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        try {
            var p = void 0;
            if (typeof parameterValue === 'string')
                p = [parameterValue];
            else if (parameterValue instanceof Array)
                p = parameterValue;
            else
                p = [];
            admin_utils_1.Utils.setInputValue(this.txtLevel, (p.length >= 1) ? p[0] : "");
            admin_utils_1.Utils.setInputValue(this.txtWorking, (p.length >= 2) ? p[1] : "");
        }
        catch (e) {
            this.txtLevel.value = parameterValue;
            this.txtWorking.value = "";
        }
    };
    ParameterEditor_HomeMaticWindowCoveringTargetPosition.prototype.buildNewParameterValue = function () {
        var resultArray = [admin_utils_1.Utils.getInputValue(this.txtLevel)];
        if (this.txtWorking.value)
            resultArray.push(admin_utils_1.Utils.getInputValue(this.txtWorking));
        return resultArray;
    };
    return ParameterEditor_HomeMaticWindowCoveringTargetPosition;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_HomeMaticWindowCoveringTargetPosition = ParameterEditor_HomeMaticWindowCoveringTargetPosition;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.map.ts":
/*!******************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.map.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var conversion_map_1 = __webpack_require__(/*! ../../yahka.functions/conversion.map */ "./yahka.functions/conversion.map.ts");
var util_1 = __webpack_require__(/*! util */ "../node_modules/util/util.js");
var ParameterEditor_Map = /** @class */ (function (_super) {
    __extends(ParameterEditor_Map, _super);
    function ParameterEditor_Map(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.stateRows = [];
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.Map.inc.html */ "./admin/parameterEditor/parameterEditor.Map.inc.html"));
        _this.stateTemplate = _this.templateNode.querySelector('#mappingRow');
        _this.lastRow = _this.templateNode.querySelector('#lastRow');
        var addRow = _this.templateNode.querySelector("#addRow");
        addRow.addEventListener('click', _this.addRowClicked.bind(_this));
        return _this;
    }
    ParameterEditor_Map.prototype.createRow = function (item) {
        var _this = this;
        var importedRow = document.importNode(this.stateTemplate.content, true);
        var myRow = this.lastRow.parentElement.insertBefore(importedRow.firstElementChild, this.lastRow);
        this.stateRows.push(myRow);
        var leftField = myRow.querySelector('#ioBrokerValue');
        leftField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        var leftCheck = myRow.querySelector('#isSimpleValue');
        leftCheck.addEventListener('input', function (ev) { return _this.valueChanged(); });
        var rightField = myRow.querySelector('#homekitValue');
        rightField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        myRow.querySelector('#delRow').addEventListener('click', function () {
            myRow.remove();
            _this.stateRows = _this.stateRows.filter(function (row) { return row != myRow; });
            _this.valueChanged();
        });
        myRow.querySelector('#moveUp').addEventListener('click', function () {
            var myIndex = _this.stateRows.indexOf(myRow);
            var prevIndex = myIndex - 1;
            if (prevIndex < 0) {
                return;
            }
            var prevRow = _this.stateRows[prevIndex];
            _this.stateRows[prevIndex] = myRow;
            _this.stateRows[myIndex] = prevRow;
            _this.lastRow.parentElement.insertBefore(myRow, prevRow);
            _this.valueChanged();
        });
        myRow.querySelector('#moveDown').addEventListener('click', function () {
            var myIndex = _this.stateRows.indexOf(myRow);
            var nextIndex = myIndex + 1;
            if ((myIndex < 0) || (nextIndex >= _this.stateRows.length)) {
                return;
            }
            var nextRow = _this.stateRows[nextIndex];
            _this.stateRows[nextIndex] = myRow;
            _this.stateRows[myIndex] = nextRow;
            _this.lastRow.parentElement.insertBefore(nextRow, myRow);
            _this.valueChanged();
        });
        if (item === undefined)
            return myRow;
        if (util_1.isObject(item.left)) {
            admin_utils_1.Utils.setInputValue(leftField, JSON.stringify(item.left));
            leftCheck.checked = false;
        }
        else {
            admin_utils_1.Utils.setInputValue(leftField, item.left);
            leftCheck.checked = true;
        }
        admin_utils_1.Utils.setInputValue(rightField, item.right);
    };
    ParameterEditor_Map.prototype.addRowClicked = function () {
        this.createRow(undefined);
        return false;
    };
    ParameterEditor_Map.prototype.refreshAndShow = function (containerElement, parameterValue) {
        var _this = this;
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        if (parameterValue === undefined) {
            return;
        }
        if (!conversion_map_1.isMultiStateParameter(parameterValue)) {
            return;
        }
        parameterValue.mappings.forEach(function (item) { return _this.createRow(item); });
    };
    ParameterEditor_Map.prototype.buildNewParameterValue = function () {
        return {
            mappings: this.stateRows.map(function (row) {
                var ioValue = row.querySelector('#ioBrokerValue');
                var isSimpleValue = row.querySelector('#isSimpleValue');
                var leftValue = admin_utils_1.Utils.getInputValue(ioValue);
                var hkValue = row.querySelector('#homekitValue');
                return {
                    left: isSimpleValue.checked ? leftValue : JSON.parse(leftValue),
                    right: admin_utils_1.Utils.getInputValue(hkValue),
                };
            })
        };
    };
    return ParameterEditor_Map;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_Map = ParameterEditor_Map;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.multiState.inc.html":
/*!*******************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.multiState.inc.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-table\">\n    <template id=\"stateRow\">\n        <div class=\"row\">\n            <div class=\"cell\">\n                <span class=\"translate\">Read:</span>\n            </div>\n            <div class=\"cell padding5\">\n                <div class=\"input-container full-width\">\n                    <input id=\"readState\" type=\"text\" class=\"stateSelectTarget\"></input>\n                    <button class=\"input-control button id-selector\"><span class=\"mif-more-horiz\"></span></button>\n                </div>\n            </div>\n            <div class=\"cell \">\n                <span class=\"translate\">Write:</span>\n            </div>\n            <div class=\"cell padding5\">\n                <div class=\"input-container full-width\">\n                    <input id=\"writeState\" type=\"text\" class=\"stateSelectTarget\" placeholder=\"leave empty to use read-state \"></input>\n                    <button class=\"input-control button id-selector\"><span class=\"mif-more-horiz\"></span></button>\n                </div>\n            </div>\n            <div class=\"cell padding5\">\n                <a id=\"moveUp\" href=\"#\"><span class=\"icon mif-move-up fg-black\"></span></a>\n                <a id=\"moveDown\" href=\"#\"><span class=\"icon mif-move-down fg-black\"></span></a>\n                <a id=\"delRow\" href=\"#\"><span class=\"icon mif-minus fg-red\"></span></a>\n            </div>\n        </div>\n    </template>\n    <div class=\"row\" id=\"lastRow\">\n        <div class=\"cell padding5\">\n            <a id=\"addRow\" href=\"#\"><span class=\"icon mif-plus fg-green\"></span><span class=\"translate\">add new state</span></a>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.multiState.ts":
/*!*************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.multiState.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var iofunc_multi_state_1 = __webpack_require__(/*! ../../yahka.functions/iofunc.multi-state */ "./yahka.functions/iofunc.multi-state.ts");
var ParameterEditor_MultiState = /** @class */ (function (_super) {
    __extends(ParameterEditor_MultiState, _super);
    function ParameterEditor_MultiState(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.stateRows = [];
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.multiState.inc.html */ "./admin/parameterEditor/parameterEditor.multiState.inc.html"));
        _this.stateTemplate = _this.templateNode.querySelector('#stateRow');
        _this.lastRow = _this.templateNode.querySelector('#lastRow');
        var addRow = _this.templateNode.querySelector("#addRow");
        addRow.addEventListener('click', _this.addRowClicked.bind(_this));
        return _this;
    }
    ParameterEditor_MultiState.prototype.createRow = function (item) {
        var _this = this;
        var importedRow = document.importNode(this.stateTemplate.content, true);
        var myRow = this.lastRow.parentElement.insertBefore(importedRow.firstElementChild, this.lastRow);
        this.stateRows.push(myRow);
        var readField = myRow.querySelector('#readState');
        readField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        var writeField = myRow.querySelector('#writeState');
        writeField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        myRow.querySelector('#delRow').addEventListener('click', function () {
            myRow.remove();
            _this.stateRows = _this.stateRows.filter(function (row) { return row != myRow; });
            _this.valueChanged();
        });
        myRow.querySelector('#moveUp').addEventListener('click', function () {
            var myIndex = _this.stateRows.indexOf(myRow);
            var prevIndex = myIndex - 1;
            if (prevIndex < 0) {
                return;
            }
            var prevRow = _this.stateRows[prevIndex];
            _this.stateRows[prevIndex] = myRow;
            _this.stateRows[myIndex] = prevRow;
            _this.lastRow.parentElement.insertBefore(myRow, prevRow);
            _this.valueChanged();
        });
        myRow.querySelector('#moveDown').addEventListener('click', function () {
            var myIndex = _this.stateRows.indexOf(myRow);
            var nextIndex = myIndex + 1;
            if ((myIndex < 0) || (nextIndex >= _this.stateRows.length)) {
                return;
            }
            var nextRow = _this.stateRows[nextIndex];
            _this.stateRows[nextIndex] = myRow;
            _this.stateRows[myIndex] = nextRow;
            _this.lastRow.parentElement.insertBefore(nextRow, myRow);
            _this.valueChanged();
        });
        if (item === undefined)
            return myRow;
        admin_utils_1.Utils.setInputValue(readField, item.readState);
        admin_utils_1.Utils.setInputValue(writeField, item.writeState);
    };
    ParameterEditor_MultiState.prototype.addRowClicked = function () {
        this.createRow(undefined);
        return false;
    };
    ParameterEditor_MultiState.prototype.refreshAndShow = function (containerElement, parameterValue) {
        var _this = this;
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        if (parameterValue === undefined) {
            return;
        }
        var params = iofunc_multi_state_1.TIoBrokerInOutFunction_MultiState.parseParameters(parameterValue);
        if (params === undefined) {
            return;
        }
        params.forEach(function (item) { return _this.createRow(item); });
    };
    ParameterEditor_MultiState.prototype.buildNewParameterValue = function () {
        return this.stateRows.map(function (row) {
            var readField = row.querySelector('#readState');
            var writeField = row.querySelector('#writeState');
            return {
                readState: admin_utils_1.Utils.getInputValue(readField),
                writeState: admin_utils_1.Utils.getInputValue(writeField),
            };
        });
    };
    return ParameterEditor_MultiState;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_MultiState = ParameterEditor_MultiState;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.null.ts":
/*!*******************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.null.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var ParameterEditor_Null = /** @class */ (function (_super) {
    __extends(ParameterEditor_Null, _super);
    function ParameterEditor_Null() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParameterEditor_Null.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        this.lastParamValue = parameterValue;
    };
    ParameterEditor_Null.prototype.buildNewParameterValue = function () {
        return this.lastParamValue;
    };
    return ParameterEditor_Null;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_Null = ParameterEditor_Null;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.scaleConversion.inc.html":
/*!************************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.scaleConversion.inc.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div>Explanation: <br/>\n        $value is mapped to HomeKit with:  (homekitMin + ((homekitMax - homekitMin) / (ioBrokerMax - ioBrokerMin)) * ($value - ioBrokerMin))</br>\n        $value is mapped to ioBroker with: (ioBrokerMin + ((ioBrokerMax - ioBrokerMin) / (homeKitMax - homeKitMin)) * ($value - homeKitMin))\n    </div> -->\n<div class=\"editor-table\">\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">HomeKit Minimum:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container\">\n                <input type=\"number\" id=\"hkMin\" class=\"full-width\"></input>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">HomeKit Maximum:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container\">\n                <input type=\"number\" id=\"hkMax\" class=\"full-width\"></input>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">ioBroker Minimum:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container\">\n                <input type=\"number\" id=\"ioMin\" class=\"full-width\"></input>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"cell\">\n            <span class=\"translate\">ioBroker Maximum:</span>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container\">\n                <input type=\"number\" id=\"ioMax\" class=\"full-width\"></input>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.scaleConversion.ts":
/*!******************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.scaleConversion.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var ParameterEditor_ScaleConversionEditor = /** @class */ (function (_super) {
    __extends(ParameterEditor_ScaleConversionEditor, _super);
    function ParameterEditor_ScaleConversionEditor(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.scaleConversion.inc.html */ "./admin/parameterEditor/parameterEditor.scaleConversion.inc.html"));
        _this.txtHKMin = _this.templateNode.querySelector("#hkMin");
        _this.txtHKMin.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtHKMax = _this.templateNode.querySelector("#hkMax");
        _this.txtHKMax.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtIOBrokerMin = _this.templateNode.querySelector("#ioMin");
        _this.txtIOBrokerMin.addEventListener('input', function (ev) { return _this.valueChanged(); });
        _this.txtIOBrokerMax = _this.templateNode.querySelector("#ioMax");
        _this.txtIOBrokerMax.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_ScaleConversionEditor.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        var parameterArray = undefined;
        if (typeof parameterValue === 'object') {
            parameterArray = parameterValue;
        }
        else {
            try {
                parameterArray = JSON.parse(parameterValue);
            }
            catch (e) {
                admin_utils_1.Utils.setInputValue(this.txtHKMin, parameterValue);
                return;
            }
        }
        admin_utils_1.Utils.setInputValue(this.txtHKMin, parameterArray["homekit.min"]);
        admin_utils_1.Utils.setInputValue(this.txtHKMax, parameterArray["homekit.max"]);
        admin_utils_1.Utils.setInputValue(this.txtIOBrokerMin, parameterArray["iobroker.min"]);
        admin_utils_1.Utils.setInputValue(this.txtIOBrokerMax, parameterArray["iobroker.max"]);
    };
    ParameterEditor_ScaleConversionEditor.prototype.buildNewParameterValue = function () {
        return {
            "homekit.min": admin_utils_1.Utils.getInputValue(this.txtHKMin),
            "homekit.max": admin_utils_1.Utils.getInputValue(this.txtHKMax),
            "iobroker.min": admin_utils_1.Utils.getInputValue(this.txtIOBrokerMin),
            "iobroker.max": admin_utils_1.Utils.getInputValue(this.txtIOBrokerMax)
        };
    };
    return ParameterEditor_ScaleConversionEditor;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_ScaleConversionEditor = ParameterEditor_ScaleConversionEditor;


/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.singleState.inc.html":
/*!********************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.singleState.inc.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-table\">\n    <div class=\"row\">\n        <div class=\"cell\">\n            <label class=\"translate\">State:</label>\n        </div>\n        <div class=\"cell\">\n            <div class=\"input-container full-width\">\n                <textarea id=\"textfield\" rows=1 class=\"stateSelectTarget\"></textarea>\n                <button class=\"input-control button id-selector\"><span class=\"mif-more-horiz\"></span></button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./admin/parameterEditor/parameterEditor.singleState.ts":
/*!**************************************************************!*\
  !*** ./admin/parameterEditor/parameterEditor.singleState.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterEditor_base_1 = __webpack_require__(/*! ./parameterEditor.base */ "./admin/parameterEditor/parameterEditor.base.ts");
var admin_pageLoader_1 = __webpack_require__(/*! ../admin.pageLoader */ "./admin/admin.pageLoader.ts");
var admin_utils_1 = __webpack_require__(/*! ../admin.utils */ "./admin/admin.utils.ts");
var ParameterEditor_SingleState = /** @class */ (function (_super) {
    __extends(ParameterEditor_SingleState, _super);
    function ParameterEditor_SingleState(valueChangeCallback) {
        var _this = _super.call(this, valueChangeCallback) || this;
        _this.templateNode = admin_pageLoader_1.createAndCloneTemplateElement(__webpack_require__(/*! ./parameterEditor.singleState.inc.html */ "./admin/parameterEditor/parameterEditor.singleState.inc.html"));
        _this.textField = _this.templateNode.querySelector("#textfield");
        _this.textField.addEventListener('input', function (ev) { return _this.valueChanged(); });
        return _this;
    }
    ParameterEditor_SingleState.prototype.refreshAndShow = function (containerElement, parameterValue) {
        this.removeChildren(containerElement);
        containerElement.appendChild(this.templateNode);
        admin_utils_1.Utils.setInputValue(this.textField, parameterValue);
    };
    ParameterEditor_SingleState.prototype.buildNewParameterValue = function () {
        return admin_utils_1.Utils.getInputValue(this.textField);
    };
    return ParameterEditor_SingleState;
}(parameterEditor_base_1.ParameterEditor));
exports.ParameterEditor_SingleState = ParameterEditor_SingleState;


/***/ }),

/***/ "./admin/yahka.admin.ts":
/*!******************************!*\
  !*** ./admin/yahka.admin.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/index.d.ts" />
var pageBuilder_main_1 = __webpack_require__(/*! ./pageBuilder/pageBuilder.main */ "./admin/pageBuilder/pageBuilder.main.ts");
var resolveMethodForSettingsLoader;
var ioBrokerSettingsLoaded = new Promise(function (resolve, reject) {
    resolveMethodForSettingsLoader = resolve;
});
exports.ioBrokerInterfaceList = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ioBrokerSettingsLoaded];
            case 1:
                _a.sent();
                getIPs(function (ipList) {
                    resolve(ipList);
                });
                return [2 /*return*/];
        }
    });
}); });
var ioBroker_YahkaAdmin = /** @class */ (function () {
    function ioBroker_YahkaAdmin() {
    }
    ioBroker_YahkaAdmin.prototype.loadSettings = function (settingsObject, onChangeCallback) {
        this.settings = settingsObject;
        if (settingsObject.cameras === undefined) {
            settingsObject.cameras = [];
        }
        if (resolveMethodForSettingsLoader !== undefined)
            resolveMethodForSettingsLoader();
        resolveMethodForSettingsLoader = undefined;
        new pageBuilder_main_1.ioBroker_YahkaPageBuilder(this.settings.bridge, this.settings.cameras, onChangeCallback);
        onChangeCallback(false);
    };
    ioBroker_YahkaAdmin.prototype.saveSettings = function (callback) {
        callback(this.settings);
    };
    return ioBroker_YahkaAdmin;
}());
exports.ioBroker_YahkaAdmin = ioBroker_YahkaAdmin;


/***/ }),

/***/ "./admin/yahka.meta-generator.ts":
/*!***************************************!*\
  !*** ./admin/yahka.meta-generator.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Characteristic_1 = __webpack_require__(/*! hap-nodejs/lib/Characteristic */ "../node_modules/hap-nodejs/lib/Characteristic.js");
var Service_1 = __webpack_require__(/*! hap-nodejs/lib/Service */ "../node_modules/hap-nodejs/lib/Service.js");
__webpack_require__(/*! hap-nodejs/lib/gen/HomeKitTypes */ "../node_modules/hap-nodejs/lib/gen/HomeKitTypes.js");
var yahka_community_types_1 = __webpack_require__(/*! ../yahka.community.types */ "./yahka.community.types.ts");
yahka_community_types_1.importHAPCommunityTypesAndFixes();
function generateMetaDataDictionary() {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    var availableServices = Object.keys(Service_1.Service);
    var availableCharacteristics = Object.keys(Characteristic_1.Characteristic);
    var result = {};
    var serviceDictionary = {};
    var charDictionary = {};
    function getProperties(char) {
        return char.props;
    }
    try {
        for (var availableCharacteristics_1 = __values(availableCharacteristics), availableCharacteristics_1_1 = availableCharacteristics_1.next(); !availableCharacteristics_1_1.done; availableCharacteristics_1_1 = availableCharacteristics_1.next()) {
            var charName = availableCharacteristics_1_1.value;
            if (charName === 'super_') {
                continue;
            }
            charDictionary[Characteristic_1.Characteristic[charName].UUID] = charName;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (availableCharacteristics_1_1 && !availableCharacteristics_1_1.done && (_a = availableCharacteristics_1.return)) _a.call(availableCharacteristics_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var availableServices_1 = __values(availableServices), availableServices_1_1 = availableServices_1.next(); !availableServices_1_1.done; availableServices_1_1 = availableServices_1.next()) {
            var serviceName = availableServices_1_1.value;
            if (serviceName === 'super_') {
                continue;
            }
            var serviceDescriptor = {
                type: serviceName,
                characteristics: {}
            };
            var serviceInstance = new Service_1.Service[serviceName]('', '');
            try {
                for (var _e = __values(serviceInstance.characteristics), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var char = _f.value;
                    var charName = charDictionary[char.UUID];
                    if (charName === undefined) {
                        continue;
                    }
                    var charDescriptor = { name: charName, optional: false, properties: getProperties(char) };
                    serviceDescriptor.characteristics[charName] = charDescriptor;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var _g = __values(serviceInstance.optionalCharacteristics), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var char = _h.value;
                    var charName = charDictionary[char.UUID];
                    if (charName === undefined) {
                        continue;
                    }
                    var charDescriptor = { name: charName, optional: true, properties: getProperties(char) };
                    serviceDescriptor.characteristics[charName] = charDescriptor;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                }
                finally { if (e_4) throw e_4.error; }
            }
            serviceDictionary[serviceName] = serviceDescriptor;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (availableServices_1_1 && !availableServices_1_1.done && (_b = availableServices_1.return)) _b.call(availableServices_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return serviceDictionary;
}
exports.generateMetaDataDictionary = generateMetaDataDictionary;


/***/ }),

/***/ "./shared/yahka.configuration.ts":
/*!***************************************!*\
  !*** ./shared/yahka.configuration.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Configuration;
(function (Configuration) {
    function isBridgeConfig(config) {
        if (config === undefined)
            return false;
        return config.configType === "bridge";
    }
    Configuration.isBridgeConfig = isBridgeConfig;
    function isDeviceConfig(config) {
        if (config === undefined)
            return false;
        return config.configType === "customdevice" || config.services !== undefined;
    }
    Configuration.isDeviceConfig = isDeviceConfig;
    function isIPCameraConfig(config) {
        if (config === undefined)
            return false;
        return config.configType === "ipcamera";
    }
    Configuration.isIPCameraConfig = isIPCameraConfig;
})(Configuration = exports.Configuration || (exports.Configuration = {}));


/***/ }),

/***/ "./shared/yahka.logger.ts":
/*!********************************!*\
  !*** ./shared/yahka.logger.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var YahkaLogger = /** @class */ (function () {
    function YahkaLogger(adapter, logIdentifier) {
        this.adapter = adapter;
        this.logIdentifier = logIdentifier;
    }
    YahkaLogger.prototype.debug = function (message) {
        return this.adapter.log.debug("[" + this.logIdentifier + "] " + message);
    };
    YahkaLogger.prototype.info = function (message) {
        return this.adapter.log.info("[" + this.logIdentifier + "] " + message);
    };
    YahkaLogger.prototype.warn = function (message) {
        return this.adapter.log.warn("[" + this.logIdentifier + "] " + message);
    };
    YahkaLogger.prototype.error = function (message) {
        return this.adapter.log.error("[" + this.logIdentifier + "] " + message);
    };
    return YahkaLogger;
}());
exports.YahkaLogger = YahkaLogger;


/***/ }),

/***/ "./yahka.community.types.ts":
/*!**********************************!*\
  !*** ./yahka.community.types.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Characteristic_1 = __webpack_require__(/*! hap-nodejs/lib/Characteristic */ "../node_modules/hap-nodejs/lib/Characteristic.js");
var Service_1 = __webpack_require__(/*! hap-nodejs/lib/Service */ "../node_modules/hap-nodejs/lib/Service.js");
__webpack_require__(/*! hap-nodejs/lib/gen/HomeKitTypes */ "../node_modules/hap-nodejs/lib/gen/HomeKitTypes.js");
var HapCommunity = __webpack_require__(/*! hap-nodejs-community-types */ "../node_modules/hap-nodejs-community-types/types.js");
var util_1 = __webpack_require__(/*! util */ "../node_modules/util/util.js");
var hapTypesImported = false;
function importHAPCommunityTypesAndFixes() {
    if (hapTypesImported)
        return;
    var curTempCharacteristicFunction = Characteristic_1.Characteristic.CurrentTemperature;
    var curTempCharacteristicType = Characteristic_1.Characteristic.CurrentTemperature;
    if (curTempCharacteristicFunction !== undefined) {
        Characteristic_1.Characteristic.CurrentTemperature = function () {
            curTempCharacteristicFunction.call(this);
            this.setProps({ minValue: -99 });
        };
        util_1.inherits(Characteristic_1.Characteristic.CurrentTemperature, curTempCharacteristicFunction);
        Characteristic_1.Characteristic.CurrentTemperature.UUID = curTempCharacteristicType.UUID;
    }
    var fakeBridge = {
        hap: {
            Service: Service_1.Service,
            Characteristic: Characteristic_1.Characteristic
        }
    };
    var fakeOptions = {};
    var communityTypes = HapCommunity(fakeBridge, fakeOptions);
    for (var type in communityTypes) {
        var typeFct = communityTypes[type];
        if (typeFct.length == 0) { // characteristic
            Characteristic_1.Characteristic[type] = typeFct;
        }
        else if (typeFct.length == 2) { // service
            Service_1.Service[type] = typeFct;
        }
    }
    hapTypesImported = true;
}
exports.importHAPCommunityTypesAndFixes = importHAPCommunityTypesAndFixes;


/***/ }),

/***/ "./yahka.functions/conversion.base.ts":
/*!********************************************!*\
  !*** ./yahka.functions/conversion.base.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var functions_base_1 = __webpack_require__(/*! ./functions.base */ "./yahka.functions/functions.base.ts");
var TIOBrokerConversionBase = /** @class */ (function (_super) {
    __extends(TIOBrokerConversionBase, _super);
    function TIOBrokerConversionBase(adapter, logIdentifier) {
        if (logIdentifier === void 0) { logIdentifier = ""; }
        return _super.call(this, adapter, logIdentifier) || this;
    }
    TIOBrokerConversionBase.castToNumber = function (value) {
        if (value === undefined)
            return undefined;
        if (typeof value !== 'number')
            return Number(value);
        else
            return value;
    };
    TIOBrokerConversionBase.parameterValueByName = function (parameters, name) {
        var paramArray = undefined;
        if (typeof parameters === 'object') {
            paramArray = parameters;
        }
        else {
            paramArray = JSON.parse(parameters);
        }
        if (paramArray === undefined)
            return undefined;
        return paramArray[name];
    };
    return TIOBrokerConversionBase;
}(functions_base_1.TYahkaFunctionBase));
exports.TIOBrokerConversionBase = TIOBrokerConversionBase;


/***/ }),

/***/ "./yahka.functions/conversion.map.ts":
/*!*******************************************!*\
  !*** ./yahka.functions/conversion.map.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var conversion_base_1 = __webpack_require__(/*! ./conversion.base */ "./yahka.functions/conversion.base.ts");
function isMultiStateParameter(params) {
    return "mappings" in params;
}
exports.isMultiStateParameter = isMultiStateParameter;
var TIoBrokerConversion_Map = /** @class */ (function (_super) {
    __extends(TIoBrokerConversion_Map, _super);
    function TIoBrokerConversion_Map(adapter, parameters) {
        var _this = _super.call(this, adapter, "TIoBrokerConversion_Map") || this;
        _this.parameters = parameters;
        _this.mappingArrayToHomeKit = new Map();
        _this.mappingArrayToIOBroker = new Map();
        _this.jsonReplacer = function (key, value) { return String(value); };
        _this.buildMappingArray();
        return _this;
    }
    TIoBrokerConversion_Map.create = function (adapter, parameters) {
        if (!isMultiStateParameter(parameters)) {
            return undefined;
        }
        return new TIoBrokerConversion_Map(adapter, parameters);
    };
    TIoBrokerConversion_Map.prototype.buildMappingArray = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.parameters.mappings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mapDef = _c.value;
                var leftStr = JSON.stringify(mapDef.left, this.jsonReplacer);
                var rightStr = JSON.stringify(mapDef.right, this.jsonReplacer);
                this.mappingArrayToHomeKit.set(leftStr, mapDef.right);
                this.mappingArrayToIOBroker.set(rightStr, mapDef.left);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TIoBrokerConversion_Map.prototype.toHomeKit = function (value) {
        var ioValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToHomeKit.get(ioValueStr);
    };
    TIoBrokerConversion_Map.prototype.toIOBroker = function (value) {
        var hkValueStr = JSON.stringify(value, this.jsonReplacer);
        return this.mappingArrayToIOBroker.get(hkValueStr);
    };
    return TIoBrokerConversion_Map;
}(conversion_base_1.TIOBrokerConversionBase));
exports.TIoBrokerConversion_Map = TIoBrokerConversion_Map;


/***/ }),

/***/ "./yahka.functions/functions.base.ts":
/*!*******************************************!*\
  !*** ./yahka.functions/functions.base.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var yahka_logger_1 = __webpack_require__(/*! ../shared/yahka.logger */ "./shared/yahka.logger.ts");
var TYahkaFunctionBase = /** @class */ (function () {
    function TYahkaFunctionBase(adapter, logIdentifier) {
        if (logIdentifier === void 0) { logIdentifier = ""; }
        this.adapter = adapter;
        this.logIdentifier = logIdentifier;
        this.subscriptionRequests = [];
        this.stateCache = new Map();
        this.log = new yahka_logger_1.YahkaLogger(this.adapter, this.logIdentifier);
    }
    TYahkaFunctionBase.prototype.addSubscriptionRequest = function (stateName) {
        var subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    };
    TYahkaFunctionBase.prototype.shouldStateBeFiltered = function (stateName, ioState) {
        return false;
    };
    TYahkaFunctionBase.prototype.readValueFromIOState = function (ioState) {
        return ioState.val;
    };
    TYahkaFunctionBase.prototype.readValueFromCache = function (stateName) {
        if (this.stateCache.has(stateName)) {
            return this.stateCache.get(stateName);
        }
        else {
            return undefined;
        }
    };
    TYahkaFunctionBase.prototype.updateCache = function (stateName, ioState) {
        var needUpdate = false;
        if (this.stateCache.has(stateName)) {
            var curVal = this.stateCache.get(stateName);
            needUpdate = curVal.val !== ioState.val;
        }
        else {
            needUpdate = true;
        }
        if (needUpdate)
            this.stateCache.set(stateName, ioState);
        return needUpdate;
    };
    TYahkaFunctionBase.prototype.subscriptionEvent = function (stateName, ioState, callback) {
        this.log.debug('change event from ioBroker via [' + stateName + ']' + JSON.stringify(ioState));
        if (this.shouldStateBeFiltered(stateName, ioState)) {
            this.log.debug('state was filtered - notification is canceled');
            return;
        }
        var cacheChange = this.updateCache(stateName, ioState);
        if (!cacheChange) {
            this.log.debug('state value already in cache - notification is canceled');
            return;
        }
        this.cacheChanged(stateName, callback);
    };
    TYahkaFunctionBase.prototype.cacheChanged = function (stateName, callback) {
    };
    return TYahkaFunctionBase;
}());
exports.TYahkaFunctionBase = TYahkaFunctionBase;


/***/ }),

/***/ "./yahka.functions/iofunc.base.ts":
/*!****************************************!*\
  !*** ./yahka.functions/iofunc.base.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var functions_base_1 = __webpack_require__(/*! ./functions.base */ "./yahka.functions/functions.base.ts");
var TIoBrokerInOutFunctionBase = /** @class */ (function (_super) {
    __extends(TIoBrokerInOutFunctionBase, _super);
    function TIoBrokerInOutFunctionBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueForHomeKit = undefined;
        _this.errorForHomeKit = null;
        return _this;
    }
    TIoBrokerInOutFunctionBase.prototype.fromIOBroker = function (callback) {
        this.log.debug('fromIOBroker event - delivering cached value (' + JSON.stringify(this.valueForHomeKit) + ")");
        callback(null, this.valueForHomeKit);
    };
    TIoBrokerInOutFunctionBase.prototype.toIOBroker = function (plainIoValue, callback) {
        this.log.debug('writing state to ioBroker: ' + JSON.stringify(plainIoValue));
        this.updateIOBrokerValue(plainIoValue, callback);
    };
    TIoBrokerInOutFunctionBase.prototype.cacheChanged = function (stateName, callback) {
        try {
            this.valueForHomeKit = this.recalculateHomekitValues(stateName);
            this.errorForHomeKit = null;
        }
        catch (e) {
            this.errorForHomeKit = e;
        }
        if (this.valueForHomeKit)
            callback(this.valueForHomeKit);
    };
    TIoBrokerInOutFunctionBase.prototype.recalculateHomekitValues = function (stateName) {
        // noop
    };
    TIoBrokerInOutFunctionBase.prototype.updateIOBrokerValue = function (plainIoValue, callback) {
        // to be filled in derived class
    };
    return TIoBrokerInOutFunctionBase;
}(functions_base_1.TYahkaFunctionBase));
exports.TIoBrokerInOutFunctionBase = TIoBrokerInOutFunctionBase;
var TIoBrokerInOutFunction_StateBase = /** @class */ (function () {
    function TIoBrokerInOutFunction_StateBase(adapter, stateName, deferredTime) {
        if (deferredTime === void 0) { deferredTime = 0; }
        this.adapter = adapter;
        this.stateName = stateName;
        this.deferredTime = deferredTime;
        this.debounceTimer = -1;
        this.subscriptionRequests = [];
        this.addSubscriptionRequest(stateName);
    }
    TIoBrokerInOutFunction_StateBase.prototype.addSubscriptionRequest = function (stateName) {
        var subscriptionEvent = this.subscriptionEvent.bind(this, stateName);
        this.subscriptionRequests.push({
            subscriptionType: 'state',
            subscriptionIdentifier: stateName,
            subscriptionEvent: subscriptionEvent
        });
    };
    TIoBrokerInOutFunction_StateBase.prototype.getValueOnRead = function (ioState) {
        if (ioState)
            return ioState.val;
        else
            return null;
    };
    TIoBrokerInOutFunction_StateBase.prototype.getValueOnNotify = function (ioState) {
        if (ioState)
            return ioState.val;
        else
            return null;
    };
    TIoBrokerInOutFunction_StateBase.prototype.toIOBroker = function (plainIoValue, callback) {
        var _this = this;
        this.adapter.log.debug('writing state to ioBroker [' + this.stateName + ']: ' + JSON.stringify(plainIoValue));
        this.adapter.getForeignState(this.stateName, function (error, ioState) {
            var value = _this.getValueOnRead(ioState);
            var valueChanged = value !== plainIoValue;
            _this.adapter.log.debug('checking value change: ' + JSON.stringify(value) + ' != ' + JSON.stringify(plainIoValue) + ' = ' + valueChanged);
            if (valueChanged) {
                _this.adapter.setForeignState(_this.stateName, plainIoValue, false, function (error) {
                    if (error)
                        _this.adapter.log.error('setForeignState error [' + _this.stateName + '] to [' + JSON.stringify(plainIoValue) + ']: ' + error);
                    callback();
                });
            }
            else {
                callback();
            }
        });
    };
    TIoBrokerInOutFunction_StateBase.prototype.fromIOBroker = function (callback) {
        var _this = this;
        this.adapter.log.debug('reading state from ioBroker [' + this.stateName + ']');
        this.adapter.getForeignState(this.stateName, function (error, ioState) {
            _this.adapter.log.debug('read state from ioBroker [' + _this.stateName + ']: ' + JSON.stringify(ioState));
            if (error)
                _this.adapter.log.error('... with error: ' + error);
            var value = _this.getValueOnRead(ioState);
            callback(error, value);
        });
    };
    TIoBrokerInOutFunction_StateBase.prototype.subscriptionEvent = function (stateName, ioState, callback) {
        this.adapter.log.debug('change event from ioBroker via [' + this.stateName + ']' + JSON.stringify(ioState));
        var newValue = this.getValueOnNotify(ioState);
        if (newValue !== undefined)
            this.executeCallback(callback, newValue);
        else
            this.adapter.log.debug('state was filtered - notification is canceled');
    };
    TIoBrokerInOutFunction_StateBase.prototype.executeCallback = function (callback, plainIOValue) {
        if (this.deferredTime > 0)
            this.setupDeferredChangeEvent(callback, plainIOValue);
        else
            callback(plainIOValue);
    };
    TIoBrokerInOutFunction_StateBase.prototype.setupDeferredChangeEvent = function (callback, plainIOValue) {
        this.cancelDeferredChangeEvent();
        this.debounceTimer = setTimeout(this.deferredChangeEvent.bind(this, callback, plainIOValue), 150);
    };
    TIoBrokerInOutFunction_StateBase.prototype.cancelDeferredChangeEvent = function () {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = -1;
    };
    TIoBrokerInOutFunction_StateBase.prototype.deferredChangeEvent = function (callback, plainIOValue) {
        this.adapter.log.debug('[' + this.stateName + '] firing deferred change event:' + JSON.stringify(plainIOValue));
        callback(plainIOValue);
    };
    return TIoBrokerInOutFunction_StateBase;
}());
exports.TIoBrokerInOutFunction_StateBase = TIoBrokerInOutFunction_StateBase;


/***/ }),

/***/ "./yahka.functions/iofunc.multi-state.ts":
/*!***********************************************!*\
  !*** ./yahka.functions/iofunc.multi-state.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var iofunc_base_1 = __webpack_require__(/*! ./iofunc.base */ "./yahka.functions/iofunc.base.ts");
var util_1 = __webpack_require__(/*! util */ "../node_modules/util/util.js");
function isMultiStateParameter(value) {
    if (value === undefined)
        return false;
    if (!util_1.isObject(value))
        return false;
    var propName = "readState";
    return (propName in value);
}
exports.isMultiStateParameter = isMultiStateParameter;
var TIoBrokerInOutFunction_MultiState = /** @class */ (function (_super) {
    __extends(TIoBrokerInOutFunction_MultiState, _super);
    function TIoBrokerInOutFunction_MultiState(adapter, stateProperties) {
        var e_1, _a;
        var _this = _super.call(this, adapter, "TIoBrokerInOutFunctionMultiState") || this;
        _this.adapter = adapter;
        _this.stateProperties = stateProperties;
        try {
            for (var stateProperties_1 = __values(stateProperties), stateProperties_1_1 = stateProperties_1.next(); !stateProperties_1_1.done; stateProperties_1_1 = stateProperties_1.next()) {
                var state = stateProperties_1_1.value;
                _this.addSubscriptionRequest(state.readState);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (stateProperties_1_1 && !stateProperties_1_1.done && (_a = stateProperties_1.return)) _a.call(stateProperties_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    TIoBrokerInOutFunction_MultiState.parseParameters = function (parameters) {
        if (Array.isArray(parameters)) {
            return parameters.filter(isMultiStateParameter);
        }
        else if (typeof parameters === "string") {
            return [{ readState: parameters }];
        }
        else {
            return undefined;
        }
    };
    TIoBrokerInOutFunction_MultiState.create = function (adapter, parameters) {
        var stateNames = TIoBrokerInOutFunction_MultiState.parseParameters(parameters);
        if (stateNames === undefined) {
            return undefined;
        }
        return new TIoBrokerInOutFunction_MultiState(adapter, stateNames);
    };
    TIoBrokerInOutFunction_MultiState.prototype.recalculateHomekitValues = function (stateName) {
        var _this = this;
        return this.stateProperties.map(function (state) { return _this.stateCache.get(state.readState).val; });
    };
    TIoBrokerInOutFunction_MultiState.prototype.updateSingleIOBrokerValue = function (state, newValue) {
        var _this = this;
        if (newValue === undefined)
            return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var stateName = state.writeState || state.readState;
            _this.log.debug('writing state to ioBroker [' + stateName + ']: ' + JSON.stringify(newValue));
            _this.adapter.getForeignState(stateName, function (error, ioState) {
                var value = ioState.val;
                var valueChanged = value !== newValue;
                _this.log.debug('checking value change: ' + JSON.stringify(value) + ' != ' + JSON.stringify(newValue) + ' = ' + valueChanged);
                if (valueChanged) {
                    _this.adapter.setForeignState(stateName, newValue, false, function (error) {
                        if (error) {
                            _this.log.error('setForeignState error [' + stateName + '] to [' + JSON.stringify(newValue) + ']: ' + error);
                            reject(error);
                        }
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    };
    TIoBrokerInOutFunction_MultiState.prototype.updateIOBrokerValue = function (plainIoValue, callback) {
        var _this = this;
        var ioValueArray = Array.isArray(plainIoValue) ? plainIoValue : [plainIoValue];
        var promiseArray = this.stateProperties.map(function (state, index) {
            var newValueForThisState = ioValueArray[index];
            return _this.updateSingleIOBrokerValue(state, newValueForThisState);
        });
        Promise.all(promiseArray).then(function () {
            _this.log.debug('wrote all states sucessfully to ioBroker');
            callback();
        }).catch(function (e) {
            _this.log.error('could not write all states to ioBroker: ' + JSON.stringify(e));
            callback();
        });
    };
    return TIoBrokerInOutFunction_MultiState;
}(iofunc_base_1.TIoBrokerInOutFunctionBase));
exports.TIoBrokerInOutFunction_MultiState = TIoBrokerInOutFunction_MultiState;


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=yahka.admin.js.map