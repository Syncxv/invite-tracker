import { useSession } from 'next-auth/react'

export const LoginBtn = () => {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <div className="user flex items-center justify-center gap-4">
                <div className="username">
                    {session.user.username}#{session.user.discriminator}
                </div>
                <div className="avatar w-10">
                    <img className="rounded-full" src={session.user.image_url} alt="" />
                </div>
            </div>
        )
    }
    return <div>welp</div>
}

export const NavItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <li>{children}</li>
}

export const NavBar = () => {
    return (
        <nav className="flex justify-between items-center px-4">
            <div className="brand">
                <img
                    className="w-24"
                    src="https://media.discordapp.net/attachments/748017439496732702/987617431214247966/unknown.png"
                    alt=""
                />
            </div>
            <ul className="links flex gap-4">
                <NavItem>Invite</NavItem>
                <NavItem>Dashboard</NavItem>
                <NavItem>Status</NavItem>
            </ul>
            <LoginBtn />
        </nav>
    )
}
