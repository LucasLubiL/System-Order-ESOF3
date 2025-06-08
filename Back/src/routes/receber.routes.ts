import express from "express";
import ReceberController from "../controllers/ReceberController";

const router = express.Router();

const receberController = new ReceberController();

router.post("/finalizarRegistro", receberController.finalizar);

router.post("/criarRegistro", receberController.criarRegistro);

router.get("/selectReceber", receberController.selectRegistro);

export default router;