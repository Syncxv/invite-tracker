import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Button from '../components/atoms/Button'
import { NavBar } from '../components/NavBar'

const Home: NextPage = () => {
    const { data } = useSession()
    console.log(data)
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            <NavBar />
            <div className="flex items-center justify-center">
                <Button>Hey</Button>
            </div>
        </div>
    )
}

export default Home
