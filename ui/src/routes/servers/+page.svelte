<script lang="ts">
import type {
    PageData
} from "./$types";

export let data: PageData
</script>
<main>
    <div class="container">
        <h1>Servers</h1>
        <div class="grid">
            {#each data.guilds as guild}
            <article>
                <div class="grid">
                    <div class="guild_icon">
                        {#if guild.icon == null}
                            <h5>{guild.nameAcronym}</h5>
                        {:else}
                            <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} alt="">
                        {/if}
                    </div>
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
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                .guild_icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--background);
                    width: 15% !important;
                    border-radius: 999px;
                    width: 1rem;
                    overflow: hidden;
                    aspect-ratio: 1 / 1;
                }
                h5 {
                    margin: 0;
                }
                h3 {
                    font-size: 1rem;
                }

                a {
                    width: fit-content;
                    justify-self: end;
                    padding: calc(var(--form-element-spacing-vertical) * 0.5) calc(var(--form-element-spacing-horizontal) * 0.5);
                }
            }
        }
    }
}
</style>
