import mongoose from "mongoose";

export const init = async () => {
    try {
        const URI = 'mongodb+srv://developer:bllKONuaBgLvqEak@cluster0.nhgydui.mongodb.net/ecommerce';
        await mongoose.connect(URI);
        console.log("database connection established 🚀");
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }

}