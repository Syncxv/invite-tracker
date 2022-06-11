import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import LoginButton from '../components/loginBtn'

const Home: NextPage = () => {
    const { data } = useSession()
    console.log(data)
    return (
        <div className=" bg-gray-600">
            <h1>hey</h1>
            <LoginButton />
        </div>
    )
}

export default Home
