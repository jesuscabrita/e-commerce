import { model, Schema } from "mongoose";
import { productsModel } from "./products.js";

const ticketCollection = "ticket";

const productSchema = new Schema(
    {
        quantity: { type: Number },
        product: { type: productsModel.schema },
    }
);

const ticketSchema = new Schema(
    {
        code: { type: String, unique: true },
        purcharse_datetime: { type: Date },
        amount: { type: Number },
        purcharse: { type: String },
        products: { type: [productSchema] },
        userID: { type : String },
    }
);

export const ticketModel = model(ticketCollection, ticketSchema);