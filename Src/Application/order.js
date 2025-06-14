/**
 * @memberOf OrderService.Src.Application.order
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise {output, state}
 */
export function deduct(amount, cache) {
    return cache.decreaseAsset(amount)
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
    const currentAsset = await cache.getAsset()
    return amount <= currentAsset
}