<script lang="ts">

    import "$lib"
    import "@picocss/pico"
    import "iconify-icon"
	import Navbar from "../components/Navbar.svelte";
    import "../scss/_main.scss"
	import type { PageData } from "./$types";
    export let data: PageData
</script>
<div class="bruh">
 
    <Navbar user={data.user} />
    <slot />
</div>


<style lang="scss">
    .bruh {
        position: relative;
        min-height: 100vh;
    }
</style>