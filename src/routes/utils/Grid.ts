import { Tile } from "./Tile";

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
            while(col <= this._width) {
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
                    
                    if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                    if (this.getBottomLeft(tileNum).isMine()) surMines += 1;    //bottom left
                    if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                    
                }
                else if (tile.getTNum() == 1) {
                    tile.setType("tl")

                    //r, br, b

                    if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                    if (this.getBottomRight(tileNum).isMine()) surMines += 1;   //bottom right
                    if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                }
                else {
                    tile.setType("t")

                    //r, br, b, bl, l

                    if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                    if (this.getBottomRight(tileNum).isMine()) surMines += 1;   //bottom right
                    if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                    if (this.getBottomLeft(tileNum).isMine()) surMines += 1;    //bottom left
                    if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                }
            }
            else if (tileNum % this._width == 0) {
                if (tileNum == (this._height * this._width)) {
                    tile.setType("br")

                    //t, l, tl

                    if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                    if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                    if (this.getTopLeft(tileNum).isMine()) surMines += 1;       //top left
                }
                else {
                    tile.setType("r")

                    //t, b, bl, l, tl

                    if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                    if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                    if (this.getBottomLeft(tileNum).isMine()) surMines += 1;    //bottom left
                    if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                    if (this.getTopLeft(tileNum).isMine()) surMines += 1;       //top left
                }
            }
            else if ((tileNum - 1) % this._width == 0) {
                if (tileNum == (this._width * this._height) - (this._width - 1)) {
                    tile.setType("bl")

                    //t, tr, r

                    if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                    if (this.getTopRight(tileNum).isMine()) surMines += 1;      //top right
                    if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                }
                else {
                    tile.setType("l")

                    //t, tr, r, br, b

                    if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                    if (this.getTopRight(tileNum).isMine()) surMines += 1;      //top right
                    if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                    if (this.getBottomRight(tileNum).isMine()) surMines += 1;   //bottom right
                    if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                }
            }
            else if (tileNum > (this._width * this._height - (this._width - 1))) {
                tile.setType("b")

                //t, tr, r, l, tl

                if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                if (this.getTopRight(tileNum).isMine()) surMines += 1;      //top right
                if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                if (this.getTopLeft(tileNum).isMine()) surMines += 1;       //top left
            }
            else {
                tile.setType("m")

                //t, tr, r, br, b, bl, l, tl

                if (this.getTop(tileNum).isMine()) surMines += 1;           //top
                if (this.getTopRight(tileNum).isMine()) surMines += 1;      //top right
                if (this.getRight(tileNum).isMine()) surMines += 1;         //right
                if (this.getBottomRight(tileNum).isMine()) surMines += 1;   //bottom right
                if (this.getBottom(tileNum).isMine()) surMines += 1;        //bottom
                if (this.getBottomLeft(tileNum).isMine()) surMines += 1;    //bottom left
                if (this.getLeft(tileNum).isMine()) surMines += 1;          //left
                if (this.getTopLeft(tileNum).isMine()) surMines += 1;       //top left

            }
            tile.setSafety(surMines);
        }
        this._grid = gd
    }

    // ! Get rid of the commented console.log()'s in the functions below before pushing the final product 

    public getTop(num : number) : Tile {
        // console.log((num - 1) - this._width);
        return this._grid[(num - 1) - this._width]
    }
    public getTopRight(num : number) : Tile {
        // console.log(num - this._width);
        return this._grid[num - this._width]
    }
    public getRight(num : number) : Tile {
        // console.log(num);
        return this._grid[num]
    }
    public getBottomRight(num : number) : Tile {
        // console.log(num + this._width);
        return this._grid[num + this._width]
    }
    public getBottom(num : number) : Tile {
        // console.log((num - 1) + this._width);
        return this._grid[(num - 1) + this._width]
    }
    public getBottomLeft(num : number) : Tile {
        // console.log((num - 2) + this._width);
        return this._grid[(num - 2) + this._width]
    }
    public getLeft(num : number) : Tile {
        // console.log((num - 2));
        return this._grid[(num - 2)]
    }
    public getTopLeft(num : number) : Tile {
        // console.log((num - 1) - (this._width + 1));
        return this._grid[(num - 1) - (this._width + 1)]
    }
}
