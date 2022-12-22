<script lang="ts">
	import type { APIUser } from 'discord-api-types/v10';
	import type { PageData } from '../routes/$types';
  export let user: APIUser | null

  $: isOpened = false;

</script>

<nav class="container">
  
    <ul>
      <li><strong>Invite Tracker</strong></li>
    </ul>
    <ul>
      <li><a href="/">Dashboard</a></li>
      {#if user == null}  
        <li data-sveltekit-preload-data="off">
          <a href="/api/discord/auth" role="button">Login</a>
        </li> 
      {:else} 
        <ul on:click={() => isOpened = !isOpened} on:keydown={() => isOpened = !isOpened} class="user">
          <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} alt="">
          <p>{user.username}</p> 
          <iconify-icon icon="material-symbols:arrow-drop-down-rounded" 
          style={`transition: transform 200ms cubic-bezier(0, 0.84, 0.25, 1) 0s;font-size: 28px; transform: rotate(${isOpened ? "180deg" : "0deg"})`}
          ></iconify-icon>
          {#if isOpened}
            <div class="dropdown" role="listbox">
            <li>
              <a href="/servers">
                My Servers
              </a>
            </li>
            <li>
              <a class="logout" href="/api/discord/logout">
                Logout
              </a>
            </li>
            </div>
          {/if}
        </ul>
      {/if}
    </ul>
  </nav>

<style lang="scss">
    nav {
        padding: var(--spacing);
        .user {
          position: relative;
        	cursor: pointer;
          gap: .5rem;
          margin-left: 2rem;
          .dropdown {
            width: 7rem;
            
            position: absolute;
            background-color: var(--background-color);
            border-radius: 8px;
            top: 120%;
            left: 50%;
            transform: translateX(-50%);
            li {
              padding: .5rem 1rem;
            }
            .logout {
              color: var(--del-color);
            }
            a {
              color: white;
              &:hover {
                color: var(--secondary-hover)
              }
            }
          }
        }
        img{ 
        	width: 25%;
          border-radius: 999px;
        }
    }
</style>