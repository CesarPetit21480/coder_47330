import mongoose from "mongoose";
import config from "../config/config.js";
import { logMessage } from "../config/logger.js";
export const URI = config.db.mongodbUri




export const init = async () => {
    try {
        mongoose.connect(URI);
        logMessage("Database connection established 🚀🚀🚀","info");

    } catch (error) {
        logMessage.fatal('Ha ocurrido un problema al tratar de acceder a la mongodb 😨')    
    }
}