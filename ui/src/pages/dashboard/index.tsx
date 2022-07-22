import { signOut, useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import botApi from '../../botApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Guild } from '../../types/discord'
import { ServerCard } from '../../components/molecules/ServerCard'

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
            <h2 className="ml-32 text-bold text-2xl">Servers</h2>
            <div className="grid justify-items-center grid-cols-auto-fit pt-8 px-32">
                {servers.map(guild => (
                    <ServerCard guild={guild} />
                ))}
            </div>
        </Layout>
    )
}
export default Dashboard
