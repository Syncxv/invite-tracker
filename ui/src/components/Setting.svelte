<script lang="ts">
    export let id: string
    export let heading: string
    export let description: string
</script>
<article class="container">
    <div class="wrapper">
        <iconify-icon icon="twemoji:gear" style="font-size: 2rem;"></iconify-icon>
        <div class="hey">
            <h4>{heading}</h4>
            <p>{description}</p>
        </div>
    </div>
    <a role="button" href={`/servers/${id}/invites`}>Manage</a>
</article>

<style lang="scss">
    article {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--spacing);
            width: 35%;            
            .wrapper {
                display: flex;
                align-items: center;
                gap: 1.2rem;
            }
        }
</style>