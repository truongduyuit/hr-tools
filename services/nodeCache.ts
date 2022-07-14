import NodeCache from "node-cache";

class AppCache {
  private static instance: AppCache;
  appCache: NodeCache;

  constructor(appCache: NodeCache) {
    this.appCache = appCache
  }

  public static getInstance(): AppCache {
    if (!AppCache.instance) {
      AppCache.instance = new AppCache(new NodeCache());
    }

    return AppCache.instance;
  }
}

export default AppCache;
