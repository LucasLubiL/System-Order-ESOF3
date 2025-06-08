import express from "express";
import OrdemController from "../controllers/OrdemController";

const router = express.Router();

const ordemController = new OrdemController();

router.post("/criarOrdem", ordemController.criarOrdem);

router.post("/finalizarOrdem", ordemController.finalizarOrdem);

router.post("/enviarOrdem", ordemController.enviarOrdem);

router.post("/cancelarOrdem", ordemController.cancelarOrdem);

router.get("/selectOrdem", ordemController.listarSelect);

router.get("/relatoOS", ordemController.relato);

router.post("/finalizarRelato", ordemController.finalizar);

export default router;