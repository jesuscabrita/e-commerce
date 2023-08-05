import { ChatService } from "../dao/services/chatService.js";

const chatService = ChatService.getInstance();

export const getChats = async (req, res) => {
    try {
        const messages = await chatService.getMessages()
        res.status(200).send({ messages });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const addChats = async (req, res) => {
    try {
        const { message, user } = req.body;
        const newMessage = await chatService.addMessage(message, user)

        return res.status(201).send({ status: 'Succes', message: 'Se creó el mensaje correctamente', product: newMessage });
    } catch (err) {
        return res.status(400).send({ status: "Error", error: err.message });
    }
};

export const editChats = async (req, res) => {
    const messageId = req.params.id;
    const changes = req.body;
    try {
        const updatedMessage = await chatService.editarMessage(messageId, {...changes });
        return res.status(200).send({ status: "OK", message: `El mensaje se edito correctamente`, updatedMessage });
    } catch (error) {
        return res.status(404).send({ status: "Error", message: error.message });
    }
};

export const deleteChats = async (req, res) => {
    const messageId = req.params.id;
    try {
        const message = await chatService.eliminarMessage(messageId);
        return res.status(200).send({ status: "Success", message });
    } catch (error) {
        return res.status(404).send({ status: "Error", message: error.message });
    }
};