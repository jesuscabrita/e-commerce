import { UserService } from "../dao/services/userService.js";

const userService = UserService.getInstance();

export const getUser = async (req, res) => {
    try {
        const user = await userService.getUser();
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

export const getUserSimple = async (req, res) => {
    try {
        const user = await userService.getUserSimple();
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart } = req.body;
        const result = await userService.registerUser(
            first_name,
            last_name,
            email,
            age,
            password,
            cart
        );

        if (result.status === "error") {
            return res.status(400).send(result);
        } else {
            return res.send(result);
        }
    } catch (error) {
        return res.status(500).send({ status: "error", error: error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password, req, res);
        if (result.status === "error") {
            return res.status(400).send(result);
        }
        res.send(result);
    } catch (error) {
        return res.status(500).send({ status: "error", error: error });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const result = await userService.logoutUser(req);
        if (result.status === "error") {
            return res.status(400).send(result);
        } else {
            return res.send(result);
        }
    } catch (error) {
        return res.status(500).send({ status: "error", error: error });
    }
};

export const solicitarContraseña = async (req, res) => {
    try {
        const { email } = req.body;
        await userService.solicitarContraseña(email);
        return res.status(200).send({ status: "success", message: "Solicitud de restablecimiento de contraseña enviada correctamente." });
    } catch (error) {
        return res.status(500).send({ status: "error", error: error.message });
    }
};

export const cambioContraseña = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await userService.restablecerContraseña(email, newPassword);
        if (result.status === "success") {
            return res.status(200).send({ status: "success", message: result.message });
        } else {
            return res.status(400).send({ status: "error", error: result.error });
        }
    } catch (error) {
        return res.status(500).send({ status: "error", error: error.message });
    }
};

export const editUsuario = async (req, res) => {
    const userId = req.params.userId;
    const changes = req.body;
    try {
        const update = await userService.editarUsuario(userId, changes);
        return res.status(200).send({ update });
    } catch (error) {
        return res.status(404).send({ status: 'error', error: error.message });
    }
};

export const editDocumentos = async (req, res) => {
    const userId = req.params.userId;
    const documents = req?.files
    try {
        await userService.uploadDocuments(userId, documents);
        return res.status(200).send({ status: "success", message: "Files uploaded successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ status: "error", error: error.message });
    }
};

export const eliminarUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        await userService.deleteUser(userId);
        return res.status(200).send({ status: "success", message: "Se elimin el usuario correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ status: "error", error: error.message });
    }
};

export const eliminarUserSinConexion = async (req, res) => {
    try {
        await userService.deleteUserSinConexion();
        return res.status(200).send({ status: "success", message: "Se elimin el usuarios sin conexion correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ status: "error", error: error.message });
    }
};