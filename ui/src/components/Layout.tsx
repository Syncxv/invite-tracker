import { FunctionalComponent } from '../types/react'
import { NavBar } from './NavBar'

interface Props {}

const Layout: FunctionalComponent = ({ children }) => {
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            <NavBar />
            {children}
        </div>
    )
}
export default Layout
