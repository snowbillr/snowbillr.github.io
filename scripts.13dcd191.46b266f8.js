// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts.13dcd191.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) {
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "gxJl": [function (require, module, exports) {
    "use strict";

    function i(i, e) {
      if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function e(i, e) {
      for (var t = 0; t < e.length; t++) {
        var s = e[t];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(i, s.key, s);
      }
    }

    function t(i, t, s) {
      return t && e(i.prototype, t), s && e(i, s), i;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.Point = void 0;

    var s = function () {
      function e(t, s) {
        i(this, e), this.size = 3, this.gridX = t, this.gridY = s, this.displayX = 0, this.displayY = 0, this.visible = !0;
      }

      return t(e, [{
        key: "clone",
        value: function value() {
          var i = new e(this.gridX, this.gridY);
          return i.displayX = this.displayX, i.displayY = this.displayY, i;
        }
      }, {
        key: "render",
        value: function value(i) {
          this.visible && (i.fillStyle = "#ccc", i.fillRect(this.displayX, this.displayY, this.size, this.size));
        }
      }]), e;
    }();

    exports.Point = s;
  }, {}],
  "TnEw": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.PointGrid = void 0;

    var i = require("./point");

    function t(i, t) {
      if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function n(i, t) {
      for (var n = 0; n < t.length; n++) {
        var e = t[n];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(i, e.key, e);
      }
    }

    function e(i, t, e) {
      return t && n(i.prototype, t), e && n(i, e), i;
    }

    var r = function () {
      function n(i, e, r) {
        t(this, n), this.pointDistance = i, this.resize(e, r);
      }

      return e(n, [{
        key: "resize",
        value: function value(t, n) {
          this.points = [], this.horizontalPointCount = Math.ceil(t / this.pointDistance), this.verticalPointCount = Math.ceil(n / this.pointDistance), this.xPadding = (t - (this.horizontalPointCount - 1) * this.pointDistance) / 2, this.yPadding = (n - (this.verticalPointCount - 1) * this.pointDistance) / 2;

          for (var e = 0; e < this.horizontalPointCount; e++) {
            for (var r = 0; r < this.verticalPointCount; r++) {
              this.points.push(new i.Point(e, r));
            }
          }
        }
      }, {
        key: "update",
        value: function value() {
          var i = this;
          this.points.forEach(function (t) {
            t.displayX = t.gridX * i.pointDistance + i.xPadding, t.displayY = t.gridY * i.pointDistance + i.yPadding;
          });
        }
      }, {
        key: "render",
        value: function value(i) {
          this.points.forEach(function (t) {
            t.render(i);
          });
        }
      }, {
        key: "selectVisibleAdjacentPoints",
        value: function value() {
          var i = this.shuffleArray(this.points.filter(function (i) {
            return i.visible;
          }))[0];
          return null == i ? [null, null] : [i, this.shuffleArray(this.selectVisibleCardinalPoints(i))[0]];
        }
      }, {
        key: "selectVisibleCardinalPoints",
        value: function value(i) {
          var t = i.gridX,
              n = i.gridY;
          return [this.findPoint(t + 1, n), this.findPoint(t - 1, n), this.findPoint(t, n + 1), this.findPoint(t, n - 1)].filter(function (i) {
            return null != i;
          }).filter(function (i) {
            return i.visible;
          });
        }
      }, {
        key: "findPoint",
        value: function value(i, t) {
          return this.points.find(function (n) {
            return n.gridX === i && n.gridY === t;
          });
        }
      }, {
        key: "shuffleArray",
        value: function value(i) {
          for (var t = i.length - 1; t > 0; t--) {
            var n = Math.floor(Math.random() * (t + 1)),
                e = [i[n], i[t]];
            i[t] = e[0], i[n] = e[1];
          }

          return i;
        }
      }]), n;
    }();

    exports.PointGrid = r;
  }, {
    "./point": "gxJl"
  }],
  "aOB5": [function (require, module, exports) {
    "use strict";

    function i(i, s) {
      if (!(i instanceof s)) throw new TypeError("Cannot call a class as a function");
    }

    function s(i, s) {
      for (var t = 0; t < s.length; t++) {
        var a = s[t];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a);
      }
    }

    function t(i, t, a) {
      return t && s(i.prototype, t), a && s(i, a), i;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.PointSwapAnimation = void 0;

    var a = function () {
      function s(t, a, n) {
        i(this, s), this.frameDuration = 60, this.frame = 0, this.isRunning = !0, this.callback = n, this.callbackCalled = !1, this.firstPoint = t.clone(), this.secondPoint = a.clone(), this.originalDisplayCoords = {
          firstPoint: {
            displayX: t.displayX,
            displayY: t.displayY
          },
          secondPoint: {
            displayX: a.displayX,
            displayY: a.displayY
          }
        }, this.xDistance = t.displayX - a.displayX, this.yDistance = t.displayY - a.displayY;
      }

      return t(s, [{
        key: "ease",
        value: function value(i, s, t, a) {
          return -t / 2 * (Math.cos(Math.PI * i / a) - 1) + s;
        }
      }, {
        key: "update",
        value: function value() {
          this.frame += 1, this.frame > this.frameDuration ? (this.isRunning = !1, this.callbackCalled || (this.callback(this), this.callbackCalled = !0)) : (this.firstPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayX, -this.xDistance, this.frameDuration), this.firstPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayY, -this.yDistance, this.frameDuration), this.secondPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayX, this.xDistance, this.frameDuration), this.secondPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayY, this.yDistance, this.frameDuration));
        }
      }, {
        key: "render",
        value: function value(i) {
          this.isRunning && (this.firstPoint.render(i), this.secondPoint.render(i));
        }
      }]), s;
    }();

    exports.PointSwapAnimation = a;
  }, {}],
  "krDB": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.PointGridBackground = void 0;

    var t = require("./point-grid"),
        i = require("./point-swap-animation");

    function n(t, i) {
      return a(t) || r(t, i) || e();
    }

    function e() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function r(t, i) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
        var n = [],
            e = !0,
            r = !1,
            a = void 0;

        try {
          for (var o, s = t[Symbol.iterator](); !(e = (o = s.next()).done) && (n.push(o.value), !i || n.length !== i); e = !0) {
            ;
          }
        } catch (c) {
          r = !0, a = c;
        } finally {
          try {
            e || null == s.return || s.return();
          } finally {
            if (r) throw a;
          }
        }

        return n;
      }
    }

    function a(t) {
      if (Array.isArray(t)) return t;
    }

    function o(t, i) {
      if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
    }

    function s(t, i) {
      for (var n = 0; n < i.length; n++) {
        var e = i[n];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
      }
    }

    function c(t, i, n) {
      return i && s(t.prototype, i), n && s(t, n), t;
    }

    var u = function () {
      function e() {
        o(this, e), this.backgroundCanvas = document.querySelector("#background-canvas"), this.ctx = this.backgroundCanvas.getContext("2d"), this.pointGrid = new t.PointGrid(100, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight), this.pointSwapAnimations = [];
      }

      return c(e, [{
        key: "start",
        value: function value() {
          this.addResizeListener(), this.resize(), this.startSpawnLoop(), this.mainLoop();
        }
      }, {
        key: "addResizeListener",
        value: function value() {
          window.addEventListener("resize", this.resize);
        }
      }, {
        key: "resize",
        value: function value() {
          var t = window.innerWidth,
              i = window.innerHeight;
          this.backgroundCanvas.width = t, this.backgroundCanvas.height = i, this.pointGrid.resize(t, i);
        }
      }, {
        key: "startSpawnLoop",
        value: function value() {
          var t = this;
          setInterval(function () {
            var e = n(t.pointGrid.selectVisibleAdjacentPoints(), 2),
                r = e[0],
                a = e[1];
            null != r && null != a && (r.visible = !1, a.visible = !1, t.pointSwapAnimations.push(new i.PointSwapAnimation(r, a, function (i) {
              r.visible = !0, a.visible = !0, t.pointSwapAnimations.splice(t.pointSwapAnimations.indexOf(i), 1);
            })));
          }, 500);
        }
      }, {
        key: "mainLoop",
        value: function value() {
          var t = this;
          this.update(), this.render(), requestAnimationFrame(function () {
            return t.mainLoop();
          });
        }
      }, {
        key: "update",
        value: function value() {
          this.pointGrid.update(), this.pointSwapAnimations.forEach(function (t) {
            return t.update();
          });
        }
      }, {
        key: "render",
        value: function value() {
          var t = this;
          this.clear(), this.pointGrid.render(this.ctx), this.pointSwapAnimations.forEach(function (i) {
            return i.render(t.ctx);
          });
        }
      }, {
        key: "clear",
        value: function value() {
          this.ctx.fillStyle = "#fff", this.ctx.fillRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
        }
      }]), e;
    }();

    exports.PointGridBackground = u;
  }, {
    "./point-grid": "TnEw",
    "./point-swap-animation": "aOB5"
  }],
  "G3mN": [function (require, module, exports) {
    "use strict";

    function e(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, n) {
      for (var o = 0; o < n.length; o++) {
        var t = n[o];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
      }
    }

    function o(e, o, t) {
      return o && n(e.prototype, o), t && n(e, t), e;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.ConsoleMessage = void 0;

    var t = function () {
      function n() {
        e(this, n);
      }

      return o(n, [{
        key: "print",
        value: function value() {
          console.log("\n    Thanks for checking out my website!\n\n    You can contact me at billnreed@gmail.com if you'd like to get in touch.\n    ");
        }
      }]), n;
    }();

    exports.ConsoleMessage = t;
  }, {}],
  "g2Hq": [function (require, module, exports) {
    "use strict";

    var r = require("./background/point-grid-background"),
        e = require("./console-message"),
        n = new r.PointGridBackground();

    n.start();
    var o = new e.ConsoleMessage();
    o.print();
  }, {
    "./background/point-grid-background": "krDB",
    "./console-message": "G3mN"
  }]
}, {}, ["g2Hq"], null);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59596" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.13dcd191.js"], null)
//# sourceMappingURL=/scripts.13dcd191.46b266f8.js.map