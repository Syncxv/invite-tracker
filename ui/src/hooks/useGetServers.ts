import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import botApi from '../botApi'
import { Guild } from '../types/discord'

export const useGetServers = () => {
    const { status } = useSession()
    const router = useRouter()
    const [servers, setServers] = useState<Guild[]>([])
    useEffect(() => {
        if (status !== 'authenticated') {
            router.push('/')
        }
        botApi.getGuilds().then(res => setServers(res))
    }, [])
    return servers
}
