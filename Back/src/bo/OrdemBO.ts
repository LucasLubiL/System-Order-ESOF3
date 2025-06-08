import OrdemDAO from "../dao/OrdemDAO";
import Ordem from "../models/Ordem";

class OrdemBO {

    private ordemDAO: OrdemDAO;

    constructor() {

      this.ordemDAO = new OrdemDAO();

    }

    async criarOrdem(ordem: Ordem): Promise<boolean> {

      return await this.ordemDAO.criarOrdem(ordem);

    }

    async finalizarOrdem(ordem: Ordem): Promise<boolean> {

      return await this.ordemDAO.finalizarOrdem(ordem);
      
    }

    async enviarOrdem(ordem: Ordem): Promise<boolean> {

      return await this.ordemDAO.enviarOrdem(ordem);
      
    }

    async cancelarOrdem(idord: number): Promise<boolean> {

      return await this.ordemDAO.cancelarOrdem(idord);
      
    }

    async listarSelect(){

      return await this.ordemDAO.listarSelect();
      
    }

    async relato(){

      return await this.ordemDAO.relato();
      
    }

    async finalizar(relato: Ordem){

      return await this.ordemDAO.finalizar(relato);
      
    }

}

export default OrdemBO;
