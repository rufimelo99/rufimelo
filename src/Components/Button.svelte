<script>
    export let name;
    let maxLength = 16;
    let displayName = " ";


    $: if (name.length > maxLength) {
        displayName = `${name.slice(0, maxLength)}...`;
    } else {
        displayName = name;
    }
</script>
<button type="button" class="btn btn-info"  on:click>
    {displayName}
</button>
<style>
    button {
        float: center;
        z-index: 11;
        opacity: 1;
        background-color: #27948e;
        color:white;
        border:black;
        width:160px;
        height: 50px;
        padding-top: 15px;
        z-index: 1;
        }
    button:hover {
        float: center;
        z-index: 11;
        opacity: 1;
        background-color: rgb(108, 183, 245);
        color:white;
        border:black;
        width:160px;
        height: 50px;
        padding-top: 15px;
        z-index: 1;
        }
</style>
