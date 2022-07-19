import { signOut, useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import botApi from '../../botApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Guild } from '../../types/discord'

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const { data, status } = useSession()
    const router = useRouter()
    const [servers, setServers] = useState<Guild[]>([])
    useEffect(() => {
        if (status !== 'authenticated') {
            router.push('/')
        }
        botApi.getGuilds().then(res => setServers(res))
    }, [])
    return (
        <Layout>
            <div>Dashboard</div>
            {servers.map(server => (
                <h1>{server.name}</h1>
            ))}
        </Layout>
    )
}
export default Dashboard
