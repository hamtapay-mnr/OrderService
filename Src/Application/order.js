/**
 * @memberOf OrderService.Src.Application.order
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export function deduct(amount, cache) {
    return cache.decreaseAsset(amount);
}

/**
 * @memberOf OrderService.Src.Application.order
 * @summary Rollback deduct a amount from inventory
 * @description Get a value and add it to inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export function deductRollback(amount, cache) {
    return cache.increaseAsset(amount);
}
/**
 * @memberOf OrderService.Src.Application.order
 * @summary Set inventory to amount
 * @description Get a value and set it as inventory asset
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export async function setAsset(amount, cache) {
    const result = await cache.setAsset(amount);
    await cache.setAdminWarning("0"); // reset admin warning flag
    if (result == 'OK')
        return await cache.getAsset();
    return -1;
}

/**
 * @memberOf OrderService.Src.Application.order
 * @summary check if inventory has more than amount and user can buy!
 * @description Return true if we have enough in inventory, else returns false
 * This function alone is not thread safe!
 * @param {Number} amount amount of asset
 * @return {Promise<Boolean>} Promise
 */
export async function canBuy(amount, cache) {
    const currentAsset = await cache.getAsset();
    return amount <= currentAsset;
}

/**
 * @memberOf OrderService.Src.Application.order
 * @summary Put request in queue for next service to work
 * @description Put request in queue for next service to work
 * @param {Object} data data to enqueue!
 * @param {Object} queue queue object
 * @return {Promise<>} Promise 
 */
export async function addToQueue(data, eventQueue) {
    await eventQueue.publishEvent(data);
}