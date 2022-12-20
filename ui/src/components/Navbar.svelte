<script lang="ts">
  import {user} from '../stores/user'
  
</script>

<nav class="container">
  
    <ul>
      <li><strong>Invite Tracker</strong></li>
    </ul>
    <ul>
      <li><a href="/">Dashboard</a></li>
      {#if $user == null}  <li><a href="/api/discord/auth" role="button">Login</a></li> {:else} <div>{$user.username}</div> {/if}
    </ul>
  </nav>

<style lang="scss">
    nav {
        padding-inline: var(--spacing);
    }
</style>