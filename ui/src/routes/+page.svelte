<script>
import Navbar from "../components/Navbar.svelte";

</script>

<svelte:head>
    <title>Hey there</title>
</svelte:head>

<main>
    <Navbar />
    <div class="wrapper">
        <div class="hero">
            <h1 class="heading">Cool Bot</h1>
            <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, reprehenderit.</p>
        </div>

        <a href="/dashboard" class="cta-button">Dashboard</a>
    </div>
</main>

<style lang="scss"> 
    .wrapper {
        display: grid;
        place-content: center;
        height: 80vh;
        text-align: center;
        justify-items: center;
        .hero {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 2rem;
            .heading {
                font-size: 6rem;
            }
            .desc {
                font-size: 2rem;
            }
        }
        .cta-button {
            width: fit-content;
            background-color: var(--brand);
            padding: .8rem 1rem;
            font-weight: bold;
            font-size: 1.5rem;
            border: none;
            text-decoration: none;
            border-radius: 6px;
            color: white;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>