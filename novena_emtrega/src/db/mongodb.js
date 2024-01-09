import mongoose from "mongoose";
import config from "../config/config.js";

export const URI =  config.db.mongodbUri



export const init = async () => {
    try {
        mongoose.connect(URI);
        console.log("Database connection established 🚀🚀🚀");

    } catch (error) {
        console.error('Ha ocurrido un problema al tratar de acceder a la mongodb 😨', error.message);
    }
}