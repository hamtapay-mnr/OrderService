export const OrderRoutes = {
    '/buy': async (data, controller) => {
        const result = await controller.makeOrder(data.amount);
        if (result)
            return {
                status: 200,
                message: { en: "Order submitted" }
            };
        else {
            return {
                status: 507,
                message: { en: "Not enough gold to buy!" }
            };
        }
    },
    '/add': async (data, controller) => {
        const result = await controller.setAsset(data.amount);
        return {
            status: 200,
            message: { en: "Inventory has " + result }
        };
    }
};
