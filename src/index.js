import express from "express";
import handlebars from "express-handlebars";
import socket from "./socket.js";
import { MONGODB, PORT, SESSION_SECRET } from "./config/config.js";
import { connectToDatabase } from "./database/database.js";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import session from "express-session";
import handlebar from "handlebars";
import cookieParser from "cookie-parser";
import initializePassport from "./middlewares/passport.js";
import passport from "passport";
import cors from "cors";
import __dirname, { sumTotalPrice } from "./utils.js";
import { plugin_Rutas } from "./router/routes.js";
import compression from "express-compression";
import { errorMiddleware } from "./middlewares/error.js";
import { addLogger } from "./middlewares/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

export const app = express();

handlebar.registerHelper("sumTotalPrice", sumTotalPrice);
handlebar.helpers.eq = function (a, b) {
  return a === b;
};
handlebar.helpers.and = function (a, b) {
  return a && b;
};
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(cors());
app.use(compression());
// app.use(compression({ brotli: { enabled: true, zlib: { } } }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(errorMiddleware);
app.use(addLogger);
initializePassport();
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGODB,
      ttl: 360,
    }),
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Supermercado API",
      description: "Documentacíon que soporta al sistema Supermercado",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

plugin_Rutas(app, cors());

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corre en el puerto ${PORT}`);
});

socket.connect(httpServer);
connectToDatabase();
