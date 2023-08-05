import { ProductsService } from "../dao/services/productService.js";

const productService = ProductsService.getInstance();

export const getProducts = async (req, res) => {
    try {
        const limit = req.query.limit;
        const page = req.query.page;
        const query = req.query;
        const response = await productService.getProducts(limit, page, query);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send({ status:'error', error: error.message });
    }
};

export const getProductsById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const producto = await productService.getProductById(pid);
        return res.status(200).send({ producto });
    } catch (error) {
        return res.status(404).send({ status:'error', error: error.message });
    }
};

export const addProducts = async (req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const thumbnailUrl = req?.files?.map(file => `http://localhost:8080/images/${file.filename}`)
        const currentUser = req.session.user
        const newProduct = await productService.addProduct(
            title, description, price, thumbnailUrl, code, stock, category, currentUser
        );
        return res.status(201).send({ status: 'Succes', message: 'Se creó el producto correctamente', product: newProduct });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message });
    }
};

export const editProducts = async (req, res) => {
    const productId = req.params.id;
    const changes = req.body;
    const thumbnailUrl = req?.files?.map(file => `http://localhost:8080/images/${file.filename}`)
    // if (!thumbnailUrl) {
    //     return res.status(400).send({ status: "Error", error: "No se envio niguna imagen!!" });
    // }
    try {
        const updatedProduct = await productService.editarProducto(productId, {...changes,thumbnail :thumbnailUrl,});
        return res.status(200).send({ status: "OK", message: `El producto se edito correctamente`, updatedProduct });
    } catch (error) {
        return res.status(404).send({ status: "Error", message: error.message });
    }
};

export const deleteProducts = async (req, res) => {
    const productId = req.params.id;
    const currentUser = req.session.user
    try {
        const message = await productService.eliminarProducto(productId,currentUser);
        return res.status(200).send({ status: "Success", message });
    } catch (error) {
        return res.status(404).send({ status: "Error", message: error.message });
    }
};