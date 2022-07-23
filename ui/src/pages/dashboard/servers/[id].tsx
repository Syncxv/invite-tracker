import { useRouter } from 'next/router'
import { SquaresFour } from 'phosphor-react'
import { useEffect } from 'react'
import { SideButton } from '../../../components/atoms/SideButton'
import Layout from '../../../components/Layout'
import { FunctionalComponent } from '../../../types/react'

const ManageServer: FunctionalComponent = ({}) => {
    return (
        <Layout nav={false}>
            <aside className="flex">
                <div className="sidebar p-2 h-screen w-[16rem] bg-primary-700">
                    <div className="header-logo flex gap-2 items-center justify-start">
                        <img
                            className="w-20"
                            src="https://media.discordapp.net/attachments/748017439496732702/988160045088931890/inv_tracker_logo_white.png"
                            alt=""
                        />
                        <h1>Cool Name</h1>
                    </div>

                    <div className="side-section">
                        <h4 className="text-gray-200 text-sm font-bold mb-4">Main Sheet</h4>
                        <SideButton Icon={SquaresFour} title="Dashbaord" dropdown={false} path="/" />
                        <SideButton Icon={SquaresFour} title="Stuff" dropdown={true} path="/stuff">
                            <SideButton Icon={SquaresFour} title="Dashbaord" dropdown={false} path="/"></SideButton>
                        </SideButton>
                    </div>
                </div>
                <div className="flex-1 h-screen bg-primary-900"></div>
            </aside>
        </Layout>
    )
}

export default ManageServer
