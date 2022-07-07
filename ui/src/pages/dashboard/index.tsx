import { signOut } from 'next-auth/react'
import Layout from '../../components/Layout'
import discordApi from '../../discordApi'

interface Props {}

const Dashboard: React.FC<Props> = () => {
    discordApi.getGuilds()
    return (
        <Layout>
            <div>Dashboard</div>
            <button onClick={() => signOut()}>logout</button>
        </Layout>
    )
}
export default Dashboard
