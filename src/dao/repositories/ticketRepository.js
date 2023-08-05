import nodemailer from "nodemailer";
import { ticketModel } from "../models/ticket.js";
import { userModel } from "../models/user.js";
import { productsModel } from "../models/products.js";
import {
  HOST_EMAIL,
  PORT_EMAIL,
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
} from "../../config/config.js";

export class TicketRepository {
  static instance = null;

  static getInstance() {
    if (!TicketRepository.instance) {
      TicketRepository.instance = new TicketRepository();
    }
    return TicketRepository.instance;
  }
  constructor() {}

  modelGetTicket = () => {
    return ticketModel.find();
  };

  modelCreateTicket = (newTicket) => {
    return ticketModel.create(newTicket);
  };

  modelUserUpdateOne = (filter, update) => {
    return userModel.updateOne(filter, update);
  };

  modelUpdateProduct = (product) => {
    return productsModel.findByIdAndUpdate(product._id, product, { new: true });
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

  correoTextEnCola = (ticket) => {
    return {
      from: '"Supermercado 👻" <jesusarnaldo115@gmail.com>',
      to: ticket.purcharse,
      subject: `¡Gracias por su compra! "${ticket.purcharse}"`,
      html: `
            <html>
            <head>
                <style>
                        
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p>N# ${ticket.code}</p>
                <p>su compra fue realizada</p>
                <p>por un monto total de:$ ${ticket.amount}</p>
                <p>Gracias por su compra</p>
                <a href="http://localhost:8080/ticket/${ticket.userID}" style="background: rgb(31 41 55); color: #f9f8f8;height: 30px;border-radius: 8px;padding: 8px;cursor: pointer;display: flex;align-items: center;">Su ticket aca</a>
                <p>Saludos cordiales</p>
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
