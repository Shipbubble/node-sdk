import { ConfigKey } from './Config';

export const SBConfig = {
  apiKey: {
    name: 'apiKey',
    defaultValue: null,
  } as ConfigKey<string | null>,
};
