import { FunctionalComponent } from '../types/react'
import { NavBar } from './NavBar'

interface Props {}

const Layout: FunctionalComponent<{ nav?: boolean }> = ({ children, nav = true }) => {
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            {nav && <NavBar />}
            {children}
        </div>
    )
}
export default Layout
