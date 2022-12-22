<script lang="ts">
	import type { APIUser } from 'discord-api-types/v10';
	import type { PageData } from '../routes/$types';
  export let data: PageData
</script>

<nav class="container">
  
    <ul>
      <li><strong>Invite Tracker</strong></li>
    </ul>
    <ul >
      <li><a href="/">Dashboard</a></li>
      {#if data.user == null}  
        <li data-sveltekit-preload-data="off">
          <a href="/api/discord/auth" role="button">Login</a>
        </li> 
      {:else} 
        <div>{data.user.username}</div> 
      {/if}
    </ul>
  </nav>

<style lang="scss">
    nav {
        padding-inline: var(--spacing);
    }
</style>