import { config } from "dotenv";
config(); 

const checkEnv = (enVar) => {
    const envVariable = process.env[enVar];
    if (!envVariable) {
        throw new Error(`Porfavor definir el nombre de la variable: ${enVar}`);
    }
    return envVariable;
};

export const PORT = checkEnv("PORT");
export const MONGODB = checkEnv("MONGODB");
export const SESSION_SECRET = checkEnv("SESSION_SECRET");
export const EMAIL_USERNAME = checkEnv("EMAIL_USERNAME");
export const EMAIL_PASSWORD = checkEnv("EMAIL_PASSWORD");
export const PORT_EMAIL = checkEnv("PORT_EMAIL");
export const HOST_EMAIL = checkEnv("HOST_EMAIL");
export const NODE_ENV = checkEnv("NODE_ENV");
export const STRIPESECRETKEY = checkEnv("STRIPESECRETKEY")
