import { useRouter } from 'next/router'
import { Guild } from '../../types/discord'
import { FunctionalComponent } from '../../types/react'
import Button from '../atoms/Button'

export const ServerCard: FunctionalComponent<{ guild: Guild }> = ({ guild }) => {
    const router = useRouter()
    return (
        <div className="card flex flex-col items-center justify-center gap-4 p-6 text-center w-48 rounded-md bg-[#252525]">
            <ServerIcon icon={guild.icon} nameAcronym={guild.nameAcronym} />
            <h3>{guild.name}</h3>
            <Button onClick={() => router.push(`/dashboard/servers/${guild.id}`)}>Manage</Button>
        </div>
    )
}

export const ServerIcon: FunctionalComponent<{ icon?: string; nameAcronym: string }> = ({ icon, nameAcronym }) => {
    return icon != null ? (
        <img className="h-26 w-26 rounded-full" src={icon} alt="" />
    ) : (
        <div className="flex items-center justify-center w-14 rounded-full aspect-square bg-slate-700">
            <p className="text-xl">{nameAcronym}</p>
        </div>
    )
}
