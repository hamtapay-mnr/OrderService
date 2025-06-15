export class Cache {
    constructor(cache) {
        this.cache = cache;
    }

    async #set(key, value) {
        return this.cache.set(key, value);
    }
    async #get(key) {
        return this.cache.get(key);
    }
    async setAsset(amount) {
        return this.#set('asset', amount);
    }
    async getAsset() {
        return this.#get('asset');
    }
    async increaseAsset(amount) {
        return this.cache.incrBy('asset', amount);
    }
    async decreaseAsset(amount) {
        return this.cache.decrBy('asset', amount);
    }
}



