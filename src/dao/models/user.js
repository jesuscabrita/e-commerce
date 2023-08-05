import { model, Schema } from "mongoose";
import { cartsModel } from "./carts.js";

const userCollection = "user";

const documentSchema = new Schema({
    name: { type: String },
    reference: { type: String },
});

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    role: { type: String },
    password: { type: String },
    cart: { type: cartsModel.schema },
    documents: [{ type: documentSchema }],
    last_connection: { type: Date },
});

export const userModel = model(userCollection, userSchema);