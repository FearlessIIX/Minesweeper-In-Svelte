 /**
 * Tile Class
 */
export class Tile {
    private _isMine: boolean = false;
    private _tNum: number;
    private _flipped : boolean = false;
    private _type : string;
    private _safety : number;
    private _flagged : boolean = false;

    constructor(tNum: number) {
        this._tNum = tNum;
    }
    public setMine(isM : boolean) {
        this._isMine = !this._isMine
    }
    public isMine() : boolean {
        return this._isMine
    }
    public isFlipped() : boolean {
        return this._flipped;
    }
    public flip() {
        this._flipped = true;
    }
    public getTNum() : number {
        return this._tNum;
    }
    public getType() : string {
        return this._type
    }
    public setType(type : string) {
        this._type = type
    }
    public getSafety() : number {
        return this._safety;
    }
    public setSafety(safety) {
        this._safety = safety;
    }
    public flag(status : boolean) {
        this._flagged = status;
    }
    public isFlagged() : boolean {
        return this._flagged;
    }
}
