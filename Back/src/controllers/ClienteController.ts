import { Request, Response } from "express";
import ClienteBO from "../bo/ClienteBO";
import Cliente from "../models/Cliente";

class ClienteController {

  async cadastrar(req: Request, res: Response) {

    const clienteData = req.body;
    const clienteBO = new ClienteBO();
    const cliente = new Cliente(
        clienteData.nome,
        clienteData.cpf,
        new Date(clienteData.data_nascimento),
        clienteData.endereco,
        clienteData.cidade,
        clienteData.estado,
    );

    const resultado = await clienteBO.cadastrar(cliente);

    if (resultado) {

      res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

    } else {

      res.status(400).json({ error: "CPF já cadastrado. Não é possível cadastrar este cliente." });
      
    }
    
  }

  async atualizar(req: Request, res: Response) {

    const clienteData = req.body;
    const clienteBO = new ClienteBO();
    const cliente = new Cliente(
        clienteData.nome,
        clienteData.cpf,
        new Date(clienteData.data_nascimento),
        clienteData.endereco,
        clienteData.cidade,
        clienteData.estado,
        Number(clienteData.id)
    );

    const resultado = await clienteBO.atualizar(cliente);

    if (resultado) {

      res.status(201).json({ message: "Cliente atualizado com sucesso!" });

    } else {

      res.status(400).json({ error: "Não é possível atualizar este cliente." });
      
    }
    
  }

  async excluir(req: Request, res: Response) {

    const clienteData = req.body;
    const clienteBO = new ClienteBO();
    const id = clienteData.id;

    const resultado = await clienteBO.excluir(id);

    if (resultado) {

      res.status(201).json({ message: "Cliente exclúido com sucesso!" });

    } else {

      res.status(400).json({ error: "Não é possível excluir este cliente." });
      
    }
    
  }

  async listarSelect(req: Request, res: Response){

    const clienteBO = new ClienteBO();

    const clientes = await clienteBO.listarSelect();

    if (clientes) {
       res.status(200).json(clientes);
    }else {
       res.status(500).json({ error: "Erro ao listar clientes" });
    }

  }

  async clienteRegistro(req: Request, res: Response){

    const clienteBO = new ClienteBO();

    const clientes = await clienteBO.clienteRegistro();

    if (clientes) {
       res.status(200).json(clientes);
    }else {
       res.status(500).json({ error: "Erro ao listar clientes" });
    }

  }

}

export default ClienteController;
