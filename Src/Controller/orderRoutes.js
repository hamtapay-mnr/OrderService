export async function router(path, data, controller) {
    switch (path) {
        case 'buy':
            const result = await controller.makeOrder(data.amount);
            if (result)
                return {
                    status: 200,
                    message: { en: "Order submitted" }
                }
            else {
                return {
                    status: 500,
                    message: { en: "Not enough gold to buy!" }
                }
            }
            break;
        case 'add':
            result = await controller.setAsset(data.amount);
            break
        default:
            return {
                status: 404,
                message: { en: "Address not found" }
            }
    }
}