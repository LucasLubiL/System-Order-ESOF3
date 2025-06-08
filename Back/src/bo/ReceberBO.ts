import ReceberDAO from "../dao/ReceberDAO";
import Receber from "../models/Receber";

class ReceberBO {

    private receberDAO: ReceberDAO;

    constructor() {

      this.receberDAO = new ReceberDAO();

    }

    async criarRegistro(receber: Receber): Promise<boolean> {

      return await this.receberDAO.criarRegistro(receber);

    }

    async finalizar(receber: Receber): Promise<boolean> {

        return await this.receberDAO.finalizar(receber);
      
    }

    async listarSelect(){

        return await this.receberDAO.listarSelect();

    }

}

export default ReceberBO;
