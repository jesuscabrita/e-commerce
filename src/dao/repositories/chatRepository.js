import { messagesModel } from "../models/messages.js";

export class ChatRepository {
    static instance = null;

    static getInstance() {
        if (!ChatRepository.instance) {
            ChatRepository.instance = new ChatRepository();
        }
        return ChatRepository.instance;
    }
    constructor() { }

    modelGetMessage = () => {
        return  messagesModel.find();
    }

    modelCreateMessage = (newMessage) => {
        return messagesModel.create(newMessage);
    }

    modelupdateOneMessage = (id, updatedMessage) => {
        return messagesModel.updateOne({ _id: id },{ $set: updatedMessage });
    }

    modelDeleteMessage = (id) => {
        return messagesModel.findByIdAndDelete(id)
    }
}