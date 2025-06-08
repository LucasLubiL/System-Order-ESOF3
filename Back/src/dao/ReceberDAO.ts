import pool from "../config/database";
import Receber from "../models/Receber";

class ReceberDAO {

    async criarRegistro(receber: Receber): Promise<boolean> {

        try {

            const query = `INSERT INTO receber (valor, idpag, idcliente, status, idord)VALUES ($1, $2, $3, $4, $5) RETURNING idrec`;
            const values = [
                receber.valor,
                receber.idPag,
                receber.idCliente,
                "Aberto",
                receber.idOrd
            ];

            console.log("Executando INSERT Registro com:", values);

            const result = await pool.query(query, values);

            if (result && result.rows && result.rows[0]) {

                console.log(`Registro criado com sucesso! ID: ${result.rows[0].idrec}`);
                return true;

            } else {

               console.error("Erro: Nenhum dado do Registro foi inserido.");
                return false;

            }

        } catch (error) {
            console.error("Erro ao criar Registro no banco:", error);
            return false;
        }
        
    }

    async finalizar(receber: Receber): Promise<boolean> {

        try {

            const query = `UPDATE receber SET status = 'Finalizado', rec_date = NOW() WHERE idrec = $1`;

            console.log("Executando UPDATE com:", receber.id);

            await pool.query(query, [receber.id]);

            return true

        } catch (error) {
            console.error("Erro ao finalizar registro no banco:", error);
            return false;
        }
        
    }

    async listarSelect(){

        try{

            const query = `SELECT * FROM receber ORDER BY idrec`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar registro de pagamento:", error);
            return false;
        }
    }

}

export default ReceberDAO;
