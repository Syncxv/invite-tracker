<script lang="ts">
import Navbar from "../components/Navbar.svelte";
import type {
    PageData
} from "./$types";
</script>

<svelte:head>
    <title>Hey there</title>
    </svelte:head>

    <img src="landing.png" alt="">
    <main class="container">
        <header>
            <div class="container">
                <h1 class="heading">Cool Bot</h1>
                <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, reprehenderit.</p>
                <p><a role="button" href="/servers" class="cta-button">Dashboard</a></p>
            </div>
        </header>
    </main>

<style lang="scss">
    img {
        position: absolute;
        height: 100vh;
        width: 100vw;
        object-fit: cover;
        object-position: bottom;
    }

    header {
        position: absolute;
        inset: 0;
        z-index: 10;
        margin-top: calc(var(--spacing) * 3);
        text-align: center;

        .container {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 30vw;

        }

        p {
            margin-top: var(--spacing);
        }

        h1 {
            font-size: 4rem;
        }
    }
</style>
