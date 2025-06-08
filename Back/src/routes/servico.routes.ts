import express from "express";
import ServicoController from "../controllers/ServicoController";

const router = express.Router();

const servicoController = new ServicoController();

router.post("/cadastrarServico", servicoController.cadastrar);

router.post("/atualizarServico", servicoController.atualizar);

router.post("/excluirServico", servicoController.excluir);

router.get("/select", servicoController.listarSelect);

export default router;