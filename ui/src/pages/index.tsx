import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { NavBar } from '../components/NavBar'

const Home: NextPage = () => {
    const { data } = useSession()
    console.log(data)
    return (
        <>
            <NavBar />
        </>
    )
}

export default Home
