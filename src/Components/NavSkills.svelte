<script context="module">
    import ProgrammingLanguagues from './ProgrammingLanguagues.svelte';
    import Tools from './Tools.svelte';
    
    export const navOptions = [
            { page: 'Programming Languagues',   component: ProgrammingLanguagues },
            { page: 'Tools',   component: Tools },
    ];
    </script>