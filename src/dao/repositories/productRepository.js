import {
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  HOST_EMAIL,
  PORT_EMAIL,
} from "../../config/config.js";
import { productsModel } from "../models/products.js";
import nodemailer from "nodemailer";

export class ProductsRepository {
  static instance = null;

  static getInstance() {
    if (!ProductsRepository.instance) {
      ProductsRepository.instance = new ProductsRepository();
    }
    return ProductsRepository.instance;
  }
  constructor() {}

  modelProductPaginate = (filter, options) => {
    return productsModel.paginate(filter, options);
  };

  modelProductById = (id) => {
    return productsModel.findById(id);
  };

  modelCheckProduct = (code) => {
    return productsModel.findOne({ code });
  };

  modelProductCreate = (newProduct) => {
    return productsModel.create(newProduct);
  };

  modelProductEdit = (id, updatedProduct) => {
    return productsModel.updateOne({ _id: id }, { $set: updatedProduct });
  };

  modelProductDelete = (id) => {
    return productsModel.findByIdAndDelete(id);
  };

  createTransportCorreo = () => {
    return nodemailer.createTransport({
      host: HOST_EMAIL,
      port: PORT_EMAIL,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
  };

  correoTextEnCola = (email, product) => {
    return {
      from: '"Supermercado 👻" <jesusarnaldo115@gmail.com>',
      to: email,
      subject: `¡Producto Eliminado!`,
      html: `
            <html>
            <head>
                <style>
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p> el producto con nombre de: ${product.title} fue eliminado, te lo hacemos saber por esta via por ser usuario premium , saludos </p>
                </div>
            </body>
        </html>
            `,
    };
  };

  enviarCorreo = (transporter, correo) => {
    return transporter.sendMail(correo);
  };
}
