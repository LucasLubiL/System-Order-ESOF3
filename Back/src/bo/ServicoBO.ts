import ServicoDAO from "../dao/ServicoDAO";
import Servico from "../models/Servico";

class ServicoBO {

    private servicoDAO: ServicoDAO;

    constructor() {

      this.servicoDAO = new ServicoDAO();

    }

    async cadastrar(servico: Servico): Promise<boolean> {
     
      const verific = await this.servicoDAO.verificar(servico.nomeServico);

      if(verific){
        return false;
      }
      
      return await this.servicoDAO.cadastrar(servico);

    }

    async atualizar(servico: Servico): Promise<boolean> {

        return await this.servicoDAO.atualizar(servico);
      
    }

    async excluir(idservice: number): Promise<boolean> {

        return await this.servicoDAO.excluir(idservice);
      
    }

    async listarSelect(){
      return await this.servicoDAO.listarSelect();
    }

}

export default ServicoBO;
