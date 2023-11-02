import { Config } from './Config';
import { SBConfig } from './SBConfig';

export class SBConfigSetup {
  public static register(config: Config) {
    if (!config.hasKey(SBConfig.apiKey)) {
      config.registerKey(SBConfig.apiKey);
    }
  }
}
