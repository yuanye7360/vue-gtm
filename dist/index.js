"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.useGtm = exports.GtmPlugin = exports.loadScript = exports.hasScript = exports.GtmSupport = exports.assertIsGtmId = void 0;
var core_1 = require("@gtm-support/core");
Object.defineProperty(exports, "GtmPlugin", { enumerable: true, get: function () { return core_1.GtmSupport; } });
var gtmPlugin;
/**
 * Installation procedure.
 *
 * @param Vue The Vue instance.
 * @param options Configuration options.
 */
function install(Vue, options) {
    if (options === void 0) { options = { id: '' }; }
    // Apply default configuration
    options = __assign({ trackOnNextTick: false }, options);
    // Add to vue prototype and also from globals
    gtmPlugin = new core_1.GtmSupport(options);
    Vue.prototype.$gtm = Vue.gtm = gtmPlugin;
    // Check if plugin is running in a real browser or e.g. in SSG mode
    if (gtmPlugin.isInBrowserContext()) {
        // Handle vue-router if defined
        if (options.vueRouter) {
            initVueRouterGuard(Vue, options.vueRouter, options.ignoredViews, options.trackOnNextTick);
        }
        // Load GTM script when enabled
        if (gtmPlugin.options.enabled && gtmPlugin.options.loadScript) {
            if (Array.isArray(options.id)) {
                options.id.forEach(function (id) {
                    if (typeof id === 'string') {
                        (0, core_1.loadScript)(id, options);
                    }
                    else {
                        var newConf = __assign({}, options);
                        if (id.queryParams != null) {
                            newConf.queryParams = __assign(__assign({}, newConf.queryParams), id.queryParams);
                        }
                        (0, core_1.loadScript)(id.id, newConf);
                    }
                });
            }
            else {
                (0, core_1.loadScript)(options.id, options);
            }
        }
    }
}
/**
 * Initialize the router guard.
 *
 * @param Vue The Vue instance.
 * @param vueRouter The Vue router instance to attach the guard.
 * @param ignoredViews An array of route name that will be ignored.
 * @param trackOnNextTick Whether or not to call `trackView` in `Vue.nextTick`.
 * @param deriveAdditionalEventData Callback to derive additional event data.
 */
function initVueRouterGuard(Vue, vueRouter, ignoredViews, trackOnNextTick, deriveAdditionalEventData) {
    var _this = this;
    if (ignoredViews === void 0) { ignoredViews = []; }
    if (deriveAdditionalEventData === void 0) { deriveAdditionalEventData = function () { return ({}); }; }
    if (!vueRouter) {
        console.warn("[VueGtm]: You tried to register 'vueRouter' for vue-gtm, but 'vue-router' was not found.");
        return;
    }
    vueRouter.afterEach(function (to, from) { return __awaiter(_this, void 0, void 0, function () {
        var name, additionalEventData, _a, baseUrl, fullUrl;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // Ignore some routes
                    if (typeof to.name !== 'string' ||
                        (Array.isArray(ignoredViews) && ignoredViews.includes(to.name)) ||
                        (typeof ignoredViews === 'function' && ignoredViews(to, from))) {
                        return [2 /*return*/];
                    }
                    name = to.meta && typeof to.meta.gtm === 'string' && !!to.meta.gtm
                        ? to.meta.gtm
                        : to.name;
                    _a = [{}];
                    return [4 /*yield*/, deriveAdditionalEventData(to, from)];
                case 1:
                    additionalEventData = __assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_d.sent())])), (_b = to.meta) === null || _b === void 0 ? void 0 : _b.gtmAdditionalEventData]);
                    baseUrl = (_c = vueRouter.options.base) !== null && _c !== void 0 ? _c : '';
                    fullUrl = baseUrl;
                    if (!fullUrl.endsWith('/')) {
                        fullUrl += '/';
                    }
                    fullUrl += to.fullPath.startsWith('/')
                        ? to.fullPath.substr(1)
                        : to.fullPath;
                    if (trackOnNextTick) {
                        Vue.nextTick(function () {
                            gtmPlugin === null || gtmPlugin === void 0 ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
                        });
                    }
                    else {
                        gtmPlugin === null || gtmPlugin === void 0 ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
}
var _default = { install: install };
var core_2 = require("@gtm-support/core");
Object.defineProperty(exports, "assertIsGtmId", { enumerable: true, get: function () { return core_2.assertIsGtmId; } });
Object.defineProperty(exports, "GtmSupport", { enumerable: true, get: function () { return core_2.GtmSupport; } });
Object.defineProperty(exports, "hasScript", { enumerable: true, get: function () { return core_2.hasScript; } });
Object.defineProperty(exports, "loadScript", { enumerable: true, get: function () { return core_2.loadScript; } });
exports.default = _default;
/**
 * Returns GTM plugin instance to be used via Composition API inside setup method.
 *
 * @returns The Vue GTM instance if the it was installed, otherwise `undefined`.
 */
function useGtm() {
    return gtmPlugin;
}
exports.useGtm = useGtm;
