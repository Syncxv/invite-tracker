<script lang="ts">
import type {
    PageData
} from "./$types";

export let data: PageData
</script>

<svelte:head>
    <title>Hey there</title>
</svelte:head>

    <main class="container">
        <header>
            <div class="container">
                <h1 class="heading">Cool Bot</h1>
                <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, reprehenderit.</p>
                <p><a role="button" href={data.user == null ? "/api/discord/login" : "/servers"} class="cta-button">Dashboard</a></p>
            </div>
        </header>
    </main>

<style lang="scss">
    header {
        position: absolute;
        inset: 0;
        z-index: 10;
        margin-top: calc(var(--spacing) * 3);
        text-align: center;
        .container {
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; 
        }
        p {
            margin-top: var(--spacing);
        }

        h1 {
            font-size: 4rem;
        }
    }
</style>
