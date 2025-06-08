import { Request, Response } from "express";
import OrdemBO from "../bo/OrdemBO";
import Ordem from "../models/Ordem";

class OrdemController {

  async criarOrdem(req: Request, res: Response) {

    console.log("Entrando no método criarOrdem OrdemController.ts");

    const ordemData = req.body;
    const ordemBO = new OrdemBO();
    const usuarioLogado = req.session.funcionarioId;

    const ordem = new Ordem()

    ordem.valor = ordemData.valor;
    ordem.descriptionCliente = ordemData.descricao;
    ordem.idFunc = Number(usuarioLogado);
    ordem.idCliente = ordemData.cliente;
    ordem.idService = ordemData.servico;
    ordem.idPag = ordemData.pagamento;

    const resultado = await ordemBO.criarOrdem(ordem);

    if (resultado) {

      res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });

    } else {

      res.status(500).json({ error: "Erro ao cadastrar funcionário." });
      
    }
    
  }

  async finalizarOrdem(req: Request, res: Response) {

    const ordemData = req.body;
    const ordemBO = new OrdemBO();
    const ordem = new Ordem();
    ordem.id = ordemData.idord;
    ordem.idPag = ordemData.pagamento;
    ordem.description = ordemData.descricao;
    ordem.valor = ordemData.valor;

    const resultado = await ordemBO.finalizarOrdem(ordem);

    if (resultado) {

      res.status(201).json({ message: "Ordem finalizada com sucesso!" });

    } else {

      res.status(400).json({ error: "Não é possível finalizar a O.S.." });
      
    }
    
  }

  async enviarOrdem(req: Request, res: Response) {

    const ordemData = req.body;
    const ordemBO = new OrdemBO();
    const ordem = new Ordem();
    ordem.id = ordemData.idord;
    ordem.idPag = ordemData.pagamento;
    ordem.msgDev = ordemData.msg_dev;
    ordem.valor = ordemData.valor;

    const resultado = await ordemBO.enviarOrdem(ordem);

    if (resultado) {

      res.status(201).json({ message: "Ordem enviada com sucesso!" });

    } else {

      res.status(400).json({ error: "Não é possível enviar a O.S.." });
      
    }
    
  }

  async cancelarOrdem(req: Request, res: Response) {

    const ordemData = req.body;
    const ordemBO = new OrdemBO();
    const idord = ordemData.idord;

    const resultado = await ordemBO.cancelarOrdem(idord);

    if (resultado) {

      res.status(201).json({ message: "Ordem cancelada com sucesso!" });

    } else {

      res.status(409).json({ error: "Não é possível cancelar esta ordem." });
      
    }
    
  }

  async listarSelect(req: Request, res: Response){

    const ordemBO = new OrdemBO();

    const ordem = await ordemBO.listarSelect();

    if (ordem) {
       res.status(200).json(ordem);
    }else {
       res.status(500).json({ error: "Erro ao listar O.S." });
    }

  }

  async relato(req: Request, res: Response){

    const ordemBO = new OrdemBO();

    const ordem = await ordemBO.relato();

    if (ordem) {
       res.status(200).json(ordem);
    }else {
       res.status(500).json({ error: "Erro ao listar relato" });
    }

  }

  async finalizar(req: Request, res: Response){

    const ordemData = req.body;
    const ordemBO = new OrdemBO();
    const relato = new Ordem();
    relato.id = ordemData.idord;
    relato.description = ordemData.description;

    const ordem = await ordemBO.finalizar(relato);

    if (ordem) {
       res.status(200).json(ordem);
    }else {
       res.status(500).json({ error: "Erro ao finalizar relato" });
    }

  }

}

export default OrdemController;
