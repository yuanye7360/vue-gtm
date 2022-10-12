"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const core = require("@gtm-support/core");
let gtmPlugin;
function install(Vue, options = { id: "" }) {
  options = { trackOnNextTick: false, ...options };
  gtmPlugin = new core.GtmSupport(options);
  Vue.prototype.$gtm = Vue.gtm = gtmPlugin;
  if (gtmPlugin.isInBrowserContext()) {
    if (options.vueRouter) {
      initVueRouterGuard(
        Vue,
        options.vueRouter,
        options.ignoredViews,
        options.trackOnNextTick
      );
    }
    if (gtmPlugin.options.enabled && gtmPlugin.options.loadScript) {
      if (Array.isArray(options.id)) {
        options.id.forEach((id) => {
          if (typeof id === "string") {
            core.loadScript(id, options);
          } else {
            const newConf = {
              ...options
            };
            if (id.queryParams != null) {
              newConf.queryParams = {
                ...newConf.queryParams,
                ...id.queryParams
              };
            }
            core.loadScript(id.id, newConf);
          }
        });
      } else {
        core.loadScript(options.id, options);
      }
    }
  }
}
function initVueRouterGuard(Vue, vueRouter, ignoredViews = [], trackOnNextTick, deriveAdditionalEventData = () => ({})) {
  if (!vueRouter) {
    console.warn(
      "[VueGtm]: You tried to register 'vueRouter' for vue-gtm, but 'vue-router' was not found."
    );
    return;
  }
  vueRouter.afterEach(async (to, from) => {
    var _a;
    if (typeof to.name !== "string" || Array.isArray(ignoredViews) && ignoredViews.includes(to.name) || typeof ignoredViews === "function" && ignoredViews(to, from)) {
      return;
    }
    const name = to.meta && typeof to.meta.gtm === "string" && !!to.meta.gtm ? to.meta.gtm : to.name;
    const additionalEventData = {
      ...await deriveAdditionalEventData(to, from),
      ...(_a = to.meta) == null ? void 0 : _a.gtmAdditionalEventData
    };
    const baseUrl = vueRouter.options.base ?? "";
    let fullUrl = baseUrl;
    if (!fullUrl.endsWith("/")) {
      fullUrl += "/";
    }
    fullUrl += to.fullPath.startsWith("/") ? to.fullPath.substring(1) : to.fullPath;
    if (trackOnNextTick) {
      Vue.nextTick(() => {
        gtmPlugin == null ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
      });
    } else {
      gtmPlugin == null ? void 0 : gtmPlugin.trackView(name, fullUrl, additionalEventData);
    }
  });
}
const _default = { install };
function useGtm() {
  return gtmPlugin;
}
Object.defineProperty(exports, "GtmPlugin", {
  enumerable: true,
  get: () => core.GtmSupport
});
Object.defineProperty(exports, "GtmSupport", {
  enumerable: true,
  get: () => core.GtmSupport
});
Object.defineProperty(exports, "assertIsGtmId", {
  enumerable: true,
  get: () => core.assertIsGtmId
});
Object.defineProperty(exports, "hasScript", {
  enumerable: true,
  get: () => core.hasScript
});
Object.defineProperty(exports, "loadScript", {
  enumerable: true,
  get: () => core.loadScript
});
exports.default = _default;
exports.useGtm = useGtm;
