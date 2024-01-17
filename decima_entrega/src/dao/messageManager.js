import MessageModel from "../models/message.model.js";
import { logMessage } from '../config/logger.js';


export default class MessageManager {

    static get() {
        return MessageModel.find();
    }

    static async create(data) {
        const message = await MessageModel.create(data);
        logMessage('Mensaje creado correctamente 🚀🚀', "info");
        return message;
    }

}