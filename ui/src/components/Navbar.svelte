<nav class="navbar">
    <div class="navbar__first">
        <span class="title">I-T</span>
        <li ><a class="nav-item" href="/dashboard">Dashboard</a></li>
        <li ><a class="nav-item"  href="/contact">Contact</a></li>
    </div>

    <button class="navbar__login-btn">
        Login
    </button>
</nav>

<style lang="scss">
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        &__login-btn{
            background-color: var(--brand);
            padding: .5rem 2rem;
            border: none;
            border-radius: 6px;
            color: white;
            &:hover {
                cursor: pointer;
            }
        }

        &__first {
            .title {
                font-size: 2rem;
                margin-right: 4rem;
            }
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 2rem;
            & > li {
                list-style: none;
                .nav-item {
                    text-decoration: none;
                    color: white;
                    font-size: 1.1rem;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>