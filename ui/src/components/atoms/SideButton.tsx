import { useRouter } from 'next/router'
import { CaretDown } from 'phosphor-react'
import { useState } from 'react'
import { FunctionalComponent } from '../../types/react'

interface SideButtonProps {
    Icon: any
    title: string
    letter?: string
    dropdown: boolean
    path: string
}

export const SideButton: FunctionalComponent<SideButtonProps> = ({ Icon, title, dropdown, path, children }) => {
    const [isOpen, setOpen] = useState(false)
    const router = useRouter()

    const selected = router.asPath === `/dashboard/servers/${router.query.id}${path === '/' ? '' : '/' + path}`
    return (
        <div className="w-full">
            <div
                onClick={() =>
                    !dropdown ? router.push(`${router.query.id}/${path === '/' ? '' : path}`) : setOpen(!isOpen)
                }
                className={`flex justify-between items-center gap-2 p-2 rounded-xl cursor-pointer ${
                    selected ? 'bg-slate-200' : ''
                } hover:bg-primary-900`}
            >
                <div className="flex items-center gap-4">
                    <Icon color={selected ? '#0e0e0e' : '#fff9f9'} weight="fill" size={28} />
                    <div className="font-semibold text-gray-500">{title}</div>
                </div>
                {dropdown && <CaretDown className="mr-4 cursor-pointer" size={18} onClick={() => setOpen(!isOpen)} />}
            </div>
            {isOpen && dropdown && (
                <div className="BRUH flex h-1/2 pl-5 mt-2 gap-4">
                    <div className="line h-full w-[2px] bg-slate-50"></div>
                    {children}
                </div>
            )}
        </div>
    )
}

export const SideDropItem: FunctionalComponent = ({}) => {
    return <div></div>
}
