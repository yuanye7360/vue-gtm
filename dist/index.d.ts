import type { GtmSupportOptions } from '@gtm-support/core';
import { GtmSupport as GtmPlugin } from '@gtm-support/core';
import { Plugin } from 'vue';
import type { RouteLocationNormalized, Router } from 'vue-router';
/**
 * Options passed to the plugin.
 */
export interface VueGtmUseOptions extends GtmSupportOptions {
    /**
     * Pass the router instance to automatically sync with router.
     */
    vueRouter?: Router;
    /**
     * Don't trigger events for specified router names.
     */
    ignoredViews?: string[] | ((to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean);
    /**
     * Whether or not call `trackView` in `Vue.nextTick`.
     */
    trackOnNextTick?: boolean;
}
/**
 * Create the Vue GTM instance.
 *
 * @param options Options.
 * @returns The Vue GTM plugin instance.
 */
export declare function createGtm(options: VueGtmUseOptions): VueGtmPlugin;
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        /**
         * The Vue GTM Plugin instance.
         */
        $gtm: GtmPlugin;
    }
}
/**
 * Vue GTM Plugin.
 */
export declare type VueGtmPlugin = Plugin;
declare const _default: VueGtmPlugin;
export { assertIsGtmId, DataLayerObject, GtmIdContainer, GtmQueryParams, GtmSupport, GtmSupportOptions, hasScript, loadScript, LoadScriptOptions, TrackEventOptions } from '@gtm-support/core';
export { GtmPlugin };
export default _default;
/**
 * Returns GTM plugin instance to be used via Composition API inside setup method.
 *
 * @returns The Vue GTM instance if the it was installed, otherwise `undefined`.
 */
export declare function useGtm(): GtmPlugin | undefined;
