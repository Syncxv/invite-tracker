import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { AnimatedComponent } from '../components/animatedComponent'
import Button from '../components/atoms/Button'
import { NavBar } from '../components/NavBar'

const Home: NextPage = () => {
    const { data } = useSession()
    console.log(data)
    return (
        <div className="bg-primary-900 text-white h-screen min-h-screen ">
            <NavBar />
            <div className="flex flex-col items-center justify-center gap-24">
                <AnimatedComponent>
                    <p className="text-2xl">Best Bot FOr your Mother</p>
                </AnimatedComponent>
                <AnimatedComponent>
                    <Button>Dashboard</Button>
                </AnimatedComponent>
            </div>
        </div>
    )
}

export default Home
