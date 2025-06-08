class Cliente {

    private _id?: number;
    private _nome: string;
    private _cpf: string;
    private _data_nascimento: Date;
    private _endereco: string;
    private _cidade: string;
    private _estado: string;
  
    constructor(nome: string, cpf: string, data_nascimento: Date, endereco: string, cidade: string, estado: string, id?: number){
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._data_nascimento = data_nascimento;
        this._endereco = endereco;
        this._cidade = cidade;
        this._estado = estado;
    }
  
    public get id(): number | undefined{
      return this._id;
    }
  
    public set id(id: number) {
      this._id = id;
    }
  
    public get nome(): string {
      return this._nome;
    }
  
    public set nome(nome: string) {
      this._nome = nome;
    }
  
    public get cpf(): string {
      return this._cpf;
    }
  
    public set cpf(cpf: string) {
      this._cpf = cpf;
    }
  
    public get data_nascimento(): Date {
      return this._data_nascimento;
    }
  
    public set data_nascimento(data_nascimento: Date) {
      this._data_nascimento = data_nascimento;
    }
  
    public get endereco(): string {
      return this._endereco;
    }
  
    public set endereco(endereco: string) {
      this._endereco = endereco;
    }
  
    public get cidade(): string {
      return this._cidade;
    }
  
    public set cidade(cidade: string) {
      this._cidade = cidade;
    }
  
    public get estado(): string {
      return this._estado;
    }
  
    public set estado(estado: string) {
      this._estado = estado;
    }

  }

export default Cliente;
  