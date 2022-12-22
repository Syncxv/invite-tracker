<script lang="ts">

    import "$lib"
    import "@picocss/pico"
    import "iconify-icon"
	import Navbar from "../components/Navbar.svelte";
    import "../scss/_main.scss"
	import type { PageData } from "./$types";
    export let data: PageData
</script>

<Navbar user={data.user} />
<slot />