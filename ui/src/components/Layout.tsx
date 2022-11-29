import { FunctionalComponent } from '../types/react'
import { NavBar } from './NavBar'
import SideNavBar from './NavBar/SideNavBar'

interface Props {
    nav?: boolean
    side?: boolean
}

const Layout: FunctionalComponent<Props> = ({ children, nav = true, side = false }) => {
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            <>
                {nav && <NavBar />}
                {side ? (
                    <div className="flex">
                        <SideNavBar />
                        {children}
                    </div>
                ) : (
                    children
                )}
            </>
        </div>
    )
}
export default Layout
