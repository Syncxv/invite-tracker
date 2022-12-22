<script lang="ts">
	import Navbar from "../../components/Navbar.svelte";
import type {
    PageData
} from "./$types";

export let data: PageData
</script>

<main>
    <Navbar user={data.user} />
    <div class="container">
        <h1>Servers</h1>
        <div class="grid">
            {#each data.guilds as guild}
            <article>
                <div class="grid">
                    <h3>{guild.name}</h3>
                    <a role="button" href={`/servers/${guild.id}`}>Manage Server</a>
                </div>
            </article>
            {/each}
        </div>
    </div>
</main>

<style lang="scss">
    main {
        .container {
            padding: var(--spacing);
            height: 100vh;
            align-items: center;
            justify-content: center;
            place-content: center;
            
            article {
                display: flex;
                align-items: center;
                .grid {
                    width: 100%;
                    align-items: center;;
                }
            }
        }
    }
</style>
