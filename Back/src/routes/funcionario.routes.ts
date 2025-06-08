import express from "express";
import FuncionarioController from "../controllers/FuncionarioController";

const router = express.Router();

const funcionarioController = new FuncionarioController();

router.post("/cadastrar", funcionarioController.cadastrar);

router.post("/atualizarFuncionario", funcionarioController.atualizar);

router.post("/excluirFuncionario", funcionarioController.excluir);

router.get("/select", funcionarioController.listarSelect);

export default router;