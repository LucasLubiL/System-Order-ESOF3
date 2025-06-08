import express from "express";
import ClienteController from "../controllers/ClienteController";

const router = express.Router();

const clienteController = new ClienteController();

router.post("/cadastrarCliente", clienteController.cadastrar);

router.post("/atualizarCliente", clienteController.atualizar);

router.post("/excluirCliente", clienteController.excluir);

router.get("/select", clienteController.listarSelect);

router.get("/clienteReceber", clienteController.clienteRegistro);

export default router;