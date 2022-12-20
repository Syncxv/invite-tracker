<script>
import Navbar from "../components/Navbar.svelte";
import {page} from '$app/stores'
</script>

<svelte:head>
    <title>Hey there</title>
</svelte:head>

<Navbar />
<main class="container">
    <div>{$page.status}</div>
    <header>
        <div class="container">
            <h1 class="heading">Cool Bot</h1>
            <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, reprehenderit.</p>
            <p><a role="button" href="/dashboard" class="cta-button">Dashboard</a></p>
        </div>
    </header>
</main>

<style lang="scss">
    header {
        margin-top: calc(var(--spacing) * 3);
        text-align: center;
        p {
            margin-top: var(--spacing);
        }
        h1 {
            font-size: 4rem;
        }
    }
</style>