import { Server } from "socket.io";
import { ProductsService } from "./dao/services/productService.js";
import { ChatService } from "./dao/services/chatService.js";

const socket = {};
const messageQueue = [];
const productService = ProductsService.getInstance();
const chatService = ChatService.getInstance();

socket.connect = function (httpServer) {
    socket.io = new Server(httpServer);
    let { io } = socket;

    io.on("connection", async (socket) => {
        console.log(`${socket.id} connected`);
        socket.broadcast.emit("userConnected", { user: socket.id, message: `${socket.id} se ha conectado` });

        let messages = await chatService.getMessages();
        socket.emit("messageLogs", messages);

        let productos = await productService.getProducts();
        socket.emit('updateProducts', productos);

        socket.on("addProduct", async (newProduct) => {
            console.log("Nuevo producto:", newProduct);

            const addedProduct = await productService.addProduct(newProduct);
            const productosActualizados = await productService.getProducts();
            console.log("Productos actualizados:", productosActualizados);

            io.emit('updateProducts', productosActualizados);
        });

        socket.on('eliminarProducto', (productoId) => {
                const index = productos.findIndex((producto) => producto._id == productoId);
                if (index !== -1) {
                    productos.splice(index, 1);
                    io.emit('newProduct', productos);
                }
                io.emit('newProduct', productos);
            });
    
            socket.on('editarProducto', (productoId) => {
                const index = productos.findIndex((producto) => producto._id == productoId);
                if (index !== -1) {
                    productos.splice(index, 1);
                    io.emit('newProduct', productos);
                }
                io.emit('newProduct', productos);
            });

        socket.on("message", async (data) => {
            // Agregar el nuevo mensaje a la cola de mensajes y la base de datos
            messageQueue.push(data);
            await chatService.addMessage(data.message, data.user);

            // Enviar el mensaje solo al cliente que lo ha enviado
            socket.emit("messageSent", { user: data.user, message: data.message });

            // Enviar el mensaje a todos los clientes conectados (incluyendo al que lo ha enviado)
            io.emit("messageLogs", messageQueue);
        });

        socket.on("eliminarMessage", async (messageId) => {
            await chatService.eliminarMessage(messageId);
            // Envía un evento a todos los clientes para actualizar la lista de mensajes
            let messages = await chatService.getMessages();
            io.emit("messageLogs", messages);
        });

        socket.on("disconnect", (data) => {
            console.log(`${socket.id} disconnected`);
            socket.broadcast.emit("userDisconnected", { user: socket.id, message: `${socket.id} se ha desconectado` });
        });
    });

};

export default socket;
