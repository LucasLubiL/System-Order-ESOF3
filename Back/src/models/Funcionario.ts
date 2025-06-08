import Cliente from './Cliente';

class Funcionario extends Cliente {

    private _funcao: string;
    private _salario: number;
    private _usuario: boolean;

    constructor(nome: string, cpf: string, data_nascimento: Date, endereco: string, cidade: string, estado: string, funcao: string, salario: number, usuario: boolean, id?: number) {
        super(nome, cpf, data_nascimento, endereco, cidade, estado, id);
        this._funcao = funcao;
        this._salario = salario;
        this._usuario = usuario;
    }

    public get funcao(): string {
      return this._funcao;
    }
  
    public set funcao(funcao: string) {
      this._funcao = funcao;
    }

    public get salario(): number {
      return this._salario;
    }

    public set salario(salario: number) {
      this._salario = salario;
    }

    public get usuario(): boolean{
      return this._usuario;
    }

    public set usuario(usuario: boolean){
      this._usuario = usuario;
    }

  }

export default Funcionario;
  