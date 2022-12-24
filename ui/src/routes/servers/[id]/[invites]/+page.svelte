<script lang="ts">
    let maxAge: number = 0
</script>
<main class="container">
    <div class="grid">
        <div class="max-age-wrapper">
            <label for="max-age">Invite Max Age ({maxAge} Day(s)) </label>
            <input bind:value={maxAge} type="range" min="0" max="100" id="max-age">
        </div>
            
    </div> 
</main>


<style lang="scss">
    main {
        padding: var(--spacing);
        .grid {
            .max-age-wrapper {
                width: 50%;
                display: flex;
                flex-direction: column;      
            }    
        }
        
    }
</style>