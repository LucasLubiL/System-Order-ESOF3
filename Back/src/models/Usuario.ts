class Usuario {

    private _id: number;
    private _usuario: string;
    private _senha: string;
    private _idFuncionario: number;
    private _funcao: string;

    constructor(id?: number, usuario?: string, senha?: string, idFuncionario?: number, funcao?:string) {
        this._id = id ?? 0;
        this._usuario = usuario ?? "";
        this._senha = senha ?? "";
        this._idFuncionario = idFuncionario ?? 0;
        this._funcao = funcao ?? "";
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }

    public get usuario(): string {
        return this._usuario;
    }

    public set usuario(usuario: string){
        this._usuario = usuario;
    }

    public get senha(): string {
        return this._senha;
    }

    public set senha(senha: string){
        this._senha = senha;
    }

    public get idFuncionario(): number {
        return this._idFuncionario;
    }

    public set idFuncionario(idFuncionario: number){
        this._idFuncionario = idFuncionario;
    }

    public get funcao(): string {
        return this._funcao;
    }

    public set funcao(funcao: string) {
        this._funcao = funcao;
    }

  }
  
  export default Usuario;