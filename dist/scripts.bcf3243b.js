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
})({"scripts/background/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point =
/*#__PURE__*/
function () {
  function Point(gridX, gridY) {
    _classCallCheck(this, Point);

    this.size = 3;
    this.gridX = gridX;
    this.gridY = gridY;
    this.displayX = 0;
    this.displayY = 0;
    this.visible = true;
  }

  _createClass(Point, [{
    key: "clone",
    value: function clone() {
      var newPoint = new Point(this.gridX, this.gridY);
      newPoint.displayX = this.displayX;
      newPoint.displayY = this.displayY;
      return newPoint;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      if (this.visible) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.displayX, this.displayY, this.size, this.size);
      }
    }
  }]);

  return Point;
}();

exports.Point = Point;
},{}],"scripts/background/point-grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointGrid = void 0;

var _point = require("./point");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PointGrid =
/*#__PURE__*/
function () {
  function PointGrid(pointDistance, displayWidth, displayHeight) {
    _classCallCheck(this, PointGrid);

    this.pointDistance = pointDistance;
    this.resize(displayWidth, displayHeight);
  }

  _createClass(PointGrid, [{
    key: "resize",
    value: function resize(displayWidth, displayHeight) {
      this.points = [];
      this.horizontalPointCount = Math.ceil(displayWidth / this.pointDistance);
      this.verticalPointCount = Math.ceil(displayHeight / this.pointDistance);
      this.xPadding = (displayWidth - (this.horizontalPointCount - 1) * this.pointDistance) / 2;
      this.yPadding = (displayHeight - (this.verticalPointCount - 1) * this.pointDistance) / 2;

      for (var x = 0; x < this.horizontalPointCount; x++) {
        for (var y = 0; y < this.verticalPointCount; y++) {
          this.points.push(new _point.Point(x, y));
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.points.forEach(function (point) {
        point.displayX = point.gridX * _this.pointDistance + _this.xPadding;
        point.displayY = point.gridY * _this.pointDistance + _this.yPadding;
      });
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.points.forEach(function (point) {
        point.render(ctx);
      });
    }
  }, {
    key: "selectVisibleAdjacentPoints",
    value: function selectVisibleAdjacentPoints() {
      var firstPoint = this.shuffleArray(this.points.filter(function (point) {
        return point.visible;
      }))[0];

      if (firstPoint == null) {
        return [null, null];
      }

      var secondPoint = this.shuffleArray(this.selectVisibleCardinalPoints(firstPoint))[0];
      return [firstPoint, secondPoint];
    }
  }, {
    key: "selectVisibleCardinalPoints",
    value: function selectVisibleCardinalPoints(_ref) {
      var gridX = _ref.gridX,
          gridY = _ref.gridY;
      return [this.findPoint(gridX + 1, gridY), this.findPoint(gridX - 1, gridY), this.findPoint(gridX, gridY + 1), this.findPoint(gridX, gridY - 1)].filter(function (point) {
        return point != null;
      }).filter(function (point) {
        return point.visible;
      });
    }
  }, {
    key: "findPoint",
    value: function findPoint(gridX, gridY) {
      return this.points.find(function (point) {
        return point.gridX === gridX && point.gridY === gridY;
      });
    } // taken from https://stackoverflow.com/a/6274381/1950372

  }, {
    key: "shuffleArray",
    value: function shuffleArray(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref2 = [a[j], a[i]];
        a[i] = _ref2[0];
        a[j] = _ref2[1];
      }

      return a;
    }
  }]);

  return PointGrid;
}();

exports.PointGrid = PointGrid;
},{"./point":"scripts/background/point.js"}],"scripts/background/point-swap-animation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointSwapAnimation = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PointSwapAnimation =
/*#__PURE__*/
function () {
  function PointSwapAnimation(firstPoint, secondPoint, callback) {
    _classCallCheck(this, PointSwapAnimation);

    this.frameDuration = 60; // in frames

    this.frame = 0;
    this.isRunning = true;
    this.callback = callback;
    this.callbackCalled = false;
    this.firstPoint = firstPoint.clone();
    this.secondPoint = secondPoint.clone();
    this.originalDisplayCoords = {
      firstPoint: {
        displayX: firstPoint.displayX,
        displayY: firstPoint.displayY
      },
      secondPoint: {
        displayX: secondPoint.displayX,
        displayY: secondPoint.displayY
      }
    };
    this.xDistance = firstPoint.displayX - secondPoint.displayX;
    this.yDistance = firstPoint.displayY - secondPoint.displayY;
  }

  _createClass(PointSwapAnimation, [{
    key: "ease",
    value: function ease(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
  }, {
    key: "update",
    value: function update() {
      this.frame += 1;

      if (this.frame > this.frameDuration) {
        this.isRunning = false;

        if (!this.callbackCalled) {
          this.callback(this);
          this.callbackCalled = true;
        }
      } else {
        this.firstPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayX, -this.xDistance, this.frameDuration);
        this.firstPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.firstPoint.displayY, -this.yDistance, this.frameDuration);
        this.secondPoint.displayX = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayX, this.xDistance, this.frameDuration);
        this.secondPoint.displayY = this.ease(this.frame, this.originalDisplayCoords.secondPoint.displayY, this.yDistance, this.frameDuration);
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      if (this.isRunning) {
        this.firstPoint.render(ctx);
        this.secondPoint.render(ctx);
      }
    }
  }]);

  return PointSwapAnimation;
}();

exports.PointSwapAnimation = PointSwapAnimation;
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _pointGrid = require("./background/point-grid");

var _pointSwapAnimation = require("./background/point-swap-animation");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var backgroundCanvas = document.querySelector('#background-canvas');
var ctx = backgroundCanvas.getContext('2d');
var pointGrid = new _pointGrid.PointGrid(100, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
var pointSwapAnimations = [];
setInterval(function () {
  var _pointGrid$selectVisi = pointGrid.selectVisibleAdjacentPoints(),
      _pointGrid$selectVisi2 = _slicedToArray(_pointGrid$selectVisi, 2),
      firstPoint = _pointGrid$selectVisi2[0],
      secondPoint = _pointGrid$selectVisi2[1];

  if (firstPoint == null || secondPoint == null) return;
  firstPoint.visible = false;
  secondPoint.visible = false;
  pointSwapAnimations.push(new _pointSwapAnimation.PointSwapAnimation(firstPoint, secondPoint, function (animation) {
    firstPoint.visible = true;
    secondPoint.visible = true;
    pointSwapAnimations.splice(pointSwapAnimations.indexOf(animation), 1);
  }));
}, 500);

function mainLoop() {
  update();
  render();
  requestAnimationFrame(mainLoop);
}

function update() {
  pointGrid.update();
  pointSwapAnimations.forEach(function (pointSwapAnimation) {
    return pointSwapAnimation.update();
  });
}

function render() {
  clear();
  pointGrid.render(ctx);
  pointSwapAnimations.forEach(function (pointSwapAnimation) {
    return pointSwapAnimation.render(ctx);
  });
}

function clear() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

window.addEventListener('resize', resize);

function resize() {
  var displayWidth = window.innerWidth;
  var displayHeight = window.innerHeight;
  backgroundCanvas.width = displayWidth;
  backgroundCanvas.height = displayHeight;
  pointGrid.resize(displayWidth, displayHeight);
}

resize();
mainLoop();
},{"./background/point-grid":"scripts/background/point-grid.js","./background/point-swap-animation":"scripts/background/point-swap-animation.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55880" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.map