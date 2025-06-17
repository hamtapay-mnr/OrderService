import * as Order from '../Application/order.js';
export class OrderController {
    constructor(cache, lock, eventQueue) {
        this.cache = cache;
        this.lock = lock;
        this.eventQueue = eventQueue;
    }

    /**
     * @memberOf OrderService.Src.Controller.orderController
     * @summary Process an order, deduct from inventory
     * @description Check if order is valid, then deduct from inventory
     * @param {Number} amount amount of asset
     * @return {Promise<Boolean>} Promise return true if order submitted, return false if order is invalid
     */
    async makeOrder(data) {

        let canBuy;
        try {
            // const lockObj = await this.lock.lock();
            canBuy = await Order.canBuy(data.amount, this.cache);
            let remain = -1;
            if (canBuy) {
                remain = await Order.deduct(data.amount, this.cache);
                const orderObj = { currentInventory: data.amount + remain, bought: data.amount, username: data.username };
                console.log("Ordered: ", orderObj, ", Remained: ", remain);
                await this.eventQueue.publishEvent(orderObj);
            }
            // await this.lock.unlock(lockObj);
        } catch (error) {
            // Rollback if could not send
            await Order.deductRollback(amount, this.cache);
            throw "Failed to submit order: " + error;
        }

        return canBuy;
    }

    /**
     * @memberOf OrderService.Src.Controller.orderController
     * @summary Change inventory asset value
     * @description Change inventory asset value
     * @param {Number} amount amount of asset
     * @return {Promise<>} Promise 
     */
    async setAsset(data) {
        return Order.setAsset(data.amount, this.cache);
    }
}