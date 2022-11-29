import { FunctionComponent } from 'react'
import Layout from '../../../../components/Layout'
import { useAuthenticated } from '../../../../hooks/useAuthenticated'

interface Props {}

const InviteSettings: FunctionComponent<Props> = () => {
    useAuthenticated()
    return (
        <Layout nav={false} side={true}>
            <span>hhehe</span>
        </Layout>
    )
}
export default InviteSettings
