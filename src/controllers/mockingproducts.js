import { MockingproductsService } from "../dao/services/mockingproductsService.js";

const mockingproductsService = MockingproductsService.getInstance();

export const getMockingproducts = async (req, res) => {
    try {
        const products = await mockingproductsService.getMockingproducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};