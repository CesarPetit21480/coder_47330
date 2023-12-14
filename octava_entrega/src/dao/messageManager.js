import MessageModel from "../models/message.model.js";

export default class MessageManager {

    static get() {
        return MessageModel.find();
    }

    static async create(data) {
        const message = await MessageModel.create(data);
        console.log('Mensaje creado correctamente 🚀🚀');
        return message;
    }

}