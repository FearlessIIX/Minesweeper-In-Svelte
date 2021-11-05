<script lang="ts">
    import { onMount } from 'svelte';    
    import { noop } from 'svelte/internal';
    import type { Tile}  from './utils/Tile'
    import Grid from './utils/Grid'

    let test : HTMLUListElement;
    let submitted = false;
    let wInput : HTMLInputElement;
    let hInput : HTMLInputElement;
    let nMinesInput : HTMLInputElement;
    let flagCount : number = 0;
    let flipCount : number = 0;
    let totalMines : number = 1;
    let totalTiles : number = 16;
    let flagMode : boolean = false;

    var grid : Grid;
    var tileArr : Array<Tile>;
    
    function genMines(width, height, mines) {

        let tileCount = width * height;
        let row = 1, mineCount = 1;
        
        //Generating the html content for the visuals
        while (row <= height) {
            let currentRow : HTMLDivElement = document.createElement("div");
            let col = 1;

            currentRow.className = "row";

            while (col <= width) {
                let tileNode : HTMLDivElement = document.createElement("div");
                tileNode.innerText = ``;
                tileNode.className = `mine-node t-${mineCount}`;

                currentRow.appendChild(tileNode);

                mineCount++;
                col++;
            }

            row++;
            test.appendChild(currentRow);
        }
        //Genertating the js side of the mine logic
        grid = new Grid(width, height, mines)
        tileArr = grid.retGrid();


        totalMines = mines;
        totalTiles = (width * height);
    }
    
    function handleClick(event) {
        let elm : HTMLElement = event.target;
        let mNum : number = parseInt(elm.className.split("-")[2])
        let gTile = tileArr[mNum - 1];

        console.log(elm);
        console.log(gTile);

        if (elm.classList[0] == "flag-btn") {
            if (flagMode) {
                flagMode = false;
                elm.style.backgroundColor = "rgb(200, 200, 200)";
            }
            else {
                flagMode = true;
                elm.style.backgroundColor = "#004D0D";
            }
        }
        else if (event.ctrlKey || flagMode) {
            if (gTile.isFlagged()) {
                elm.innerText = "";
                elm.style.color = "black";
                gTile.flag(false);
                flagCount--;
            }
            else {
                if (!(gTile.isFlipped())) {
                    elm.innerText = "?";
                    elm.style.color = "magenta";
                    gTile.flag(true);
                    flagCount++;
                }
            }
        }
        else {
            if (!(gTile.isFlipped()) && !(gTile.isFlagged())) {
                gTile.flip();
                flipCount++;
                if (gTile.isMine()) {
                    elm.innerText = "*";
                    elm.style.color = "black";
                    elm.style.fontSize = "30px";
                    alert("you lose");
                    location.reload();
                }
                else {
                    let safety = gTile.getSafety();
                    elm.innerText = `${safety}`
                    switch (safety) {
                        case 0: {
                            elm.innerText = "";
                            elm.style.color = "rgb(200, 200, 200)";
                            break;
                        }
                        case 1: {
                            //#1F53FF
                            elm.style.color = "blue";
                            break;
                        }
                        case 2: {
                            //#12FF31
                            elm.style.color = "green";
                            break;
                        }
                        case 3: {
                            //#FF2E17
                            elm.style.color = "red";
                            break;
                        }
                        case 4: {
                            //#021275
                            elm.style.color = "darkblue";
                            break;
                        }
                        case 5: {
                            //#750202
                            elm.style.color = "darkred";
                            break;
                        }
                        case 6: {
                            elm.style.color = "darkcyan";
                            break;
                        }
                        case 7: {
                            elm.style.color = "black";
                            break;
                        }
                        case 8: {
                            elm.style.color = "darkgrey";
                            break;
                        }
                    }
                }
            }
        }
        if (flagCount == totalMines) {
            if ((flagCount + flipCount) == totalTiles) {
                alert("you win!!");
                location.reload();
            }
        }
    }

    function submit(e) {
        e.preventDefault();
        //Grabbing the data from the inputs, anything inside the inputs that causes an error will make the input variable equal to Nan        
        var wi = wInput.valueAsNumber;
        var hi = hInput.valueAsNumber;
        var nm = nMinesInput.valueAsNumber;

        if (wi < 4) {
            alert("Width value must exceed 3");
        }
        else if (hi < 4) {
            alert("Height value must exceed 3");
        }
        else if (nm > (wi * hi) - 1) {
            alert("Number of mines may not exceed the amount of available spaces");
        }
        else if (submitted == false) {
            alert("Submitted!!")
            submitted = true;
            genMines(wi, hi, nm);
        }
    }
</script>
<!-- This is the container for the different counts for gameplay -->
{#if submitted}
<div class="topbar">
    <div class="node">
        <label for="mine-count">Mines: </label>
        <h1 name="mine-count">{totalMines}</h1>
    </div>
    <div class="node">
        <label for="tile-count">Tiles: </label>
        <h1 name="tile-count">{totalTiles}</h1>
    </div>
    <div class="node">
        <label for="flag-count">Flagged: </label>
        <h1 name="flag-count">{flagCount}</h1>
    </div>
    <div class="node">
        <label for="flip-count">Flipped: </label>
        <h1 name="flip-count">{flipCount}</h1>
    </div>
    <button class="flag-btn" on:click={handleClick}>Flag</button>
</div>
{/if}

<!-- This is the container for all of the mines that will be generated -->
<ul bind:this={test} on:click={handleClick}></ul>

<!-- This is the container for the form to get the width and height for the mine-grid -->
{#if !submitted}
<form class="form" on:submit={submit}>

    <div class="control-margin"></div>

    <div class="width">
        <label for="width">Grid Width</label>
        <input type="number" id="width" name="width" min="4" value="9" bind:this={wInput}>
    </div>

    <div class="control-margin"></div>
    <div class="height">
        <label for="height">Grid Height</label>
        <input type="number" id="height" name="height" min="4" value="9" bind:this={hInput} >
    </div>
    <div class="control-margin"></div>
    <div class="mines">
        <label for="num-mines">Number Of Mines</label> 
        <input type="number" id="num-mines" name="num-mines" min="1" value="15" bind:this={nMinesInput}>
    </div>

    <div class="control-margin"></div>
    <div class="btn-con">
        <button on:click={submit}> 
            Submit
        </button>
    </div>
</form>
{/if}
<style>
    @import "./Style/Form.css";
    @import "./Style/Mines.css";
    @import "./Style/Topbar.css";
</style>
