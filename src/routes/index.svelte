<script lang="ts">
    import { onMount } from 'svelte';    
    import { noop } from 'svelte/internal';
    import type { Tile}  from './utils/Tile'
    import Grid from './utils/Grid'
    // onMount (fOnMount);
    let test : HTMLUListElement;
    let submitted = false;
    let wInput : HTMLInputElement;
    let hInput : HTMLInputElement;
    let nMinesInput : HTMLInputElement;
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
                tileNode.innerText = `${mineCount}`;
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
        tileArr = grid.retGrid()
    }
    
    function clickMine(event) {
        let elm : HTMLElement = event.target;
        
        let mNum : number = parseInt(elm.className.split("-")[2])
        let gTile = tileArr[mNum - 1];
        alert(gTile.getType())
        if (!(gTile.isFlipped())) {
            gTile.flip()
        }
        if (gTile.isMine()) {
            elm.innerText = "*";
            elm.style.color = "red";
        }
        else {
            elm.innerText = `${gTile.getSafety()}`
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

<!-- This is the container for all of the mines that will be generated -->
<ul bind:this={test} on:click={clickMine}></ul>

<!-- This is the container for the form to get the width and height for the mine-grid -->
{#if !submitted}
<form class="form" on:submit={submit}>

    <div class="control-margin"></div>

    <div class="width">
        <label for="width">Grid Width</label>
        <input type="number" id="width" name="width" min="4" value="4" bind:this={wInput}>
    </div>

    <div class="control-margin"></div>
    <div class="height">
        <label for="height">Grid Height</label>
        <input type="number" id="height" name="height" min="4" value="4" bind:this={hInput} >
    </div>
    <div class="control-margin"></div>
    <div class="mines">
        <label for="num-mines">Number Of Mines</label> 
        <input type="number" id="num-mines" name="num-mines" min="1" value="1" bind:this={nMinesInput}>
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
</style>