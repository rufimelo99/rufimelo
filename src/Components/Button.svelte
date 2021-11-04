<script>
    export let name;
    export let id;
    let maxLength = 50;
    let displayName = " ";


    $: if (name.length > maxLength) {
        displayName = `${name.slice(0, maxLength)}...`;
    } else {
        displayName = name;
    }
</script>
<button type="button"  id={id} on:click>
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
        height: 50px;
        padding-top: 15px;
        z-index: 1;
        }
</style>
