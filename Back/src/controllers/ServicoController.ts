import { Request, Response } from "express";
import ServicoBO from "../bo/ServicoBO";
import Servico from "../models/Servico";

class ServicoController {

  async cadastrar(req: Request, res: Response) {
    
    const servicoData = req.body;
    const servicoBO = new ServicoBO();
    const servico = new Servico(
        servicoData.nome
    );

    const resultado = await servicoBO.cadastrar(servico);

    if (resultado) {

      res.status(201).json({ message: "Serviço cadastrado com sucesso!" });

    } else {

      res.status(400).json({ error: "Serviço já cadastrado. Não é possível cadastrar este serviço." });
      
    }

  }

  async atualizar(req: Request, res: Response) {

      const servicoData = req.body;
      const servicoBO = new ServicoBO();
      const servico = new Servico(
          servicoData.nome,
          servicoData.id
      );

      const resultado = await servicoBO.atualizar(servico);

      if (resultado) {

      res.status(201).json({ message: "Servico atualizado com sucesso!" });

      } else {

      res.status(400).json({ error: "Não é possível atualizar este serviço"});
        
      }
        
  }

  async excluir(req: Request, res: Response) {

      const servicoData = req.body;
      const servicoBO = new ServicoBO();
      const idservice = servicoData.id;
        
      const resultado = await servicoBO.excluir(idservice);

      if (resultado) {

      res.status(201).json({ message: "Serviço exclúido com sucesso!" });

      } else {

      res.status(409).json({ error: "Não é possível excluir este serviço." });
        
      }
        
  }

  async listarSelect(req: Request, res: Response){

    const servicoBO = new ServicoBO();

    const servico = await servicoBO.listarSelect();

    if (servico) {
       res.status(200).json(servico);
    }else {
       res.status(500).json({ error: "Erro ao listar servicos" });
    }

  }

}

export default ServicoController;
