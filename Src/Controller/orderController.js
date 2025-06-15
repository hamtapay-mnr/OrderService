import * as Order from '../Application/order.js';
export class OrderController {
    constructor(cache, lock) {
        this.cache = cache;
        this.lock = lock;
    }

    /**
     * @memberOf OrderService.Src.Controller.orderController
     * @summary Process an order, deduct from inventory
     * @description Check if order is valid, then deduct from inventory
     * @param {Number} amount amount of asset
     * @return {Promise<Boolean>} Promise return true if order submitted, return false if order is invalid
     */
    async makeOrder(amount) {
        // const lockObj = await this.lock.lock();
        let canBuy = await Order.canBuy(amount, this.cache);
        if (canBuy)
            await Order.deduct(amount, this.cache);
        // await this.lock.unlock(lockObj);
        return canBuy;
    }

    /**
     * @memberOf OrderService.Src.Controller.orderController
     * @summary Change inventory asset value
     * @description Change inventory asset value
     * @param {Number} amount amount of asset
     * @return {Promise<>} Promise 
     */
    async setAsset(amount) {
        return Order.setAsset(amount, this.cache);
    }
}