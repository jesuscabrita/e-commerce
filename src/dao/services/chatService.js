import { ChatRepository } from "../repositories/chatRepository.js";

export class ChatService {
    static instance = null;

    static getInstance() {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }
    constructor() {
        this.chatRepository = ChatRepository.getInstance();
    }

    getMessages = async () => {
        try {
            const data = await this.chatRepository.modelGetMessage();
            const messages = data.map(message => message.toObject());
            return messages;
        } catch (error) {
            throw new Error("Error al obtener los mensajes");
        }
    }

    validateMessage(message,user) {
        if (!message) {
            throw new Error("El mensaje es requerido");
        }
        if (!user) {
            throw new Error("El usuario es requerido");
        }
    }

    addMessage = async (message, user) => {
        this.validateMessage(message, user);
        const messages = await this.getMessages();
        const newMessage = {
            message: message.trim(),
            user: user.trim()
        }
        messages?.push(newMessage)
        await this.chatRepository.modelCreateMessage(newMessage);
        return newMessage;
    }

    editarMessage = async (id, changes) => {
        const messages = await this.getMessages()
        const messageIndex = messages.findIndex((message) => message._id == id);
        if (messageIndex === -1) {
            throw new Error(`No se encontró el mensaje con ID ${id}`);
        }
        const updatedMessage = {...messages[messageIndex],...changes,};
        messages[messageIndex] = updatedMessage;
        await this.chatRepository.modelupdateOneMessage(
            id,
            updatedMessage
            // { _id: id },
            // { $set: updatedMessage }
            )

        return updatedMessage;
    }

    eliminarMessage = async (id) => {
        const messages = await this.getMessages();
        const index = messages.findIndex((p) => p._id == id);
        if (index === -1) {
            throw new Error(`No se encontró el mensaje con ID ${id}`);
        }
        messages.splice(index, 1);
        await this.chatRepository.modelDeleteMessage(id)

        return `Se eliminó el mensaje ${id} correctamente`;
    }
}