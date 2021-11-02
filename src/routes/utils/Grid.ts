import { Tile }  from "./Tile"

export default class Grid {
    private _width : number;
    private _height : number;
    private _numMines : number;
    private _grid : Array<Tile> = [];
    constructor(width : number, height : number, mineNum : number) {
        this._width = width;
        this._height = height;
        this._numMines = mineNum;

        //generates the empty grid
        this.getGrid();
        this.genMines();
        this.typeTiles();
    }
    public getGrid() {
        let row = 1;
        let tCount = 1;
        while (row <= this._height) {
            let col = 1;
            while(col <= this._height) {
                this._grid.push(new Tile(tCount))
                col++;
                tCount++;
            }
            row++;
        }
    }
    public genMines() {
        let createdMines = 0;
        while (createdMines < this._numMines) {
            let mineLoc = Math.floor(Math.random() * (this._width * this._height) + 1);
            let selectedMine = this._grid[mineLoc - 1];
            if (!(selectedMine.isMine())) {
                selectedMine.setMine(true);
                createdMines++;
            }
        }
    }
    public retGrid() : Array<Tile> {
        return this._grid;
    }
    private typeTiles() {
        let gd = this._grid;
        for (const tile of this._grid) {
            // Dont question it. For some reason i couldn't sub one from the value returned from getTNum
            let tileNum = tile.getTNum()
            let surMines = 0;
            if (tileNum <= this._width) {
                if (tileNum == this._width) {
                    tile.setType("tr")
                    
                    //b, bl, l
                    if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                    if (gd[tileNum + (this._width - 1)].isMine()) surMines++;       //bottom left
                    if (gd[tileNum - 1].isMine()) surMines++;                       //left
                }
                else if (tile.getTNum() == 1) {
                    tile.setType("tl")

                    //r, br, b
                    if (gd[tileNum + 1].isMine()) surMines++;                       //right
                    if (gd[tileNum + (this._width + 1)].isMine()) surMines++        //bottom right
                    if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                }
                else {
                    tile.setType("t")

                    //r, br, b, bl, l
                    if (gd[tileNum + 1].isMine()) surMines++;                       //right
                    if (gd[tileNum + (this._width + 1)].isMine()) surMines++        //bottom right
                    if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                    if (gd[tileNum + (this._width - 1)].isMine()) surMines++;       //bottom left
                    if (gd[tileNum - 1].isMine()) surMines++;                       //left
                }
            }
            else if (tileNum % this._width == 0) {
                if (tileNum == (this._height * this._width)) {
                    tile.setType("br")

                    //l, tl, t
                    if (gd[tileNum - 1].isMine()) surMines++;                       //left
                    if (gd[tileNum - (this._width + 1)].isMine()) surMines++;       //top left
                    if (gd[tileNum - this._width].isMine()) surMines++              //top
                }
                else {
                    tile.setType("r")

                    //b, bl, l, tl, t
                    if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                    if (gd[tileNum + (this._width - 1)].isMine()) surMines++;       //bottom left
                    if (gd[tileNum - 1].isMine()) surMines++;                       //left
                    if (gd[tileNum - (this._width + 1)].isMine()) surMines++;       //top left
                    if (gd[tileNum - this._width].isMine()) surMines++              //top
                }
            }
            else if ((tileNum - 1) % this._width == 0) {
                if (tileNum == (this._width * this._height) - (this._width - 1)) {
                    tile.setType("bl")

                    //t, tr, r
                    if (gd[tileNum - this._width].isMine()) surMines++              //top
                    if (gd[tileNum - (this._width - 1)].isMine()) surMines++;       //top right
                    if (gd[tileNum + 1].isMine()) surMines++;                       //right
                }
                else {
                    tile.setType("l")

                    //t, tr, r, br, b
                    if (gd[tileNum - this._width].isMine()) surMines++              //top
                    if (gd[tileNum - (this._width - 1)].isMine()) surMines++;       //top right
                    if (gd[tileNum + 1].isMine()) surMines++;                       //right
                    if (gd[tileNum + (this._width + 1)].isMine()) surMines++        //bottom right
                    if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                }
            }
            else if (tileNum > (this._width * this._height - (this._height - 1))) {
                tile.setType("b")

                //t, tr, r, l, tl
                if (gd[tileNum - this._width].isMine()) surMines++              //top
                if (gd[tileNum - (this._width - 1)].isMine()) surMines++;       //top right
                if (gd[tileNum + 1].isMine()) surMines++;                       //right
                if (gd[tileNum - 1].isMine()) surMines++;                       //left
                if (gd[tileNum - (this._width + 1)].isMine()) surMines++;       //top left
            }
            else {
                tile.setType("m")

                //t, tr, r, br, b, bl, l, tl
                if (gd[tileNum - this._width].isMine()) surMines++              //top
                if (gd[tileNum - (this._width - 1)].isMine()) surMines++;       //top right
                if (gd[tileNum + 1].isMine()) surMines++;                       //right
                if (gd[tileNum + (this._width + 1)].isMine()) surMines++        //bottom right
                if (gd[tileNum + this._width].isMine()) surMines++;             //bottom
                if (gd[tileNum + (this._width - 1)].isMine()) surMines++;       //bottom left
                if (gd[tileNum - 1].isMine()) surMines++;                       //left
                if (gd[tileNum - (this._width + 1)].isMine()) surMines++;       //top left
            }
            tile.setSafety(surMines);
        }
        this._grid = gd
    }
}