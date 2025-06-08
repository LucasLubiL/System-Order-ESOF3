class Receber{

    private _id?: number;
    private _status?: string
    private _valor?: number;
    private _recData?: Date;
    private _idOrd?: number;
    private _idPag?: number;
    private _idCliente?: number;

    constructor(id?: number, status?: string, valor?: number, idPag?: number, idCliente?: number, idOrd?: number, recData?: Date){
        this._id = id;
        this._status = status;
        this._valor = valor;
        this._idPag = idPag;
        this._idCliente = idCliente;
        this._idOrd = idOrd;
        this._recData = recData;
    }

    public get id(): number | undefined{
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }

    public get status(): string | undefined{
        return this._status;
    }

    public set status(status: string){
        this._status = status;
    }

    public get valor(): number | undefined{
        return this._valor;
    }

    public set valor(valor: number){
        this._valor = valor;
    }

    public get recData(): Date | undefined{
        return this._recData;
    }

    public set recData(recData: Date){
        this._recData = recData;
    }

    public get idOrd(): number | undefined{
        return this._idOrd;
    }

    public set idOrd(idOrd: number){
        this._idOrd = idOrd;
    }

    public get idPag(): number | undefined{
        return this._idPag;
    }

    public set idPag(idPag: number){
        this._idPag = idPag;
    }

    public get idCliente(): number | undefined{
        return this._idCliente;
    }

    public set idCliente(idCliente: number){
        this._idCliente = idCliente;
    }

}

export default Receber;