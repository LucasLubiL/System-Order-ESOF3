import { Request, Response } from "express";
import ReceberBO from "../bo/ReceberBO";
import Receber from "../models/Receber";

class ReceberController {

  async criarRegistro(req: Request, res: Response) {

    console.log("Entrando no método criarRegistro");

    const receberData = req.body;
    const receberBO = new ReceberBO();

    const receber = new Receber()

    receber.valor = receberData.valor;
    receber.idPag = receberData.pagamento;
    receber.idCliente = receberData.cliente;
    receber.idOrd = receberData.idord;

    const resultado = await receberBO.criarRegistro(receber);

    if (resultado) {

      res.status(201).json({ message: "Registro cadastrado com sucesso!" });

    } else {

      res.status(500).json({ error: "Erro ao cadastrar rtegistro." });
      
    }
    
  }

  async finalizar(req: Request, res: Response) {

      const receberData = req.body;
      const receberBO = new ReceberBO();
      const receber = new Receber();
      receber.id = receberData.idrec;

      const resultado = await receberBO.finalizar(receber);

      if (resultado) {

      res.status(201).json({ message: "Registro finalizado com sucesso!" });

      } else {

      res.status(400).json({ error: "Não é possível finalizar este registro." });
        
      }
        
  }

  async selectRegistro(req: Request, res: Response){

    const receberBO = new ReceberBO();

    const receber = await receberBO.listarSelect();

    if (receber) {
       res.status(200).json(receber);
    }else {
       res.status(500).json({ error: "Erro ao listar registros" });
    }
    
  }

}

export default ReceberController;
