import { getHashCode } from "./utils";

export class CacheManager {
  get(key) {
    const cacheKey = `${getHashCode(key)}`;
    let cachedItem = JSON.parse(localStorage.getItem(cacheKey));
    if (cachedItem && new Date(cachedItem.expires) < new Date()) {
      cachedItem = null;
    }
    return cachedItem;
  }

  set(cacheData) {
    const cacheKey = `${getHashCode(cacheData.key)}`;
    this.remove(cacheKey);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: cacheData.data, expires: cacheData.expires })
    );
  }

  remove(key) {
    const cacheKey = `${getHashCode(key)}`;
    localStorage.removeItem(cacheKey);
  }

  clear() {
    localStorage.clear();
  }
}
