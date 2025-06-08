class Pagamento{

    private _id?: number;
    private _nome: string;

    constructor(nome: string, id?: number){
        this._id = id;  
        this._nome = nome;
    }
    
    public get id(): number | undefined{
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }
    
    public get nome(): string{
        return this._nome;
    }

    public set nome(nome: string){
        this._nome = nome;
    }

}

export default Pagamento;