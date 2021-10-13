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
})({"uNIU":[function(require,module,exports) {
module.exports = "lamb-close.d43f2606.png";
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lambClose = _interopRequireDefault(require("./lamb-close.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStorageSites = localStorage.getItem('sites');
var defaultSites = [{
  'letter': 'a',
  'name': 'acfun.cn',
  'url': 'https://www.acfun.cn/'
}, {
  'letter': 'b',
  'name': 'bilibili.com',
  'url': 'https://www.bilibili.com/'
}, {
  'letter': 'g',
  'name': 'github.com',
  'url': 'https://github.com/'
}];
var sites = JSON.parse(localStorageSites) || defaultSites;

var formatSiteName = function formatSiteName(url) {
  return url.replace('http://', '').replace('https://', '').replace('//', '').replace('www.', '').replace(/\/.*/, '');
};

var formatUrl = function formatUrl(siteName) {
  return '//' + siteName;
};

window.onbeforeunload = function () {
  var string = JSON.stringify(sites);
  localStorage.setItem('sites', string);
};

$(function () {
  $(".searchForm>input").focus();
  $(".addSite").click(function () {
    var url = window.prompt('请输入要添加的网址');
    var site = {
      'name': formatSiteName(url)
    };
    site.letter = site.name[0];
    site.url = formatUrl(site.name);
    sites.push(site);
    showSites();
  });
  $(document).on('keypress', function (e) {
    var key = e.key;

    for (var i = 0; i < sites.length; i++) {
      if (sites[i].letter.toLowerCase() === key) {
        window.open(sites[i].url);
      }
    }
  });
  showSites();

  function showSites() {
    $(".nav-main>ul>li:not(.addSite)").remove();
    sites.forEach(function (item, index) {
      var $li = $("<li>\n                    <div class=\"logo\">".concat(item.letter, "</div>\n                    <div class=\"link\">").concat(item.name, "</div>\n                    <input type=\"hidden\" value=\"").concat(item.url, "\">\n                    <img src=\"").concat(_lambClose.default, "\">\n                </li>")).insertBefore($(".addSite"));
      $li.click(function () {
        window.open($(this).find(":hidden").val());
      });
      $li.find('img').click(function (e) {
        sites.splice(index, 1);
        e.stopPropagation();
        showSites();
      });
    });
  }
});
},{"./lamb-close.png":"uNIU"}]},{},["epB2"], null)
//# sourceMappingURL=main.d52d7146.js.map