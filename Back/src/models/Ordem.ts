class Ordem{

    private _id?: number;
    private _status?: number;
    private _description?: string;
    private _valor?: number;
    private _ordData?: Date;
    private _idPag?: number;
    private _idService?: number;
    private _idFunc?: number;
    private _idCliente?: number;
    private _msgDev?: string;
    private _statusChar?: string;
    private _ordDataFinal?: Date;
    private _descriptionCliente?: string

    constructor( id?: number, status?: number, description?: string, valor?: number, ordData?: Date, idPag?: number, idService?: number, idFunc?: number, idCliente?: number, msgDev?: string, statusChar?: string, ordDataFinal?: Date, descriptionCliente?: string){
        if(id) this._id = id;
        if(status) this._status = status;
        if(description) this._description = description;
        if(valor) this._valor = valor;
        if(ordData) this._ordData = ordData;
        if(idPag) this._idPag = idPag;
        if(idService) this._idService = idService;
        if(idFunc) this._idFunc = idFunc;
        if(idCliente) this._idCliente = idCliente;
        if(msgDev) this._msgDev = msgDev;
        if(statusChar) this._statusChar = statusChar;
        if(ordDataFinal) this._ordDataFinal = ordDataFinal;
        if(descriptionCliente) this._descriptionCliente = descriptionCliente;
    }

    public get id(): number | undefined{
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }

    public get status(): number | undefined{
        return this._status;
    }

    public set status(status: number){
        this._status = status;
    }

    public get description(): string | undefined{
        return this._description;
    }

    public set description(description: string){
        this._description = description;
    }

    public get valor(): number | undefined{
        return this._valor;
    }

    public set valor(valor: number){
        this._valor = valor;
    }

    public get ordData(): Date | undefined{
        return this._ordData;
    }

    public set ordData(ordData: Date){
        this._ordData = ordData;
    }

    public get idPag(): number | undefined{
        return this._idPag;
    }

    public set idPag(idPag: number){
        this._idPag = idPag;
    }

    public get idService(): number | undefined{
        return this._idService;
    }

    public set idService(idService: number){
        this._idService = idService;
    }

    public get idFunc(): number | undefined{
        return this._idFunc;
    }

    public set idFunc(idFunc: number){
        this._idFunc = idFunc;
    }

    public get idCliente(): number | undefined{
        return this._idCliente;
    }

    public set idCliente(idCliente: number){
        this._idCliente = idCliente;
    }

    public get msgDev(): string | undefined{
        return this._msgDev;
    }

    public set msgDev(msgDev: string) {
        this._msgDev = msgDev;
    }

    public get statusChar(): string | undefined{
        return this._statusChar;
    }

    public set statusChar(statusChar: string){
        this._statusChar = statusChar;
    }

    public get ordDataFinal(): Date | undefined{
        return this._ordDataFinal;
    }

    public set ordDataFinal(ordDataFinal: Date){
        this._ordDataFinal = ordDataFinal;
    }

    public get descriptionCliente(): string | undefined{
        return this._descriptionCliente;
    }

    public set descriptionCliente(descriptionCliente: string){
        this._descriptionCliente = descriptionCliente;
    }

}

export default Ordem;