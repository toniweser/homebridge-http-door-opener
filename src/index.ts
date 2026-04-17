import type { API } from 'homebridge';
import { ExampleHomebridgePlatform } from './platform';
import { PLATFORM_NAME } from './settings';

/**
 * Registers the platform with Homebridge
 */
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform);
};
