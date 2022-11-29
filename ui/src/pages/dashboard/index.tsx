import Layout from '../../components/Layout'
import { ServerCard } from '../../components/molecules/ServerCard'
import { useGetServers } from '../../hooks/useGetServers'

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const servers = useGetServers()
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
