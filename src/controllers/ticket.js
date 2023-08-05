import Stripe from "stripe";
import { TicketService } from "../dao/services/ticketService.js";
import { UserService } from "../dao/services/userService.js";
import { STRIPESECRETKEY } from "../config/config.js";

const stripeSecretKey = STRIPESECRETKEY;
const stripe = new Stripe(stripeSecretKey);
const ticketService = TicketService.getInstance();
const userService = UserService.getInstance();

export const getTicket = async (req, res) => {
  try {
    const response = await ticketService.getTicket();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
};

export const getTicketById = async (req, res) => {
  const tid = req.params.tid;
  try {
    const ticket = await ticketService.getTicketById(tid);
    return res.status(200).send({ ticket });
  } catch (error) {
    return res.status(404).send({ status: "error", error: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const uid = req.params.uid;
    const newTicket = await ticketService.createTicket(uid);
    return res
      .status(201)
      .send({
        status: "Succes",
        message: "Se creó el ticket correctamente",
        ticket: newTicket,
      });
  } catch (err) {
    return res.status(400).send({ status: "error", error: err.message });
  }
};

export const createPago = async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await userService.getUserById(uid);
    const cartProducts = user?.cart?.products;

    const stripeProducts = cartProducts.map((cartProduct) => ({
      name: cartProduct.product.title,
      description: cartProduct.product.description,
      amount: cartProduct.product.price * 100,
      currency: "usd",
      quantity: cartProduct.quantity,
      images: cartProduct.product.thumbnail,
      metadata: {
        productId: cartProduct.product._id,
      },
    }));
    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeProducts.reduce(
        (total, product) => total + product.amount * product.quantity,
        0
      ),
      currency: "usd",
      description: "Compra de productos",
      metadata: { userId: uid },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
};
