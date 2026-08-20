import type { Cache } from '../../lib/proof-system/cache.js';
export { setSrsCache, srsCache, unsetSrsCache };
declare let srsCache: Cache | undefined;
declare function setSrsCache(cache: Cache): void;
declare function unsetSrsCache(): void;
