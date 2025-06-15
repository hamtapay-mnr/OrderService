import { OrderRoutes as routes } from './Src/Controller/orderRoutes.js';

export async function router(path, data, controller) {
    if (routes[path])
        try {
            const result = await routes[path](data, controller);
            console.log("Request to ", path, " with input: ", data, ", Result:", result);
            return result;
        } catch (error) {
            console.log("Request to ", path, " with input: ", data, ", Error:", error);
            return {
                status: 500,
                message: { en: "something went wrong" }
            };
        }
    else
        return {
            status: 404,
            message: { en: "Address not found" }
        };
}