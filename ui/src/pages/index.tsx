import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { AnimatedText } from '../components/animatedText'
import LoginButton from '../components/loginBtn'

const Home: NextPage = () => {
    const { data } = useSession()
    console.log(data)
    return (
        <div className=" h-screen bg-gray-600 text-gray-50">
            <LoginButton />
            <AnimatedText className="flex justify-center items-center w-screen h-full"> cool </AnimatedText>
        </div>
    )
}

export default Home
