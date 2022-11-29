import { SquaresFour } from 'phosphor-react'
import Divider from '../atoms/Divider'
import { SideButton } from '../atoms/SideButton'

interface Props {}

const SideNavBar: React.FC<Props> = () => {
    return (
        <aside>
            <div className="sidebar p-2 h-screen w-[16rem] bg-primary-700">
                <div className="header-logo flex gap-2 items-center justify-start">
                    <img
                        className="w-20"
                        src="https://media.discordapp.net/attachments/748017439496732702/988160045088931890/inv_tracker_logo_white.png"
                        alt=""
                    />
                    <h1>Cool Name</h1>
                </div>
                <Divider />
                <div className="side-section flex flex-col h-full gap-4 pt-14">
                    <h4 className="text-gray-200 text-sm font-bold mb-4">Main Sheet</h4>
                    <SideButton Icon={SquaresFour} title="Dashbaord" dropdown={false} path="/" />
                    <SideButton Icon={SquaresFour} title="Invite Settings" dropdown={false} path="/invite-settings" />
                    <SideButton Icon={SquaresFour} title="Stuff" dropdown={true}>
                        <SideButton Icon={SquaresFour} title="Bru" dropdown={false} path="/wegeg"></SideButton>
                    </SideButton>
                </div>
            </div>
        </aside>
    )
}
export default SideNavBar
