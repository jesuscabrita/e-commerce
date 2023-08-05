import {
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  HOST_EMAIL,
  PORT_EMAIL,
} from "../../config/config.js";
import { cartsModel } from "../models/carts.js";
import { userModel } from "../models/user.js";
import nodemailer from "nodemailer";

export class UserRepository {
  static instance = null;

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
  constructor() {}

  modelGetUser = () => {
    return userModel.find();
  };

  modelUserById = (userId) => {
    return userModel.findById(userId);
  };

  modelRegisterAndLogin = (email) => {
    return userModel.findOne({ email });
  };

  modelCartCreate = () => {
    return cartsModel.create({ products: [] });
  };

  modelUserCreate = (user) => {
    return userModel.create(user);
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

  correoTextEnCola = (email, resetToken) => {
    const resetLink = `https://e-commerce-jesus.vercel.app/Reset/${resetToken}`;
    return {
      from: '"Supermercado 👻" <jesusarnaldo115@gmail.com>',
      to: email,
      subject: `¡Restablecimiento de contraseña!`,
      html: `
            <html>
            <head>
                <style>
                        
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetLink}">${resetLink}</a>
                </div>
            </body>
        </html>
            `,
    };
  };

  enviarCorreo = (transporter, correo) => {
    return transporter.sendMail(correo);
  };

  saveResetToken = async (userId, token) => {
    // Aquí debes implementar la lógica para guardar el token de restablecimiento de contraseña
    // junto con el ID del usuario en tu base de datos
    // Puedes utilizar una consulta a la base de datos o algún ORM para realizar esta operación
    // Por ejemplo:
    await userModel.updateOne({ _id: userId }, { resetToken: token });
  };

  getResetToken = async (userId) => {
    // Aquí debes implementar la lógica para obtener el token de restablecimiento de contraseña
    // asociado al ID del usuario desde tu base de datos
    // Puedes utilizar una consulta a la base de datos o algún ORM para realizar esta operación
    // Por ejemplo:
    const user = await userModel.findById(userId);
    return user.resetToken;
  };

  updatePassword = async (userId, password) => {
    // Aquí debes implementar la lógica para actualizar la contraseña del usuario en tu base de datos
    // Puedes utilizar una consulta a la base de datos o algún ORM para realizar esta operación
    // Por ejemplo:
    await userModel.updateOne({ _id: userId }, { password: password });
  };

  removeResetToken = async (userId) => {
    // Aquí debes implementar la lógica para eliminar el token de restablecimiento de contraseña
    // asociado al ID del usuario desde tu base de datos
    // Puedes utilizar una consulta a la base de datos o algún ORM para realizar esta operación
    // Por ejemplo:
    await userModel.updateOne({ _id: userId }, { resetToken: null });
  };

  modelUpdateUserPassword = (email, hashedPassword) => {
    return userModel.updateOne({ email: email }, { password: hashedPassword });
  };

  modelUserEdit = (userId, updatedUser) => {
    return userModel.updateOne({ _id: userId }, { $set: updatedUser });
  };

  modelUserDelete = (userId) => {
    return userModel.findByIdAndDelete(userId);
  };

  correoTextEnColaSinConexion = (email) => {
    return {
      from: '"Supermercado 👻" <jesusarnaldo115@gmail.com>',
      to: email,
      subject: `¡Falta de inactividad!`,
      html: `
            <html>
            <head>
                <style>
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p>por falta de inactividad su cuenta fue eliminada </p>
                </div>
            </body>
        </html>
            `,
    };
  };
}
