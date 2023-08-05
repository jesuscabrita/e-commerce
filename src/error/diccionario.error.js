export const UserErrors = (email) => ({
    REGISTRATION_ERROR: {
        name: "Error de registro",
        message: "Ocurrió un error durante el registro del usuario",
        cause: "Error interno del servidor",
    },
    LOGIN_ERROR: {
        name: "Error de inicio de sesión",
        message: "Ocurrió un error durante el inicio de sesión del usuario",
        cause: "Error interno del servidor",
    },
    USER_LOGOUT_ERROR: {
        name: "Error al cerrar sesion",
        message: "Ocurrió un error al cerrar sesion",
        cause: "Error interno del servidor",
    },
    USER_EXISTENTE_ERROR: {
        name: "Usuario existente",
        message: `El usuario ${email} ya existe`,
        cause: "El email ya existe en la base de datos",
    },
    CORREO_ERROR: {
        name: "Error de correo",
        message: `Correo electrónico incorrecto`,
        cause: "Esta escribiendo el correo incorrectamente",
    },
    CONTRASEÑA_ERROR: {
        name: "Error de contraseña",
        message: `Contraseña incorrecta`,
        cause: "La contraseña no es la misma de la que esta registrada",
    },
});

export const TicketErrors = (productoID) => ({
    TICKET_BY_ID_ERROR: {
        name: "Error de ticket",
        message: "No se encontró el ticket seleccionado",
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
    PRODUCTO_BY_ID_ERROR: {
        name: "Error de producto",
        message: "No se encontró el producto seleccionado",
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
    PRODUCTO_BY_ID_SERVER_ERROR: {
        name: "Error de producto",
        message: "Error al obtener el producto",
        cause: "Error interno del servidor",
    },
    PRODUCTO_BY_ID_TICKET_ERROR: {
        name: "Error de producto",
        message: `No se encontró el producto con ID: ${productoID}`,
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
    STOCK_ERROR: {
        name: "Error de stock",
        message: `No hay suficiente stock para el producto con ID: ${productoID}`,
        cause: "No estoy stock en el producto , por eso no se puedo avanzar",
    },
    TICKET_ERROR: {
        name: "Error de ticket",
        message: `Error al crear el ticket`,
        cause: "Error interno al crear el ticket",
    },
});

export const CartErrors = (carritoId) => ({
    CARRITO_BY_ID_ERROR: {
        name: "Error de carrito",
        message: `No se encontró el carrito con id ${carritoId}`,
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
    PRODUCTO_BY_ID_ERROR: {
        name: "Error de producto",
        message: "No se encontró el producto seleccionado",
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
});

export const ProductErrors = () => ({
    PRODUCTO_BY_ID_ERROR: {
        name: "Error de producto",
        message: "No se encontró el producto que buscas.",
        cause: "el _id que esta escribiendo no existe en la base de datos",
    },
    PRODUCTOS_SERVER_ERROR: {
        name: "Error de producto",
        message: `Error al obtener los productos`,
        cause: "Error interno",
    },
    PRODUCTO_SERVER_ERROR: {
        name: "Error de producto",
        message: `Error al obtener el producto`,
        cause: "Error interno",
    },
    
});