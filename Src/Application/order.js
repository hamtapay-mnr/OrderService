/**
 * @memberOf OrderService.Src.Application.order
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise {output, state}
 */
export function deduct(amount) {
    return amount
}

/**
 * @memberOf OrderService.Src.Application.order
 * @summary check if inventory has more than amount
 * @description Return true if we have enough in inventory, else returns false
 * @param {Number} amount amount of asset
 * @return {Promise<Boolean>} Promise
 */
export function inquiry(amount) {
    return amount > 10
}