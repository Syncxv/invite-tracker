import { useState, useEffect } from 'react'
import botApi from '../botApi'
import { Guild } from '../types/discord'
import { useAuthenticated } from './useAuthenticated'

export const useGetServers = () => {
    useAuthenticated()
    const [servers, setServers] = useState<Guild[]>([])
    useEffect(() => {
        botApi.getGuilds().then(res => setServers(res))
    }, [])
    return servers
}
