<script lang="ts">
	import Setting from "../../../components/Setting.svelte";
	import type { PageData } from "./$types";


    export let data: PageData
</script>
<main>
    <div class="grid">
        <Setting path="invites" heading="Invite Setting" description="ALL things to do with invites :)))" id={data.id}></Setting>
    </div>
</main>

<style lang="scss">
    main {
        padding: var(--spacing);
    }
</style>