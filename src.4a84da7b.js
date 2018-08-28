// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({44:[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
},{}],46:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ('production' !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],45:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if ('production' !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],47:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],33:[function(require,module,exports) {
/** @license React v16.4.1
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
var k = require("object-assign"),
    n = require("fbjs/lib/invariant"),
    p = require("fbjs/lib/emptyObject"),
    q = require("fbjs/lib/emptyFunction"),
    r = "function" === typeof Symbol && Symbol.for,
    t = r ? Symbol.for("react.element") : 60103,
    u = r ? Symbol.for("react.portal") : 60106,
    v = r ? Symbol.for("react.fragment") : 60107,
    w = r ? Symbol.for("react.strict_mode") : 60108,
    x = r ? Symbol.for("react.profiler") : 60114,
    y = r ? Symbol.for("react.provider") : 60109,
    z = r ? Symbol.for("react.context") : 60110,
    A = r ? Symbol.for("react.async_mode") : 60111,
    B = r ? Symbol.for("react.forward_ref") : 60112;r && Symbol.for("react.timeout");var C = "function" === typeof Symbol && Symbol.iterator;function D(a) {
  for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) e += "&args[]=" + encodeURIComponent(arguments[c + 1]);n(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
}
var E = { isMounted: function () {
    return !1;
  }, enqueueForceUpdate: function () {}, enqueueReplaceState: function () {}, enqueueSetState: function () {} };function F(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}F.prototype.isReactComponent = {};F.prototype.setState = function (a, b) {
  "object" !== typeof a && "function" !== typeof a && null != a ? D("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};function G() {}
G.prototype = F.prototype;function H(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}var I = H.prototype = new G();I.constructor = H;k(I, F.prototype);I.isPureReactComponent = !0;var J = { current: null },
    K = Object.prototype.hasOwnProperty,
    L = { key: !0, ref: !0, __self: !0, __source: !0 };
function M(a, b, e) {
  var c = void 0,
      d = {},
      g = null,
      h = null;if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = b[c]);var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) l[m] = arguments[m + 2];d.children = l;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);return { $$typeof: t, type: a, key: g, ref: h, props: d, _owner: J.current };
}
function N(a) {
  return "object" === typeof a && null !== a && a.$$typeof === t;
}function escape(a) {
  var b = { "=": "=0", ":": "=2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var O = /\/+/g,
    P = [];function Q(a, b, e, c) {
  if (P.length) {
    var d = P.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function R(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > P.length && P.push(a);
}
function S(a, b, e, c) {
  var d = typeof a;if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case t:case u:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + T(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    d = a[h];var f = b + T(d, h);g += S(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) d = d.value, f = b + T(d, h++), g += S(d, f, e, c);else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function T(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function U(a, b) {
  a.func.call(a.context, b, a.count++);
}
function V(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? W(a, c, e, q.thatReturnsArgument) : null != a && (N(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + e, a = { $$typeof: t, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function W(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(O, "$&/") + "/");b = Q(b, g, c, d);null == a || S(a, "", V, b);R(b);
}
var X = { Children: { map: function (a, b, e) {
      if (null == a) return a;var c = [];W(a, c, null, b, e);return c;
    }, forEach: function (a, b, e) {
      if (null == a) return a;b = Q(null, null, b, e);null == a || S(a, "", U, b);R(b);
    }, count: function (a) {
      return null == a ? 0 : S(a, "", q.thatReturnsNull, null);
    }, toArray: function (a) {
      var b = [];W(a, b, null, q.thatReturnsArgument);return b;
    }, only: function (a) {
      N(a) ? void 0 : D("143");return a;
    } }, createRef: function () {
    return { current: null };
  }, Component: F, PureComponent: H, createContext: function (a, b) {
    void 0 === b && (b = null);a = { $$typeof: z,
      _calculateChangedBits: b, _defaultValue: a, _currentValue: a, _currentValue2: a, _changedBits: 0, _changedBits2: 0, Provider: null, Consumer: null };a.Provider = { $$typeof: y, _context: a };return a.Consumer = a;
  }, forwardRef: function (a) {
    return { $$typeof: B, render: a };
  }, Fragment: v, StrictMode: w, unstable_AsyncMode: A, unstable_Profiler: x, createElement: M, cloneElement: function (a, b, e) {
    null === a || void 0 === a ? D("267", a) : void 0;var c = void 0,
        d = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);void 0 !== b.key && (g = "" + b.key);var l = void 0;a.type && a.type.defaultProps && (l = a.type.defaultProps);for (c in b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
    }c = arguments.length - 2;if (1 === c) d.children = e;else if (1 < c) {
      l = Array(c);for (var m = 0; m < c; m++) l[m] = arguments[m + 2];d.children = l;
    }return { $$typeof: t, type: a.type, key: g, ref: h, props: d, _owner: f };
  }, createFactory: function (a) {
    var b = M.bind(null, a);b.type = a;return b;
  }, isValidElement: N, version: "16.4.1", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: J,
    assign: k } },
    Y = { default: X },
    Z = Y && X || Y;module.exports = Z.default ? Z.default : Z;
},{"object-assign":44,"fbjs/lib/invariant":46,"fbjs/lib/emptyObject":45,"fbjs/lib/emptyFunction":47}],18:[function(require,module,exports) {
'use strict';

if ('production' === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.production.min.js":33}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventLogger = function (_React$Component) {
	_inherits(EventLogger, _React$Component);

	function EventLogger() {
		_classCallCheck(this, EventLogger);

		return _possibleConstructorReturn(this, (EventLogger.__proto__ || Object.getPrototypeOf(EventLogger)).apply(this, arguments));
	}

	_createClass(EventLogger, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var logs = this.props.logs;

			return _react2.default.createElement(
				"table",
				{ className: "logger__table" },
				_react2.default.createElement(
					"caption",
					null,
					_react2.default.createElement(
						"ul",
						null,
						_react2.default.createElement(
							"li",
							null,
							this.renderBoolean(true),
							" = true"
						),
						_react2.default.createElement(
							"li",
							null,
							this.renderBoolean(false),
							" = false"
						),
						_react2.default.createElement(
							"li",
							null,
							this.renderBoolean(undefined),
							" = null or undefined"
						),
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"sup",
								null,
								"1"
							),
							" refers to properties present in both KeyboardEvent and InputEvent."
						),
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"button",
								{ onClick: this.props.insertSeparator },
								"Insert separator \u2195"
							)
						),
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"button",
								{ onClick: this.props.clearLog },
								"Clear log \u267A"
							)
						)
					)
				),
				_react2.default.createElement(
					"thead",
					null,
					_react2.default.createElement(
						"tr",
						null,
						_react2.default.createElement(
							"th",
							{ colSpan: "2" },
							"General"
						),
						_react2.default.createElement(
							"th",
							{ colSpan: "3" },
							"KeyboardEvent"
						),
						_react2.default.createElement(
							"th",
							null,
							"UIEvent",
							_react2.default.createElement(
								"sup",
								null,
								"1"
							)
						),
						_react2.default.createElement(
							"th",
							{ colSpan: "2" },
							"InputEvent"
						),
						_react2.default.createElement(
							"th",
							null,
							"Content"
						)
					),
					_react2.default.createElement(
						"tr",
						null,
						_react2.default.createElement(
							"th",
							null,
							"#"
						),
						_react2.default.createElement(
							"th",
							null,
							"type"
						),
						_react2.default.createElement(
							"th",
							null,
							"key"
						),
						_react2.default.createElement(
							"th",
							null,
							"code"
						),
						_react2.default.createElement(
							"th",
							null,
							"repeat"
						),
						_react2.default.createElement(
							"th",
							null,
							"isComposing"
						),
						_react2.default.createElement(
							"th",
							null,
							"inputType"
						),
						_react2.default.createElement(
							"th",
							null,
							"data"
						),
						_react2.default.createElement(
							"th",
							null,
							"content and selection"
						)
					)
				),
				_react2.default.createElement(
					"tbody",
					null,
					logs.map(function (entry) {
						return _react2.default.createElement(
							"tr",
							{
								key: entry.index,
								className: 'logger__row logger__row--' + entry.kind + (entry.isNativeCounterpart ? ' logger__row--native-counterpart' : '')
							},
							_react2.default.createElement(
								"td",
								null,
								entry.isNativeCounterpart ? '⮑' : entry.index
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.type)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.key)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.code)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderBoolean(entry.repeat)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderBoolean(entry.isComposing)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.inputType)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.data)
							),
							_react2.default.createElement(
								"td",
								null,
								_this2.renderValue(entry.content)
							)
						);
					})
				)
			);
		}
	}, {
		key: "renderValue",
		value: function renderValue(val) {
			return val ? _react2.default.createElement(
				"pre",
				null,
				_react2.default.createElement(
					"code",
					null,
					val
				)
			) : this.renderBoolean(undefined);
		}
	}, {
		key: "renderBoolean",
		value: function renderBoolean(flag) {
			return flag === true ? _react2.default.createElement(
				"span",
				{ className: "bool bool--true", title: "true" },
				"\u2713"
			) : flag === false ? _react2.default.createElement(
				"span",
				{ className: "bool bool--false", title: "false" },
				"\xD7"
			) : _react2.default.createElement(
				"span",
				{ className: "bool bool--undefined", title: "null/undefined" },
				"\u2205"
			);
		}
	}, {
		key: "renderKind",
		value: function renderKind(kind, origin) {
			return kind ? _react2.default.createElement(
				"pre",
				null,
				_react2.default.createElement(
					"code",
					null,
					kind,
					" ",
					origin ? _react2.default.createElement(
						"span",
						{ className: "origin" },
						origin
					) : null
				)
			) : this.renderBoolean(undefined);
		}
	}]);

	return EventLogger;
}(_react2.default.Component);

exports.default = EventLogger;
},{"react":18}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var supported_events = [
// KeyboardEvent
'keydown', 'keypress', 'keyup',

// CompositionEvent
'compositionstart', 'compositionupdate', 'compositionend',

// InputEvent
'beforeinput', 'input',

// Selection Event
'selectionchange'];

var EventListenerRaw = function EventListenerRaw(container, onevent) {
	var _this = this;

	_classCallCheck(this, EventListenerRaw);

	this.container = container;
	this.onevent = onevent || function () {};
	supported_events.forEach(function (eventStr) {
		return _this.container.addEventListener(eventStr, _this.onevent);
	});
};

exports.default = EventListenerRaw;
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventListenerReact = function (_React$Component) {
	_inherits(EventListenerReact, _React$Component);

	function EventListenerReact() {
		_classCallCheck(this, EventListenerReact);

		return _possibleConstructorReturn(this, (EventListenerReact.__proto__ || Object.getPrototypeOf(EventListenerReact)).apply(this, arguments));
	}

	_createClass(EventListenerReact, [{
		key: "render",
		value: function render() {
			var onevent = this.props.onevent;

			var handle_event = function handle_event(callbackName) {
				return function (syntheticEvent) {
					syntheticEvent.persist();
					onevent(syntheticEvent, callbackName);
				};
			};

			return _react2.default.createElement(
				"div",
				{
					className: "rte",
					contentEditable: true,
					role: "textbox",
					onKeyDown: handle_event('onKeyDown'),
					onKeyPress: handle_event('onKeyPress'),
					onKeyUp: handle_event('onKeyUp'),
					onCompositionStart: handle_event('onCompositionStart'),
					onCompositionUpdate: handle_event('onCompositionUpdate'),
					onCompositionEnd: handle_event('onCompositionEnd'),
					onBeforeInput: handle_event('onBeforeInput'),
					onInput: handle_event('onInput'),
					onSelect: handle_event('onSelect')
				},
				_react2.default.createElement(
					"p",
					null,
					"Hello World"
				),
				_react2.default.createElement(
					"p",
					null,
					"Goodbye Space"
				)
			);
		}
	}]);

	return EventListenerReact;
}(_react2.default.Component);

exports.default = EventListenerReact;
},{"react":18}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var key = 1;

var getKey = exports.getKey = function getKey() {
  return key;
};
var getNextKey = exports.getNextKey = function getNextKey() {
  return key++;
};
var resetKey = exports.resetKey = function resetKey() {
  return key = 1;
};
},{}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _generateKey = require('./generate-key');

exports.default = function (e, callbackName, isNativeCounterpart) {

	var index = isNativeCounterpart ? '\u2B91 ' + (0, _generateKey.getKey)() : (0, _generateKey.getNextKey)();

	var ret = {
		kind: e.constructor.name,
		index: index,
		isNativeCounterpart: isNativeCounterpart
	};

	if (callbackName) {
		ret.origin = callbackName;
	}

	[
	// Event interface
	'type',

	// KeyboardEvent interface
	'key', 'code', 'repeat',

	// Common to KeyboardEvent and InputEvent
	'isComposing',

	// InputEvent

	'inputType', 'data'].forEach(function (prop) {
		return ret[prop] = e[prop];
	});

	return ret;
};
},{"./generate-key":14}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getContent;
String.prototype.splice = function (start, delCount, newSubStr) {
	return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function getContent(el, range) {
	var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	if (el.nodeType === Node.TEXT_NODE) {
		var textContent = el.textContent;
		if (range.startContainer === el) {
			textContent = textContent.splice(range.startOffset, 0, '|');
		}
		content.push(textContent);
	} else {
		for (var i = 0; i < el.childNodes.length; i++) {
			var childNode = el.childNodes[i];
			getContent(childNode, range, content);
		}
	}
	return content;
}
},{}],48:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],49:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;
},{}],50:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],58:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],56:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = require('./isNode');

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;
},{"./isNode":58}],51:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = require('./isTextNode');

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;
},{"./isTextNode":56}],34:[function(require,module,exports) {
/** @license React v16.4.1
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';var aa=require("fbjs/lib/invariant"),ba=require("react"),m=require("fbjs/lib/ExecutionEnvironment"),p=require("object-assign"),v=require("fbjs/lib/emptyFunction"),da=require("fbjs/lib/getActiveElement"),ea=require("fbjs/lib/shallowEqual"),fa=require("fbjs/lib/containsNode"),ha=require("fbjs/lib/emptyObject");
function A(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}ba?void 0:A("227");
function ia(a,b,c,d,e,f,g,h,k){this._hasCaughtError=!1;this._caughtError=null;var n=Array.prototype.slice.call(arguments,3);try{b.apply(c,n)}catch(r){this._caughtError=r,this._hasCaughtError=!0}}
var B={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){ia.apply(B,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){B.invokeGuardedCallback.apply(this,arguments);if(B.hasCaughtError()){var n=B.clearCaughtError();B._hasRethrowError||(B._hasRethrowError=!0,B._rethrowError=n)}},rethrowCaughtError:function(){return ka.apply(B,arguments)},hasCaughtError:function(){return B._hasCaughtError},clearCaughtError:function(){if(B._hasCaughtError){var a=
B._caughtError;B._caughtError=null;B._hasCaughtError=!1;return a}A("198")}};function ka(){if(B._hasRethrowError){var a=B._rethrowError;B._rethrowError=null;B._hasRethrowError=!1;throw a;}}var la=null,ma={};
function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:A("96",a);if(!oa[c]){b.extractEvents?void 0:A("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?A("99",h):void 0;pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&qa(k[e],g,h);e=!0}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:A("98",d,a)}}}}
function qa(a,b,c){ra[a]?A("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies}var oa=[],pa={},ra={},sa={};function ta(a){la?A("101"):void 0;la=Array.prototype.slice.call(a);na()}function ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]?A("102",c):void 0,ma[c]=d,b=!0)}b&&na()}
var va={plugins:oa,eventNameDispatchConfigs:pa,registrationNameModules:ra,registrationNameDependencies:sa,possibleRegistrationNames:null,injectEventPluginOrder:ta,injectEventPluginsByName:ua},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);B.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function Aa(a,b){null==b?A("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ca=null;
function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}var Ga={injectEventPluginOrder:ta,injectEventPluginsByName:ua};
function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?A("231",b,typeof c):void 0;
return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?A("95"):void 0,B.rethrowCaughtError())}function Ja(a,b,c,d){for(var e=null,f=0;f<oa.length;f++){var g=oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=Aa(e,g))}Ia(e,!1)}var Ka={injection:Ga,getListener:Ha,runEventsInBatch:Ia,runExtractedEventsInBatch:Ja},La=Math.random().toString(36).slice(2),C="__reactInternalInstance$"+La,Ma="__reactEventHandlers$"+La;
function Na(a){if(a[C])return a[C];for(;!a[C];)if(a.parentNode)a=a.parentNode;else return null;a=a[C];return 5===a.tag||6===a.tag?a:null}function Oa(a){if(5===a.tag||6===a.tag)return a.stateNode;A("33")}function Pa(a){return a[Ma]||null}var Qa={precacheFiberNode:function(a,b){b[C]=a},getClosestInstanceFromNode:Na,getInstanceFromNode:function(a){a=a[C];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Oa,getFiberCurrentPropsFromNode:Pa,updateFiberProps:function(a,b){a[Ma]=b}};
function F(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ra(a,b,c){for(var d=[];a;)d.push(a),a=F(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a)}function Ta(a){a&&a.dispatchConfig.phasedRegistrationNames&&Ra(a._targetInst,Sa,a)}
function Ua(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?F(b):null;Ra(b,Sa,a)}}function Va(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a))}function Xa(a){a&&a.dispatchConfig.registrationName&&Va(a._targetInst,null,a)}function Ya(a){Ba(a,Ta)}
function Za(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=F(h))g++;h=0;for(var k=f;k;k=F(k))h++;for(;0<g-h;)e=F(e),g--;for(;0<h-g;)f=F(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=F(e);f=F(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=F(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=F(d)}for(d=0;d<e.length;d++)Va(e[d],"bubbled",a);for(a=c.length;0<a--;)Va(c[a],"captured",b)}
var $a={accumulateTwoPhaseDispatches:Ya,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ba(a,Ua)},accumulateEnterLeaveDispatches:Za,accumulateDirectDispatches:function(a){Ba(a,Xa)}};function ab(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var bb={animationend:ab("Animation","AnimationEnd"),animationiteration:ab("Animation","AnimationIteration"),animationstart:ab("Animation","AnimationStart"),transitionend:ab("Transition","TransitionEnd")},cb={},db={};m.canUseDOM&&(db=document.createElement("div").style,"AnimationEvent"in window||(delete bb.animationend.animation,delete bb.animationiteration.animation,delete bb.animationstart.animation),"TransitionEvent"in window||delete bb.transitionend.transition);
function eb(a){if(cb[a])return cb[a];if(!bb[a])return a;var b=bb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in db)return cb[a]=b[c];return a}var fb=eb("animationend"),gb=eb("animationiteration"),hb=eb("animationstart"),ib=eb("transitionend"),jb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kb=null;
function lb(){!kb&&m.canUseDOM&&(kb="textContent"in document.documentElement?"textContent":"innerText");return kb}var G={_root:null,_startText:null,_fallbackText:null};function mb(){if(G._fallbackText)return G._fallbackText;var a,b=G._startText,c=b.length,d,e=nb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);G._fallbackText=e.slice(a,1<d?1-d:void 0);return G._fallbackText}function nb(){return"value"in G._root?G._root.value:G._root[lb()]}
var ob="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),pb={type:null,target:null,currentTarget:v.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function H(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?v.thatReturnsTrue:v.thatReturnsFalse;this.isPropagationStopped=v.thatReturnsFalse;return this}
p(H.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=v.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v.thatReturnsTrue)},persist:function(){this.isPersistent=v.thatReturnsTrue},isPersistent:v.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<ob.length;a++)this[ob[a]]=null}});H.Interface=pb;H.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;p(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=p({},d.Interface,a);c.extend=d.extend;qb(c);return c};qb(H);
function rb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function sb(a){a instanceof this?void 0:A("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function qb(a){a.eventPool=[];a.getPooled=rb;a.release=sb}var tb=H.extend({data:null}),ub=H.extend({data:null}),vb=[9,13,27,32],wb=m.canUseDOM&&"CompositionEvent"in window,xb=null;m.canUseDOM&&"documentMode"in document&&(xb=document.documentMode);
var yb=m.canUseDOM&&"TextEvent"in window&&!xb,zb=m.canUseDOM&&(!wb||xb&&8<xb&&11>=xb),Ab=String.fromCharCode(32),Bb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Cb=!1;
function Db(a,b){switch(a){case "keyup":return-1!==vb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Eb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Fb=!1;function Gb(a,b){switch(a){case "compositionend":return Eb(b);case "keypress":if(32!==b.which)return null;Cb=!0;return Ab;case "textInput":return a=b.data,a===Ab&&Cb?null:a;default:return null}}
function Hb(a,b){if(Fb)return"compositionend"===a||!wb&&Db(a,b)?(a=mb(),G._root=null,G._startText=null,G._fallbackText=null,Fb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return zb?null:b.data;default:return null}}
var Ib={eventTypes:Bb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(wb)b:{switch(a){case "compositionstart":e=Bb.compositionStart;break b;case "compositionend":e=Bb.compositionEnd;break b;case "compositionupdate":e=Bb.compositionUpdate;break b}e=void 0}else Fb?Db(a,c)&&(e=Bb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Bb.compositionStart);e?(zb&&(Fb||e!==Bb.compositionStart?e===Bb.compositionEnd&&Fb&&(f=mb()):(G._root=d,G._startText=nb(),Fb=!0)),e=tb.getPooled(e,b,c,d),f?e.data=
f:(f=Eb(c),null!==f&&(e.data=f)),Ya(e),f=e):f=null;(a=yb?Gb(a,c):Hb(a,c))?(b=ub.getPooled(Bb.beforeInput,b,c,d),b.data=a,Ya(b)):b=null;return null===f?b:null===b?f:[f,b]}},Jb=null,Kb={injectFiberControlledHostComponent:function(a){Jb=a}},Lb=null,Mb=null;function Nb(a){if(a=xa(a)){Jb&&"function"===typeof Jb.restoreControlledState?void 0:A("194");var b=wa(a.stateNode);Jb.restoreControlledState(a.stateNode,a.type,b)}}function Ob(a){Lb?Mb?Mb.push(a):Mb=[a]:Lb=a}
function Pb(){return null!==Lb||null!==Mb}function Qb(){if(Lb){var a=Lb,b=Mb;Mb=Lb=null;Nb(a);if(b)for(a=0;a<b.length;a++)Nb(b[a])}}var Rb={injection:Kb,enqueueStateRestore:Ob,needsStateRestore:Pb,restoreStateIfNeeded:Qb};function Sb(a,b){return a(b)}function Tb(a,b,c){return a(b,c)}function Ub(){}var Vb=!1;function Wb(a,b){if(Vb)return a(b);Vb=!0;try{return Sb(a,b)}finally{Vb=!1,Pb()&&(Ub(),Qb())}}
var Xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Xb[a.type]:"textarea"===b?!0:!1}function Zb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
function $b(a,b){if(!m.canUseDOM||b&&!("addEventListener"in document))return!1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function ac(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function bc(a){var b=ac(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function cc(a){a._valueTracker||(a._valueTracker=bc(a))}function dc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ac(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var ec=ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fc="function"===typeof Symbol&&Symbol.for,gc=fc?Symbol.for("react.element"):60103,hc=fc?Symbol.for("react.portal"):60106,ic=fc?Symbol.for("react.fragment"):60107,jc=fc?Symbol.for("react.strict_mode"):60108,kc=fc?Symbol.for("react.profiler"):60114,lc=fc?Symbol.for("react.provider"):60109,mc=fc?Symbol.for("react.context"):60110,pc=fc?Symbol.for("react.async_mode"):60111,qc=fc?Symbol.for("react.forward_ref"):60112,rc=fc?Symbol.for("react.timeout"):
60113,sc="function"===typeof Symbol&&Symbol.iterator;function tc(a){if(null===a||"undefined"===typeof a)return null;a=sc&&a[sc]||a["@@iterator"];return"function"===typeof a?a:null}
function uc(a){var b=a.type;if("function"===typeof b)return b.displayName||b.name;if("string"===typeof b)return b;switch(b){case pc:return"AsyncMode";case mc:return"Context.Consumer";case ic:return"ReactFragment";case hc:return"ReactPortal";case kc:return"Profiler("+a.pendingProps.id+")";case lc:return"Context.Provider";case jc:return"StrictMode";case rc:return"Timeout"}if("object"===typeof b&&null!==b)switch(b.$$typeof){case qc:return a=b.render.displayName||b.render.name||"",""!==a?"ForwardRef("+
a+")":"ForwardRef"}return null}function vc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=uc(a);var f=null;c&&(f=uc(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e=""}b+=e;a=a.return}while(a);return b}
var wc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xc={},zc={};function Ac(a){if(zc.hasOwnProperty(a))return!0;if(xc.hasOwnProperty(a))return!1;if(wc.test(a))return zc[a]=!0;xc[a]=!0;return!1}
function Bc(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function Cc(a,b,c,d){if(null===b||"undefined"===typeof b||Bc(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}
function I(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var J={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J[a]=new I(a,0,!1,a,null)});
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J[b]=new I(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J[a]=new I(a,2,!1,a.toLowerCase(),null)});["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){J[a]=new I(a,2,!1,a,null)});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J[a]=new I(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){J[a]=new I(a,3,!0,a.toLowerCase(),null)});["capture","download"].forEach(function(a){J[a]=new I(a,4,!1,a.toLowerCase(),null)});
["cols","rows","size","span"].forEach(function(a){J[a]=new I(a,6,!1,a.toLowerCase(),null)});["rowSpan","start"].forEach(function(a){J[a]=new I(a,5,!1,a.toLowerCase(),null)});var Dc=/[\-:]([a-z])/g;function Ec(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Dc,
Ec);J[b]=new I(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Dc,Ec);J[b]=new I(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Dc,Ec);J[b]=new I(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});J.tabIndex=new I("tabIndex",1,!1,"tabindex",null);
function Fc(a,b,c,d){var e=J.hasOwnProperty(b)?J[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Cc(b,c,e,d)&&(c=null),d||null===e?Ac(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Gc(a,b){var c=b.checked;return p({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Hc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ic(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Jc(a,b){b=b.checked;null!=b&&Fc(a,"checked",b,!1)}
function Kc(a,b){Jc(a,b);var c=Ic(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?Lc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Lc(a,b.type,Ic(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Mc(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){b=""+a._wrapperState.initialValue;var d=a.value;c||b===d||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==c&&(a.name=c)}function Lc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}
function Ic(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}var Nc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Oc(a,b,c){a=H.getPooled(Nc.change,a,b,c);a.type="change";Ob(c);Ya(a);return a}var Pc=null,Qc=null;function Rc(a){Ia(a,!1)}function Sc(a){var b=Oa(a);if(dc(b))return a}
function Tc(a,b){if("change"===a)return b}var Uc=!1;m.canUseDOM&&(Uc=$b("input")&&(!document.documentMode||9<document.documentMode));function Vc(){Pc&&(Pc.detachEvent("onpropertychange",Wc),Qc=Pc=null)}function Wc(a){"value"===a.propertyName&&Sc(Qc)&&(a=Oc(Qc,a,Zb(a)),Wb(Rc,a))}function Xc(a,b,c){"focus"===a?(Vc(),Pc=b,Qc=c,Pc.attachEvent("onpropertychange",Wc)):"blur"===a&&Vc()}function Yc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Sc(Qc)}
function Zc(a,b){if("click"===a)return Sc(b)}function $c(a,b){if("input"===a||"change"===a)return Sc(b)}
var ad={eventTypes:Nc,_isInputEventSupported:Uc,extractEvents:function(a,b,c,d){var e=b?Oa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Tc:Yb(e)?Uc?f=$c:(f=Yc,g=Xc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Zc);if(f&&(f=f(a,b)))return Oc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Lc(e,"number",e.value)}},bd=H.extend({view:null,detail:null}),cd={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}
var fd=bd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),gd=fd.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),hd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},
mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},id={eventTypes:hd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||
e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,n=void 0;if("mouseout"===a||"mouseover"===a)g=fd,h=hd.mouseLeave,k=hd.mouseEnter,n="mouse";else if("pointerout"===a||"pointerover"===a)g=gd,h=hd.pointerLeave,k=hd.pointerEnter,n="pointer";a=null==f?e:Oa(f);e=null==b?e:Oa(b);h=g.getPooled(h,f,c,d);h.type=n+"leave";h.target=a;h.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=n+"enter";c.target=e;c.relatedTarget=a;Za(h,
c,f,b);return[h,c]}};function jd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function kd(a){2!==jd(a)?A("188"):void 0}
function ld(a){var b=a.alternate;if(!b)return b=jd(a),3===b?A("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return kd(e),a;if(g===d)return kd(e),b;g=g.sibling}A("188")}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:A("189")}}c.alternate!==d?A("190"):void 0}3!==c.tag?A("188"):void 0;return c.stateNode.current===c?a:b}function md(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function nd(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}var od=H.extend({animationName:null,elapsedTime:null,pseudoElement:null}),pd=H.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),qd=bd.extend({relatedTarget:null});
function rd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var sd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud=bd.extend({key:function(a){if(a.key){var b=sd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=rd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?td[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return"keypress"===
a.type?rd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?rd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),vd=fd.extend({dataTransfer:null}),wd=bd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed}),xd=H.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),yd=fd.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),zd=[["abort","abort"],[fb,"animationEnd"],[gb,"animationIteration"],[hb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ib,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Ad={},Bd={};function Cd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Ad[a]=b;Bd[c]=b}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],
["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Cd(a,!0)});zd.forEach(function(a){Cd(a,!1)});
var Dd={eventTypes:Ad,isInteractiveTopLevelEventType:function(a){a=Bd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Bd[a];if(!e)return null;switch(a){case "keypress":if(0===rd(c))return null;case "keydown":case "keyup":a=ud;break;case "blur":case "focus":a=qd;break;case "click":if(2===c.button)return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=fd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
vd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=wd;break;case fb:case gb:case hb:a=od;break;case ib:a=xd;break;case "scroll":a=bd;break;case "wheel":a=yd;break;case "copy":case "cut":case "paste":a=pd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=gd;break;default:a=H}b=a.getPooled(e,b,c,d);Ya(b);return b}},Ed=Dd.isInteractiveTopLevelEventType,
Fd=[];function Gd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c.return;)c=c.return;c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Na(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Ja(a.topLevelType,b,a.nativeEvent,Zb(a.nativeEvent))}var Hd=!0;function Id(a){Hd=!!a}function K(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!1)}
function Md(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!0)}function Kd(a,b){Tb(Ld,a,b)}function Ld(a,b){if(Hd){var c=Zb(b);c=Na(c);null===c||"number"!==typeof c.tag||2===jd(c)||(c=null);if(Fd.length){var d=Fd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Wb(Gd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Fd.length&&Fd.push(a)}}}
var Nd={get _enabled(){return Hd},setEnabled:Id,isEnabled:function(){return Hd},trapBubbledEvent:K,trapCapturedEvent:Md,dispatchEvent:Ld},Od={},Pd=0,Qd="_reactListenersID"+(""+Math.random()).slice(2);function Rd(a){Object.prototype.hasOwnProperty.call(a,Qd)||(a[Qd]=Pd++,Od[a[Qd]]={});return Od[a[Qd]]}function Sd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Td(a,b){var c=Sd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Sd(c)}}function Ud(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Vd=m.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Wd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Xd=null,Yd=null,Zd=null,$d=!1;
function ae(a,b){if($d||null==Xd||Xd!==da())return null;var c=Xd;"selectionStart"in c&&Ud(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Zd&&ea(Zd,c)?null:(Zd=c,a=H.getPooled(Wd.select,Yd,a,b),a.type="select",a.target=Xd,Ya(a),a)}
var be={eventTypes:Wd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Rd(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Oa(b):window;switch(a){case "focus":if(Yb(e)||"true"===e.contentEditable)Xd=e,Yd=b,Zd=null;break;case "blur":Zd=Yd=Xd=null;break;case "mousedown":$d=!0;break;case "contextmenu":case "mouseup":return $d=!1,ae(c,d);case "selectionchange":if(Vd)break;
case "keydown":case "keyup":return ae(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa.getFiberCurrentPropsFromNode;xa=Qa.getInstanceFromNode;ya=Qa.getNodeFromInstance;Ga.injectEventPluginsByName({SimpleEventPlugin:Dd,EnterLeaveEventPlugin:id,ChangeEventPlugin:ad,SelectEventPlugin:be,BeforeInputEventPlugin:Ib});
var ce="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,de=Date,ee=setTimeout,fe=clearTimeout,ge=void 0;if("object"===typeof performance&&"function"===typeof performance.now){var he=performance;ge=function(){return he.now()}}else ge=function(){return de.now()};var ie=void 0,je=void 0;
if(m.canUseDOM){var ke="function"===typeof ce?ce:function(){A("276")},L=null,le=null,me=-1,ne=!1,oe=!1,pe=0,qe=33,re=33,se={didTimeout:!1,timeRemaining:function(){var a=pe-ge();return 0<a?a:0}},ue=function(a,b){var c=a.scheduledCallback,d=!1;try{c(b),d=!0}finally{je(a),d||(ne=!0,window.postMessage(te,"*"))}},te="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===te&&(ne=!1,null!==L)){if(null!==L){var b=ge();if(!(-1===
me||me>b)){a=-1;for(var c=[],d=L;null!==d;){var e=d.timeoutTime;-1!==e&&e<=b?c.push(d):-1!==e&&(-1===a||e<a)&&(a=e);d=d.next}if(0<c.length)for(se.didTimeout=!0,b=0,d=c.length;b<d;b++)ue(c[b],se);me=a}}for(a=ge();0<pe-a&&null!==L;)a=L,se.didTimeout=!1,ue(a,se),a=ge();null===L||oe||(oe=!0,ke(ve))}},!1);var ve=function(a){oe=!1;var b=a-pe+re;b<re&&qe<re?(8>b&&(b=8),re=b<qe?qe:b):qe=b;pe=a+re;ne||(ne=!0,window.postMessage(te,"*"))};ie=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=ge()+
b.timeout);if(-1===me||-1!==c&&c<me)me=c;a={scheduledCallback:a,timeoutTime:c,prev:null,next:null};null===L?L=a:(b=a.prev=le,null!==b&&(b.next=a));le=a;oe||(oe=!0,ke(ve));return a};je=function(a){if(null!==a.prev||L===a){var b=a.next,c=a.prev;a.next=null;a.prev=null;null!==b?null!==c?(c.next=b,b.prev=c):(b.prev=null,L=b):null!==c?(c.next=null,le=c):le=L=null}}}else{var we=new Map;ie=function(a){var b={scheduledCallback:a,timeoutTime:0,next:null,prev:null},c=ee(function(){a({timeRemaining:function(){return Infinity},
didTimeout:!1})});we.set(a,c);return b};je=function(a){var b=we.get(a.scheduledCallback);we.delete(a);fe(b)}}function xe(a){var b="";ba.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}function ye(a,b){a=p({children:void 0},b);if(b=xe(b.children))a.children=b;return a}
function ze(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Ae(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Be(a,b){null!=b.dangerouslySetInnerHTML?A("91"):void 0;return p({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Ce(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?A("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:A("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function De(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Ee(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Fe={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Ge(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Ge(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Ie=void 0,Je=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Fe.svg||"innerHTML"in a)a.innerHTML=b;else{Ie=Ie||document.createElement("div");Ie.innerHTML="<svg>"+b+"</svg>";for(b=Ie.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Ke(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var Le={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Me=["Webkit","ms","Moz","O"];Object.keys(Le).forEach(function(a){Me.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Le[b]=Le[a]})});
function Ne(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Le.hasOwnProperty(e)&&Le[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Oe=p({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Pe(a,b,c){b&&(Oe[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?A("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?A("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:A("61")),null!=b.style&&"object"!==typeof b.style?A("62",c()):void 0)}
function Qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var Re=v.thatReturns("");
function Se(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Rd(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Md("scroll",a);break;case "focus":case "blur":Md("focus",a);Md("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":$b(e,!0)&&Md(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===jb.indexOf(e)&&K(e,a)}c[e]=!0}}}
function Te(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Fe.html&&(d=Ge(a));d===Fe.html?"script"===a?(a=c.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function Ue(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function Ve(a,b,c,d){var e=Qe(b,c);switch(b){case "iframe":case "object":K("load",a);var f=c;break;case "video":case "audio":for(f=0;f<jb.length;f++)K(jb[f],a);f=c;break;case "source":K("error",a);f=c;break;case "img":case "image":case "link":K("error",a);K("load",a);f=c;break;case "form":K("reset",a);K("submit",a);f=c;break;case "details":K("toggle",a);f=c;break;case "input":Hc(a,c);f=Gc(a,c);K("invalid",a);Se(d,"onChange");break;case "option":f=ye(a,c);break;case "select":Ae(a,c);f=p({},c,{value:void 0});
K("invalid",a);Se(d,"onChange");break;case "textarea":Ce(a,c);f=Be(a,c);K("invalid",a);Se(d,"onChange");break;default:f=c}Pe(b,f,Re);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Ne(a,k,Re):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Je(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&Ke(a,k):"number"===typeof k&&Ke(a,""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ra.hasOwnProperty(h)?null!=k&&Se(d,
h):null!=k&&Fc(a,h,k,e))}switch(b){case "input":cc(a);Mc(a,c,!1);break;case "textarea":cc(a);Ee(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?ze(a,!!c.multiple,b,!1):null!=c.defaultValue&&ze(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=v)}}
function We(a,b,c,d,e){var f=null;switch(b){case "input":c=Gc(a,c);d=Gc(a,d);f=[];break;case "option":c=ye(a,c);d=ye(a,d);f=[];break;case "select":c=p({},c,{value:void 0});d=p({},d,{value:void 0});f=[];break;case "textarea":c=Be(a,c);d=Be(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=v)}Pe(b,d,Re);b=a=void 0;var g=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var h=c[a];for(b in h)h.hasOwnProperty(b)&&(g||
(g={}),g[b]="")}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ra.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];h=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==h&&(null!=k||null!=h))if("style"===a)if(h){for(b in h)!h.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(g||(g={}),g[b]="");for(b in k)k.hasOwnProperty(b)&&h[b]!==k[b]&&(g||(g={}),g[b]=k[b])}else g||(f||(f=[]),f.push(a,g)),
g=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(a,""+k)):"children"===a?h===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ra.hasOwnProperty(a)?(null!=k&&Se(e,a),f||h===k||(f=[])):(f=f||[]).push(a,k))}g&&(f=f||[]).push("style",g);return f}
function Xe(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Jc(a,e);Qe(c,d);d=Qe(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Ne(a,h,Re):"dangerouslySetInnerHTML"===g?Je(a,h):"children"===g?Ke(a,h):Fc(a,g,h,d)}switch(c){case "input":Kc(a,e);break;case "textarea":De(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ze(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
ze(a,!!e.multiple,e.defaultValue,!0):ze(a,!!e.multiple,e.multiple?[]:"",!1))}}
function Ye(a,b,c,d,e){switch(b){case "iframe":case "object":K("load",a);break;case "video":case "audio":for(d=0;d<jb.length;d++)K(jb[d],a);break;case "source":K("error",a);break;case "img":case "image":case "link":K("error",a);K("load",a);break;case "form":K("reset",a);K("submit",a);break;case "details":K("toggle",a);break;case "input":Hc(a,c);K("invalid",a);Se(e,"onChange");break;case "select":Ae(a,c);K("invalid",a);Se(e,"onChange");break;case "textarea":Ce(a,c),K("invalid",a),Se(e,"onChange")}Pe(b,
c,Re);d=null;for(var f in c)if(c.hasOwnProperty(f)){var g=c[f];"children"===f?"string"===typeof g?a.textContent!==g&&(d=["children",g]):"number"===typeof g&&a.textContent!==""+g&&(d=["children",""+g]):ra.hasOwnProperty(f)&&null!=g&&Se(e,f)}switch(b){case "input":cc(a);Mc(a,c,!0);break;case "textarea":cc(a);Ee(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=v)}return d}function Ze(a,b){return a.nodeValue!==b}
var $e={createElement:Te,createTextNode:Ue,setInitialProperties:Ve,diffProperties:We,updateProperties:Xe,diffHydratedProperties:Ye,diffHydratedText:Ze,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Kc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;
c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Pa(d);e?void 0:A("90");dc(d);Kc(d,e)}}}break;case "textarea":De(a,c);break;case "select":b=c.value,null!=b&&ze(a,!!c.multiple,b,!1)}}},af=null,bf=null;function cf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function df(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html}var ef=ge,ff=ie,gf=je;function hf(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function jf(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}new Set;var kf=[],lf=-1;function mf(a){return{current:a}}
function M(a){0>lf||(a.current=kf[lf],kf[lf]=null,lf--)}function N(a,b){lf++;kf[lf]=a.current;a.current=b}var nf=mf(ha),O=mf(!1),of=ha;function pf(a){return qf(a)?of:nf.current}
function rf(a,b){var c=a.type.contextTypes;if(!c)return ha;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function qf(a){return 2===a.tag&&null!=a.type.childContextTypes}function sf(a){qf(a)&&(M(O,a),M(nf,a))}function tf(a){M(O,a);M(nf,a)}
function uf(a,b,c){nf.current!==ha?A("168"):void 0;N(nf,b,a);N(O,c,a)}function vf(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:A("108",uc(a)||"Unknown",e);return p({},b,c)}function wf(a){if(!qf(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ha;of=nf.current;N(nf,b,a);N(O,O.current,a);return!0}
function xf(a,b){var c=a.stateNode;c?void 0:A("169");if(b){var d=vf(a,of);c.__reactInternalMemoizedMergedChildContext=d;M(O,a);M(nf,a);N(nf,d,a)}else M(O,a);N(O,b,a)}
function yf(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function zf(a,b,c){var d=a.alternate;null===d?(d=new yf(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function Af(a,b,c){var d=a.type,e=a.key;a=a.props;if("function"===typeof d)var f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case ic:return Bf(a.children,b,c,e);case pc:f=11;b|=3;break;case jc:f=11;b|=2;break;case kc:return d=new yf(15,a,e,b|4),d.type=kc,d.expirationTime=c,d;case rc:f=16;b|=2;break;default:a:{switch("object"===typeof d&&null!==d?d.$$typeof:null){case lc:f=13;break a;case mc:f=12;break a;case qc:f=14;break a;default:A("130",null==d?
d:typeof d,"")}f=void 0}}b=new yf(f,a,e,b);b.type=d;b.expirationTime=c;return b}function Bf(a,b,c,d){a=new yf(10,a,d,b);a.expirationTime=c;return a}function Cf(a,b,c){a=new yf(6,a,null,b);a.expirationTime=c;return a}function Df(a,b,c){b=new yf(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function Ef(a,b,c){b=new yf(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a}var Ff=null,Gf=null;function Hf(a){return function(b){try{return a(b)}catch(c){}}}
function If(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Ff=Hf(function(a){return b.onCommitFiberRoot(c,a)});Gf=Hf(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function Jf(a){"function"===typeof Ff&&Ff(a)}function Kf(a){"function"===typeof Gf&&Gf(a)}var Lf=!1;
function Mf(a){return{expirationTime:0,baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Nf(a){return{expirationTime:a.expirationTime,baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Of(a){return{expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Pf(a,b,c){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c}
function Qf(a,b,c){var d=a.alternate;if(null===d){var e=a.updateQueue;var f=null;null===e&&(e=a.updateQueue=Mf(a.memoizedState))}else e=a.updateQueue,f=d.updateQueue,null===e?null===f?(e=a.updateQueue=Mf(a.memoizedState),f=d.updateQueue=Mf(d.memoizedState)):e=a.updateQueue=Nf(f):null===f&&(f=d.updateQueue=Nf(e));null===f||e===f?Pf(e,b,c):null===e.lastUpdate||null===f.lastUpdate?(Pf(e,b,c),Pf(f,b,c)):(Pf(e,b,c),f.lastUpdate=b)}
function Rf(a,b,c){var d=a.updateQueue;d=null===d?a.updateQueue=Mf(a.memoizedState):Sf(a,d);null===d.lastCapturedUpdate?d.firstCapturedUpdate=d.lastCapturedUpdate=b:(d.lastCapturedUpdate.next=b,d.lastCapturedUpdate=b);if(0===d.expirationTime||d.expirationTime>c)d.expirationTime=c}function Sf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Nf(b));return b}
function Tf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return p({},d,e);case 2:Lf=!0}return d}
function Uf(a,b,c,d,e){Lf=!1;if(!(0===b.expirationTime||b.expirationTime>e)){b=Sf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,n=f;null!==k;){var r=k.expirationTime;if(r>e){if(null===g&&(g=k,f=n),0===h||h>r)h=r}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next}r=null;for(k=b.firstCapturedUpdate;null!==k;){var w=k.expirationTime;if(w>e){if(null===r&&(r=k,null===
g&&(f=n)),0===h||h>w)h=w}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next}null===g&&(b.lastUpdate=null);null===r?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===r&&(f=n);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=r;b.expirationTime=h;a.memoizedState=n}}
function Vf(a,b){"function"!==typeof a?A("191",a):void 0;a.call(b)}
function Wf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);a=b.firstEffect;for(b.firstEffect=b.lastEffect=null;null!==a;){var d=a.callback;null!==d&&(a.callback=null,Vf(d,c));a=a.nextEffect}a=b.firstCapturedEffect;for(b.firstCapturedEffect=b.lastCapturedEffect=null;null!==a;)b=a.callback,null!==b&&(a.callback=null,Vf(b,c)),a=a.nextEffect}
function Xf(a,b){return{value:a,source:b,stack:vc(b)}}var Yf=mf(null),Zf=mf(null),$f=mf(0);function ag(a){var b=a.type._context;N($f,b._changedBits,a);N(Zf,b._currentValue,a);N(Yf,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode}function bg(a){var b=$f.current,c=Zf.current;M(Yf,a);M(Zf,a);M($f,a);a=a.type._context;a._currentValue=c;a._changedBits=b}var cg={},dg=mf(cg),eg=mf(cg),fg=mf(cg);function gg(a){a===cg?A("174"):void 0;return a}
function ig(a,b){N(fg,b,a);N(eg,a,a);N(dg,cg,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:He(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=He(b,c)}M(dg,a);N(dg,b,a)}function jg(a){M(dg,a);M(eg,a);M(fg,a)}function kg(a){eg.current===a&&(M(dg,a),M(eg,a))}function lg(a,b,c){var d=a.memoizedState;b=b(c,d);d=null===b||void 0===b?d:p({},d,b);a.memoizedState=d;a=a.updateQueue;null!==a&&0===a.expirationTime&&(a.baseState=d)}
var pg={isMounted:function(a){return(a=a._reactInternalFiber)?2===jd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=mg();c=ng(c,a);var d=Of(c);d.tag=2;void 0!==
b&&null!==b&&(d.callback=b);Qf(a,d,c);og(a,c)}};function qg(a,b,c,d,e,f){var g=a.stateNode;a=a.type;return"function"===typeof g.shouldComponentUpdate?g.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!ea(b,c)||!ea(d,e):!0}
function rg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&pg.enqueueReplaceState(b,b.state,null)}
function sg(a,b){var c=a.type,d=a.stateNode,e=a.pendingProps,f=pf(a);d.props=e;d.state=a.memoizedState;d.refs=ha;d.context=rf(a,f);f=a.updateQueue;null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState);f=a.type.getDerivedStateFromProps;"function"===typeof f&&(lg(a,f,e),d.state=a.memoizedState);"function"===typeof c.getDerivedStateFromProps||"function"===typeof d.getSnapshotBeforeUpdate||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||(c=d.state,"function"===typeof d.componentWillMount&&
d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount(),c!==d.state&&pg.enqueueReplaceState(d,d.state,null),f=a.updateQueue,null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState));"function"===typeof d.componentDidMount&&(a.effectTag|=4)}var tg=Array.isArray;
function ug(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?A("110"):void 0,d=c.stateNode);d?void 0:A("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===ha?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?A("148"):void 0;c._owner?void 0:A("254",a)}return a}
function vg(a,b){"textarea"!==a.type&&A("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function wg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=zf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Cf(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=ug(a,b,c),d.return=a,d;d=Af(c,a.mode,d);d.ref=ug(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Df(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function r(a,b,c,d,f){if(null===b||10!==b.tag)return b=Bf(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function w(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Cf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case gc:return c=Af(b,a.mode,c),c.ref=ug(a,null,b),c.return=a,c;case hc:return b=Df(b,a.mode,c),b.return=a,b}if(tg(b)||tc(b))return b=Bf(b,a.mode,c,null),b.return=
a,b;vg(a,b)}return null}function P(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case gc:return c.key===e?c.type===ic?r(a,b,c.props.children,d,e):k(a,b,c,d):null;case hc:return c.key===e?n(a,b,c,d):null}if(tg(c)||tc(c))return null!==e?null:r(a,b,c,d,null);vg(a,c)}return null}function nc(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);
if("object"===typeof d&&null!==d){switch(d.$$typeof){case gc:return a=a.get(null===d.key?c:d.key)||null,d.type===ic?r(b,a,d.props.children,e,d.key):k(b,a,d,e);case hc:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e)}if(tg(d)||tc(d))return a=a.get(c)||null,r(b,a,d,e,null);vg(b,d)}return null}function Jd(e,g,h,k){for(var u=null,x=null,t=g,q=g=0,n=null;null!==t&&q<h.length;q++){t.index>q?(n=t,t=null):n=t.sibling;var l=P(e,t,h[q],k);if(null===l){null===t&&(t=n);break}a&&t&&null===l.alternate&&b(e,
t);g=f(l,g,q);null===x?u=l:x.sibling=l;x=l;t=n}if(q===h.length)return c(e,t),u;if(null===t){for(;q<h.length;q++)if(t=w(e,h[q],k))g=f(t,g,q),null===x?u=t:x.sibling=t,x=t;return u}for(t=d(e,t);q<h.length;q++)if(n=nc(t,e,q,h[q],k))a&&null!==n.alternate&&t.delete(null===n.key?q:n.key),g=f(n,g,q),null===x?u=n:x.sibling=n,x=n;a&&t.forEach(function(a){return b(e,a)});return u}function E(e,g,h,k){var u=tc(h);"function"!==typeof u?A("150"):void 0;h=u.call(h);null==h?A("151"):void 0;for(var t=u=null,n=g,x=
g=0,y=null,l=h.next();null!==n&&!l.done;x++,l=h.next()){n.index>x?(y=n,n=null):y=n.sibling;var r=P(e,n,l.value,k);if(null===r){n||(n=y);break}a&&n&&null===r.alternate&&b(e,n);g=f(r,g,x);null===t?u=r:t.sibling=r;t=r;n=y}if(l.done)return c(e,n),u;if(null===n){for(;!l.done;x++,l=h.next())l=w(e,l.value,k),null!==l&&(g=f(l,g,x),null===t?u=l:t.sibling=l,t=l);return u}for(n=d(e,n);!l.done;x++,l=h.next())l=nc(n,e,x,l.value,k),null!==l&&(a&&null!==l.alternate&&n.delete(null===l.key?x:l.key),g=f(l,g,x),null===
t?u=l:t.sibling=l,t=l);a&&n.forEach(function(a){return b(e,a)});return u}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ic&&null===f.key;k&&(f=f.props.children);var n="object"===typeof f&&null!==f;if(n)switch(f.$$typeof){case gc:a:{n=f.key;for(k=d;null!==k;){if(k.key===n)if(10===k.tag?f.type===ic:k.type===f.type){c(a,k.sibling);d=e(k,f.type===ic?f.props.children:f.props,h);d.ref=ug(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=k.sibling}f.type===ic?(d=Bf(f.props.children,
a.mode,h,f.key),d.return=a,a=d):(h=Af(f,a.mode,h),h.ref=ug(a,d,f),h.return=a,a=h)}return g(a);case hc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Df(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=
a,a=d):(c(a,d),d=Cf(f,a.mode,h),d.return=a,a=d),g(a);if(tg(f))return Jd(a,d,f,h);if(tc(f))return E(a,d,f,h);n&&vg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 2:case 1:h=a.type,A("152",h.displayName||h.name||"Component")}return c(a,d)}}var xg=wg(!0),yg=wg(!1),zg=null,Ag=null,Bg=!1;function Cg(a,b){var c=new yf(5,null,null,0);c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function Dg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return!1}}function Eg(a){if(Bg){var b=Ag;if(b){var c=b;if(!Dg(a,b)){b=hf(c);if(!b||!Dg(a,b)){a.effectTag|=2;Bg=!1;zg=a;return}Cg(zg,c)}zg=a;Ag=jf(b)}else a.effectTag|=2,Bg=!1,zg=a}}
function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;zg=a}function Gg(a){if(a!==zg)return!1;if(!Bg)return Fg(a),Bg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!df(b,a.memoizedProps))for(b=Ag;b;)Cg(a,b),b=hf(b);Fg(a);Ag=zg?hf(a.stateNode):null;return!0}function Hg(){Ag=zg=null;Bg=!1}function Q(a,b,c){Ig(a,b,c,b.expirationTime)}function Ig(a,b,c,d){b.child=null===a?yg(b,null,c,d):xg(b,a.child,c,d)}
function Jg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function Kg(a,b,c,d,e){Jg(a,b);var f=0!==(b.effectTag&64);if(!c&&!f)return d&&xf(b,!1),R(a,b);c=b.stateNode;ec.current=b;var g=f?null:c.render();b.effectTag|=1;f&&(Ig(a,b,null,e),b.child=null);Ig(a,b,g,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&xf(b,!0);return b.child}
function Lg(a){var b=a.stateNode;b.pendingContext?uf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&uf(a,b.context,!1);ig(a,b.containerInfo)}
function Mg(a,b,c,d){var e=a.child;null!==e&&(e.return=a);for(;null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var g=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==g&&(0===g.expirationTime||g.expirationTime>d)&&(g.expirationTime=d);else if(null!==g&&(0===g.expirationTime||g.expirationTime>d))g.expirationTime=d;else break;f=f.return}f=null}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=
e.child}if(null!==f)f.return=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){e.return=f.return;f=e;break}f=f.return}e=f}}
function Qg(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps,g=!0;if(O.current)g=!1;else if(f===e)return b.stateNode=0,ag(b),R(a,b);var h=e.value;b.memoizedProps=e;if(null===f)h=1073741823;else if(f.value===e.value){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b);h=0}else{var k=f.value;if(k===h&&(0!==k||1/k===1/h)||k!==k&&h!==h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b);h=0}else if(h="function"===typeof d._calculateChangedBits?d._calculateChangedBits(k,
h):1073741823,h|=0,0===h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b)}else Mg(b,d,h,c)}b.stateNode=h;ag(b);Q(a,b,e.children);return b.child}function R(a,b){null!==a&&b.child!==a.child?A("153"):void 0;if(null!==b.child){a=b.child;var c=zf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=zf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}
function Rg(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:Lg(b);break;case 2:wf(b);break;case 4:ig(b,b.stateNode.containerInfo);break;case 13:ag(b)}return null}switch(b.tag){case 0:null!==a?A("155"):void 0;var d=b.type,e=b.pendingProps,f=pf(b);f=rf(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,f=f.getDerivedStateFromProps,"function"===
typeof f&&lg(b,f,e),e=wf(b),d.updater=pg,b.stateNode=d,d._reactInternalFiber=b,sg(b,c),a=Kg(a,b,!0,e,c)):(b.tag=1,Q(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,O.current||b.memoizedProps!==c?(d=pf(b),d=rf(b,d),e=e(c,d),b.effectTag|=1,Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 2:e=wf(b);if(null===a)if(null===b.stateNode){var g=b.pendingProps,h=b.type;d=pf(b);var k=2===b.tag&&null!=b.type.contextTypes;f=k?rf(b,d):ha;g=new h(g,f);b.memoizedState=null!==
g.state&&void 0!==g.state?g.state:null;g.updater=pg;b.stateNode=g;g._reactInternalFiber=b;k&&(k=b.stateNode,k.__reactInternalMemoizedUnmaskedChildContext=d,k.__reactInternalMemoizedMaskedChildContext=f);sg(b,c);d=!0}else{h=b.type;d=b.stateNode;k=b.memoizedProps;f=b.pendingProps;d.props=k;var n=d.context;g=pf(b);g=rf(b,g);var r=h.getDerivedStateFromProps;(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(k!==f||n!==g)&&rg(b,d,f,g);Lf=!1;var w=b.memoizedState;n=d.state=w;var P=b.updateQueue;null!==P&&(Uf(b,P,f,d,c),n=b.memoizedState);k!==f||w!==n||O.current||Lf?("function"===typeof r&&(lg(b,r,f),n=b.memoizedState),(k=Lf||qg(b,k,f,w,n,g))?(h||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||("function"===typeof d.componentWillMount&&d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount()),"function"===typeof d.componentDidMount&&
(b.effectTag|=4)):("function"===typeof d.componentDidMount&&(b.effectTag|=4),b.memoizedProps=f,b.memoizedState=n),d.props=f,d.state=n,d.context=g,d=k):("function"===typeof d.componentDidMount&&(b.effectTag|=4),d=!1)}else h=b.type,d=b.stateNode,f=b.memoizedProps,k=b.pendingProps,d.props=f,n=d.context,g=pf(b),g=rf(b,g),r=h.getDerivedStateFromProps,(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(f!==k||n!==g)&&rg(b,d,k,g),Lf=!1,n=b.memoizedState,w=d.state=n,P=b.updateQueue,null!==P&&(Uf(b,P,k,d,c),w=b.memoizedState),f!==k||n!==w||O.current||Lf?("function"===typeof r&&(lg(b,r,k),w=b.memoizedState),(r=Lf||qg(b,f,k,n,w,g))?(h||"function"!==typeof d.UNSAFE_componentWillUpdate&&"function"!==typeof d.componentWillUpdate||("function"===typeof d.componentWillUpdate&&d.componentWillUpdate(k,w,g),"function"===typeof d.UNSAFE_componentWillUpdate&&d.UNSAFE_componentWillUpdate(k,w,g)),"function"===typeof d.componentDidUpdate&&
(b.effectTag|=4),"function"===typeof d.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),b.memoizedProps=k,b.memoizedState=w),d.props=k,d.state=w,d.context=g,d=r):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||
f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),d=!1);return Kg(a,b,d,e,c);case 3:Lg(b);e=b.updateQueue;if(null!==e)if(d=b.memoizedState,d=null!==d?d.element:null,Uf(b,e,b.pendingProps,null,c),e=b.memoizedState.element,e===d)Hg(),a=R(a,b);else{d=b.stateNode;if(d=(null===a||null===a.child)&&d.hydrate)Ag=jf(b.stateNode.containerInfo),zg=b,d=Bg=!0;d?(b.effectTag|=2,b.child=yg(b,null,e,c)):(Hg(),Q(a,b,e));a=b.child}else Hg(),a=R(a,b);return a;case 5:a:{gg(fg.current);e=gg(dg.current);d=He(e,
b.type);e!==d&&(N(eg,b,b),N(dg,d,b));null===a&&Eg(b);e=b.type;k=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!O.current&&k===d){if(k=b.mode&1&&!!d.hidden)b.expirationTime=1073741823;if(!k||1073741823!==c){a=R(a,b);break a}}k=d.children;df(e,d)?k=null:f&&df(e,f)&&(b.effectTag|=16);Jg(a,b);1073741823!==c&&b.mode&1&&d.hidden?(b.expirationTime=1073741823,b.memoizedProps=d,a=null):(Q(a,b,k),b.memoizedProps=d,a=b.child)}return a;case 6:return null===a&&Eg(b),b.memoizedProps=b.pendingProps,
null;case 16:return null;case 4:return ig(b,b.stateNode.containerInfo),e=b.pendingProps,O.current||b.memoizedProps!==e?(null===a?b.child=xg(b,null,e,c):Q(a,b,e),b.memoizedProps=e,a=b.child):a=R(a,b),a;case 14:return e=b.type.render,c=b.pendingProps,d=b.ref,O.current||b.memoizedProps!==c||d!==(null!==a?a.ref:null)?(e=e(c,d),Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 10:return c=b.pendingProps,O.current||b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 11:return c=
b.pendingProps.children,O.current||null!==c&&b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 15:return c=b.pendingProps,b.memoizedProps===c?a=R(a,b):(Q(a,b,c.children),b.memoizedProps=c,a=b.child),a;case 13:return Qg(a,b,c);case 12:a:if(d=b.type,f=b.pendingProps,k=b.memoizedProps,e=d._currentValue,g=d._changedBits,O.current||0!==g||k!==f){b.memoizedProps=f;h=f.unstable_observedBits;if(void 0===h||null===h)h=1073741823;b.stateNode=h;if(0!==(g&h))Mg(b,d,g,c);else if(k===f){a=
R(a,b);break a}c=f.children;c=c(e);b.effectTag|=1;Q(a,b,c);a=b.child}else a=R(a,b);return a;default:A("156")}}function Sg(a){a.effectTag|=4}var Tg=void 0,Ug=void 0,Vg=void 0;Tg=function(){};Ug=function(a,b,c){(b.updateQueue=c)&&Sg(b)};Vg=function(a,b,c,d){c!==d&&Sg(b)};
function Wg(a,b){var c=b.pendingProps;switch(b.tag){case 1:return null;case 2:return sf(b),null;case 3:jg(b);tf(b);var d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b),b.effectTag&=-3;Tg(b);return null;case 5:kg(b);d=gg(fg.current);var e=b.type;if(null!==a&&null!=b.stateNode){var f=a.memoizedProps,g=b.stateNode,h=gg(dg.current);g=We(g,e,f,c,d);Ug(a,b,g,e,f,c,d,h);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!c)return null===b.stateNode?
A("166"):void 0,null;a=gg(dg.current);if(Gg(b))c=b.stateNode,e=b.type,f=b.memoizedProps,c[C]=b,c[Ma]=f,d=Ye(c,e,f,a,d),b.updateQueue=d,null!==d&&Sg(b);else{a=Te(e,c,d,a);a[C]=b;a[Ma]=c;a:for(f=b.child;null!==f;){if(5===f.tag||6===f.tag)a.appendChild(f.stateNode);else if(4!==f.tag&&null!==f.child){f.child.return=f;f=f.child;continue}if(f===b)break;for(;null===f.sibling;){if(null===f.return||f.return===b)break a;f=f.return}f.sibling.return=f.return;f=f.sibling}Ve(a,e,c,d);cf(e,c)&&Sg(b);b.stateNode=
a}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)Vg(a,b,a.memoizedProps,c);else{if("string"!==typeof c)return null===b.stateNode?A("166"):void 0,null;d=gg(fg.current);gg(dg.current);Gg(b)?(d=b.stateNode,c=b.memoizedProps,d[C]=b,Ze(d,c)&&Sg(b)):(d=Ue(c,d),d[C]=b,b.stateNode=d)}return null;case 14:return null;case 16:return null;case 10:return null;case 11:return null;case 15:return null;case 4:return jg(b),Tg(b),null;case 13:return bg(b),null;case 12:return null;case 0:A("167");
default:A("156")}}function Xg(a,b){var c=b.source;null===b.stack&&null!==c&&vc(c);null!==c&&uc(c);b=b.value;null!==a&&2===a.tag&&uc(a);try{b&&b.suppressReactErrorLogging||console.error(b)}catch(d){d&&d.suppressReactErrorLogging||console.error(d)}}function Yg(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Zg(a,c)}else b.current=null}
function $g(a){"function"===typeof Kf&&Kf(a);switch(a.tag){case 2:Yg(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Zg(a,c)}break;case 5:Yg(a);break;case 4:ah(a)}}function bh(a){return 5===a.tag||3===a.tag||4===a.tag}
function ch(a){a:{for(var b=a.return;null!==b;){if(bh(b)){var c=b;break a}b=b.return}A("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:A("161")}c.effectTag&16&&(Ke(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||bh(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h)}else b.insertBefore(e.stateNode,c);else d?(f=b,g=e.stateNode,8===f.nodeType?f.parentNode.insertBefore(g,f):f.appendChild(g)):b.appendChild(e.stateNode);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===
e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function ah(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?A("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return}c=!0}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if($g(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return}g.sibling.return=g.return;g=g.sibling}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode)}else if(4===b.tag?d=b.stateNode.containerInfo:$g(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1)}b.sibling.return=b.return;b=b.sibling}}
function dh(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&(c[Ma]=d,Xe(c,f,e,a,d))}break;case 6:null===b.stateNode?A("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 15:break;case 16:break;default:A("163")}}function eh(a,b,c){c=Of(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){fh(d);Xg(a,b)};return c}
function gh(a,b,c){c=Of(c);c.tag=3;var d=a.stateNode;null!==d&&"function"===typeof d.componentDidCatch&&(c.callback=function(){null===hh?hh=new Set([this]):hh.add(this);var c=b.value,d=b.stack;Xg(a,b);this.componentDidCatch(c,{componentStack:null!==d?d:""})});return c}
function ih(a,b,c,d,e,f){c.effectTag|=512;c.firstEffect=c.lastEffect=null;d=Xf(d,c);a=b;do{switch(a.tag){case 3:a.effectTag|=1024;d=eh(a,d,f);Rf(a,d,f);return;case 2:if(b=d,c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&(null===hh||!hh.has(c))){a.effectTag|=1024;d=gh(a,b,f);Rf(a,d,f);return}}a=a.return}while(null!==a)}
function jh(a){switch(a.tag){case 2:sf(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return jg(a),tf(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return kg(a),null;case 16:return b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 4:return jg(a),null;case 13:return bg(a),null;default:return null}}var kh=ef(),lh=2,mh=kh,nh=0,oh=0,ph=!1,S=null,qh=null,T=0,rh=-1,sh=!1,U=null,th=!1,uh=!1,hh=null;
function vh(){if(null!==S)for(var a=S.return;null!==a;){var b=a;switch(b.tag){case 2:sf(b);break;case 3:jg(b);tf(b);break;case 5:kg(b);break;case 4:jg(b);break;case 13:bg(b)}a=a.return}qh=null;T=0;rh=-1;sh=!1;S=null;uh=!1}
function wh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){b=Wg(b,a,T);var e=a;if(1073741823===T||1073741823!==e.expirationTime){var f=0;switch(e.tag){case 3:case 2:var g=e.updateQueue;null!==g&&(f=g.expirationTime)}for(g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&
(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{uh=!0;break}}else{a=jh(a,sh,T);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}
function xh(a){var b=Rg(a.alternate,a,T);null===b&&(b=wh(a));ec.current=null;return b}
function yh(a,b,c){ph?A("243"):void 0;ph=!0;if(b!==T||a!==qh||null===S)vh(),qh=a,T=b,rh=-1,S=zf(qh.current,null,T),a.pendingCommitExpirationTime=0;var d=!1;sh=!c||T<=lh;do{try{if(c)for(;null!==S&&!zh();)S=xh(S);else for(;null!==S;)S=xh(S)}catch(f){if(null===S)d=!0,fh(f);else{null===S?A("271"):void 0;c=S;var e=c.return;if(null===e){d=!0;fh(f);break}ih(a,e,c,f,sh,T,mh);S=wh(c)}}break}while(1);ph=!1;if(d)return null;if(null===S){if(uh)return a.pendingCommitExpirationTime=b,a.current.alternate;sh?A("262"):
void 0;0<=rh&&setTimeout(function(){var b=a.current.expirationTime;0!==b&&(0===a.remainingExpirationTime||a.remainingExpirationTime<b)&&Ah(a,b)},rh);Bh(a.current.expirationTime)}return null}
function Zg(a,b){var c;a:{ph&&!th?A("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 2:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromCatch||"function"===typeof d.componentDidCatch&&(null===hh||!hh.has(d))){a=Xf(b,a);a=gh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}break;case 3:a=Xf(b,a);a=eh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}c=c.return}3===a.tag&&(c=Xf(b,a),c=eh(a,c,1),Qf(a,c,1),og(a,1));c=void 0}return c}
function Ch(){var a=2+25*(((mg()-2+500)/25|0)+1);a<=nh&&(a=nh+1);return nh=a}function ng(a,b){a=0!==oh?oh:ph?th?1:T:b.mode&1?Dh?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1):1;Dh&&(0===Eh||a>Eh)&&(Eh=a);return a}
function og(a,b){for(;null!==a;){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a.return)if(3===a.tag){var c=a.stateNode;!ph&&0!==T&&b<T&&vh();var d=c.current.expirationTime;ph&&!th&&qh===c||Ah(c,d);Fh>Gh&&A("185")}else break;a=a.return}}function mg(){mh=ef()-kh;return lh=(mh/10|0)+2}
function Hh(a){var b=oh;oh=2+25*(((mg()-2+500)/25|0)+1);try{return a()}finally{oh=b}}function Ih(a,b,c,d,e){var f=oh;oh=1;try{return a(b,c,d,e)}finally{oh=f}}var Jh=null,V=null,Kh=0,Lh=void 0,W=!1,X=null,Y=0,Eh=0,Mh=!1,Nh=!1,Oh=null,Ph=null,Z=!1,Qh=!1,Dh=!1,Rh=null,Gh=1E3,Fh=0,Sh=1;function Th(a){if(0!==Kh){if(a>Kh)return;null!==Lh&&gf(Lh)}var b=ef()-kh;Kh=a;Lh=ff(Uh,{timeout:10*(a-2)-b})}
function Ah(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===V?(Jh=V=a,a.nextScheduledRoot=a):(V=V.nextScheduledRoot=a,V.nextScheduledRoot=Jh);else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b}W||(Z?Qh&&(X=a,Y=1,Vh(a,1,!1)):1===b?Wh():Th(b))}
function Xh(){var a=0,b=null;if(null!==V)for(var c=V,d=Jh;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===V?A("244"):void 0;if(d===d.nextScheduledRoot){Jh=V=d.nextScheduledRoot=null;break}else if(d===Jh)Jh=e=d.nextScheduledRoot,V.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V){V=c;V.nextScheduledRoot=Jh;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===V)break;
c=d;d=d.nextScheduledRoot}}c=X;null!==c&&c===b&&1===a?Fh++:Fh=0;X=b;Y=a}function Uh(a){Yh(0,!0,a)}function Wh(){Yh(1,!1,null)}function Yh(a,b,c){Ph=c;Xh();if(b)for(;null!==X&&0!==Y&&(0===a||a>=Y)&&(!Mh||mg()>=Y);)mg(),Vh(X,Y,!Mh),Xh();else for(;null!==X&&0!==Y&&(0===a||a>=Y);)Vh(X,Y,!1),Xh();null!==Ph&&(Kh=0,Lh=null);0!==Y&&Th(Y);Ph=null;Mh=!1;Zh()}function $h(a,b){W?A("253"):void 0;X=a;Y=b;Vh(a,b,!1);Wh();Zh()}
function Zh(){Fh=0;if(null!==Rh){var a=Rh;Rh=null;for(var b=0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(d){Nh||(Nh=!0,Oh=d)}}}if(Nh)throw a=Oh,Oh=null,Nh=!1,a;}function Vh(a,b,c){W?A("245"):void 0;W=!0;c?(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!0),null!==c&&(zh()?a.finishedWork=c:ai(a,c,b)))):(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!1),null!==c&&ai(a,c,b)));W=!1}
function ai(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Rh?Rh=[d]:Rh.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=0;return}a.finishedWork=null;th=ph=!0;c=b.stateNode;c.current===b?A("177"):void 0;d=c.pendingCommitExpirationTime;0===d?A("261"):void 0;c.pendingCommitExpirationTime=0;mg();ec.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var e=b.firstEffect}else e=b;else e=b.firstEffect;af=Hd;var f=da();if(Ud(f)){if("selectionStart"in
f)var g={start:f.selectionStart,end:f.selectionEnd};else a:{var h=window.getSelection&&window.getSelection();if(h&&0!==h.rangeCount){g=h.anchorNode;var k=h.anchorOffset,n=h.focusNode;h=h.focusOffset;try{g.nodeType,n.nodeType}catch(Wa){g=null;break a}var r=0,w=-1,P=-1,nc=0,Jd=0,E=f,t=null;b:for(;;){for(var x;;){E!==g||0!==k&&3!==E.nodeType||(w=r+k);E!==n||0!==h&&3!==E.nodeType||(P=r+h);3===E.nodeType&&(r+=E.nodeValue.length);if(null===(x=E.firstChild))break;t=E;E=x}for(;;){if(E===f)break b;t===g&&
++nc===k&&(w=r);t===n&&++Jd===h&&(P=r);if(null!==(x=E.nextSibling))break;E=t;t=E.parentNode}E=x}g=-1===w||-1===P?null:{start:w,end:P}}else g=null}g=g||{start:0,end:0}}else g=null;bf={focusedElem:f,selectionRange:g};Id(!1);for(U=e;null!==U;){f=!1;g=void 0;try{for(;null!==U;){if(U.effectTag&256){var u=U.alternate;k=U;switch(k.tag){case 2:if(k.effectTag&256&&null!==u){var y=u.memoizedProps,D=u.memoizedState,ja=k.stateNode;ja.props=k.memoizedProps;ja.state=k.memoizedState;var mi=ja.getSnapshotBeforeUpdate(y,
D);ja.__reactInternalSnapshotBeforeUpdate=mi}break;case 3:case 5:case 6:case 4:break;default:A("163")}}U=U.nextEffect}}catch(Wa){f=!0,g=Wa}f&&(null===U?A("178"):void 0,Zg(U,g),null!==U&&(U=U.nextEffect))}for(U=e;null!==U;){u=!1;y=void 0;try{for(;null!==U;){var q=U.effectTag;q&16&&Ke(U.stateNode,"");if(q&128){var z=U.alternate;if(null!==z){var l=z.ref;null!==l&&("function"===typeof l?l(null):l.current=null)}}switch(q&14){case 2:ch(U);U.effectTag&=-3;break;case 6:ch(U);U.effectTag&=-3;dh(U.alternate,
U);break;case 4:dh(U.alternate,U);break;case 8:D=U,ah(D),D.return=null,D.child=null,D.alternate&&(D.alternate.child=null,D.alternate.return=null)}U=U.nextEffect}}catch(Wa){u=!0,y=Wa}u&&(null===U?A("178"):void 0,Zg(U,y),null!==U&&(U=U.nextEffect))}l=bf;z=da();q=l.focusedElem;u=l.selectionRange;if(z!==q&&fa(document.documentElement,q)){null!==u&&Ud(q)&&(z=u.start,l=u.end,void 0===l&&(l=z),"selectionStart"in q?(q.selectionStart=z,q.selectionEnd=Math.min(l,q.value.length)):window.getSelection&&(z=window.getSelection(),
y=q[lb()].length,l=Math.min(u.start,y),u=void 0===u.end?l:Math.min(u.end,y),!z.extend&&l>u&&(y=u,u=l,l=y),y=Td(q,l),D=Td(q,u),y&&D&&(1!==z.rangeCount||z.anchorNode!==y.node||z.anchorOffset!==y.offset||z.focusNode!==D.node||z.focusOffset!==D.offset)&&(ja=document.createRange(),ja.setStart(y.node,y.offset),z.removeAllRanges(),l>u?(z.addRange(ja),z.extend(D.node,D.offset)):(ja.setEnd(D.node,D.offset),z.addRange(ja)))));z=[];for(l=q;l=l.parentNode;)1===l.nodeType&&z.push({element:l,left:l.scrollLeft,
top:l.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<z.length;q++)l=z[q],l.element.scrollLeft=l.left,l.element.scrollTop=l.top}bf=null;Id(af);af=null;c.current=b;for(U=e;null!==U;){e=!1;q=void 0;try{for(z=d;null!==U;){var hg=U.effectTag;if(hg&36){var oc=U.alternate;l=U;u=z;switch(l.tag){case 2:var ca=l.stateNode;if(l.effectTag&4)if(null===oc)ca.props=l.memoizedProps,ca.state=l.memoizedState,ca.componentDidMount();else{var wi=oc.memoizedProps,xi=oc.memoizedState;ca.props=l.memoizedProps;
ca.state=l.memoizedState;ca.componentDidUpdate(wi,xi,ca.__reactInternalSnapshotBeforeUpdate)}var Ng=l.updateQueue;null!==Ng&&(ca.props=l.memoizedProps,ca.state=l.memoizedState,Wf(l,Ng,ca,u));break;case 3:var Og=l.updateQueue;if(null!==Og){y=null;if(null!==l.child)switch(l.child.tag){case 5:y=l.child.stateNode;break;case 2:y=l.child.stateNode}Wf(l,Og,y,u)}break;case 5:var yi=l.stateNode;null===oc&&l.effectTag&4&&cf(l.type,l.memoizedProps)&&yi.focus();break;case 6:break;case 4:break;case 15:break;case 16:break;
default:A("163")}}if(hg&128){l=void 0;var yc=U.ref;if(null!==yc){var Pg=U.stateNode;switch(U.tag){case 5:l=Pg;break;default:l=Pg}"function"===typeof yc?yc(l):yc.current=l}}var zi=U.nextEffect;U.nextEffect=null;U=zi}}catch(Wa){e=!0,q=Wa}e&&(null===U?A("178"):void 0,Zg(U,q),null!==U&&(U=U.nextEffect))}ph=th=!1;"function"===typeof Jf&&Jf(b.stateNode);b=c.current.expirationTime;0===b&&(hh=null);a.remainingExpirationTime=b}function zh(){return null===Ph||Ph.timeRemaining()>Sh?!1:Mh=!0}
function fh(a){null===X?A("246"):void 0;X.remainingExpirationTime=0;Nh||(Nh=!0,Oh=a)}function Bh(a){null===X?A("246"):void 0;X.remainingExpirationTime=a}function bi(a,b){var c=Z;Z=!0;try{return a(b)}finally{(Z=c)||W||Wh()}}function ci(a,b){if(Z&&!Qh){Qh=!0;try{return a(b)}finally{Qh=!1}}return a(b)}function di(a,b){W?A("187"):void 0;var c=Z;Z=!0;try{return Ih(a,b)}finally{Z=c,Wh()}}
function ei(a,b,c){if(Dh)return a(b,c);Z||W||0===Eh||(Yh(Eh,!1,null),Eh=0);var d=Dh,e=Z;Z=Dh=!0;try{return a(b,c)}finally{Dh=d,(Z=e)||W||Wh()}}function fi(a){var b=Z;Z=!0;try{Ih(a)}finally{(Z=b)||W||Yh(1,!1,null)}}
function gi(a,b,c,d,e){var f=b.current;if(c){c=c._reactInternalFiber;var g;b:{2===jd(c)&&2===c.tag?void 0:A("170");for(g=c;3!==g.tag;){if(qf(g)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}(g=g.return)?void 0:A("171")}g=g.stateNode.context}c=qf(c)?vf(c,g):g}else c=ha;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Of(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);Qf(f,e,d);og(f,d);return d}
function hi(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?A("188"):A("268",Object.keys(a)));a=md(b);return null===a?null:a.stateNode}function ii(a,b,c,d){var e=b.current,f=mg();e=ng(f,e);return gi(a,b,c,e,d)}function ji(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}
function ki(a){var b=a.findFiberByHostInstance;return If(p({},a,{findHostInstanceByFiber:function(a){a=md(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}
var li={updateContainerAtExpirationTime:gi,createContainer:function(a,b,c){return Ef(a,b,c)},updateContainer:ii,flushRoot:$h,requestWork:Ah,computeUniqueAsyncExpiration:Ch,batchedUpdates:bi,unbatchedUpdates:ci,deferredUpdates:Hh,syncUpdates:Ih,interactiveUpdates:ei,flushInteractiveUpdates:function(){W||0===Eh||(Yh(Eh,!1,null),Eh=0)},flushControlled:fi,flushSync:di,getPublicRootInstance:ji,findHostInstance:hi,findHostInstanceWithNoPortals:function(a){a=nd(a);return null===a?null:a.stateNode},injectIntoDevTools:ki};
function ni(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:hc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}Kb.injectFiberControlledHostComponent($e);function oi(a){this._expirationTime=Ch();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}
oi.prototype.render=function(a){this._defer?void 0:A("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new pi;gi(a,b,null,c,d._onCommit);return d};oi.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
oi.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:A("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?A("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;$h(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};oi.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function pi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}pi.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
pi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?A("191",c):void 0;c()}}};function qi(a,b,c){this._internalRoot=Ef(a,b,c)}qi.prototype.render=function(a,b){var c=this._internalRoot,d=new pi;b=void 0===b?null:b;null!==b&&d.then(b);ii(a,c,null,d._onCommit);return d};
qi.prototype.unmount=function(a){var b=this._internalRoot,c=new pi;a=void 0===a?null:a;null!==a&&c.then(a);ii(null,b,null,c._onCommit);return c};qi.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new pi;c=void 0===c?null:c;null!==c&&e.then(c);ii(b,d,a,e._onCommit);return e};
qi.prototype.createBatch=function(){var a=new oi(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function ri(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Sb=li.batchedUpdates;Tb=li.interactiveUpdates;Ub=li.flushInteractiveUpdates;
function si(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qi(a,!1,b)}
function ti(a,b,c,d,e){ri(c)?void 0:A("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=ji(f._internalRoot);g.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=si(c,d);if("function"===typeof e){var h=e;e=function(){var a=ji(f._internalRoot);h.call(a)}}ci(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return ji(f._internalRoot)}
function ui(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ri(b)?void 0:A("200");return ni(a,b,null,c)}
var vi={createPortal:ui,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:hi(a)},hydrate:function(a,b,c){return ti(null,a,b,!0,c)},render:function(a,b,c){return ti(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?A("38"):void 0;return ti(a,b,c,!1,d)},unmountComponentAtNode:function(a){ri(a)?void 0:A("40");return a._reactRootContainer?(ci(function(){ti(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return ui.apply(void 0,
arguments)},unstable_batchedUpdates:bi,unstable_deferredUpdates:Hh,unstable_interactiveUpdates:ei,flushSync:di,unstable_flushControlled:fi,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ka,EventPluginRegistry:va,EventPropagators:$a,ReactControlledComponent:Rb,ReactDOMComponentTree:Qa,ReactDOMEventListener:Nd},unstable_createRoot:function(a,b){return new qi(a,!0,null!=b&&!0===b.hydrate)}};ki({findFiberByHostInstance:Na,bundleType:0,version:"16.4.1",rendererPackageName:"react-dom"});
var Ai={default:vi},Bi=Ai&&vi||Ai;module.exports=Bi.default?Bi.default:Bi;

},{"fbjs/lib/invariant":46,"react":18,"fbjs/lib/ExecutionEnvironment":48,"object-assign":44,"fbjs/lib/emptyFunction":47,"fbjs/lib/getActiveElement":49,"fbjs/lib/shallowEqual":50,"fbjs/lib/containsNode":51,"fbjs/lib/emptyObject":45}],20:[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ('production' !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ('production' === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.production.min.js":34}],19:[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Immutable = factory();
})(this, function () {
  'use strict';
  var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
    return isIterable(value) ? value : Seq(value);
  }

  createClass(KeyedIterable, Iterable);
  function KeyedIterable(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }

  createClass(IndexedIterable, Iterable);
  function IndexedIterable(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }

  createClass(SetIterable, Iterable);
  function SetIterable(value) {
    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
  }

  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;

  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

  function Iterator(next) {
    this.next = next;
  }

  Iterator.prototype.toString = function () {
    return '[Iterator]';
  };

  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };

  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value: value, done: false
    };
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
  function Seq(value) {
    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
  }

  Seq.of = function () /*...values*/{
    return Seq(arguments);
  };

  Seq.prototype.toSeq = function () {
    return this;
  };

  Seq.prototype.toString = function () {
    return this.__toString('Seq {', '}');
  };

  Seq.prototype.cacheResult = function () {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };

  // abstract __iterateUncached(fn, reverse)

  Seq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, true);
  };

  // abstract __iteratorUncached(type, reverse)

  Seq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, true);
  };

  createClass(KeyedSeq, Seq);
  function KeyedSeq(value) {
    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
  }

  KeyedSeq.prototype.toKeyedSeq = function () {
    return this;
  };

  createClass(IndexedSeq, Seq);
  function IndexedSeq(value) {
    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
  }

  IndexedSeq.of = function () /*...values*/{
    return IndexedSeq(arguments);
  };

  IndexedSeq.prototype.toIndexedSeq = function () {
    return this;
  };

  IndexedSeq.prototype.toString = function () {
    return this.__toString('Seq [', ']');
  };

  IndexedSeq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, false);
  };

  IndexedSeq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, false);
  };

  createClass(SetSeq, Seq);
  function SetSeq(value) {
    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
  }

  SetSeq.of = function () /*...values*/{
    return SetSeq(arguments);
  };

  SetSeq.prototype.toSetSeq = function () {
    return this;
  };

  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;

  createClass(ArraySeq, IndexedSeq);
  function ArraySeq(array) {
    this._array = array;
    this.size = array.length;
  }

  ArraySeq.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };

  ArraySeq.prototype.__iterate = function (fn, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ArraySeq.prototype.__iterator = function (type, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    var ii = 0;
    return new Iterator(function () {
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
    });
  };

  createClass(ObjectSeq, KeyedSeq);
  function ObjectSeq(object) {
    var keys = Object.keys(object);
    this._object = object;
    this._keys = keys;
    this.size = keys.length;
  }

  ObjectSeq.prototype.get = function (key, notSetValue) {
    if (notSetValue !== undefined && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };

  ObjectSeq.prototype.has = function (key) {
    return this._object.hasOwnProperty(key);
  };

  ObjectSeq.prototype.__iterate = function (fn, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      var key = keys[reverse ? maxIndex - ii : ii];
      if (fn(object[key], key, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ObjectSeq.prototype.__iterator = function (type, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    var ii = 0;
    return new Iterator(function () {
      var key = keys[reverse ? maxIndex - ii : ii];
      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
    });
  };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(IterableSeq, IndexedSeq);
  function IterableSeq(iterable) {
    this._iterable = iterable;
    this.size = iterable.length || iterable.size;
  }

  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };

  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };

  createClass(IteratorSeq, IndexedSeq);
  function IteratorSeq(iterator) {
    this._iterator = iterator;
    this._iteratorCache = [];
  }

  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    while (iterations < cache.length) {
      if (fn(cache[iterations], iterations++, this) === false) {
        return iterations;
      }
    }
    var step;
    while (!(step = iterator.next()).done) {
      var val = step.value;
      cache[iterations] = val;
      if (fn(val, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };

  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    return new Iterator(function () {
      if (iterations >= cache.length) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        cache[iterations] = step.value;
      }
      return iteratorValue(type, iterations, cache[iterations++]);
    });
  };

  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : typeof value === 'object' ? new ObjectSeq(value) : undefined;
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values: ' + value);
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) || typeof value === 'object' && new ObjectSeq(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function () {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function (v, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function (v, k) {
      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

  function Repeat(value, times) {
    if (!(this instanceof Repeat)) {
      return new Repeat(value, times);
    }
    this._value = value;
    this.size = times === undefined ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }

  Repeat.prototype.toString = function () {
    if (this.size === 0) {
      return 'Repeat []';
    }
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  };

  Repeat.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };

  Repeat.prototype.includes = function (searchValue) {
    return is(this._value, searchValue);
  };

  Repeat.prototype.slice = function (begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
  };

  Repeat.prototype.reverse = function () {
    return this;
  };

  Repeat.prototype.indexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };

  Repeat.prototype.lastIndexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };

  Repeat.prototype.__iterate = function (fn, reverse) {
    for (var ii = 0; ii < this.size; ii++) {
      if (fn(this._value, ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  Repeat.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    var ii = 0;
    return new Iterator(function () {
      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
    });
  };

  Repeat.prototype.equals = function (other) {
    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
  };

  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      return new Range(start, end, step);
    }
    invariant(step !== 0, 'Cannot step a Range by 0');
    start = start || 0;
    if (end === undefined) {
      end = Infinity;
    }
    step = step === undefined ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }

  Range.prototype.toString = function () {
    if (this.size === 0) {
      return 'Range []';
    }
    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
  };

  Range.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };

  Range.prototype.includes = function (searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };

  Range.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range(0, 0);
    }
    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
  };

  Range.prototype.indexOf = function (searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };

  Range.prototype.lastIndexOf = function (searchValue) {
    return this.indexOf(searchValue);
  };

  Range.prototype.__iterate = function (fn, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(value, ii, this) === false) {
        return ii + 1;
      }
      value += reverse ? -step : step;
    }
    return ii;
  };

  Range.prototype.__iterator = function (type, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    var ii = 0;
    return new Iterator(function () {
      var v = value;
      value += reverse ? -step : step;
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
    });
  };

  Range.prototype.equals = function (other) {
    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };

  var EMPTY_RANGE;

  createClass(Collection, Iterable);
  function Collection() {
    throw TypeError('Abstract');
  }

  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
    a = a | 0; // int
    b = b | 0; // int
    var c = a & 0xffff;
    var d = b & 0xffff;
    // Shift by 0 fixes the sign on the high part.
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
  };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function () {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = function () {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }();

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          // Element
          return node.uniqueID;
        case 9:
          // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
  }

  createClass(Map, KeyedCollection);

  // @pragma Construction

  function Map(value) {
    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  Map.of = function () {
    var keyValues = SLICE$0.call(arguments, 0);
    return emptyMap().withMutations(function (map) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        map.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };

  Map.prototype.toString = function () {
    return this.__toString('Map {', '}');
  };

  // @pragma Access

  Map.prototype.get = function (k, notSetValue) {
    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
  };

  // @pragma Modification

  Map.prototype.set = function (k, v) {
    return updateMap(this, k, v);
  };

  Map.prototype.setIn = function (keyPath, v) {
    return this.updateIn(keyPath, NOT_SET, function () {
      return v;
    });
  };

  Map.prototype.remove = function (k) {
    return updateMap(this, k, NOT_SET);
  };

  Map.prototype.deleteIn = function (keyPath) {
    return this.updateIn(keyPath, function () {
      return NOT_SET;
    });
  };

  Map.prototype.update = function (k, notSetValue, updater) {
    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
  };

  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = undefined;
    }
    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
    return updatedValue === NOT_SET ? undefined : updatedValue;
  };

  Map.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };

  // @pragma Composition

  Map.prototype.merge = function () /*...iters*/{
    return mergeIntoMapWith(this, undefined, arguments);
  };

  Map.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, merger, iters);
  };

  Map.prototype.mergeIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoMapWith(this, deepMerger, arguments);
  };

  Map.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
  };

  Map.prototype.mergeDeepIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.sort = function (comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator));
  };

  Map.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator, mapper));
  };

  // @pragma Mutability

  Map.prototype.withMutations = function (fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  };

  Map.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  };

  Map.prototype.asImmutable = function () {
    return this.__ensureOwner();
  };

  Map.prototype.wasAltered = function () {
    return this.__altered;
  };

  Map.prototype.__iterator = function (type, reverse) {
    return new MapIterator(this, type, reverse);
  };

  Map.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    this._root && this._root.iterate(function (entry) {
      iterations++;
      return fn(entry[1], entry[0], this$0);
    }, reverse);
    return iterations;
  };

  Map.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };

  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;

  // #pragma Trie Nodes


  function ArrayMapNode(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  }

  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && entries.length === 1) {
      return; // undefined
    }

    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new ArrayMapNode(ownerID, newEntries);
  };

  function BitmapIndexedNode(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  }

  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
  };

  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;

    if (!exists && value === NOT_SET) {
      return this;
    }

    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : undefined;
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

    if (newNode === node) {
      return this;
    }

    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }

    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }

    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }

    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };

  function HashArrayMapNode(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  }

  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };

  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];

    if (removed && !node) {
      return this;
    }

    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }

    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }

    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };

  function HashCollisionNode(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  }

  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }

    var removed = value === NOT_SET;

    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };

  function ValueNode(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  }

  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };

  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }

    SetRef(didAlter);

    if (removed) {
      SetRef(didChangeSize);
      return; // undefined
    }

    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }

    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };

  // #pragma Iterators

  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

  function MapIterator(map, type, reverse) {
    this._type = type;
    this._reverse = reverse;
    this._stack = map._root && mapIteratorFrame(map._root);
  }

  MapIterator.prototype.next = function () {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };

  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function (existing, value, key) {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function (collection) {
      var mergeIntoMap = merger ? function (value, key) {
        collection.update(key, NOT_SET, function (existing) {
          return existing === NOT_SET ? value : merger(existing, value, key);
        });
      } : function (value, key) {
        collection.set(key, value);
      };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - (x >> 1 & 0x55555555);
    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
    x = x + (x >> 4) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

  // @pragma Construction

  function List(value) {
    var empty = emptyList();
    if (value === null || value === undefined) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedIterable(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function (list) {
      list.setSize(size);
      iter.forEach(function (v, i) {
        return list.set(i, v);
      });
    });
  }

  List.of = function () /*...values*/{
    return this(arguments);
  };

  List.prototype.toString = function () {
    return this.__toString('List [', ']');
  };

  // @pragma Access

  List.prototype.get = function (index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };

  // @pragma Modification

  List.prototype.set = function (index, value) {
    return updateList(this, index, value);
  };

  List.prototype.remove = function (index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };

  List.prototype.insert = function (index, value) {
    return this.splice(index, 0, value);
  };

  List.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };

  List.prototype.push = function () /*...values*/{
    var values = arguments;
    var oldSize = this.size;
    return this.withMutations(function (list) {
      setListBounds(list, 0, oldSize + values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(oldSize + ii, values[ii]);
      }
    });
  };

  List.prototype.pop = function () {
    return setListBounds(this, 0, -1);
  };

  List.prototype.unshift = function () /*...values*/{
    var values = arguments;
    return this.withMutations(function (list) {
      setListBounds(list, -values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(ii, values[ii]);
      }
    });
  };

  List.prototype.shift = function () {
    return setListBounds(this, 1);
  };

  // @pragma Composition

  List.prototype.merge = function () /*...iters*/{
    return mergeIntoListWith(this, undefined, arguments);
  };

  List.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, merger, iters);
  };

  List.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoListWith(this, deepMerger, arguments);
  };

  List.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, deepMergerWith(merger), iters);
  };

  List.prototype.setSize = function (size) {
    return setListBounds(this, 0, size);
  };

  // @pragma Iteration

  List.prototype.slice = function (begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };

  List.prototype.__iterator = function (type, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    return new Iterator(function () {
      var value = values();
      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
    });
  };

  List.prototype.__iterate = function (fn, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    var value;
    while ((value = values()) !== DONE) {
      if (fn(value, index++, this) === false) {
        break;
      }
    }
    return index;
  };

  List.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };

  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;

  function VNode(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  }

  // TODO: seems like these methods are very similar

  VNode.prototype.removeBefore = function (ownerID, level, index) {
    if (index === level ? 1 << level : 0 || this.array.length === 0) {
      return this;
    }
    var originIndex = index >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = undefined;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };

  VNode.prototype.removeAfter = function (ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }

    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }

    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };

  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function (list) {
        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = index >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

      // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }

  createClass(OrderedMap, Map);

  // @pragma Construction

  function OrderedMap(value) {
    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  OrderedMap.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedMap.prototype.toString = function () {
    return this.__toString('OrderedMap {', '}');
  };

  // @pragma Access

  OrderedMap.prototype.get = function (k, notSetValue) {
    var index = this._map.get(k);
    return index !== undefined ? this._list.get(index)[1] : notSetValue;
  };

  // @pragma Modification

  OrderedMap.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      return this;
    }
    return emptyOrderedMap();
  };

  OrderedMap.prototype.set = function (k, v) {
    return updateOrderedMap(this, k, v);
  };

  OrderedMap.prototype.remove = function (k) {
    return updateOrderedMap(this, k, NOT_SET);
  };

  OrderedMap.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  };

  OrderedMap.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._list.__iterate(function (entry) {
      return entry && fn(entry[1], entry[0], this$0);
    }, reverse);
  };

  OrderedMap.prototype.__iterator = function (type, reverse) {
    return this._list.fromEntrySeq().__iterator(type, reverse);
  };

  OrderedMap.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };

  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function (entry, idx) {
          return entry !== undefined && i !== idx;
        });
        newMap = newList.toKeyedSeq().map(function (entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
  function ToKeyedSequence(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }

  ToKeyedSequence.prototype.get = function (key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };

  ToKeyedSequence.prototype.has = function (key) {
    return this._iter.has(key);
  };

  ToKeyedSequence.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  };

  ToKeyedSequence.prototype.reverse = function () {
    var this$0 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function () {
        return this$0._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };

  ToKeyedSequence.prototype.map = function (mapper, context) {
    var this$0 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function () {
        return this$0._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };

  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var ii;
    return this._iter.__iterate(this._useKeys ? function (v, k) {
      return fn(v, k, this$0);
    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
      return fn(v, reverse ? --ii : ii++, this$0);
    }), reverse);
  };

  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
    if (this._useKeys) {
      return this._iter.__iterator(type, reverse);
    }
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var ii = reverse ? resolveSize(this) : 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
    });
  };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(ToIndexedSequence, IndexedSeq);
  function ToIndexedSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToIndexedSequence.prototype.includes = function (value) {
    return this._iter.includes(value);
  };

  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    return this._iter.__iterate(function (v) {
      return fn(v, iterations++, this$0);
    }, reverse);
  };

  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
    });
  };

  createClass(ToSetSequence, SetSeq);
  function ToSetSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToSetSequence.prototype.has = function (key) {
    return this._iter.includes(key);
  };

  ToSetSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (v) {
      return fn(v, v, this$0);
    }, reverse);
  };

  ToSetSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };

  createClass(FromEntriesSequence, KeyedSeq);
  function FromEntriesSequence(entries) {
    this._iter = entries;
    this.size = entries.size;
  }

  FromEntriesSequence.prototype.entrySeq = function () {
    return this._iter.toSeq();
  };

  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (entry) {
      // Check if entry exists first so array access doesn't throw for holes
      // in the parent iteration.
      if (entry) {
        validateEntry(entry);
        var indexedIterable = isIterable(entry);
        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
      }
    }, reverse);
  };

  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
        }
      }
    });
  };

  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function () {
      return iterable;
    };
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function () {
        return iterable.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function (key) {
      return iterable.includes(key);
    };
    flipSequence.includes = function (key) {
      return iterable.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(k, v, this$0) !== false;
      }, reverse);
    };
    flipSequence.__iteratorUncached = function (type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
    };
    return flipSequence;
  }

  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function (key) {
      return iterable.has(key);
    };
    mappedSequence.get = function (key, notSetValue) {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
      }, reverse);
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
      });
    };
    return mappedSequence;
  }

  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function () {
      return iterable;
    };
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function () {
          return iterable.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function (key, notSetValue) {
      return iterable.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function (key) {
      return iterable.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function (value) {
      return iterable.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(v, k, this$0);
      }, !reverse);
    };
    reversedSequence.__iterator = function (type, reverse) {
      return iterable.__iterator(type, !reverse);
    };
    return reversedSequence;
  }

  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function (key) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function (key, notSetValue) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }

  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
        return a + 1;
      });
    });
    return groups.asImmutable();
  }

  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), function (a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      });
    });
    var coerce = iterableClass(iterable);
    return groups.map(function (arr) {
      return reify(iterable, coerce(arr));
    });
  }

  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function (type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function () {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }

  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
      });
      return iterations;
    };
    takeSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function () {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }

  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function () {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }

  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function (v) {
      if (!isIterable(v)) {
        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function (v) {
      return v.size !== 0;
    });

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function (sum, seq) {
      if (sum !== undefined) {
        var size = seq.size;
        if (size !== undefined) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }

  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function (fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        var this$0 = this;
        iter.__iterate(function (v, k) {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function () {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }

  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(function (v, k) {
      return coerce(mapper.call(context, v, k, iterable));
    }).flatten(true);
  }

  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
    interposedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
      }, reverse);
      return iterations;
    };
    interposedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function () {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }

  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(function (v, k) {
      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
    }).toArray();
    entries.sort(function (a, b) {
      return comparator(a[3], b[3]) || a[2] - b[2];
    }).forEach(isKeyedIterable ? function (v, i) {
      entries[i].length = 2;
    } : function (v, i) {
      entries[i] = v[1];
    });
    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
  }

  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq().map(function (v, k) {
        return [v, mapper(v, k, iterable)];
      }).reduce(function (a, b) {
        return maxCompare(comparator, a[1], b[1]) ? b : a;
      });
      return entry && entry[0];
    } else {
      return iterable.reduce(function (a, b) {
        return maxCompare(comparator, a, b) ? b : a;
      });
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
  }

  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function (i) {
      return i.size;
    }).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function (fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function (type, reverse) {
      var iterators = iters.map(function (i) {
        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
      });
      var iterations = 0;
      var isDone = false;
      return new Iterator(function () {
        var steps;
        if (!isDone) {
          steps = iterators.map(function (i) {
            return i.next();
          });
          isDone = steps.some(function (s) {
            return s.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
          return s.value;
        })));
      });
    };
    return zipSequence;
  }

  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

  function Record(defaultValues, name) {
    var hasInitialized;

    var RecordType = function Record(values) {
      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        setProps(RecordTypePrototype, keys);
        RecordTypePrototype.size = keys.length;
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
      }
      this._map = Map(values);
    };

    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;

    return RecordType;
  }

  Record.prototype.toString = function () {
    return this.__toString(recordName(this) + ' {', '}');
  };

  // @pragma Access

  Record.prototype.has = function (k) {
    return this._defaultValues.hasOwnProperty(k);
  };

  Record.prototype.get = function (k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var defaultVal = this._defaultValues[k];
    return this._map ? this._map.get(k, defaultVal) : defaultVal;
  };

  // @pragma Modification

  Record.prototype.clear = function () {
    if (this.__ownerID) {
      this._map && this._map.clear();
      return this;
    }
    var RecordType = this.constructor;
    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
  };

  Record.prototype.set = function (k, v) {
    if (!this.has(k)) {
      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
    }
    if (this._map && !this._map.has(k)) {
      var defaultVal = this._defaultValues[k];
      if (v === defaultVal) {
        return this;
      }
    }
    var newMap = this._map && this._map.set(k, v);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.remove = function (k) {
    if (!this.has(k)) {
      return this;
    }
    var newMap = this._map && this._map.remove(k);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Record.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterator(type, reverse);
  };

  Record.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterate(fn, reverse);
  };

  Record.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map && this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return makeRecord(this, newMap, ownerID);
  };

  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;

  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function () {
        return this.get(name);
      },
      set: function (value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

  // @pragma Construction

  function Set(value) {
    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  Set.of = function () /*...values*/{
    return this(arguments);
  };

  Set.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  Set.prototype.toString = function () {
    return this.__toString('Set {', '}');
  };

  // @pragma Access

  Set.prototype.has = function (value) {
    return this._map.has(value);
  };

  // @pragma Modification

  Set.prototype.add = function (value) {
    return updateSet(this, this._map.set(value, true));
  };

  Set.prototype.remove = function (value) {
    return updateSet(this, this._map.remove(value));
  };

  Set.prototype.clear = function () {
    return updateSet(this, this._map.clear());
  };

  // @pragma Composition

  Set.prototype.union = function () {
    var iters = SLICE$0.call(arguments, 0);
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function (set) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetIterable(iters[ii]).forEach(function (value) {
          return set.add(value);
        });
      }
    });
  };

  Set.prototype.intersect = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (!iters.every(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.subtract = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (iters.some(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.merge = function () {
    return this.union.apply(this, arguments);
  };

  Set.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return this.union.apply(this, iters);
  };

  Set.prototype.sort = function (comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator));
  };

  Set.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator, mapper));
  };

  Set.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Set.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._map.__iterate(function (_, k) {
      return fn(k, k, this$0);
    }, reverse);
  };

  Set.prototype.__iterator = function (type, reverse) {
    return this._map.map(function (_, k) {
      return k;
    }).__iterator(type, reverse);
  };

  Set.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };

  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

  // @pragma Construction

  function OrderedSet(value) {
    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  OrderedSet.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedSet.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  OrderedSet.prototype.toString = function () {
    return this.__toString('OrderedSet {', '}');
  };

  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

  // @pragma Construction

  function Stack(value) {
    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
  }

  Stack.of = function () /*...values*/{
    return this(arguments);
  };

  Stack.prototype.toString = function () {
    return this.__toString('Stack [', ']');
  };

  // @pragma Access

  Stack.prototype.get = function (index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };

  Stack.prototype.peek = function () {
    return this._head && this._head.value;
  };

  // @pragma Modification

  Stack.prototype.push = function () /*...values*/{
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pushAll = function (iter) {
    iter = IndexedIterable(iter);
    if (iter.size === 0) {
      return this;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.reverse().forEach(function (value) {
      newSize++;
      head = {
        value: value,
        next: head
      };
    });
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pop = function () {
    return this.slice(1);
  };

  Stack.prototype.unshift = function () /*...values*/{
    return this.push.apply(this, arguments);
  };

  Stack.prototype.unshiftAll = function (iter) {
    return this.pushAll(iter);
  };

  Stack.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  };

  Stack.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = undefined;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };

  Stack.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      // super.slice(begin, end);
      return IndexedCollection.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  // @pragma Mutability

  Stack.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };

  // @pragma Iteration

  Stack.prototype.__iterate = function (fn, reverse) {
    if (reverse) {
      return this.reverse().__iterate(fn);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };

  Stack.prototype.__iterator = function (type, reverse) {
    if (reverse) {
      return this.reverse().__iterator(type);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function () {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };

  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;

  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function (key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function () {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function (v, i) {
        array[i] = v;
      });
      return array;
    },

    toIndexedSeq: function () {
      return new ToIndexedSequence(this);
    },

    toJS: function () {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJS === 'function' ? value.toJS() : value;
      }).__toJS();
    },

    toJSON: function () {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
      }).__toJS();
    },

    toKeyedSeq: function () {
      return new ToKeyedSequence(this, true);
    },

    toMap: function () {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function () {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function (v, k) {
        object[k] = v;
      });
      return object;
    },

    toOrderedMap: function () {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function () {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function () {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function () {
      return new ToSetSequence(this);
    },

    toSeq: function () {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },

    toStack: function () {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function () {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },

    // ### Common JavaScript methods and properties

    toString: function () {
      return '[Iterable]';
    },

    __toString: function (head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function () {
      var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function (searchValue) {
      return this.some(function (value) {
        return is(value, searchValue);
      });
    },

    entries: function () {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function (predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function (v, k, c) {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function (predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function (predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function (sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function (separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function (v) {
        isFirst ? isFirst = false : joined += separator;
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function () {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function (mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function (reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function (v, k, c) {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function (reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function () {
      return reify(this, reverseFactory(this, true));
    },

    slice: function (begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function (predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function (comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function () {
      return this.__iterator(ITERATE_VALUES);
    },

    // ### More sequential methods

    butLast: function () {
      return this.slice(0, -1);
    },

    isEmpty: function () {
      return this.size !== undefined ? this.size === 0 : !this.some(function () {
        return true;
      });
    },

    count: function (predicate, context) {
      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
    },

    countBy: function (grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function (other) {
      return deepEqual(this, other);
    },

    entrySeq: function () {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function () {
        return iterable.toSeq();
      };
      return entriesSequence;
    },

    filterNot: function (predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function (predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function (predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function (predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function (predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function (predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function () {
      return this.find(returnTrue);
    },

    flatMap: function (mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function (depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function () {
      return new FromEntriesSequence(this);
    },

    get: function (searchKey, notSetValue) {
      return this.find(function (_, key) {
        return is(key, searchKey);
      }, undefined, notSetValue);
    },

    getIn: function (searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function (grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function (searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function (searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function (iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function (value) {
        return iter.includes(value);
      });
    },

    isSuperset: function (iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function (searchValue) {
      return this.findKey(function (value) {
        return is(value, searchValue);
      });
    },

    keySeq: function () {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function () {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function (searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function (comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function (mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function (comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function (mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function () {
      return this.slice(1);
    },

    skip: function (amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function (amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function (predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function (predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function (mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function (amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function (amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function (predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function (predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function () {
      return this.toIndexedSeq();
    },

    // ### Hashable Object

    hashCode: function () {
      return this.__hash || (this.__hash = hashIterable(this));
    }

    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect = IterablePrototype.toSource = function () {
    return this.toString();
  };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function () {
      return reify(this, flipFactory(this));
    },

    mapEntries: function (mapper, context) {
      var this$0 = this;
      var iterations = 0;
      return reify(this, this.toSeq().map(function (v, k) {
        return mapper.call(context, [k, v], iterations++, this$0);
      }).fromEntrySeq());
    },

    mapKeys: function (mapper, context) {
      var this$0 = this;
      return reify(this, this.toSeq().flip().map(function (k, v) {
        return mapper.call(context, k, v, this$0);
      }).flip());
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function (v, k) {
    return JSON.stringify(k) + ': ' + quoteString(v);
  };

  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function () {
      return new ToKeyedSequence(this, false);
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function (predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function (predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function (searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function (searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function () {
      return reify(this, reverseFactory(this, false));
    },

    slice: function (begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function (index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
    },

    // ### More collection methods

    findLastIndex: function (predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function () {
      return this.get(0);
    },

    flatten: function (depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function (index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
        return key === index;
      }, undefined, notSetValue);
    },

    has: function (index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
    },

    interpose: function (separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function () /*...iterables*/{
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function () {
      return Range(0, this.size);
    },

    last: function () {
      return this.get(-1);
    },

    skipWhile: function (predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function () /*, ...iterables */{
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function (zipper /*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function (value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function (value) {
      return this.has(value);
    },

    // ### More sequential methods

    keySeq: function () {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;

  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);

  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }

  function neg(predicate) {
    return function () {
      return -predicate.apply(this, arguments);
    };
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function (v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function (v) {
      h = 31 * h + hash(v) | 0;
    } : function (v) {
      h = h + hash(v) | 0;
    });
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;
});
},{}],59:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

// merges child options up with the parent options object
// Example: obj = {a: 1, b: {a: 2}}
//          mergeOpts(obj, 'b')
//
//          Returns: {a: 2, b: {a: 2}}
function mergeOpts(allOptions, childFieldName) {
  var finalOpts = {};
  var name;

  for (name in allOptions) {
    if (name !== childFieldName) {
      finalOpts[name] = allOptions[name];
    }
  }

  //merge in the per type settings for the childFieldName
  if (childFieldName in allOptions) {
    for (name in allOptions[childFieldName]) {
      finalOpts[name] = allOptions[childFieldName][name];
    }
  }
  return finalOpts;
}

function normalizeOpts(options) {
  var convertedOpts = {};
  var key;

  for (key in options) {
    var newKey = key.replace(/-/g, "_");
    convertedOpts[newKey] = options[key];
  }
  return convertedOpts;
}

module.exports.mergeOpts = mergeOpts;
module.exports.normalizeOpts = normalizeOpts;
},{}],60:[function(require,module,exports) {
/* jshint node: true, curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

'use strict';

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var baseASCIIidentifierStartChars = "\x24\x40\x41-\x5a\x5f\x61-\x7a";
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var baseASCIIidentifierChars = "\x24\x30-\x39\x41-\x5a\x5f\x61-\x7a";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
//var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
//var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

var identifierStart = new RegExp("[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "]");
var identifierChars = new RegExp("[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

exports.identifier = new RegExp("[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "][" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]*", 'g');


// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
  // // permit $ (36) and @ (64). @ is used in ES7 decorators.
  // if (code < 65) return code === 36 || code === 64;
  // // 65 through 91 are uppercase letters.
  // if (code < 91) return true;
  // // permit _ (95).
  // if (code < 97) return code === 95;
  // // 97 through 123 are lowercase letters.
  // if (code < 123) return true;
  return identifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
  // if (code < 48) return code === 36;
  // if (code < 58) return true;
  // if (code < 65) return false;
  // if (code < 91) return true;
  // if (code < 97) return code === 95;
  // if (code < 123) return true;
  return identifierChars.test(String.fromCharCode(code));
};
},{}],61:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

function OutputLine(parent) {
  this.__parent = parent;
  this.__character_count = 0;
  // use indent_count as a marker for this.__lines that have preserved indentation
  this.__indent_count = -1;
  this.__alignment_count = 0;

  this.__items = [];
}

OutputLine.prototype.item = function(index) {
  if (index < 0) {
    return this.__items[this.__items.length + index];
  } else {
    return this.__items[index];
  }
};

OutputLine.prototype.has_match = function(pattern) {
  for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
    if (this.__items[lastCheckedOutput].match(pattern)) {
      return true;
    }
  }
  return false;
};

OutputLine.prototype.set_indent = function(indent, alignment) {
  this.__indent_count = indent || 0;
  this.__alignment_count = alignment || 0;
  this.__character_count = this.__parent.baseIndentLength + this.__alignment_count + this.__indent_count * this.__parent.indent_length;
};

OutputLine.prototype.get_character_count = function() {
  return this.__character_count;
};

OutputLine.prototype.is_empty = function() {
  return this.__items.length === 0;
};

OutputLine.prototype.last = function() {
  if (!this.is_empty()) {
    return this.__items[this.__items.length - 1];
  } else {
    return null;
  }
};

OutputLine.prototype.push = function(item) {
  this.__items.push(item);
  this.__character_count += item.length;
};

OutputLine.prototype.push_raw = function(item) {
  this.push(item);
  var last_newline_index = item.lastIndexOf('\n');
  if (last_newline_index !== -1) {
    this.__character_count = item.length - last_newline_index;
  }
};

OutputLine.prototype.pop = function() {
  var item = null;
  if (!this.is_empty()) {
    item = this.__items.pop();
    this.__character_count -= item.length;
  }
  return item;
};

OutputLine.prototype.remove_indent = function() {
  if (this.__indent_count > 0) {
    this.__indent_count -= 1;
    this.__character_count -= this.__parent.indent_length;
  }
};

OutputLine.prototype.trim = function() {
  while (this.last() === ' ') {
    this.__items.pop();
    this.__character_count -= 1;
  }
};

OutputLine.prototype.toString = function() {
  var result = '';
  if (!this.is_empty()) {
    if (this.__indent_count >= 0) {
      result = this.__parent.get_indent_string(this.__indent_count);
    }
    if (this.__alignment_count >= 0) {
      result += this.__parent.get_alignment_string(this.__alignment_count);
    }
    result += this.__items.join('');
  }
  return result;
};

function IndentCache(base_string, level_string) {
  this.__cache = [base_string];
  this.__level_string = level_string;
}

IndentCache.prototype.__ensure_cache = function(level) {
  while (level >= this.__cache.length) {
    this.__cache.push(this.__cache[this.__cache.length - 1] + this.__level_string);
  }
};

IndentCache.prototype.get_level_string = function(level) {
  this.__ensure_cache(level);
  return this.__cache[level];
};


function Output(indent_string, baseIndentString) {
  baseIndentString = baseIndentString || '';
  this.__indent_cache = new IndentCache(baseIndentString, indent_string);
  this.__alignment_cache = new IndentCache('', ' ');
  this.baseIndentLength = baseIndentString.length;
  this.indent_length = indent_string.length;
  this.raw = false;

  this.__lines = [];
  this.previous_line = null;
  this.current_line = null;
  this.space_before_token = false;
  // initialize
  this.__add_outputline();
}

Output.prototype.__add_outputline = function() {
  this.previous_line = this.current_line;
  this.current_line = new OutputLine(this);
  this.__lines.push(this.current_line);
};

Output.prototype.get_line_number = function() {
  return this.__lines.length;
};

Output.prototype.get_indent_string = function(level) {
  return this.__indent_cache.get_level_string(level);
};

Output.prototype.get_alignment_string = function(level) {
  return this.__alignment_cache.get_level_string(level);
};

Output.prototype.is_empty = function() {
  return !this.previous_line && this.current_line.is_empty();
};

Output.prototype.add_new_line = function(force_newline) {
  // never newline at the start of file
  // otherwise, newline only if we didn't just add one or we're forced
  if (this.is_empty() ||
    (!force_newline && this.just_added_newline())) {
    return false;
  }

  // if raw output is enabled, don't print additional newlines,
  // but still return True as though you had
  if (!this.raw) {
    this.__add_outputline();
  }
  return true;
};

Output.prototype.get_code = function(end_with_newline, eol) {
  var sweet_code = this.__lines.join('\n').replace(/[\r\n\t ]+$/, '');

  if (end_with_newline) {
    sweet_code += '\n';
  }

  if (eol !== '\n') {
    sweet_code = sweet_code.replace(/[\n]/g, eol);
  }

  return sweet_code;
};

Output.prototype.set_indent = function(indent, alignment) {
  indent = indent || 0;
  alignment = alignment || 0;

  // Never indent your first output indent at the start of the file
  if (this.__lines.length > 1) {
    this.current_line.set_indent(indent, alignment);
    return true;
  }
  this.current_line.set_indent();
  return false;
};

Output.prototype.add_raw_token = function(token) {
  for (var x = 0; x < token.newlines; x++) {
    this.__add_outputline();
  }
  this.current_line.push(token.whitespace_before);
  this.current_line.push_raw(token.text);
  this.space_before_token = false;
};

Output.prototype.add_token = function(printable_token) {
  this.add_space_before_token();
  this.current_line.push(printable_token);
};

Output.prototype.add_space_before_token = function() {
  if (this.space_before_token && !this.just_added_newline()) {
    this.current_line.push(' ');
  }
  this.space_before_token = false;
};

Output.prototype.remove_indent = function(index) {
  var output_length = this.__lines.length;
  while (index < output_length) {
    this.__lines[index].remove_indent();
    index++;
  }
};

Output.prototype.trim = function(eat_newlines) {
  eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

  this.current_line.trim(this.indent_string, this.baseIndentString);

  while (eat_newlines && this.__lines.length > 1 &&
    this.current_line.is_empty()) {
    this.__lines.pop();
    this.current_line = this.__lines[this.__lines.length - 1];
    this.current_line.trim();
  }

  this.previous_line = this.__lines.length > 1 ?
    this.__lines[this.__lines.length - 2] : null;
};

Output.prototype.just_added_newline = function() {
  return this.current_line.is_empty();
};

Output.prototype.just_added_blankline = function() {
  return this.is_empty() ||
    (this.current_line.is_empty() && this.previous_line.is_empty());
};

Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
  var index = this.__lines.length - 2;
  while (index >= 0) {
    var potentialEmptyLine = this.__lines[index];
    if (potentialEmptyLine.is_empty()) {
      break;
    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 &&
      potentialEmptyLine.item(-1) !== ends_with) {
      this.__lines.splice(index + 1, 0, new OutputLine(this));
      this.previous_line = this.__lines[this.__lines.length - 2];
      break;
    }
    index--;
  }
};

module.exports.Output = Output;
},{}],65:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

function InputScanner(input_string) {
  this.__input = input_string || '';
  this.__input_length = this.__input.length;
  this.__position = 0;
}

InputScanner.prototype.restart = function() {
  this.__position = 0;
};

InputScanner.prototype.back = function() {
  if (this.__position > 0) {
    this.__position -= 1;
  }
};

InputScanner.prototype.hasNext = function() {
  return this.__position < this.__input_length;
};

InputScanner.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__input.charAt(this.__position);
    this.__position += 1;
  }
  return val;
};

InputScanner.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this.__position;
  if (index >= 0 && index < this.__input_length) {
    val = this.__input.charAt(index);
  }
  return val;
};

InputScanner.prototype.test = function(pattern, index) {
  index = index || 0;
  index += this.__position;
  pattern.lastIndex = index;

  if (index >= 0 && index < this.__input_length) {
    var pattern_match = pattern.exec(this.__input);
    return pattern_match && pattern_match.index === index;
  } else {
    return false;
  }
};

InputScanner.prototype.testChar = function(pattern, index) {
  // test one character regex match
  var val = this.peek(index);
  return val !== null && pattern.test(val);
};

InputScanner.prototype.match = function(pattern) {
  pattern.lastIndex = this.__position;
  var pattern_match = pattern.exec(this.__input);
  if (pattern_match && pattern_match.index === this.__position) {
    this.__position += pattern_match[0].length;
  } else {
    pattern_match = null;
  }
  return pattern_match;
};

InputScanner.prototype.read = function(pattern) {
  var val = '';
  var match = this.match(pattern);
  if (match) {
    val = match[0];
  }
  return val;
};

InputScanner.prototype.readUntil = function(pattern, include_match) {
  var val = '';
  var match_index = this.__position;
  pattern.lastIndex = this.__position;
  var pattern_match = pattern.exec(this.__input);
  if (pattern_match) {
    if (include_match) {
      match_index = pattern_match.index + pattern_match[0].length;
    } else {
      match_index = pattern_match.index;
    }
  } else {
    match_index = this.__input_length;
  }

  val = this.__input.substring(this.__position, match_index);
  this.__position = match_index;
  return val;
};

InputScanner.prototype.readUntilAfter = function(pattern) {
  return this.readUntil(pattern, true);
};

/* css beautifier legacy helpers */
InputScanner.prototype.peekUntilAfter = function(pattern) {
  var start = this.__position;
  var val = this.readUntilAfter(pattern);
  this.__position = start;
  return val;
};

InputScanner.prototype.lookBack = function(testVal) {
  var start = this.__position - 1;
  return start >= testVal.length && this.__input.substring(start - testVal.length, start)
    .toLowerCase() === testVal;
};


module.exports.InputScanner = InputScanner;
},{}],67:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

function Token(type, text, newlines, whitespace_before) {
  this.type = type;
  this.text = text;

  // comments_before are
  // comments that have a new line before them
  // and may or may not have a newline after
  // this is a set of comments before
  this.comments_before = null; /* inline comment*/


  // this.comments_after =  new TokenStream(); // no new line before and newline after
  this.newlines = newlines || 0;
  this.whitespace_before = whitespace_before || '';
  this.parent = null;
  this.next = null;
  this.previous = null;
  this.opened = null;
  this.closed = null;
  this.directives = null;
}


module.exports.Token = Token;
},{}],66:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

function TokenStream(parent_token) {
  // private
  this.__tokens = [];
  this.__tokens_length = this.__tokens.length;
  this.__position = 0;
  this.__parent_token = parent_token;
}

TokenStream.prototype.restart = function() {
  this.__position = 0;
};

TokenStream.prototype.isEmpty = function() {
  return this.__tokens_length === 0;
};

TokenStream.prototype.hasNext = function() {
  return this.__position < this.__tokens_length;
};

TokenStream.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__tokens[this.__position];
    this.__position += 1;
  }
  return val;
};

TokenStream.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this.__position;
  if (index >= 0 && index < this.__tokens_length) {
    val = this.__tokens[index];
  }
  return val;
};

TokenStream.prototype.add = function(token) {
  if (this.__parent_token) {
    token.parent = this.__parent_token;
  }
  this.__tokens.push(token);
  this.__tokens_length += 1;
};

module.exports.TokenStream = TokenStream;
},{}],63:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var InputScanner = require('../core/inputscanner').InputScanner;
var Token = require('../core/token').Token;
var TokenStream = require('../core/tokenstream').TokenStream;

var TOKEN = {
  START: 'TK_START',
  RAW: 'TK_RAW',
  EOF: 'TK_EOF'
};

var Tokenizer = function(input_string, options) {
  this._input = new InputScanner(input_string);
  this._options = options || {};
  this.__tokens = null;
  this.__newline_count = 0;
  this.__whitespace_before_token = '';

  this._whitespace_pattern = /[\n\r\u2028\u2029\t\u000B\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff ]+/g;
  this._newline_pattern = /([^\n\r\u2028\u2029]*)(\r\n|[\n\r\u2028\u2029])?/g;
};

Tokenizer.prototype.tokenize = function() {
  this._input.restart();
  this.__tokens = new TokenStream();

  this._reset();

  var current;
  var previous = new Token(TOKEN.START, '');
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream();

  while (previous.type !== TOKEN.EOF) {
    current = this._get_next_token(previous, open_token);
    while (this._is_comment(current)) {
      comments.add(current);
      current = this._get_next_token(previous, open_token);
    }

    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream();
    }

    current.parent = open_token;

    if (this._is_opening(current)) {
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this._is_closing(current, open_token)) {
      current.opened = open_token;
      open_token.closed = current;
      open_token = open_stack.pop();
      current.parent = open_token;
    }

    current.previous = previous;
    previous.next = current;

    this.__tokens.add(current);
    previous = current;
  }

  return this.__tokens;
};


Tokenizer.prototype._is_first_token = function() {
  return this.__tokens.isEmpty();
};

Tokenizer.prototype._reset = function() {};

Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  this._readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this._create_token(TOKEN.RAW, resulting_string);
  } else {
    return this._create_token(TOKEN.EOF, '');
  }
};

Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._is_opening = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._is_closing = function(current_token, open_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._create_token = function(type, text) {
  var token = new Token(type, text, this.__newline_count, this.__whitespace_before_token);
  this.__newline_count = 0;
  this.__whitespace_before_token = '';
  return token;
};

Tokenizer.prototype._readWhitespace = function() {
  var resulting_string = this._input.read(this._whitespace_pattern);
  if (resulting_string === ' ') {
    this.__whitespace_before_token = resulting_string;
  } else if (resulting_string !== '') {
    this._newline_pattern.lastIndex = 0;
    var nextMatch = this._newline_pattern.exec(resulting_string);
    while (nextMatch[2]) {
      this.__newline_count += 1;
      nextMatch = this._newline_pattern.exec(resulting_string);
    }
    this.__whitespace_before_token = nextMatch[1];
  }
};



module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;
},{"../core/inputscanner":65,"../core/token":67,"../core/tokenstream":66}],64:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

function Directives(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
  this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
  this.__directive_pattern = / (\w+)[:](\w+)/g;

  this.__directives_end_ignore_pattern = new RegExp('(?:[\\s\\S]*?)((?:' + start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern + ')|$)', 'g');
}

Directives.prototype.get_directives = function(text) {
  if (!text.match(this.__directives_block_pattern)) {
    return null;
  }

  var directives = {};
  this.__directive_pattern.lastIndex = 0;
  var directive_match = this.__directive_pattern.exec(text);

  while (directive_match) {
    directives[directive_match[1]] = directive_match[2];
    directive_match = this.__directive_pattern.exec(text);
  }

  return directives;
};

Directives.prototype.readIgnored = function(input) {
  return input.read(this.__directives_end_ignore_pattern);
};


module.exports.Directives = Directives;
},{}],70:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var InputScanner = require('../core/inputscanner').InputScanner;
var BaseTokenizer = require('../core/tokenizer').Tokenizer;
var BASETOKEN = require('../core/tokenizer').TOKEN;
var acorn = require('../core/acorn');
var Directives = require('../core/directives').Directives;

function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}


var TOKEN = {
  START_EXPR: 'TK_START_EXPR',
  END_EXPR: 'TK_END_EXPR',
  START_BLOCK: 'TK_START_BLOCK',
  END_BLOCK: 'TK_END_BLOCK',
  WORD: 'TK_WORD',
  RESERVED: 'TK_RESERVED',
  SEMICOLON: 'TK_SEMICOLON',
  STRING: 'TK_STRING',
  EQUALS: 'TK_EQUALS',
  OPERATOR: 'TK_OPERATOR',
  COMMA: 'TK_COMMA',
  BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
  COMMENT: 'TK_COMMENT',
  DOT: 'TK_DOT',
  UNKNOWN: 'TK_UNKNOWN',
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};


var directives_core = new Directives(/\/\*/, /\*\//);

var number_pattern = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/g;

var digit = /[0-9]/;

// Dot "." must be distinguished from "..." and decimal
var dot_pattern = /[^\d\.]/;

var positionable_operators = (
  ">>> === !== " +
  "<< && >= ** != == <= >> || " +
  "< / - + > : & % ? ^ | *").split(' ');

// IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
// Also, you must update possitionable operators separately from punct
var punct =
  ">>>= " +
  "... >>= <<= === >>> !== **= " +
  "=> ^= :: /= << <= == && -= >= >> != -- += ** || ++ %= &= *= |= " +
  "= ! ? > < : / ^ - + * & % ~ |";

punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
punct = punct.replace(/ /g, '|');

var punct_pattern = new RegExp(punct, 'g');

// words which should always start on new line.
var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);
var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');

//  /* ... */ comment ends with nearest */ or end of file
var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;

// comment ends just before nearest linefeed or end of file
var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;

var in_html_comment;

var Tokenizer = function(input_string, options) {
  BaseTokenizer.call(this, input_string, options);
  this.positionable_operators = positionable_operators;
  this.line_starters = line_starters;
};
Tokenizer.prototype = new BaseTokenizer();

Tokenizer.prototype._is_comment = function(current_token) {
  return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
};

Tokenizer.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
};

Tokenizer.prototype._is_closing = function(current_token, open_token) {
  return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) &&
    (open_token && (
      (current_token.text === ']' && open_token.text === '[') ||
      (current_token.text === ')' && open_token.text === '(') ||
      (current_token.text === '}' && open_token.text === '{')));
};

Tokenizer.prototype._reset = function() {
  in_html_comment = false;
};

Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  this._readWhitespace();
  var token = null;
  var c = this._input.peek();

  token = token || this._read_singles(c);
  token = token || this._read_word(previous_token);
  token = token || this._read_comment(c);
  token = token || this._read_string(c);
  token = token || this._read_regexp(c, previous_token);
  token = token || this._read_xml(c, previous_token);
  token = token || this._read_non_javascript(c);
  token = token || this._read_punctuation();
  token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());

  return token;
};

Tokenizer.prototype._read_word = function(previous_token) {
  var resulting_string;
  resulting_string = this._input.read(acorn.identifier);
  if (resulting_string !== '') {
    if (!(previous_token.type === TOKEN.DOT ||
        (previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get'))) &&
      reserved_word_pattern.test(resulting_string)) {
      if (resulting_string === 'in' || resulting_string === 'of') { // hack for 'in' and 'of' operators
        return this._create_token(TOKEN.OPERATOR, resulting_string);
      }
      return this._create_token(TOKEN.RESERVED, resulting_string);
    }

    return this._create_token(TOKEN.WORD, resulting_string);
  }

  resulting_string = this._input.read(number_pattern);
  if (resulting_string !== '') {
    return this._create_token(TOKEN.WORD, resulting_string);
  }
};

Tokenizer.prototype._read_singles = function(c) {
  var token = null;
  if (c === null) {
    token = this._create_token(TOKEN.EOF, '');
  } else if (c === '(' || c === '[') {
    token = this._create_token(TOKEN.START_EXPR, c);
  } else if (c === ')' || c === ']') {
    token = this._create_token(TOKEN.END_EXPR, c);
  } else if (c === '{') {
    token = this._create_token(TOKEN.START_BLOCK, c);
  } else if (c === '}') {
    token = this._create_token(TOKEN.END_BLOCK, c);
  } else if (c === ';') {
    token = this._create_token(TOKEN.SEMICOLON, c);
  } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
    token = this._create_token(TOKEN.DOT, c);
  } else if (c === ',') {
    token = this._create_token(TOKEN.COMMA, c);
  }

  if (token) {
    this._input.next();
  }
  return token;
};

Tokenizer.prototype._read_punctuation = function() {
  var resulting_string = this._input.read(punct_pattern);

  if (resulting_string !== '') {
    if (resulting_string === '=') {
      return this._create_token(TOKEN.EQUALS, resulting_string);
    } else {
      return this._create_token(TOKEN.OPERATOR, resulting_string);
    }
  }
};

Tokenizer.prototype._read_non_javascript = function(c) {
  var resulting_string = '';

  if (c === '#') {
    c = this._input.next();

    if (this._is_first_token() && this._input.peek() === '!') {
      // shebang
      resulting_string = c;
      while (this._input.hasNext() && c !== '\n') {
        c = this._input.next();
        resulting_string += c;
      }
      return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
    }

    // Spidermonkey-specific sharp variables for circular references. Considered obsolete.
    var sharp = '#';
    if (this._input.hasNext() && this._input.testChar(digit)) {
      do {
        c = this._input.next();
        sharp += c;
      } while (this._input.hasNext() && c !== '#' && c !== '=');
      if (c === '#') {
        //
      } else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
        sharp += '[]';
        this._input.next();
        this._input.next();
      } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
        sharp += '{}';
        this._input.next();
        this._input.next();
      }
      return this._create_token(TOKEN.WORD, sharp);
    }

    this._input.back();

  } else if (c === '<') {
    if (this._input.peek(1) === '?' || this._input.peek(1) === '%') {
      resulting_string = this._input.read(template_pattern);
      if (resulting_string) {
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
        return this._create_token(TOKEN.STRING, resulting_string);
      }
    } else if (this._input.match(/<\!--/g)) {
      c = '<!--';
      while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
        c += this._input.next();
      }
      in_html_comment = true;
      return this._create_token(TOKEN.COMMENT, c);
    }
  } else if (c === '-' && in_html_comment && this._input.match(/-->/g)) {
    in_html_comment = false;
    return this._create_token(TOKEN.COMMENT, '-->');
  }

  return null;
};

Tokenizer.prototype._read_comment = function(c) {
  var token = null;
  if (c === '/') {
    var comment = '';
    if (this._input.peek(1) === '*') {
      // peek for comment /* ... */
      comment = this._input.read(block_comment_pattern);
      var directives = directives_core.get_directives(comment);
      if (directives && directives.ignore === 'start') {
        comment += directives_core.readIgnored(this._input);
      }
      comment = comment.replace(acorn.allLineBreaks, '\n');
      token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
      token.directives = directives;
    } else if (this._input.peek(1) === '/') {
      // peek for comment // ...
      comment = this._input.read(comment_pattern);
      token = this._create_token(TOKEN.COMMENT, comment);
    }
  }
  return token;
};

Tokenizer.prototype._read_string = function(c) {
  if (c === '`' || c === "'" || c === '"') {
    var resulting_string = this._input.next();
    this.has_char_escapes = false;

    if (c === '`') {
      resulting_string += this._read_string_recursive('`', true, '${');
    } else {
      resulting_string += this._read_string_recursive(c);
    }

    if (this.has_char_escapes && this._options.unescape_strings) {
      resulting_string = unescape_string(resulting_string);
    }
    if (this._input.peek() === c) {
      resulting_string += this._input.next();
    }

    return this._create_token(TOKEN.STRING, resulting_string);
  }

  return null;
};

Tokenizer.prototype._allow_regexp_or_xml = function(previous_token) {
  // regex and xml can only appear in specific locations during parsing
  return (previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
    (previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' &&
      previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for'])) ||
    (in_array(previous_token.type, [TOKEN.COMMENT, TOKEN.START_EXPR, TOKEN.START_BLOCK, TOKEN.START,
      TOKEN.END_BLOCK, TOKEN.OPERATOR, TOKEN.EQUALS, TOKEN.EOF, TOKEN.SEMICOLON, TOKEN.COMMA
    ]));
};

Tokenizer.prototype._read_regexp = function(c, previous_token) {

  if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
    // handle regexp
    //
    var resulting_string = this._input.next();
    var esc = false;

    var in_char_class = false;
    while (this._input.hasNext() &&
      ((esc || in_char_class || this._input.peek() !== c) &&
        !this._input.testChar(acorn.newline))) {
      resulting_string += this._input.peek();
      if (!esc) {
        esc = this._input.peek() === '\\';
        if (this._input.peek() === '[') {
          in_char_class = true;
        } else if (this._input.peek() === ']') {
          in_char_class = false;
        }
      } else {
        esc = false;
      }
      this._input.next();
    }

    if (this._input.peek() === c) {
      resulting_string += this._input.next();

      // regexps may have modifiers /regexp/MOD , so fetch those, too
      // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
      resulting_string += this._input.read(acorn.identifier);
    }
    return this._create_token(TOKEN.STRING, resulting_string);
  }
  return null;
};


var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

Tokenizer.prototype._read_xml = function(c, previous_token) {

  if (this._options.e4x && c === "<" && this._input.test(startXmlRegExp) && this._allow_regexp_or_xml(previous_token)) {
    // handle e4x xml literals
    //
    var xmlStr = '';
    var match = this._input.match(startXmlRegExp);
    if (match) {
      // Trim root tag to attempt to
      var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
      var isCurlyRoot = rootTag.indexOf('{') === 0;
      var depth = 0;
      while (match) {
        var isEndTag = !!match[1];
        var tagName = match[2];
        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
        if (!isSingletonTag &&
          (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
          if (isEndTag) {
            --depth;
          } else {
            ++depth;
          }
        }
        xmlStr += match[0];
        if (depth <= 0) {
          break;
        }
        match = this._input.match(xmlRegExp);
      }
      // if we didn't close correctly, keep unformatted.
      if (!match) {
        xmlStr += this._input.match(/[\s\S]*/g)[0];
      }
      xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
      return this._create_token(TOKEN.STRING, xmlStr);
    }
  }

  return null;
};

function unescape_string(s) {
  // You think that a regex would work for this
  // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
  //         return String.fromCharCode(parseInt(val, 16));
  //     })
  // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
  var out = '',
    escaped = 0;

  var input_scan = new InputScanner(s);
  var matched = null;

  while (input_scan.hasNext()) {
    // Keep any whitespace, non-slash characters
    // also keep slash pairs.
    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

    if (matched) {
      out += matched[0];
    }

    if (input_scan.peek() === '\\') {
      input_scan.next();
      if (input_scan.peek() === 'x') {
        matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
      } else if (input_scan.peek() === 'u') {
        matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
      } else {
        out += '\\';
        if (input_scan.hasNext()) {
          out += input_scan.next();
        }
        continue;
      }

      // If there's some error decoding, return the original string
      if (!matched) {
        return s;
      }

      escaped = parseInt(matched[1], 16);

      if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
        // we bail out on \x7f..\xff,
        // leaving whole string escaped,
        // as it's probably completely binary
        return s;
      } else if (escaped >= 0x00 && escaped < 0x20) {
        // leave 0x00...0x1f escaped
        out += '\\' + matched[0];
        continue;
      } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
        // single-quote, apostrophe, backslash - escape these
        out += '\\' + String.fromCharCode(escaped);
      } else {
        out += String.fromCharCode(escaped);
      }
    }
  }

  return out;
}

// handle string
//
Tokenizer.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
  // Template strings can travers lines without escape characters.
  // Other strings cannot
  var current_char;
  var resulting_string = '';
  var esc = false;
  while (this._input.hasNext()) {
    current_char = this._input.peek();
    if (!(esc || (current_char !== delimiter &&
        (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
      break;
    }

    // Handle \r\n linebreaks after escapes or in template strings
    if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
      if (current_char === '\r' && this._input.peek(1) === '\n') {
        this._input.next();
        current_char = this._input.peek();
      }
      resulting_string += '\n';
    } else {
      resulting_string += current_char;
    }

    if (esc) {
      if (current_char === 'x' || current_char === 'u') {
        this.has_char_escapes = true;
      }
      esc = false;
    } else {
      esc = current_char === '\\';
    }

    this._input.next();

    if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
      if (delimiter === '`') {
        resulting_string += this._read_string_recursive('}', allow_unescaped_newlines, '`');
      } else {
        resulting_string += this._read_string_recursive('`', allow_unescaped_newlines, '${');
      }

      if (this._input.hasNext()) {
        resulting_string += this._input.next();
      }
    }
  }

  return resulting_string;
};



module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;
},{"../core/inputscanner":65,"../core/tokenizer":63,"../core/acorn":60,"../core/directives":64}],68:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var mergeOpts = require('../core/options').mergeOpts;
var normalizeOpts = require('../core/options').normalizeOpts;
var acorn = require('../core/acorn');
var Output = require('../core/output').Output;
var Tokenizer = require('./tokenizer').Tokenizer;
var TOKEN = require('./tokenizer').TOKEN;

function remove_redundant_indentation(output, frame) {
  // This implementation is effective but has some issues:
  //     - can cause line wrap to happen too soon due to indent removal
  //           after wrap points are calculated
  // These issues are minor compared to ugly indentation.

  if (frame.multiline_frame ||
    frame.mode === MODE.ForInitializer ||
    frame.mode === MODE.Conditional) {
    return;
  }

  // remove one indent from each line inside this section
  output.remove_indent(frame.start_line_index);
}

function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}

function ltrim(s) {
  return s.replace(/^\s+/g, '');
}

function generateMapFromStrings(list) {
  var result = {};
  for (var x = 0; x < list.length; x++) {
    // make the mapped names underscored instead of dash
    result[list[x].replace(/-/g, '_')] = list[x];
  }
  return result;
}

function sanitizeOperatorPosition(opPosition) {
  opPosition = opPosition || OPERATOR_POSITION.before_newline;

  if (!in_array(opPosition, validPositionValues)) {
    throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
      validPositionValues +
      "\nYou passed in: '" + opPosition + "'");
  }

  return opPosition;
}

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
  BlockStatement: 'BlockStatement', // 'BLOCK'
  Statement: 'Statement', // 'STATEMENT'
  ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
  ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
  ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
  Conditional: 'Conditional', //'(COND-EXPRESSION)',
  Expression: 'Expression' //'(EXPRESSION)'
};

function Beautifier(source_text, options) {
  options = options || {};
  this._source_text = source_text || '';

  var output;
  var tokens;
  var tokenizer;
  var current_token;
  var last_type, last_last_text;
  var flags, previous_flags, flag_store;

  var handlers, opt;

  handlers = {};
  handlers[TOKEN.START_EXPR] = handle_start_expr;
  handlers[TOKEN.END_EXPR] = handle_end_expr;
  handlers[TOKEN.START_BLOCK] = handle_start_block;
  handlers[TOKEN.END_BLOCK] = handle_end_block;
  handlers[TOKEN.WORD] = handle_word;
  handlers[TOKEN.RESERVED] = handle_word;
  handlers[TOKEN.SEMICOLON] = handle_semicolon;
  handlers[TOKEN.STRING] = handle_string;
  handlers[TOKEN.EQUALS] = handle_equals;
  handlers[TOKEN.OPERATOR] = handle_operator;
  handlers[TOKEN.COMMA] = handle_comma;
  handlers[TOKEN.BLOCK_COMMENT] = handle_block_comment;
  handlers[TOKEN.COMMENT] = handle_comment;
  handlers[TOKEN.DOT] = handle_dot;
  handlers[TOKEN.UNKNOWN] = handle_unknown;
  handlers[TOKEN.EOF] = handle_eof;

  function create_flags(flags_base, mode) {
    var next_indent_level = 0;
    if (flags_base) {
      next_indent_level = flags_base.indentation_level;
      if (!output.just_added_newline() &&
        flags_base.line_indent_level > next_indent_level) {
        next_indent_level = flags_base.line_indent_level;
      }
    }

    var next_flags = {
      mode: mode,
      parent: flags_base,
      last_text: flags_base ? flags_base.last_text : '', // last token text
      last_word: flags_base ? flags_base.last_word : '', // last TOKEN.WORD passed
      declaration_statement: false,
      declaration_assignment: false,
      multiline_frame: false,
      inline_frame: false,
      if_block: false,
      else_block: false,
      do_block: false,
      do_while: false,
      import_block: false,
      in_case_statement: false, // switch(..){ INSIDE HERE }
      in_case: false, // we're on the exact line with "case 0:"
      case_body: false, // the indented case-action block
      indentation_level: next_indent_level,
      line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
      start_line_index: output.get_line_number(),
      ternary_depth: 0
    };
    return next_flags;
  }

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'js');
  options = normalizeOpts(options);

  opt = {};

  // compatibility, re
  if (options.brace_style === "expand-strict") { //graceful handling of deprecated option
    options.brace_style = "expand";
  } else if (options.brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
    options.brace_style = "collapse,preserve-inline";
  } else if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
    options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
  } else if (!options.brace_style) { //Nothing exists to set it
    options.brace_style = "collapse";
  }

  //preserve-inline in delimited string will trigger brace_preserve_inline, everything
  //else is considered a brace_style and the last one only will have an effect
  var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
  opt.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
  opt.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] === "preserve-inline") {
      opt.brace_preserve_inline = true;
    } else {
      opt.brace_style = brace_style_split[bs];
    }
  }

  opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  opt.indent_char = options.indent_char ? options.indent_char : ' ';
  opt.eol = options.eol ? options.eol : 'auto';
  opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  opt.unindent_chained_methods = (options.unindent_chained_methods === undefined) ? false : options.unindent_chained_methods;
  opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
  opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
  opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
  opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
  opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
  opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
  opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
  opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
  opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
  opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
  opt.e4x = (options.e4x === undefined) ? false : options.e4x;
  opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
  opt.operator_position = sanitizeOperatorPosition(options.operator_position);

  // Support passing the source text back with no change
  opt.disabled = (options.disabled === undefined) ? false : options.disabled;

  // For testing of beautify preserve:start directive
  opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

  // force opt.space_after_anon_function to true if opt.jslint_happy
  if (opt.jslint_happy) {
    opt.space_after_anon_function = true;
  }

  if (options.indent_with_tabs) {
    opt.indent_char = '\t';
    opt.indent_size = 1;
  }

  opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  this._reset = function(source_text) {
    var baseIndentString = '';

    var indent_string = new Array(opt.indent_size + 1).join(opt.indent_char);

    var preindent_index = 0;
    if (source_text && source_text.length) {
      while ((source_text.charAt(preindent_index) === ' ' ||
          source_text.charAt(preindent_index) === '\t')) {
        preindent_index += 1;
      }
      baseIndentString = source_text.substring(0, preindent_index);
      source_text = source_text.substring(preindent_index);
    }

    last_type = TOKEN.START_BLOCK; // last token type
    last_last_text = ''; // pre-last token text
    output = new Output(indent_string, baseIndentString);

    // If testing the ignore directive, start with output disable set to true
    output.raw = opt.test_output_raw;


    // Stack of parsing/formatting states, including MODE.
    // We tokenize, parse, and output in an almost purely a forward-only stream of token input
    // and formatted output.  This makes the beautifier less accurate than full parsers
    // but also far more tolerant of syntax errors.
    //
    // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
    // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
    // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
    // most full parsers would die, but the beautifier gracefully falls back to
    // MODE.BlockStatement and continues on.
    flag_store = [];
    set_mode(MODE.BlockStatement);
    tokenizer = new Tokenizer(source_text, opt, indent_string);
    tokens = tokenizer.tokenize();
    return source_text;
  };

  this.beautify = function() {

    // if disabled, return the input unchanged.
    if (opt.disabled) {
      return this._source_text;
    }

    var sweet_code;
    var source_text = this._reset(this._source_text);

    var eol = opt.eol;
    if (opt.eol === 'auto') {
      eol = '\n';
      if (source_text && acorn.lineBreak.test(source_text || '')) {
        eol = source_text.match(acorn.lineBreak)[0];
      }
    }

    current_token = tokens.next();
    while (current_token) {
      handlers[current_token.type]();

      last_last_text = flags.last_text;
      last_type = current_token.type;
      flags.last_text = current_token.text;

      current_token = tokens.next();
    }

    sweet_code = output.get_code(opt.end_with_newline, eol);

    return sweet_code;
  };

  function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
    var newlines = local_token.newlines;
    var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);

    if (local_token.comments_before) {
      var temp_token = current_token;
      current_token = local_token.comments_before.next();
      while (current_token) {
        // The cleanest handling of inline comments is to treat them as though they aren't there.
        // Just continue formatting and the behavior should be logical.
        // Also ignore unknown tokens.  Again, this should result in better behavior.
        handle_whitespace_and_comments(current_token, preserve_statement_flags);
        handlers[current_token.type](preserve_statement_flags);
        current_token = local_token.comments_before.next();
      }
      current_token = temp_token;
    }

    if (keep_whitespace) {
      for (var i = 0; i < newlines; i += 1) {
        print_newline(i > 0, preserve_statement_flags);
      }
    } else {
      if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
        newlines = opt.max_preserve_newlines;
      }

      if (opt.preserve_newlines) {
        if (local_token.newlines > 1) {
          print_newline(false, preserve_statement_flags);
          for (var j = 1; j < newlines; j += 1) {
            print_newline(true, preserve_statement_flags);
          }
        }
      }
    }

  }

  // we could use just string.split, but
  // IE doesn't like returning empty strings
  function split_linebreaks(s) {
    //return s.split(/\x0d\x0a|\x0a/);

    s = s.replace(acorn.allLineBreaks, '\n');
    var out = [],
      idx = s.indexOf("\n");
    while (idx !== -1) {
      out.push(s.substring(0, idx));
      s = s.substring(idx + 1);
      idx = s.indexOf("\n");
    }
    if (s.length) {
      out.push(s);
    }
    return out;
  }

  var newline_restricted_tokens = ['async', 'await', 'break', 'continue', 'return', 'throw', 'yield'];

  function allow_wrap_or_preserved_newline(force_linewrap) {
    force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

    // Never wrap the first token on a line
    if (output.just_added_newline()) {
      return;
    }

    var shouldPreserveOrForce = (opt.preserve_newlines && current_token.newlines) || force_linewrap;
    var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

    if (operatorLogicApplies) {
      var shouldPrintOperatorNewline = (
          in_array(flags.last_text, tokenizer.positionable_operators) &&
          in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
        ) ||
        in_array(current_token.text, tokenizer.positionable_operators);
      shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
    }

    if (shouldPreserveOrForce) {
      print_newline(false, true);
    } else if (opt.wrap_line_length) {
      if (last_type === TOKEN.RESERVED && in_array(flags.last_text, newline_restricted_tokens)) {
        // These tokens should never have a newline inserted
        // between them and the following expression.
        return;
      }
      var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
        (output.space_before_token ? 1 : 0);
      if (proposed_line_length >= opt.wrap_line_length) {
        print_newline(false, true);
      }
    }
  }

  function print_newline(force_newline, preserve_statement_flags) {
    if (!preserve_statement_flags) {
      if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && (last_type !== TOKEN.OPERATOR || flags.last_text === '--' || flags.last_text === '++')) {
        var next_token = tokens.peek();
        while (flags.mode === MODE.Statement &&
          !(flags.if_block && next_token && next_token.type === TOKEN.RESERVED && next_token.text === 'else') &&
          !flags.do_block) {
          restore_mode();
        }
      }
    }

    if (output.add_new_line(force_newline)) {
      flags.multiline_frame = true;
    }
  }

  function print_token_line_indentation() {
    if (output.just_added_newline()) {
      if (opt.keep_array_indentation && is_array(flags.mode) && current_token.newlines) {
        output.current_line.push(current_token.whitespace_before);
        output.space_before_token = false;
      } else if (output.set_indent(flags.indentation_level)) {
        flags.line_indent_level = flags.indentation_level;
      }
    }
  }

  function print_token(printable_token) {
    if (output.raw) {
      output.add_raw_token(current_token);
      return;
    }

    if (opt.comma_first && last_type === TOKEN.COMMA &&
      output.just_added_newline()) {
      if (output.previous_line.last() === ',') {
        var popped = output.previous_line.pop();
        // if the comma was already at the start of the line,
        // pull back onto that line and reprint the indentation
        if (output.previous_line.is_empty()) {
          output.previous_line.push(popped);
          output.trim(true);
          output.current_line.pop();
          output.trim();
        }

        // add the comma in front of the next token
        print_token_line_indentation();
        output.add_token(',');
        output.space_before_token = true;
      }
    }

    printable_token = printable_token || current_token.text;
    print_token_line_indentation();
    output.add_token(printable_token);
  }

  function indent() {
    flags.indentation_level += 1;
  }

  function deindent() {
    if (flags.indentation_level > 0 &&
      ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
      flags.indentation_level -= 1;

    }
  }

  function set_mode(mode) {
    if (flags) {
      flag_store.push(flags);
      previous_flags = flags;
    } else {
      previous_flags = create_flags(null, mode);
    }

    flags = create_flags(previous_flags, mode);
  }

  function is_array(mode) {
    return mode === MODE.ArrayLiteral;
  }

  function is_expression(mode) {
    return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
  }

  function restore_mode() {
    if (flag_store.length > 0) {
      previous_flags = flags;
      flags = flag_store.pop();
      if (previous_flags.mode === MODE.Statement) {
        remove_redundant_indentation(output, previous_flags);
      }
    }
  }

  function start_of_object_property() {
    return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
      (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === TOKEN.RESERVED && in_array(flags.last_text, ['get', 'set'])));
  }

  function start_of_statement() {
    var start = false;
    start = start || (last_type === TOKEN.RESERVED && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD);
    start = start || (last_type === TOKEN.RESERVED && flags.last_text === 'do');
    start = start || (last_type === TOKEN.RESERVED && in_array(flags.last_text, newline_restricted_tokens) && !current_token.newlines);
    start = start || (last_type === TOKEN.RESERVED && flags.last_text === 'else' &&
      !(current_token.type === TOKEN.RESERVED && current_token.text === 'if' && !current_token.comments_before));
    start = start || (last_type === TOKEN.END_EXPR && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional));
    start = start || (last_type === TOKEN.WORD && flags.mode === MODE.BlockStatement &&
      !flags.in_case &&
      !(current_token.text === '--' || current_token.text === '++') &&
      last_last_text !== 'function' &&
      current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED);
    start = start || (flags.mode === MODE.ObjectLiteral && (
      (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === TOKEN.RESERVED && in_array(flags.last_text, ['get', 'set']))));

    if (start) {
      set_mode(MODE.Statement);
      indent();

      handle_whitespace_and_comments(current_token, true);

      // Issue #276:
      // If starting a new statement with [if, for, while, do], push to a new line.
      // if (a) if (b) if(c) d(); else e(); else f();
      if (!start_of_object_property()) {
        allow_wrap_or_preserved_newline(
          current_token.type === TOKEN.RESERVED && in_array(current_token.text, ['do', 'for', 'if', 'while']));
      }

      return true;
    }
    return false;
  }

  function all_lines_start_with(lines, c) {
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.charAt(0) !== c) {
        return false;
      }
    }
    return true;
  }

  function each_line_matches_indent(lines, indent) {
    var i = 0,
      len = lines.length,
      line;
    for (; i < len; i++) {
      line = lines[i];
      // allow empty lines to pass through
      if (line && line.indexOf(indent) !== 0) {
        return false;
      }
    }
    return true;
  }

  function is_special_word(word) {
    return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async']);
  }

  function handle_start_expr() {
    // The conditional starts the statement if appropriate.
    if (!start_of_statement()) {
      handle_whitespace_and_comments(current_token);
    }

    var next_mode = MODE.Expression;
    if (current_token.text === '[') {

      if (last_type === TOKEN.WORD || flags.last_text === ')') {
        // this is array index specifier, break immediately
        // a[x], fn()[x]
        if (last_type === TOKEN.RESERVED && in_array(flags.last_text, tokenizer.line_starters)) {
          output.space_before_token = true;
        }
        set_mode(next_mode);
        print_token();
        indent();
        if (opt.space_in_paren) {
          output.space_before_token = true;
        }
        return;
      }

      next_mode = MODE.ArrayLiteral;
      if (is_array(flags.mode)) {
        if (flags.last_text === '[' ||
          (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
          // ], [ goes to new line
          // }, [ goes to new line
          if (!opt.keep_array_indentation) {
            print_newline();
          }
        }
      }

      if (!in_array(last_type, [TOKEN.START_EXPR, TOKEN.END_EXPR, TOKEN.WORD, TOKEN.OPERATOR])) {
        output.space_before_token = true;
      }
    } else {
      if (last_type === TOKEN.RESERVED) {
        if (flags.last_text === 'for') {
          output.space_before_token = opt.space_before_conditional;
          next_mode = MODE.ForInitializer;
        } else if (in_array(flags.last_text, ['if', 'while'])) {
          output.space_before_token = opt.space_before_conditional;
          next_mode = MODE.Conditional;
        } else if (in_array(flags.last_word, ['await', 'async'])) {
          // Should be a space between await and an IIFE, or async and an arrow function
          output.space_before_token = true;
        } else if (flags.last_text === 'import' && current_token.whitespace_before === '') {
          output.space_before_token = false;
        } else if (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch') {
          output.space_before_token = true;
        }
      } else if (last_type === TOKEN.EQUALS || last_type === TOKEN.OPERATOR) {
        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      } else if (last_type === TOKEN.WORD) {
        output.space_before_token = false;
      } else {
        // Support preserving wrapped arrow function expressions
        // a.b('c',
        //     () => d.e
        // )
        allow_wrap_or_preserved_newline();
      }

      // function() vs function ()
      // yield*() vs yield* ()
      // function*() vs function* ()
      if ((last_type === TOKEN.RESERVED && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
        (flags.last_text === '*' &&
          (in_array(last_last_text, ['function', 'yield']) ||
            (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {

        output.space_before_token = opt.space_after_anon_function;
      }

    }

    if (flags.last_text === ';' || last_type === TOKEN.START_BLOCK) {
      print_newline();
    } else if (last_type === TOKEN.END_EXPR || last_type === TOKEN.START_EXPR || last_type === TOKEN.END_BLOCK || flags.last_text === '.' || last_type === TOKEN.COMMA) {
      // do nothing on (( and )( and ][ and ]( and .(
      // TODO: Consider whether forcing this is required.  Review failing tests when removed.
      allow_wrap_or_preserved_newline(current_token.newlines);
    }

    set_mode(next_mode);
    print_token();
    if (opt.space_in_paren) {
      output.space_before_token = true;
    }

    // In all cases, if we newline while inside an expression it should be indented.
    indent();
  }

  function handle_end_expr() {
    // statements inside expressions are not valid syntax, but...
    // statements must all be closed when their container closes
    while (flags.mode === MODE.Statement) {
      restore_mode();
    }

    handle_whitespace_and_comments(current_token);

    if (flags.multiline_frame) {
      allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
    }

    if (opt.space_in_paren) {
      if (last_type === TOKEN.START_EXPR && !opt.space_in_empty_paren) {
        // () [] no inner space in empty parens like these, ever, ref #320
        output.trim();
        output.space_before_token = false;
      } else {
        output.space_before_token = true;
      }
    }
    if (current_token.text === ']' && opt.keep_array_indentation) {
      print_token();
      restore_mode();
    } else {
      restore_mode();
      print_token();
    }
    remove_redundant_indentation(output, previous_flags);

    // do {} while () // no statement required after
    if (flags.do_while && previous_flags.mode === MODE.Conditional) {
      previous_flags.mode = MODE.Expression;
      flags.do_block = false;
      flags.do_while = false;

    }
  }

  function handle_start_block() {
    handle_whitespace_and_comments(current_token);

    // Check if this is should be treated as a ObjectLiteral
    var next_token = tokens.peek();
    var second_token = tokens.peek(1);
    if (second_token && (
        (in_array(second_token.text, [':', ',']) && in_array(next_token.type, [TOKEN.STRING, TOKEN.WORD, TOKEN.RESERVED])) ||
        (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, [TOKEN.WORD, TOKEN.RESERVED]))
      )) {
      // We don't support TypeScript,but we didn't break it for a very long time.
      // We'll try to keep not breaking it.
      if (!in_array(last_last_text, ['class', 'interface'])) {
        set_mode(MODE.ObjectLiteral);
      } else {
        set_mode(MODE.BlockStatement);
      }
    } else if (last_type === TOKEN.OPERATOR && flags.last_text === '=>') {
      // arrow function: (param1, paramN) => { statements }
      set_mode(MODE.BlockStatement);
    } else if (in_array(last_type, [TOKEN.EQUALS, TOKEN.START_EXPR, TOKEN.COMMA, TOKEN.OPERATOR]) ||
      (last_type === TOKEN.RESERVED && in_array(flags.last_text, ['return', 'throw', 'import', 'default']))
    ) {
      // Detecting shorthand function syntax is difficult by scanning forward,
      //     so check the surrounding context.
      // If the block is being returned, imported, export default, passed as arg,
      //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
      set_mode(MODE.ObjectLiteral);
    } else {
      set_mode(MODE.BlockStatement);
    }

    var empty_braces = !next_token.comments_before && next_token.text === '}';
    var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
      last_type === TOKEN.END_EXPR;

    if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
    {
      // search forward for a newline wanted inside this block
      var index = 0;
      var check_token = null;
      flags.inline_frame = true;
      do {
        index += 1;
        check_token = tokens.peek(index - 1);
        if (check_token.newlines) {
          flags.inline_frame = false;
          break;
        }
      } while (check_token.type !== TOKEN.EOF &&
        !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
    }

    if ((opt.brace_style === "expand" ||
        (opt.brace_style === "none" && current_token.newlines)) &&
      !flags.inline_frame) {
      if (last_type !== TOKEN.OPERATOR &&
        (empty_anonymous_function ||
          last_type === TOKEN.EQUALS ||
          (last_type === TOKEN.RESERVED && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
        output.space_before_token = true;
      } else {
        print_newline(false, true);
      }
    } else { // collapse || inline_frame
      if (is_array(previous_flags.mode) && (last_type === TOKEN.START_EXPR || last_type === TOKEN.COMMA)) {
        if (last_type === TOKEN.COMMA || opt.space_in_paren) {
          output.space_before_token = true;
        }

        if (last_type === TOKEN.COMMA || (last_type === TOKEN.START_EXPR && flags.inline_frame)) {
          allow_wrap_or_preserved_newline();
          previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
          flags.multiline_frame = false;
        }
      }
      if (last_type !== TOKEN.OPERATOR && last_type !== TOKEN.START_EXPR) {
        if (last_type === TOKEN.START_BLOCK && !flags.inline_frame) {
          print_newline();
        } else {
          output.space_before_token = true;
        }
      }
    }
    print_token();
    indent();
  }

  function handle_end_block() {
    // statements must all be closed when their container closes
    handle_whitespace_and_comments(current_token);

    while (flags.mode === MODE.Statement) {
      restore_mode();
    }

    var empty_braces = last_type === TOKEN.START_BLOCK;

    if (flags.inline_frame && !empty_braces) { // try inline_frame (only set if opt.braces-preserve-inline) first
      output.space_before_token = true;
    } else if (opt.brace_style === "expand") {
      if (!empty_braces) {
        print_newline();
      }
    } else {
      // skip {}
      if (!empty_braces) {
        if (is_array(flags.mode) && opt.keep_array_indentation) {
          // we REALLY need a newline here, but newliner would skip that
          opt.keep_array_indentation = false;
          print_newline();
          opt.keep_array_indentation = true;

        } else {
          print_newline();
        }
      }
    }
    restore_mode();
    print_token();
  }

  function handle_word() {
    if (current_token.type === TOKEN.RESERVED) {
      if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
        current_token.type = TOKEN.WORD;
      } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
        current_token.type = TOKEN.WORD;
      } else if (flags.mode === MODE.ObjectLiteral) {
        var next_token = tokens.peek();
        if (next_token.text === ':') {
          current_token.type = TOKEN.WORD;
        }
      }
    }

    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      if (last_type === TOKEN.RESERVED && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD) {
        flags.declaration_statement = true;
      }
    } else if (current_token.newlines && !is_expression(flags.mode) &&
      (last_type !== TOKEN.OPERATOR || (flags.last_text === '--' || flags.last_text === '++')) &&
      last_type !== TOKEN.EQUALS &&
      (opt.preserve_newlines || !(last_type === TOKEN.RESERVED && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
      handle_whitespace_and_comments(current_token);
      print_newline();
    } else {
      handle_whitespace_and_comments(current_token);
    }

    if (flags.do_block && !flags.do_while) {
      if (current_token.type === TOKEN.RESERVED && current_token.text === 'while') {
        // do {} ## while ()
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
        flags.do_while = true;
        return;
      } else {
        // do {} should always have while as the next word.
        // if we don't see the expected while, recover
        print_newline();
        flags.do_block = false;
      }
    }

    // if may be followed by else, or not
    // Bare/inline ifs are tricky
    // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
    if (flags.if_block) {
      if (!flags.else_block && (current_token.type === TOKEN.RESERVED && current_token.text === 'else')) {
        flags.else_block = true;
      } else {
        while (flags.mode === MODE.Statement) {
          restore_mode();
        }
        flags.if_block = false;
        flags.else_block = false;
      }
    }

    if (current_token.type === TOKEN.RESERVED && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
      print_newline();
      if (flags.case_body || opt.jslint_happy) {
        // switch cases following one another
        deindent();
        flags.case_body = false;
      }
      print_token();
      flags.in_case = true;
      flags.in_case_statement = true;
      return;
    }

    if (last_type === TOKEN.COMMA || last_type === TOKEN.START_EXPR || last_type === TOKEN.EQUALS || last_type === TOKEN.OPERATOR) {
      if (!start_of_object_property()) {
        allow_wrap_or_preserved_newline();
      }
    }

    if (current_token.type === TOKEN.RESERVED && current_token.text === 'function') {
      if (in_array(flags.last_text, ['}', ';']) ||
        (output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === TOKEN.OPERATOR))) {
        // make sure there is a nice clean space of at least one blank line
        // before a new function definition
        if (!output.just_added_blankline() && !current_token.comments_before) {
          print_newline();
          print_newline(true);
        }
      }
      if (last_type === TOKEN.RESERVED || last_type === TOKEN.WORD) {
        if (last_type === TOKEN.RESERVED && (
            in_array(flags.last_text, ['get', 'set', 'new', 'export']) ||
            in_array(flags.last_text, newline_restricted_tokens))) {
          output.space_before_token = true;
        } else if (last_type === TOKEN.RESERVED && flags.last_text === 'default' && last_last_text === 'export') {
          output.space_before_token = true;
        } else {
          print_newline();
        }
      } else if (last_type === TOKEN.OPERATOR || flags.last_text === '=') {
        // foo = function
        output.space_before_token = true;
      } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
        // (function
      } else {
        print_newline();
      }

      print_token();
      flags.last_word = current_token.text;
      return;
    }

    var prefix = 'NONE';

    if (last_type === TOKEN.END_BLOCK) {

      if (previous_flags.inline_frame) {
        prefix = 'SPACE';
      } else if (!(current_token.type === TOKEN.RESERVED && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
        prefix = 'NEWLINE';
      } else {
        if (opt.brace_style === "expand" ||
          opt.brace_style === "end-expand" ||
          (opt.brace_style === "none" && current_token.newlines)) {
          prefix = 'NEWLINE';
        } else {
          prefix = 'SPACE';
          output.space_before_token = true;
        }
      }
    } else if (last_type === TOKEN.SEMICOLON && flags.mode === MODE.BlockStatement) {
      // TODO: Should this be for STATEMENT as well?
      prefix = 'NEWLINE';
    } else if (last_type === TOKEN.SEMICOLON && is_expression(flags.mode)) {
      prefix = 'SPACE';
    } else if (last_type === TOKEN.STRING) {
      prefix = 'NEWLINE';
    } else if (last_type === TOKEN.RESERVED || last_type === TOKEN.WORD ||
      (flags.last_text === '*' &&
        (in_array(last_last_text, ['function', 'yield']) ||
          (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
      prefix = 'SPACE';
    } else if (last_type === TOKEN.START_BLOCK) {
      if (flags.inline_frame) {
        prefix = 'SPACE';
      } else {
        prefix = 'NEWLINE';
      }
    } else if (last_type === TOKEN.END_EXPR) {
      output.space_before_token = true;
      prefix = 'NEWLINE';
    }

    if (current_token.type === TOKEN.RESERVED && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
      if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
        prefix = 'SPACE';
      } else {
        prefix = 'NEWLINE';
      }

    }

    if (current_token.type === TOKEN.RESERVED && in_array(current_token.text, ['else', 'catch', 'finally'])) {
      if ((!(last_type === TOKEN.END_BLOCK && previous_flags.mode === MODE.BlockStatement) ||
          opt.brace_style === "expand" ||
          opt.brace_style === "end-expand" ||
          (opt.brace_style === "none" && current_token.newlines)) &&
        !flags.inline_frame) {
        print_newline();
      } else {
        output.trim(true);
        var line = output.current_line;
        // If we trimmed and there's something other than a close block before us
        // put a newline back in.  Handles '} // comment' scenario.
        if (line.last() !== '}') {
          print_newline();
        }
        output.space_before_token = true;
      }
    } else if (prefix === 'NEWLINE') {
      if (last_type === TOKEN.RESERVED && is_special_word(flags.last_text)) {
        // no newline between 'return nnn'
        output.space_before_token = true;
      } else if (last_type !== TOKEN.END_EXPR) {
        if ((last_type !== TOKEN.START_EXPR || !(current_token.type === TOKEN.RESERVED && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
          // no need to force newline on 'var': for (var x = 0...)
          if (current_token.type === TOKEN.RESERVED && current_token.text === 'if' && flags.last_text === 'else') {
            // no newline for } else if {
            output.space_before_token = true;
          } else {
            print_newline();
          }
        }
      } else if (current_token.type === TOKEN.RESERVED && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
        print_newline();
      }
    } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
      print_newline(); // }, in lists get a newline treatment
    } else if (prefix === 'SPACE') {
      output.space_before_token = true;
    }
    if (last_type === TOKEN.WORD || last_type === TOKEN.RESERVED) {
      output.space_before_token = true;
    }
    print_token();
    flags.last_word = current_token.text;

    if (current_token.type === TOKEN.RESERVED) {
      if (current_token.text === 'do') {
        flags.do_block = true;
      } else if (current_token.text === 'if') {
        flags.if_block = true;
      } else if (current_token.text === 'import') {
        flags.import_block = true;
      } else if (flags.import_block && current_token.type === TOKEN.RESERVED && current_token.text === 'from') {
        flags.import_block = false;
      }
    }
  }

  function handle_semicolon() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      // Semicolon can be the start (and end) of a statement
      output.space_before_token = false;
    } else {
      handle_whitespace_and_comments(current_token);
    }

    var next_token = tokens.peek();
    while (flags.mode === MODE.Statement &&
      !(flags.if_block && next_token && next_token.type === TOKEN.RESERVED && next_token.text === 'else') &&
      !flags.do_block) {
      restore_mode();
    }

    // hacky but effective for the moment
    if (flags.import_block) {
      flags.import_block = false;
    }
    print_token();
  }

  function handle_string() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      // One difference - strings want at least a space before
      output.space_before_token = true;
    } else {
      handle_whitespace_and_comments(current_token);
      if (last_type === TOKEN.RESERVED || last_type === TOKEN.WORD || flags.inline_frame) {
        output.space_before_token = true;
      } else if (last_type === TOKEN.COMMA || last_type === TOKEN.START_EXPR || last_type === TOKEN.EQUALS || last_type === TOKEN.OPERATOR) {
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      } else {
        print_newline();
      }
    }
    print_token();
  }

  function handle_equals() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      handle_whitespace_and_comments(current_token);
    }

    if (flags.declaration_statement) {
      // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
      flags.declaration_assignment = true;
    }
    output.space_before_token = true;
    print_token();
    output.space_before_token = true;
  }

  function handle_comma() {
    handle_whitespace_and_comments(current_token, true);

    print_token();
    output.space_before_token = true;
    if (flags.declaration_statement) {
      if (is_expression(flags.parent.mode)) {
        // do not break on comma, for(var a = 1, b = 2)
        flags.declaration_assignment = false;
      }

      if (flags.declaration_assignment) {
        flags.declaration_assignment = false;
        print_newline(false, true);
      } else if (opt.comma_first) {
        // for comma-first, we want to allow a newline before the comma
        // to turn into a newline after the comma, which we will fixup later
        allow_wrap_or_preserved_newline();
      }
    } else if (flags.mode === MODE.ObjectLiteral ||
      (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
      if (flags.mode === MODE.Statement) {
        restore_mode();
      }

      if (!flags.inline_frame) {
        print_newline();
      }
    } else if (opt.comma_first) {
      // EXPR or DO_BLOCK
      // for comma-first, we want to allow a newline before the comma
      // to turn into a newline after the comma, which we will fixup later
      allow_wrap_or_preserved_newline();
    }
  }

  function handle_operator() {
    var isGeneratorAsterisk = current_token.text === '*' &&
      ((last_type === TOKEN.RESERVED && in_array(flags.last_text, ['function', 'yield'])) ||
        (in_array(last_type, [TOKEN.START_BLOCK, TOKEN.COMMA, TOKEN.END_BLOCK, TOKEN.SEMICOLON]))
      );
    var isUnary = in_array(current_token.text, ['-', '+']) && (
      in_array(last_type, [TOKEN.START_BLOCK, TOKEN.START_EXPR, TOKEN.EQUALS, TOKEN.OPERATOR]) ||
      in_array(flags.last_text, tokenizer.line_starters) ||
      flags.last_text === ','
    );

    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      var preserve_statement_flags = !isGeneratorAsterisk;
      handle_whitespace_and_comments(current_token, preserve_statement_flags);
    }

    if (last_type === TOKEN.RESERVED && is_special_word(flags.last_text)) {
      // "return" had a special handling in TK_WORD. Now we need to return the favor
      output.space_before_token = true;
      print_token();
      return;
    }

    // hack for actionscript's import .*;
    if (current_token.text === '*' && last_type === TOKEN.DOT) {
      print_token();
      return;
    }

    if (current_token.text === '::') {
      // no spaces around exotic namespacing syntax operator
      print_token();
      return;
    }

    // Allow line wrapping between operators when operator_position is
    //   set to before or preserve
    if (last_type === TOKEN.OPERATOR && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
      allow_wrap_or_preserved_newline();
    }

    if (current_token.text === ':' && flags.in_case) {
      flags.case_body = true;
      indent();
      print_token();
      print_newline();
      flags.in_case = false;
      return;
    }

    var space_before = true;
    var space_after = true;
    var in_ternary = false;
    if (current_token.text === ':') {
      if (flags.ternary_depth === 0) {
        // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
        space_before = false;
      } else {
        flags.ternary_depth -= 1;
        in_ternary = true;
      }
    } else if (current_token.text === '?') {
      flags.ternary_depth += 1;
    }

    // let's handle the operator_position option prior to any conflicting logic
    if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
      var isColon = current_token.text === ':';
      var isTernaryColon = (isColon && in_ternary);
      var isOtherColon = (isColon && !in_ternary);

      switch (opt.operator_position) {
        case OPERATOR_POSITION.before_newline:
          // if the current token is : and it's not a ternary statement then we set space_before to false
          output.space_before_token = !isOtherColon;

          print_token();

          if (!isColon || isTernaryColon) {
            allow_wrap_or_preserved_newline();
          }

          output.space_before_token = true;
          return;

        case OPERATOR_POSITION.after_newline:
          // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
          //   then print a newline.

          output.space_before_token = true;

          if (!isColon || isTernaryColon) {
            if (tokens.peek().newlines) {
              print_newline(false, true);
            } else {
              allow_wrap_or_preserved_newline();
            }
          } else {
            output.space_before_token = false;
          }

          print_token();

          output.space_before_token = true;
          return;

        case OPERATOR_POSITION.preserve_newline:
          if (!isOtherColon) {
            allow_wrap_or_preserved_newline();
          }

          // if we just added a newline, or the current token is : and it's not a ternary statement,
          //   then we set space_before to false
          space_before = !(output.just_added_newline() || isOtherColon);

          output.space_before_token = space_before;
          print_token();
          output.space_before_token = true;
          return;
      }
    }

    if (isGeneratorAsterisk) {
      allow_wrap_or_preserved_newline();
      space_before = false;
      var next_token = tokens.peek();
      space_after = next_token && in_array(next_token.type, [TOKEN.WORD, TOKEN.RESERVED]);
    } else if (current_token.text === '...') {
      allow_wrap_or_preserved_newline();
      space_before = last_type === TOKEN.START_BLOCK;
      space_after = false;
    } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
      // unary operators (and binary +/- pretending to be unary) special cases
      if (last_type === TOKEN.COMMA || last_type === TOKEN.START_EXPR) {
        allow_wrap_or_preserved_newline();
      }

      space_before = false;
      space_after = false;

      // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
      // if there is a newline between -- or ++ and anything else we should preserve it.
      if (current_token.newlines && (current_token.text === '--' || current_token.text === '++')) {
        print_newline(false, true);
      }

      if (flags.last_text === ';' && is_expression(flags.mode)) {
        // for (;; ++i)
        //        ^^^
        space_before = true;
      }

      if (last_type === TOKEN.RESERVED) {
        space_before = true;
      } else if (last_type === TOKEN.END_EXPR) {
        space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
      } else if (last_type === TOKEN.OPERATOR) {
        // a++ + ++b;
        // a - -b
        space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
        // + and - are not unary when preceeded by -- or ++ operator
        // a-- + b
        // a * +b
        // a - -b
        if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
          space_after = true;
        }
      }


      if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
        (flags.last_text === '{' || flags.last_text === ';')) {
        // { foo; --i }
        // foo(); --bar;
        print_newline();
      }
    }

    output.space_before_token = output.space_before_token || space_before;
    print_token();
    output.space_before_token = space_after;
  }

  function handle_block_comment(preserve_statement_flags) {
    if (output.raw) {
      output.add_raw_token(current_token);
      if (current_token.directives && current_token.directives.preserve === 'end') {
        // If we're testing the raw output behavior, do not allow a directive to turn it off.
        output.raw = opt.test_output_raw;
      }
      return;
    }

    if (current_token.directives) {
      print_newline(false, preserve_statement_flags);
      print_token();
      if (current_token.directives.preserve === 'start') {
        output.raw = true;
      }
      print_newline(false, true);
      return;
    }

    // inline block
    if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
      output.space_before_token = true;
      print_token();
      output.space_before_token = true;
      return;
    }

    var lines = split_linebreaks(current_token.text);
    var j; // iterator for this case
    var javadoc = false;
    var starless = false;
    var lastIndent = current_token.whitespace_before;
    var lastIndentLength = lastIndent.length;

    // block comment starts with a new line
    print_newline(false, preserve_statement_flags);
    if (lines.length > 1) {
      javadoc = all_lines_start_with(lines.slice(1), '*');
      starless = each_line_matches_indent(lines.slice(1), lastIndent);
    }

    // first line always indented
    print_token(lines[0]);
    for (j = 1; j < lines.length; j++) {
      print_newline(false, true);
      if (javadoc) {
        // javadoc: reformat and re-indent
        print_token(' ' + ltrim(lines[j]));
      } else if (starless && lines[j].length > lastIndentLength) {
        // starless: re-indent non-empty content, avoiding trim
        print_token(lines[j].substring(lastIndentLength));
      } else {
        // normal comments output raw
        output.add_token(lines[j]);
      }
    }

    // for comments of more than one line, make sure there's a new line after
    print_newline(false, preserve_statement_flags);
  }

  function handle_comment(preserve_statement_flags) {
    if (current_token.newlines) {
      print_newline(false, preserve_statement_flags);
    } else {
      output.trim(true);
    }

    output.space_before_token = true;
    print_token();
    print_newline(false, preserve_statement_flags);
  }

  function handle_dot() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      handle_whitespace_and_comments(current_token, true);
    }

    if (opt.unindent_chained_methods) {
      deindent();
    }

    if (last_type === TOKEN.RESERVED && is_special_word(flags.last_text)) {
      output.space_before_token = false;
    } else {
      // allow preserved newlines before dots in general
      // force newlines on dots after close paren when break_chained - for bar().baz()
      allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
    }

    print_token();
  }

  function handle_unknown(preserve_statement_flags) {
    print_token();

    if (current_token.text[current_token.text.length - 1] === '\n') {
      print_newline(false, preserve_statement_flags);
    }
  }

  function handle_eof() {
    // Unwind any open statements
    while (flags.mode === MODE.Statement) {
      restore_mode();
    }
    handle_whitespace_and_comments(current_token);
  }
}

module.exports.Beautifier = Beautifier;
},{"../core/options":59,"../core/acorn":60,"../core/output":61,"./tokenizer":70}],55:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var Beautifier = require('./beautifier').Beautifier;

function js_beautify(js_source_text, options) {
  var beautifier = new Beautifier(js_source_text, options);
  return beautifier.beautify();
}

module.exports = js_beautify;
},{"./beautifier":68}],69:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var mergeOpts = require('../core/options').mergeOpts;
var normalizeOpts = require('../core/options').normalizeOpts;
var acorn = require('../core/acorn');
var Output = require('../core/output').Output;
var InputScanner = require('../core/inputscanner').InputScanner;

var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

function Beautifier(source_text, options) {
  this._source_text = source_text || '';
  options = options || {};

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'css');
  options = normalizeOpts(options);
  this._options = {};

  var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  var indentCharacter = options.indent_char || ' ';
  var preserve_newlines = (options.preserve_newlines === undefined) ? false : options.preserve_newlines;
  var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
  var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
  var space_around_combinator = (options.space_around_combinator === undefined) ? false : options.space_around_combinator;
  space_around_combinator = space_around_combinator || ((options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator);
  var eol = options.eol ? options.eol : 'auto';

  // Support passing the source text back with no change
  this._options.disabled = (options.disabled === undefined) ? false : options.disabled;

  if (options.indent_with_tabs) {
    indentCharacter = '\t';
    indentSize = 1;
  }

  eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  // tokenizer
  var whitespaceChar = /\s/;
  var whitespacePattern = /(?:\s|\n)+/g;
  var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
  var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

  var ch;
  var parenLevel = 0;
  var input;

  function eatString(endChars) {
    var result = '';
    ch = input.next();
    while (ch) {
      result += ch;
      if (ch === "\\") {
        result += input.next();
      } else if (endChars.indexOf(ch) !== -1 || ch === "\n") {
        break;
      }
      ch = input.next();
    }
    return result;
  }

  // Skips any white space in the source text from the current position.
  // When allowAtLeastOneNewLine is true, will output new lines for each
  // newline character found; if the user has preserve_newlines off, only
  // the first newline will be output
  function eatWhitespace(allowAtLeastOneNewLine) {
    var result = whitespaceChar.test(input.peek());
    var isFirstNewLine = true;

    while (whitespaceChar.test(input.peek())) {
      ch = input.next();
      if (allowAtLeastOneNewLine && ch === '\n') {
        if (preserve_newlines || isFirstNewLine) {
          isFirstNewLine = false;
          output.add_new_line(true);
        }
      }
    }
    return result;
  }

  // Nested pseudo-class if we are insideRule
  // and the next special character found opens
  // a new block
  function foundNestedPseudoClass() {
    var openParen = 0;
    var i = 1;
    var ch = input.peek(i);
    while (ch) {
      if (ch === "{") {
        return true;
      } else if (ch === '(') {
        // pseudoclasses can contain ()
        openParen += 1;
      } else if (ch === ')') {
        if (openParen === 0) {
          return false;
        }
        openParen -= 1;
      } else if (ch === ";" || ch === "}") {
        return false;
      }
      i++;
      ch = input.peek(i);
    }
    return false;
  }

  var indentLevel;
  var nestedLevel;
  var output;

  function print_string(output_string) {
    if (output.just_added_newline()) {
      output.set_indent(indentLevel);
    }
    output.add_token(output_string);
  }

  function preserveSingleSpace(isAfterSpace) {
    if (isAfterSpace) {
      output.space_before_token = true;
    }
  }

  function indent() {
    indentLevel++;
  }

  function outdent() {
    if (indentLevel > 0) {
      indentLevel--;
    }
  }

  /*_____________________--------------------_____________________*/

  this.beautify = function() {
    if (this._options.disabled) {
      return this._source_text;
    }

    var source_text = this._source_text;
    if (eol === 'auto') {
      eol = '\n';
      if (source_text && lineBreak.test(source_text || '')) {
        eol = source_text.match(lineBreak)[0];
      }
    }


    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    source_text = source_text.replace(allLineBreaks, '\n');

    // reset
    var singleIndent = new Array(indentSize + 1).join(indentCharacter);
    var baseIndentString = '';
    var preindent_index = 0;
    if (source_text && source_text.length) {
      while ((source_text.charAt(preindent_index) === ' ' ||
          source_text.charAt(preindent_index) === '\t')) {
        preindent_index += 1;
      }
      baseIndentString = source_text.substring(0, preindent_index);
      source_text = source_text.substring(preindent_index);
    }

    output = new Output(singleIndent, baseIndentString);
    input = new InputScanner(source_text);
    indentLevel = 0;
    nestedLevel = 0;

    ch = null;
    parenLevel = 0;

    var insideRule = false;
    // This is the value side of a property value pair (blue in the following ex)
    // label { content: blue }
    var insidePropertyValue = false;
    var enteringConditionalGroup = false;
    var insideAtExtend = false;
    var insideAtImport = false;
    var topCharacter = ch;

    while (true) {
      var whitespace = input.read(whitespacePattern);
      var isAfterSpace = whitespace !== '';
      var previous_ch = topCharacter;
      ch = input.next();
      topCharacter = ch;

      if (!ch) {
        break;
      } else if (ch === '/' && input.peek() === '*') {
        // /* css comment */
        // Always start block comments on a new line.
        // This handles scenarios where a block comment immediately
        // follows a property definition on the same line or where
        // minified code is being beautified.
        output.add_new_line();
        input.back();
        print_string(input.read(block_comment_pattern));

        // Ensures any new lines following the comment are preserved
        eatWhitespace(true);

        // Block comments are followed by a new line so they don't
        // share a line with other properties
        output.add_new_line();
      } else if (ch === '/' && input.peek() === '/') {
        // // single line comment
        // Preserves the space before a comment
        // on the same line as a rule
        output.space_before_token = true;
        input.back();
        print_string(input.read(comment_pattern));

        // Ensures any new lines following the comment are preserved
        eatWhitespace(true);
      } else if (ch === '@') {
        preserveSingleSpace(isAfterSpace);

        // deal with less propery mixins @{...}
        if (input.peek() === '{') {
          print_string(ch + eatString('}'));
        } else {
          print_string(ch);

          // strip trailing space, if present, for hash property checks
          var variableOrRule = input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

          if (variableOrRule.match(/[ :]$/)) {
            // we have a variable or pseudo-class, add it and insert one space before continuing
            variableOrRule = eatString(": ").replace(/\s$/, '');
            print_string(variableOrRule);
            output.space_before_token = true;
          }

          variableOrRule = variableOrRule.replace(/\s$/, '');

          if (variableOrRule === 'extend') {
            insideAtExtend = true;
          } else if (variableOrRule === 'import') {
            insideAtImport = true;
          }

          // might be a nesting at-rule
          if (variableOrRule in this.NESTED_AT_RULE) {
            nestedLevel += 1;
            if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
              enteringConditionalGroup = true;
            }
            // might be less variable
          } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
            insidePropertyValue = true;
            indent();
          }
        }
      } else if (ch === '#' && input.peek() === '{') {
        preserveSingleSpace(isAfterSpace);
        print_string(ch + eatString('}'));
      } else if (ch === '{') {
        if (insidePropertyValue) {
          insidePropertyValue = false;
          outdent();
        }
        indent();
        output.space_before_token = true;
        print_string(ch);

        // when entering conditional groups, only rulesets are allowed
        if (enteringConditionalGroup) {
          enteringConditionalGroup = false;
          insideRule = (indentLevel > nestedLevel);
        } else {
          // otherwise, declarations are also allowed
          insideRule = (indentLevel >= nestedLevel);
        }
        if (newline_between_rules && insideRule) {
          if (output.previous_line && output.previous_line.item(-1) !== '{') {
            output.ensure_empty_line_above('/', ',');
          }
        }
        eatWhitespace(true);
        output.add_new_line();
      } else if (ch === '}') {
        outdent();
        output.add_new_line();
        if (previous_ch === '{') {
          output.trim(true);
        }
        insideAtImport = false;
        insideAtExtend = false;
        if (insidePropertyValue) {
          outdent();
          insidePropertyValue = false;
        }
        print_string(ch);
        insideRule = false;
        if (nestedLevel) {
          nestedLevel--;
        }

        eatWhitespace(true);
        output.add_new_line();

        if (newline_between_rules && !output.just_added_blankline()) {
          if (input.peek() !== '}') {
            output.add_new_line(true);
          }
        }
      } else if (ch === ":") {
        if ((insideRule || enteringConditionalGroup) &&
          !(input.lookBack("&") || foundNestedPseudoClass()) &&
          !input.lookBack("(") && !insideAtExtend) {
          // 'property: value' delimiter
          // which could be in a conditional group query
          print_string(':');
          if (!insidePropertyValue) {
            insidePropertyValue = true;
            output.space_before_token = true;
            eatWhitespace(true);
            indent();
          }
        } else {
          // sass/less parent reference don't use a space
          // sass nested pseudo-class don't use a space

          // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
          if (input.lookBack(" ")) {
            output.space_before_token = true;
          }
          if (input.peek() === ":") {
            // pseudo-element
            ch = input.next();
            print_string("::");
          } else {
            // pseudo-class
            print_string(':');
          }
        }
      } else if (ch === '"' || ch === '\'') {
        preserveSingleSpace(isAfterSpace);
        print_string(ch + eatString(ch));
        eatWhitespace(true);
      } else if (ch === ';') {
        if (insidePropertyValue) {
          outdent();
          insidePropertyValue = false;
        }
        insideAtExtend = false;
        insideAtImport = false;
        print_string(ch);
        eatWhitespace(true);

        // This maintains single line comments on the same
        // line. Block comments are also affected, but
        // a new line is always output before one inside
        // that section
        if (input.peek() !== '/') {
          output.add_new_line();
        }
      } else if (ch === '(') { // may be a url
        if (input.lookBack("url")) {
          print_string(ch);
          eatWhitespace();
          ch = input.next();
          if (ch === ')' || ch === '"' || ch !== '\'') {
            input.back();
            parenLevel++;
          } else if (ch) {
            print_string(ch + eatString(')'));
          }
        } else {
          parenLevel++;
          preserveSingleSpace(isAfterSpace);
          print_string(ch);
          eatWhitespace();
        }
      } else if (ch === ')') {
        print_string(ch);
        parenLevel--;
      } else if (ch === ',') {
        print_string(ch);
        eatWhitespace(true);
        if (selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1 && !insideAtImport) {
          output.add_new_line();
        } else {
          output.space_before_token = true;
        }
      } else if ((ch === '>' || ch === '+' || ch === '~') &&
        !insidePropertyValue && parenLevel < 1) {
        //handle combinator spacing
        if (space_around_combinator) {
          output.space_before_token = true;
          print_string(ch);
          output.space_before_token = true;
        } else {
          print_string(ch);
          eatWhitespace();
          // squash extra whitespace
          if (ch && whitespaceChar.test(ch)) {
            ch = '';
          }
        }
      } else if (ch === ']') {
        print_string(ch);
      } else if (ch === '[') {
        preserveSingleSpace(isAfterSpace);
        print_string(ch);
      } else if (ch === '=') { // no whitespace before or after
        eatWhitespace();
        print_string('=');
        if (whitespaceChar.test(ch)) {
          ch = '';
        }
      } else if (ch === '!') { // !important
        print_string(' ');
        print_string(ch);
      } else {
        preserveSingleSpace(isAfterSpace);
        print_string(ch);
      }
    }

    var sweetCode = output.get_code(end_with_newline, eol);

    return sweetCode;
  };

  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  this.NESTED_AT_RULE = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    // also in CONDITIONAL_GROUP_RULE below
    "@media": true,
    "@supports": true,
    "@document": true
  };
  this.CONDITIONAL_GROUP_RULE = {
    "@media": true,
    "@supports": true,
    "@document": true
  };
}

module.exports.Beautifier = Beautifier;
},{"../core/options":59,"../core/acorn":60,"../core/output":61,"../core/inputscanner":65}],54:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var Beautifier = require('./beautifier').Beautifier;

function css_beautify(source_text, options) {
  var beautifier = new Beautifier(source_text, options);
  return beautifier.beautify();
}

module.exports = css_beautify;
},{"./beautifier":69}],62:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var BaseTokenizer = require('../core/tokenizer').Tokenizer;
var BASETOKEN = require('../core/tokenizer').TOKEN;
var Directives = require('../core/directives').Directives;
var acorn = require('../core/acorn');

var TOKEN = {
  TAG_OPEN: 'TK_TAG_OPEN',
  TAG_CLOSE: 'TK_TAG_CLOSE',
  ATTRIBUTE: 'TK_ATTRIBUTE',
  EQUALS: 'TK_EQUALS',
  VALUE: 'TK_VALUE',
  COMMENT: 'TK_COMMENT',
  TEXT: 'TK_TEXT',
  UNKNOWN: 'TK_UNKNOWN',
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};

var directives_core = new Directives(/<\!--/, /-->/);

var Tokenizer = function(input_string, options) {
  BaseTokenizer.call(this, input_string, options);
  this._current_tag_name = '';

  this._whitespace_pattern = /[\n\r\t ]+/g;
  this._newline_pattern = /([^\n\r]*)(\r\n|[\n\r])?/g;

  // Words end at whitespace or when a tag starts
  // if we are indenting handlebars, they are considered tags
  this._word_pattern = this._options.indent_handlebars ? /[\n\r\t <]|{{/g : /[\n\r\t <]/g;
};
Tokenizer.prototype = new BaseTokenizer();

Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
  return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
};

Tokenizer.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN.TAG_OPEN;
};

Tokenizer.prototype._is_closing = function(current_token, open_token) {
  return current_token.type === TOKEN.TAG_CLOSE &&
    (open_token && (
      ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<') ||
      (current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{')));
};

Tokenizer.prototype._reset = function() {
  this._current_tag_name = '';
};

Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  this._readWhitespace();
  var token = null;
  var c = this._input.peek();

  if (c === null) {
    return this._create_token(TOKEN.EOF, '');
  }

  token = token || this._read_attribute(c, previous_token, open_token);
  token = token || this._read_raw_content(previous_token, open_token);
  token = token || this._read_comment(c);
  token = token || this._read_open(c, open_token);
  token = token || this._read_close(c, open_token);
  token = token || this._read_content_word();
  token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());

  return token;
};

Tokenizer.prototype._read_comment = function(c) { // jshint unused:false
  var token = null;
  if (c === '<' || c === '{') {
    var peek1 = this._input.peek(1);
    var peek2 = this._input.peek(2);
    if ((c === '<' && (peek1 === '!' || peek1 === '?' || peek1 === '%')) ||
      this._options.indent_handlebars && c === '{' && peek1 === '{' && peek2 === '!') {
      //if we're in a comment, do something special
      // We treat all comments as literals, even more than preformatted tags
      // we just look for the appropriate close tag

      // this is will have very poor perf, but will work for now.
      var comment = '',
        delimiter = '>',
        matched = false;

      var input_char = this._input.next();

      while (input_char) {
        comment += input_char;

        // only need to check for the delimiter if the last chars match
        if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
          comment.indexOf(delimiter) !== -1) {
          break;
        }

        // only need to search for custom delimiter for the first few characters
        if (!matched) {
          matched = comment.length > 10;
          if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
            delimiter = '<![endif]>';
            matched = true;
          } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
            delimiter = ']]>';
            matched = true;
          } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
            delimiter = ']>';
            matched = true;
          } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
            delimiter = '-->';
            matched = true;
          } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
            delimiter = '--}}';
            matched = true;
          } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
            if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
              delimiter = '}}';
              matched = true;
            }
          } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
            delimiter = '?>';
            matched = true;
          } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
            delimiter = '%>';
            matched = true;
          }
        }

        input_char = this._input.next();
      }

      var directives = directives_core.get_directives(comment);
      if (directives && directives.ignore === 'start') {
        comment += directives_core.readIgnored(this._input);
      }
      comment = comment.replace(acorn.allLineBreaks, '\n');
      token = this._create_token(TOKEN.COMMENT, comment);
      token.directives = directives;
    }
  }

  return token;
};

Tokenizer.prototype._read_open = function(c, open_token) {
  var resulting_string = null;
  var token = null;
  if (!open_token) {
    if (c === '<') {
      resulting_string = this._input.read(/<(?:[^\n\r\t >{][^\n\r\t >{/]*)?/g);
      token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
    } else if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
      resulting_string = this._input.readUntil(/[\n\r\t }]/g);
      token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
    }
  }
  return token;
};

Tokenizer.prototype._read_close = function(c, open_token) {
  var resulting_string = null;
  var token = null;
  if (open_token) {
    if (open_token.text[0] === '<' && (c === '>' || (c === '/' && this._input.peek(1) === '>'))) {
      resulting_string = this._input.next();
      if (c === '/') { //  for close tag "/>"
        resulting_string += this._input.next();
      }
      token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
    } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
      this._input.next();
      this._input.next();
      token = this._create_token(TOKEN.TAG_CLOSE, '}}');
    }
  }

  return token;
};

Tokenizer.prototype._read_attribute = function(c, previous_token, open_token) {
  var token = null;
  var resulting_string = '';
  if (open_token && open_token.text[0] === '<') {

    if (c === '=') {
      token = this._create_token(TOKEN.EQUALS, this._input.next());
    } else if (c === '"' || c === "'") {
      var content = this._input.next();
      var input_string = '';
      var string_pattern = new RegExp(c + '|{{', 'g');
      while (this._input.hasNext()) {
        input_string = this._input.readUntilAfter(string_pattern);
        content += input_string;
        if (input_string[input_string.length - 1] === '"' || input_string[input_string.length - 1] === "'") {
          break;
        } else if (this._input.hasNext()) {
          content += this._input.readUntilAfter(/}}/g);
        }
      }

      token = this._create_token(TOKEN.VALUE, content);
    } else {
      if (c === '{' && this._input.peek(1) === '{') {
        resulting_string = this._input.readUntilAfter(/}}/g);
      } else {
        resulting_string = this._input.readUntil(/[\n\r\t =\/>]/g);
      }

      if (resulting_string) {
        if (previous_token.type === TOKEN.EQUALS) {
          token = this._create_token(TOKEN.VALUE, resulting_string);
        } else {
          token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
        }
      }
    }
  }
  return token;
};

Tokenizer.prototype._is_content_unformatted = function(tag_name) {
  // void_elements have no content and so cannot have unformatted content
  // script and style tags should always be read as unformatted content
  // finally content_unformatted and unformatted element contents are unformatted
  return this._options.void_elements.indexOf(tag_name) === -1 &&
    (tag_name === 'script' || tag_name === 'style' ||
      this._options.content_unformatted.indexOf(tag_name) !== -1 ||
      this._options.unformatted.indexOf(tag_name) !== -1);
};


Tokenizer.prototype._read_raw_content = function(previous_token, open_token) { // jshint unused:false
  var resulting_string = '';
  if (open_token && open_token.text[0] === '{') {
    resulting_string = this._input.readUntil(/}}/g);
  } else if (previous_token.type === TOKEN.TAG_CLOSE && (previous_token.opened.text[0] === '<')) {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (this._is_content_unformatted(tag_name)) {
      resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
    }
  }

  if (resulting_string) {
    return this._create_token(TOKEN.TEXT, resulting_string);
  }

  return null;
};

Tokenizer.prototype._read_content_word = function() {
  // if we get here and we see handlebars treat them as plain text
  var resulting_string = this._input.readUntil(this._word_pattern);
  if (resulting_string) {
    return this._create_token(TOKEN.TEXT, resulting_string);
  }
};

module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;
},{"../core/tokenizer":63,"../core/directives":64,"../core/acorn":60}],57:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var mergeOpts = require('../core/options').mergeOpts;
var normalizeOpts = require('../core/options').normalizeOpts;
var acorn = require('../core/acorn');
var Output = require('../core/output').Output;
var Tokenizer = require('../html/tokenizer').Tokenizer;
var TOKEN = require('../html/tokenizer').TOKEN;

var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

var Printer = function(indent_character, indent_size, wrap_line_length, max_preserve_newlines, preserve_newlines) { //handles input/output and some other printing functions

  this.indent_character = indent_character;
  this.indent_string = indent_character;
  this.indent_size = indent_size;
  this.indent_level = 0;
  this.alignment_size = 0;
  this.wrap_line_length = wrap_line_length;
  this.max_preserve_newlines = max_preserve_newlines;
  this.preserve_newlines = preserve_newlines;

  if (this.indent_size > 1) {
    this.indent_string = new Array(this.indent_size + 1).join(this.indent_character);
  }

  this._output = new Output(this.indent_string, '');

};

Printer.prototype.current_line_has_match = function(pattern) {
  return this._output.current_line.has_match(pattern);
};

Printer.prototype.set_space_before_token = function(value) {
  this._output.space_before_token = value;
};

Printer.prototype.add_raw_token = function(token) {
  this._output.add_raw_token(token);
};

Printer.prototype.traverse_whitespace = function(raw_token) {
  if (raw_token.whitespace_before || raw_token.newlines) {
    var newlines = 0;

    if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
      newlines = raw_token.newlines ? 1 : 0;
    }

    if (this.preserve_newlines) {
      newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
    }

    if (newlines) {
      for (var n = 0; n < newlines; n++) {
        this.print_newline(n > 0);
      }
    } else {
      this._output.space_before_token = true;
      this.print_space_or_wrap(raw_token.text);
    }
    return true;
  }
  return false;
};

// Append a space to the given content (string array) or, if we are
// at the wrap_line_length, append a newline/indentation.
// return true if a newline was added, false if a space was added
Printer.prototype.print_space_or_wrap = function(text) {
  if (this._output.current_line.get_character_count() + text.length + 1 >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
    if (this._output.add_new_line()) {
      return true;
    }
  }
  return false;
};

Printer.prototype.print_newline = function(force) {
  this._output.add_new_line(force);
};

Printer.prototype.print_token = function(text) {
  if (text) {
    if (this._output.current_line.is_empty()) {
      this._output.set_indent(this.indent_level, this.alignment_size);
    }

    this._output.add_token(text);
  }
};

Printer.prototype.print_raw_text = function(text) {
  this._output.current_line.push_raw(text);
};

Printer.prototype.indent = function() {
  this.indent_level++;
};

Printer.prototype.unindent = function() {
  if (this.indent_level > 0) {
    this.indent_level--;
  }
};

Printer.prototype.get_full_indent = function(level) {
  level = this.indent_level + (level || 0);
  if (level < 1) {
    return '';
  }

  return this._output.get_indent_string(level);
};


var uses_beautifier = function(tag_check, start_token) {
  var raw_token = start_token.next;
  if (!start_token.closed) {
    return false;
  }

  while (raw_token.type !== TOKEN.EOF && raw_token.closed !== start_token) {
    if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === 'type') {
      // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
      var peekEquals = raw_token.next ? raw_token.next : raw_token;
      var peekValue = peekEquals.next ? peekEquals.next : peekEquals;
      if (peekEquals.type === TOKEN.EQUALS && peekValue.type === TOKEN.VALUE) {
        return (tag_check === 'style' && peekValue.text.search('text/css') > -1) ||
          (tag_check === 'script' && peekValue.text.search(/(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1);
      }
      return false;
    }
    raw_token = raw_token.next;
  }

  return true;
};

function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}

function TagFrame(parent, parser_token, indent_level) {
  this.parent = parent || null;
  this.tag = parser_token ? parser_token.tag_name : '';
  this.indent_level = indent_level || 0;
  this.parser_token = parser_token || null;
}

function TagStack(printer) {
  this._printer = printer;
  this._current_frame = null;
}

TagStack.prototype.get_parser_token = function() {
  return this._current_frame ? this._current_frame.parser_token : null;
};

TagStack.prototype.record_tag = function(parser_token) { //function to record a tag and its parent in this.tags Object
  var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
  this._current_frame = new_frame;
};

TagStack.prototype._try_pop_frame = function(frame) { //function to retrieve the opening tag to the corresponding closer
  var parser_token = null;

  if (frame) {
    parser_token = frame.parser_token;
    this._printer.indent_level = frame.indent_level;
    this._current_frame = frame.parent;
  }

  return parser_token;
};

TagStack.prototype._get_frame = function(tag_list, stop_list) { //function to retrieve the opening tag to the corresponding closer
  var frame = this._current_frame;

  while (frame) { //till we reach '' (the initial value);
    if (tag_list.indexOf(frame.tag) !== -1) { //if this is it use it
      break;
    } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
      frame = null;
      break;
    }
    frame = frame.parent;
  }

  return frame;
};

TagStack.prototype.try_pop = function(tag, stop_list) { //function to retrieve the opening tag to the corresponding closer
  var frame = this._get_frame([tag], stop_list);
  return this._try_pop_frame(frame);
};

TagStack.prototype.indent_to_tag = function(tag_list) {
  var frame = this._get_frame(tag_list);
  if (frame) {
    this._printer.indent_level = frame.indent_level;
  }
};

function get_array(input, default_list) {
  var result = default_list || [];
  if (typeof input === 'object') {
    if (input !== null && typeof input.concat === 'function') {
      result = input.concat();
    }
  } else if (typeof input === 'string') {
    result = input.trim().replace(/\s*,\s*/g, ',').split(',');
  }
  return result;
}

function Beautifier(source_text, options, js_beautify, css_beautify) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.
  this._source_text = source_text || '';
  options = options || {};
  this._js_beautify = js_beautify;
  this._css_beautify = css_beautify;
  this._tag_stack = null;

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'html');
  options = normalizeOpts(options);

  // backwards compatibility to 1.3.4
  if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
    (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
    options.wrap_line_length = options.max_char;
  }

  this._options = Object.assign({}, options);

  this._options.indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
  this._options.indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
  this._options.indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
  this._options.indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
  this._options.indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
  this._options.wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
  this._options.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  this._options.max_preserve_newlines = this._options.preserve_newlines ?
    (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
    0;
  this._options.indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
  this._options.wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
  this._options.wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? this._options.indent_size : parseInt(options.wrap_attributes_indent_size, 10);
  this._options.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  this._options.extra_liners = get_array(options.extra_liners, ['head', 'body', '/html']);
  this._options.eol = options.eol ? options.eol : 'auto';

  if (options.indent_with_tabs) {
    this._options.indent_character = '\t';
    this._options.indent_size = 1;
  }

  // Support passing the source text back with no change
  this._options.disabled = (options.disabled === undefined) ? false : options.disabled;

  this._options.eol = this._options.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  this._options.inline = get_array(options.inline, [
    // https://www.w3.org/TR/html5/dom.html#phrasing-content
    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
    'video', 'wbr', 'text',
    // prexisting - not sure of full effect of removing, leaving in
    'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
  ]);
  this._options.void_elements = get_array(options.void_elements, [
    // HTLM void elements - aka self-closing tags - aka singletons
    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
    // NOTE: Optional tags are too complex for a simple list
    // they are hard coded in _do_optional_end_element

    // Doctype and xml elements
    '!doctype', '?xml',
    // ?php and ?= tags
    '?php', '?=',
    // other tags that were in this list, keeping just in case
    'basefont', 'isindex'
  ]);
  this._options.unformatted = get_array(options.unformatted, []);
  this._options.content_unformatted = get_array(options.content_unformatted, [
    'pre', 'textarea'
  ]);


  this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
  this._is_wrap_attributes_force_expand_multiline = (this._options.wrap_attributes === 'force-expand-multiline');
  this._is_wrap_attributes_force_aligned = (this._options.wrap_attributes === 'force-aligned');
  this._is_wrap_attributes_aligned_multiple = (this._options.wrap_attributes === 'aligned-multiple');
}

Beautifier.prototype.beautify = function() {

  // if disabled, return the input unchanged.
  if (this._options.disabled) {
    return this._source_text;
  }

  var source_text = this._source_text;
  var eol = this._options.eol;
  if (this._options.eol === 'auto') {
    eol = '\n';
    if (source_text && lineBreak.test(source_text)) {
      eol = source_text.match(lineBreak)[0];
    }
  }

  // HACK: newline parsing inconsistent. This brute force normalizes the input.
  source_text = source_text.replace(allLineBreaks, '\n');

  var last_token = {
    text: '',
    type: ''
  };

  var last_tag_token = new TagOpenParserToken();

  var printer = new Printer(this._options.indent_character, this._options.indent_size,
    this._options.wrap_line_length, this._options.max_preserve_newlines, this._options.preserve_newlines);
  var tokens = new Tokenizer(source_text, this._options).tokenize();

  this._tag_stack = new TagStack(printer);

  var parser_token = null;
  var raw_token = tokens.next();
  while (raw_token.type !== TOKEN.EOF) {

    if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
      parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
      last_tag_token = parser_token;
    } else if ((raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE) ||
      (raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete)) {
      parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
    } else if (raw_token.type === TOKEN.TAG_CLOSE) {
      parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
    } else if (raw_token.type === TOKEN.TEXT) {
      parser_token = this._handle_text(printer, raw_token, last_tag_token);
    } else {
      // This should never happen, but if it does. Print the raw token
      printer.add_raw_token(raw_token);
    }

    last_token = parser_token;

    raw_token = tokens.next();
  }
  var sweet_code = printer._output.get_code(this._options.end_with_newline, eol);

  return sweet_code;
};

Beautifier.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
  var parser_token = { text: raw_token.text, type: raw_token.type };
  printer.alignment_size = 0;
  last_tag_token.tag_complete = true;

  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '');
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    if (last_tag_token.tag_start_char === '<') {
      printer.set_space_before_token(raw_token.text[0] === '/'); // space before />, no space before >
      if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
        printer.print_newline(false);
      }
    }
    printer.print_token(raw_token.text);
  }

  if (last_tag_token.indent_content &&
    !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {

    printer.indent();

    // only indent once per opened tag
    last_tag_token.indent_content = false;
  }
  return parser_token;
};

Beautifier.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, tokens) {
  var parser_token = { text: raw_token.text, type: raw_token.type };
  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '');
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    if (last_tag_token.tag_start_char === '<') {
      if (raw_token.type === TOKEN.ATTRIBUTE) {
        printer.set_space_before_token(true);
        last_tag_token.attr_count += 1;
      } else if (raw_token.type === TOKEN.EQUALS) { //no space before =
        printer.set_space_before_token(false);
      } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) { //no space before value
        printer.set_space_before_token(false);
      }
    }

    if (printer._output.space_before_token && last_tag_token.tag_start_char === '<') {
      var wrapped = printer.print_space_or_wrap(raw_token.text);
      if (raw_token.type === TOKEN.ATTRIBUTE) {
        var indentAttrs = wrapped && !this._is_wrap_attributes_force;

        if (this._is_wrap_attributes_force) {
          var force_first_attr_wrap = false;
          if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
            var is_only_attribute = true;
            var peek_index = 0;
            var peek_token;
            do {
              peek_token = tokens.peek(peek_index);
              if (peek_token.type === TOKEN.ATTRIBUTE) {
                is_only_attribute = false;
                break;
              }
              peek_index += 1;
            } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);

            force_first_attr_wrap = !is_only_attribute;
          }

          if (last_tag_token.attr_count > 1 || force_first_attr_wrap) {
            printer.print_newline(false);
            indentAttrs = true;
          }
        }
        if (indentAttrs) {
          last_tag_token.has_wrapped_attrs = true;
        }
      }
    }
    printer.print_token(raw_token.text);
  }
  return parser_token;
};

Beautifier.prototype._handle_text = function(printer, raw_token, last_tag_token) {
  var parser_token = { text: raw_token.text, type: 'TK_CONTENT' };
  if (last_tag_token.custom_beautifier) { //check if we need to format javascript
    this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
  } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    printer.traverse_whitespace(raw_token);
    printer.print_token(raw_token.text);
  }
  return parser_token;
};

Beautifier.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
  if (raw_token.text !== '') {
    printer.print_newline(false);
    var text = raw_token.text,
      _beautifier,
      script_indent_level = 1;
    if (last_tag_token.tag_name === 'script') {
      _beautifier = typeof this._js_beautify === 'function' && this._js_beautify;
    } else if (last_tag_token.tag_name === 'style') {
      _beautifier = typeof this._css_beautify === 'function' && this._css_beautify;
    }

    if (this._options.indent_scripts === "keep") {
      script_indent_level = 0;
    } else if (this._options.indent_scripts === "separate") {
      script_indent_level = -printer.indent_level;
    }

    var indentation = printer.get_full_indent(script_indent_level);

    // if there is at least one empty line at the end of this text, strip it
    // we'll be adding one back after the text but before the containing tag.
    text = text.replace(/\n[ \t]*$/, '');

    if (_beautifier) {

      // call the Beautifier if avaliable
      var Child_options = function() {
        this.eol = '\n';
      };
      Child_options.prototype = this._options;
      var child_options = new Child_options();
      text = _beautifier(indentation + text, child_options);
    } else {
      // simply indent the string otherwise
      var white = text.match(/^\s*/)[0];
      var _level = white.match(/[^\n\r]*$/)[0].split(this._indent_string).length - 1;
      var reindent = this._get_full_indent(script_indent_level - _level);
      text = (indentation + text.trim())
        .replace(/\r\n|\r|\n/g, '\n' + reindent);
    }
    if (text) {
      printer.print_raw_text(text);
      printer.print_newline(true);
    }
  }
};

Beautifier.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token) {
  var parser_token = this._get_tag_open_token(raw_token);
  printer.traverse_whitespace(raw_token);

  this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);


  if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) &&
    raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf('</') === 0) {
    printer.add_raw_token(raw_token);
  } else {
    printer.print_token(raw_token.text);
  }

  //indent attributes an auto, forced, aligned or forced-align line-wrap
  if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple) {
    parser_token.alignment_size = raw_token.text.length + 1;
  }


  if (!parser_token.tag_complete && !parser_token.is_unformatted) {
    printer.alignment_size = parser_token.alignment_size;
  }

  return parser_token;
};

var TagOpenParserToken = function(parent, raw_token) {
  this.parent = parent || null;
  this.text = '';
  this.type = 'TK_TAG_OPEN';
  this.tag_name = '';
  this.is_inline_element = false;
  this.is_unformatted = false;
  this.is_content_unformatted = false;
  this.is_empty_element = false;
  this.is_start_tag = false;
  this.is_end_tag = false;
  this.indent_content = false;
  this.multiline_content = false;
  this.custom_beautifier = false;
  this.start_tag_token = null;
  this.attr_count = 0;
  this.has_wrapped_attrs = false;
  this.alignment_size = 0;
  this.tag_complete = false;
  this.tag_start_char = '';
  this.tag_check = '';

  if (!raw_token) {
    this.tag_complete = true;
  } else {
    var tag_check_match;

    this.tag_start_char = raw_token.text[0];
    this.text = raw_token.text;

    if (this.tag_start_char === '<') {
      tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : '';
    } else {
      tag_check_match = raw_token.text.match(/^{{\#?([^\s}]+)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : '';
    }
    this.tag_check = this.tag_check.toLowerCase();

    if (raw_token.type === TOKEN.COMMENT) {
      this.tag_complete = true;
    }

    this.is_start_tag = this.tag_check.charAt(0) !== '/';
    this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
    this.is_end_tag = !this.is_start_tag ||
      (raw_token.closed && raw_token.closed.text === '/>');

    // handlebars tags that don't start with # or ^ are single_tags, and so also start and end.
    this.is_end_tag = this.is_end_tag ||
      (this.tag_start_char === '{' && (this.text.length < 3 || (/[^#\^]/.test(this.text.charAt(2)))));
  }
};

Beautifier.prototype._get_tag_open_token = function(raw_token) { //function to get a full tag and parse its type
  var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);

  parser_token.alignment_size = this._options.wrap_attributes_indent_size;

  parser_token.is_end_tag = parser_token.is_end_tag ||
    in_array(parser_token.tag_check, this._options.void_elements);

  parser_token.is_empty_element = parser_token.tag_complete ||
    (parser_token.is_start_tag && parser_token.is_end_tag);

  parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
  parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
  parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === '{';

  return parser_token;
};

Beautifier.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {

  if (!parser_token.is_empty_element) {
    if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
      parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name); //remove it and all ancestors
    } else { // it's a start-tag
      // check if this tag is starting an element that has optional end element
      // and do an ending needed
      this._do_optional_end_element(parser_token);

      this._tag_stack.record_tag(parser_token); //push it on the tag stack

      if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') &&
        !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
        parser_token.custom_beautifier = uses_beautifier(parser_token.tag_check, raw_token);
      }
    }
  }

  if (in_array(parser_token.tag_check, this._options.extra_liners)) { //check if this double needs an extra line
    printer.print_newline(false);
    if (!printer._output.just_added_blankline()) {
      printer.print_newline(true);
    }
  }

  if (parser_token.is_empty_element) { //if this tag name is a single tag type (either in the list or has a closing /)

    if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
      this._tag_stack.indent_to_tag(['if', 'unless']);
      parser_token.indent_content = true;
      // Don't add a newline if opening {{#if}} tag is on the current line
      var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
      if (!foundIfOnCurrentLine) {
        printer.print_newline(false);
      }
    }

    // Don't add a newline before elements that should remain where they are.
    if (parser_token.tag_name === '!--' && last_token.type === TOKEN.TAG_CLOSE &&
      last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) {
      //Do nothing. Leave comments on same line.
    } else if (!parser_token.is_inline_element && !parser_token.is_unformatted) {
      printer.print_newline(false);
    }
  } else if (parser_token.is_unformatted || parser_token.is_content_unformatted) {
    if (!parser_token.is_inline_element && !parser_token.is_unformatted) {
      printer.print_newline(false);
    }
  } else if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
    if ((parser_token.start_tag_token && parser_token.start_tag_token.multiline_content) ||
      !(parser_token.is_inline_element ||
        (last_tag_token.is_inline_element) ||
        (last_token.type === TOKEN.TAG_CLOSE &&
          parser_token.start_tag_token === last_tag_token) ||
        (last_token.type === 'TK_CONTENT')
      )) {
      printer.print_newline(false);
    }
  } else { // it's a start-tag
    parser_token.indent_content = !parser_token.custom_beautifier;

    if (parser_token.tag_start_char === '<') {
      if (parser_token.tag_name === 'html') {
        parser_token.indent_content = this._options.indent_inner_html;
      } else if (parser_token.tag_name === 'head') {
        parser_token.indent_content = this._options.indent_head_inner_html;
      } else if (parser_token.tag_name === 'body') {
        parser_token.indent_content = this._options.indent_body_inner_html;
      }
    }

    if (!parser_token.is_inline_element && last_token.type !== 'TK_CONTENT') {
      if (parser_token.parent) {
        parser_token.parent.multiline_content = true;
      }
      printer.print_newline(false);
    }
  }
};

//To be used for <p> tag special case:
//var p_closers = ['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'];

Beautifier.prototype._do_optional_end_element = function(parser_token) {
  // NOTE: cases of "if there is no more content in the parent element"
  // are handled automatically by the beautifier.
  // It assumes parent or ancestor close tag closes all children.
  // https://www.w3.org/TR/html5/syntax.html#optional-tags
  if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
    return;

  } else if (parser_token.tag_name === 'body') {
    // A head element’s end tag may be omitted if the head element is not immediately followed by a space character or a comment.
    this._tag_stack.try_pop('head');

    //} else if (parser_token.tag_name === 'body') {
    // DONE: A body element’s end tag may be omitted if the body element is not immediately followed by a comment.

  } else if (parser_token.tag_name === 'li') {
    // An li element’s end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.
    this._tag_stack.try_pop('li', ['ol', 'ul']);

  } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
    // A dd element’s end tag may be omitted if the dd element is immediately followed by another dd element or a dt element, or if there is no more content in the parent element.
    // A dt element’s end tag may be omitted if the dt element is immediately followed by another dt element or a dd element.
    this._tag_stack.try_pop('dt', ['dl']);
    this._tag_stack.try_pop('dd', ['dl']);

    //} else if (p_closers.indexOf(parser_token.tag_name) !== -1) {
    //TODO: THIS IS A BUG FARM. We are not putting this into 1.8.0 as it is likely to blow up.
    //A p element’s end tag may be omitted if the p element is immediately followed by an address, article, aside, blockquote, details, div, dl, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, main, nav, ol, p, pre, section, table, or ul element, or if there is no more content in the parent element and the parent element is an HTML element that is not an a, audio, del, ins, map, noscript, or video element, or an autonomous custom element.
    //this._tag_stack.try_pop('p', ['body']);

  } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
    // An rt element’s end tag may be omitted if the rt element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
    // An rp element’s end tag may be omitted if the rp element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
    this._tag_stack.try_pop('rt', ['ruby', 'rtc']);
    this._tag_stack.try_pop('rp', ['ruby', 'rtc']);

  } else if (parser_token.tag_name === 'optgroup') {
    // An optgroup element’s end tag may be omitted if the optgroup element is immediately followed by another optgroup element, or if there is no more content in the parent element.
    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
    this._tag_stack.try_pop('optgroup', ['select']);
    //this._tag_stack.try_pop('option', ['select']);

  } else if (parser_token.tag_name === 'option') {
    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
    this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']);

  } else if (parser_token.tag_name === 'colgroup') {
    // DONE: A colgroup element’s end tag may be omitted if the colgroup element is not immediately followed by a space character or a comment.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    this._tag_stack.try_pop('caption', ['table']);

  } else if (parser_token.tag_name === 'thead') {
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    this._tag_stack.try_pop('caption', ['table']);
    this._tag_stack.try_pop('colgroup', ['table']);

    //} else if (parser_token.tag_name === 'caption') {
    // DONE: A caption element’s end tag may be omitted if the caption element is not immediately followed by a space character or a comment.

  } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
    // A thead element’s end tag may be omitted if the thead element is immediately followed by a tbody or tfoot element.
    // A tbody element’s end tag may be omitted if the tbody element is immediately followed by a tbody or tfoot element, or if there is no more content in the parent element.
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    this._tag_stack.try_pop('caption', ['table']);
    this._tag_stack.try_pop('colgroup', ['table']);
    this._tag_stack.try_pop('thead', ['table']);
    this._tag_stack.try_pop('tbody', ['table']);

    //} else if (parser_token.tag_name === 'tfoot') {
    // DONE: A tfoot element’s end tag may be omitted if there is no more content in the parent element.

  } else if (parser_token.tag_name === 'tr') {
    // A tr element’s end tag may be omitted if the tr element is immediately followed by another tr element, or if there is no more content in the parent element.
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    this._tag_stack.try_pop('caption', ['table']);
    this._tag_stack.try_pop('colgroup', ['table']);
    this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']);

  } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
    // A td element’s end tag may be omitted if the td element is immediately followed by a td or th element, or if there is no more content in the parent element.
    // A th element’s end tag may be omitted if the th element is immediately followed by a td or th element, or if there is no more content in the parent element.
    this._tag_stack.try_pop('td', ['tr']);
    this._tag_stack.try_pop('th', ['tr']);
  }

  // Start element omission not handled currently
  // A head element’s start tag may be omitted if the element is empty, or if the first thing inside the head element is an element.
  // A tbody element’s start tag may be omitted if the first thing inside the tbody element is a tr element, and if the element is not immediately preceded by a tbody, thead, or tfoot element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
  // A colgroup element’s start tag may be omitted if the first thing inside the colgroup element is a col element, and if the element is not immediately preceded by another colgroup element whose end tag has been omitted. (It can’t be omitted if the element is empty.)

  // Fix up the parent of the parser token
  parser_token.parent = this._tag_stack.get_parser_token();

};

module.exports.Beautifier = Beautifier;
},{"../core/options":59,"../core/acorn":60,"../core/output":61,"../html/tokenizer":62}],53:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var Beautifier = require('./beautifier').Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
  var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
  return beautifier.beautify();
}

module.exports = style_html;
},{"./beautifier":57}],43:[function(require,module,exports) {
/*jshint node:true */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

'use strict';

var js_beautify = require('./javascript/index');
var css_beautify = require('./css/index');
var html_beautify = require('./html/index');

function style_html(html_source, options, js, css) {
  js = js || js_beautify;
  css = css || css_beautify;
  return html_beautify(html_source, options, js, css);
}

module.exports.js = js_beautify;
module.exports.css = css_beautify;
module.exports.html = style_html;
},{"./javascript/index":55,"./css/index":54,"./html/index":53}],32:[function(require,module,exports) {
var define;
/*jshint node:true */
/* globals define */
/*
  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

'use strict';

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
  // the default is js
  var beautify = function(src, config) {
    return js_beautify.js_beautify(src, config);
  };

  // short aliases
  beautify.js = js_beautify.js_beautify;
  beautify.css = css_beautify.css_beautify;
  beautify.html = html_beautify.html_beautify;

  // legacy aliases
  beautify.js_beautify = js_beautify.js_beautify;
  beautify.css_beautify = css_beautify.css_beautify;
  beautify.html_beautify = html_beautify.html_beautify;

  return beautify;
}

if (typeof define === "function" && define.amd) {
  // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
  define([
    "./lib/beautify",
    "./lib/beautify-css",
    "./lib/beautify-html"
  ], function(js_beautify, css_beautify, html_beautify) {
    return get_beautify(js_beautify, css_beautify, html_beautify);
  });
} else {
  (function(mod) {
    var beautifier = require('./src/index');
    beautifier.js_beautify = beautifier.js;
    beautifier.css_beautify = beautifier.css;
    beautifier.html_beautify = beautifier.html;

    mod.exports = get_beautify(beautifier, beautifier, beautifier);

  })(module);
}
},{"./src/index":43}],42:[function(require,module,exports) {
/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var cache;

module.exports = function isWhitespace(str) {
  return typeof str === 'string' && regex().test(str);
};

function regex() {
  // ensure that runtime compilation only happens once
  return cache || (cache = new RegExp('^[\\s\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF"]+$'));
}
},{}],40:[function(require,module,exports) {
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
};
},{}],30:[function(require,module,exports) {
'use strict';

var isObject = require('is-extendable');

module.exports = function extend(o /*, objects*/) {
  if (!isObject(o)) {
    o = {};
  }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
},{"is-extendable":40}],52:[function(require,module,exports) {
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],41:[function(require,module,exports) {
var isBuffer = require('is-buffer');
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};
},{"is-buffer":52}],31:[function(require,module,exports) {
/*!
 * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var isWhitespace = require('is-whitespace');
var extend = require('extend-shallow');
var typeOf = require('kind-of');

module.exports = function (str, options) {
  var opts = extend({}, options);
  var sep = opts.sep || '\n\n';
  var min = opts.min;
  var re;

  if (typeof min === 'number' && min !== 2) {
    re = new RegExp('(\\r\\n|\\n|\\u2424) {' + min + ',}');
  }
  if (typeof re === 'undefined') {
    re = opts.regex || /(\r\n|\n|\u2424){2,}/g;
  }

  // if a line is 100% whitespace it will be trimmed, so that
  // later we can condense newlines correctly
  if (opts.keepWhitespace !== true) {
    str = str.split('\n').map(function (line) {
      return isWhitespace(line) ? line.trim() : line;
    }).join('\n');
  }

  str = trailingNewline(str, opts);
  return str.replace(re, sep);
};

function trailingNewline(str, options) {
  var val = options.trailingNewline;
  if (val === false) {
    return str;
  }

  switch (typeOf(val)) {
    case 'string':
      str = str.replace(/\s+$/, options.trailingNewline);
      break;
    case 'function':
      str = options.trailingNewline(str);
      break;
    case 'undefined':
    case 'boolean':
    default:
      {
        str = str.replace(/\s+$/, '\n');
        break;
      }
  }
  return str;
}
},{"is-whitespace":42,"extend-shallow":30,"kind-of":41}],21:[function(require,module,exports) {
/*!
 * pretty <https://github.com/jonschlinkert/pretty>
 *
 * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var beautify = require('js-beautify');
var condense = require('condense-newlines');
var extend = require('extend-shallow');
var defaults = {
  unformatted: ['code', 'pre', 'em', 'strong', 'span'],
  indent_inner_html: true,
  indent_char: ' ',
  indent_size: 2,
  sep: '\n'
};

module.exports = function pretty(str, options) {
  var opts = extend({}, defaults, options);
  str = beautify.html(str, opts);

  if (opts.ocd === true) {
    if (opts.newlines) opts.sep = opts.newlines;
    return ocd(str, opts);
  }

  return str;
};

function ocd(str, options) {
  // Normalize and condense all newlines
  return condense(str, options)
  // Remove empty whitespace the top of a file.
  .replace(/^\s+/g, '')
  // Remove extra whitespace from eof
  .replace(/\s+$/g, '\n')

  // Add a space above each comment
  .replace(/(\s*<!--)/g, '\n$1')
  // Bring closing comments up to the same line as closing tag.
  .replace(/>(\s*)(?=<!--\s*\/)/g, '> ');
}
},{"js-beautify":32,"condense-newlines":31,"extend-shallow":30}],3:[function(require,module,exports) {
'use strict';

var _EventLogger = require('./components/EventLogger');

var _EventLogger2 = _interopRequireDefault(_EventLogger);

var _EventListenerRaw = require('./components/EventListenerRaw');

var _EventListenerRaw2 = _interopRequireDefault(_EventListenerRaw);

var _EventListenerReact = require('./components/EventListenerReact');

var _EventListenerReact2 = _interopRequireDefault(_EventListenerReact);

var _serializeEvent = require('./utils/serialize-event');

var _serializeEvent2 = _interopRequireDefault(_serializeEvent);

var _generateKey = require('./utils/generate-key');

var _getContent = require('./utils/getContent');

var _getContent2 = _interopRequireDefault(_getContent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _pretty = require('pretty');

var _pretty2 = _interopRequireDefault(_pretty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logs = new _immutable.Stack();
var STACK_LIMIT = 100;

var add_log = function add_log(item) {
	console.log('item', item);
	logs = logs.push(item).slice(0, STACK_LIMIT);
};

// This method is called every time an event is logged. Added inspection of
// the DOM to this call.
var log_event = function log_event(e, callbackName) {
	if (e.nativeEvent) {
		add_log((0, _serializeEvent2.default)(e.nativeEvent, null, true));
	}
	var range = window.getSelection().getRangeAt(0);
	var editable = document.querySelector('#rte--raw');
	var content = (0, _getContent2.default)(editable, range).join('⏎');
	var item = Object.assign({ content: content }, (0, _serializeEvent2.default)(e, callbackName));

	add_log(item);
	render_logs();
};

var clear_log = function clear_log() {
	logs = new _immutable.Stack();
	(0, _generateKey.resetKey)();
	render_logs();
};

var insert_separator = function insert_separator() {
	add_log({ index: (0, _generateKey.getNextKey)(), kind: 'separator' });
	render_logs();
};

var logger_el = document.querySelector('.logger');

var render_logs = function render_logs() {
	_reactDom2.default.render(_react2.default.createElement(_EventLogger2.default, { logs: logs, clearLog: clear_log, insertSeparator: insert_separator }), logger_el);
};

_reactDom2.default.render(_react2.default.createElement(_EventListenerReact2.default, { onevent: log_event }), document.querySelector('#rte__wrapper--react'));

new _EventListenerRaw2.default(document.querySelector('#rte--raw'), log_event);
},{"./components/EventLogger":10,"./components/EventListenerRaw":11,"./components/EventListenerReact":12,"./utils/serialize-event":13,"./utils/generate-key":14,"./utils/getContent":15,"react":18,"react-dom":20,"immutable":19,"pretty":21}]},{},[3], null)
//# sourceMappingURL=/input-methods/src.4a84da7b.map