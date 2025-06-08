import pool from "../config/database";
import Pagamento from "../models/Pagamento";

class PagamentoDAO {

    async cadastrar(pagamento: Pagamento): Promise<boolean> {

        try {

            const query = `INSERT INTO pagamento(nome)VALUES($1) RETURNING idpag`;
            const values = [
                pagamento.nome 
            ];

            console.log("Executando INSERT com:", values);

            const result = await pool.query(query, values);

            if (result && result.rows && result.rows[0]) {

                console.log(`Pagamento cadastrado com sucesso! ID: ${result.rows[0].idpag}`);
                return true;

            } else {

               console.error("Erro: Nenhum dado foi inserido.");
                return false;

            }

        } catch (error) {
            console.error("Erro ao cadastrar pagamento no banco:", error);
            return false;
        }

    }

    async atualizar(pagamento: Pagamento): Promise<boolean> {

        try {

            const query = `UPDATE pagamento SET nome = $1 WHERE idpag = $2`;
            const values = [
                pagamento.nome,
                pagamento.id
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao atualizar pagamento no banco:", error);
            return false;
        }
        
    }

    async excluir(idpag: number): Promise<boolean> {

        try {

           
            const query = `DELETE FROM pagamento WHERE idpag = $1`;

            console.log("Executando DELETE com:", idpag);

            await pool.query(query, [idpag]);

            return true

        } catch (error) {
            console.error("Erro ao excluir pagamento no banco:", error);
            return false;
        }
        
    }

    async verificar(pagamento: string): Promise<boolean> {

        try{

            const query = `SELECT * FROM pagamento WHERE nome ILIKE $1`;

            const result = await pool.query(query, [pagamento]);

            return result.rows.length > 0;

        }catch (error) {
            console.error("Erro ao buscar pagamento no banco:", error);
            return false;
        }

    }

    async listarSelect(){

        try{

            const query = `SELECT * FROM pagamento ORDER BY idpag`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar forma de pagamento no banco para o select do pagamento:", error);
            return false;
        }
    }

    async pagamentoRegistro(){

        try{

            const query = `SELECT * FROM pagamento ORDER BY idpag`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar forma de pagamento no banco para o registro de pagamento:", error);
            return false;
        }
    }

}

export default PagamentoDAO;
