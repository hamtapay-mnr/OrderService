import * as Order from '../Application/order.js';
export class OrderController {
    constructor(cache, lock) {
        this.cache = cache;
        this.lock = lock;
    }
    async makeOrder(amount) {
        // const lockObj = await this.lock.lock();
        let canBuy = await Order.canBuy(amount, this.cache);
        if (canBuy)
            await Order.deduct(amount, this.cache);
        // await this.lock.unlock(lockObj);
        return canBuy;
    }
}