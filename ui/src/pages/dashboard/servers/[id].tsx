import Layout from '../../../components/Layout'
import { FunctionalComponent } from '../../../types/react'

const ManageServer: FunctionalComponent = ({}) => {
    return (
        <Layout nav={false}>
            <div className="flex">
                <div className="sidebar  h-screen w-[16rem] bg-red-500">
                    <div className="header-logo flex gap-2 items-center justify-start">
                        <img
                            className="w-20"
                            src="https://media.discordapp.net/attachments/748017439496732702/988160045088931890/inv_tracker_logo_white.png"
                            alt=""
                        />
                        <h1>Cool Name</h1>
                    </div>
                </div>
                <div className="flex-1 h-screen bg-blue-600"></div>
            </div>
        </Layout>
    )
}

export default ManageServer
