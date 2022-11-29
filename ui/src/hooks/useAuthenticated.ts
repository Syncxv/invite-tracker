import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthenticated = () => {
    const { status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (status !== 'authenticated') {
            router.push('/')
        }
    }, [])
}
