import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import { AnimatedComponent } from '../components/animatedComponent'
import Button from '../components/atoms/Button'
import { Landing } from '../components/Landing'
import { NavBar } from '../components/NavBar'

const Home: NextPage = () => {
    // const { data } = useSession()
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            <NavBar />
            <Landing />
        </div>
    )
}

export default Home
