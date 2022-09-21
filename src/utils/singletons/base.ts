export interface INextServerCache {
  cache: Record<string, any> | undefined;
  getCacheInstance: () => Record<string, any>;
}

export default class NextServerCache implements INextServerCache {
  cache: Record<string, any> | undefined;
  getCacheInstance() {
    if (!this.cache) {
      this.cache = {
        __created_at: Date.now()
      };
      return this.cache;
    } else {
      return this.cache;
    }
  }
  setCacheInstance({ k, v }: { k: string; v: any }) {
    this.cache = {
      ...this.cache,
      __updatedAt: Date.now(),
      [k]: v
    };
  }
}
