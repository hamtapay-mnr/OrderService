import { createClient } from 'redis'
export class Cache {
    constructor() {
        this.client = createClient();
        this.client.on('error', err => console.log('Redis Client Error', err));
    }
    async init() {
        this.client.connect();
    }
    async #set(key, value) {
        return this.client.set(key, value);
    }
    async #get(key) {
        return this.client.get(key);
    }
    async setAsset(amount) {
        return this.#set('asset', amount)
    }
    async getAsset() {
        return this.#get('asset')
    }
    async increaseAsset(amount) {
        return this.client.incrBy('asset', amount)
    }
    async decreaseAsset(amount) {
        return this.client.decrBy('asset', amount)
    }
}



