import { faker } from "@faker-js/faker/locale/es";

export class MockingproductsService {
    static instance = null;

    static getInstance() {
        if (!MockingproductsService.instance) {
            MockingproductsService.instance = new MockingproductsService();
        }
        return MockingproductsService.instance;
    }
    constructor() { }

    getMockingproducts = async () => {
        let numOfProducts = faker.number.int({ min: 0, max: 100 });
        let products = [];

        for (let i = 0; i < numOfProducts; i++) {
            const newProduct = {
                id: faker.database.mongodbObjectId(),
                code: faker.string.alphanumeric(8),
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                department: faker.commerce.department(),
                stock: faker.number.int({ min: 0, max: 100 }),
                image: faker.image.url(),
            };
            products.push(newProduct);
        }

        return products;
    };
}