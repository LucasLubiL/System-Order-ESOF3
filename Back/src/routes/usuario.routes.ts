import express from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = express.Router();

const usuarioController = new UsuarioController();

router.post("/login", usuarioController.login);

router.post("/cadastrarUser", usuarioController.cadastrar);

router.post("/atualizarUsuario", usuarioController.atualizar);

router.post("/excluirUsuario", usuarioController.excluir);

router.get("/selectUsuario", usuarioController.listarSelect);

export default router;