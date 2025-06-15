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
        const res = await this.#set('asset', amount);
        if (res == "OK")
            return await this.#set("max-asset", amount);
        else
            throw "Could not set asset";
    }
    async getMaxAsset() {
        return await this.#get('max-asset');
    }
    async getAsset() {
        return await this.#get('asset');
    }
    async increaseAsset(amount) {
        return this.cache.incrBy('asset', amount);
    }
    async decreaseAsset(amount) {
        return this.cache.decrBy('asset', amount);
    }
}



