<script lang="ts">
    import { onMount } from 'svelte';    
    // onMount (fOnMount);
    let test : HTMLUListElement;
    let submitted = false;
    let wInput : HTMLInputElement;
    let hInput : HTMLInputElement;
    let nMinesInput : HTMLInputElement;
    
    function genMines() {
        // !! TODO !! this is a temporary value that will be changed to an actual form later on once we get started
        // fuck i was in your file instead of mine
        let width = 10;
        let height = 10;
        let tileCount = width * height
        
        var row = 1; var mineCount = 1;
        while (row <= height) {
            var currentRow : HTMLDivElement = document.createElement("div");
            currentRow.className = "row"
            var col = 1;
            while (col <= width) {
                var tileNode : HTMLDivElement = document.createElement("div");
                tileNode.innerText = `${mineCount}`;
                mineCount++;
                tileNode.className = `mine-node t-${row}-${col}`;
                currentRow.appendChild(tileNode);
                col++;
            }
            row++;
            test.appendChild(currentRow);
        }
    }
    // This is the onMount function, it is ran when the form is submitted
    // function fOnMount() {
    //     genMines();
    // }
    function clickMine(event: Event) {
        let elm = event.target;
    }
    
    //BUT HEY, at least MYYY error label is RED with an UNDERLINE


    
    // sure
    //i brb real quick... you get it set up tho
    function submit(e) {
        e.preventDefault()
        
        //Grabbing the data from the inputs, anything inside the inputs that causes an error will make the input variable equal to Nan        
        var wi = wInput.valueAsNumber;
        var hi = hInput.valueAsNumber;
        var nm = nMinesInput.valueAsNumber;
       
        // The problem is that your input is a number type input
        // So any text will be ignored and the default value of 1 will be taken
        
        // but it litterally said NaN when i console.log it
        if (wi == NaN) {
            alert("bruh")
            wInput.labels[1].hidden = false;
        }

        if (submitted == false) {
            alert("Submitted!!")
            submitted = true;
            genMines();
        }
    }
</script>

<!-- This is the container for all of the mines that will be generated -->
<ul bind:this={test}></ul>

<!-- This is the container for the form to get the width and height for the mine-grid -->
{#if !submitted}
<form class="form" on:submit={submit}>
    <!-- YES, this is stupid, but for some reason margin with % based value didn't work -->
    <div class="width">
        <label for="width">Grid Width</label>
        <input type="number" id="width" name="width" min="1" value="1" bind:this={hInput}>
    </div>
    <div class="height">
        <label for="height">Grid Height</label>
        <input type="number" id="height" name="height" min="1" value="1" bind:this={wInput}>
    </div>
    <div class="mines">
        <label for="num-mines">Number Of Mines</label>\
        <input type="number" id="num-mines" name="num-mines" min="1" value="1" bind:this={nMinesInput}>
    </div>
    <div class="btn-con">
        <button type="submit"> 
            Submit
        </button>
    </div>
</form>
{/if}
<style>
    @import "./Style/Form.css";
    @import "./Style/Mines.css";
    .form {
        @apply flex flex-col justify-around items-center;
    }
</style>