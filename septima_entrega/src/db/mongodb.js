import mongoose from "mongoose";

export const URI = 'mongodb://localhost:27017/ecommerce'

export const init = async () => {
    try {
        mongoose.connect(URI);
        console.log("Database connection established 🚀🚀🚀");

    } catch (error) {
        console.error('Ha ocurrido un problema al tratar de acceder a la mongodb 😨', error.message);
    }
}