import { Request, Response } from "express";
import PagamentoBO from "../bo/PagamentoBO";
import Pagamento from "../models/Pagamento";

class PagamentoController {

  async cadastrar(req: Request, res: Response) {

    const pagamentoData = req.body;
    const pagamentoBO = new PagamentoBO();
    const pagamento = new Pagamento(
        pagamentoData.nome
    );

    const resultado = await pagamentoBO.cadastrar(pagamento);

    if (resultado) {

      res.status(201).json({ message: "Pagamento cadastrado com sucesso!" });

    } else {

      res.status(400).json({ error: "Pagamento já cadastrado. Não é possível cadastrar este pagamento." });
      
    }
    
  }

  async atualizar(req: Request, res: Response) {

      const pagamentoData = req.body;
      const pagamentoBO = new PagamentoBO();
      const pagamento = new Pagamento(
          pagamentoData.nome,
            pagamentoData.id
      );

      const resultado = await pagamentoBO.atualizar(pagamento);

      if (resultado) {

      res.status(201).json({ message: "Pagamento atualizado com sucesso!" });

      } else {

      res.status(400).json({ error: "Não é possível atualizar este pagamento." });
        
      }
        
  }

  async excluir(req: Request, res: Response) {

      const pagamentoData = req.body;
      const pagamentoBO = new PagamentoBO();
      const idpag = pagamentoData.id;
        
      const resultado = await pagamentoBO.excluir(idpag);

      if (resultado) {

      res.status(201).json({ message: "Pagamento exclúido com sucesso!" });

      } else {

      res.status(409).json({ error: "Não é possível excluir este Pagamento." });
        
      }
        
  }

  async listarSelect(req: Request, res: Response){

    const pagamentoBO = new PagamentoBO();

    const pagamentos = await pagamentoBO.listarSelect();

    if (pagamentos) {
       res.status(200).json(pagamentos);
    }else {
       res.status(500).json({ error: "Erro ao listar pagamentos" });
    }

  }

  async pagamentoRegistro(req: Request, res: Response){

    const pagamentoBO = new PagamentoBO();

    const pagamentos = await pagamentoBO.pagamentoRegistro();

    if (pagamentos) {
       res.status(200).json(pagamentos);
    }else {
       res.status(500).json({ error: "Erro ao listar pagamentos" });
    }

  }

}

export default PagamentoController;
