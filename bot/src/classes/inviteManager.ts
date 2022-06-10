import { Client, Collection, Guild, GuildMember, Invite } from 'discord.js'
import { UserClass } from '../db/models/User'
type GuildId = string
export class InviteManager {
    invites: Collection<GuildId, Collection<string, SimpleInvite>> =
        new Collection()

    constructor() {
        this.onGuildMemberAdd = this.onGuildMemberAdd.bind(this)
        this.onInviteCreate = this.onInviteCreate.bind(this)
        this.onInviteRemove = this.onInviteRemove.bind(this)
    }

    async initalize(client: Client) {
        client.guilds.cache.forEach(async guild => {
            const firstInvites = await guild.invites.fetch({ cache: false })
            this.invites.set(
                guild.id,
                new Collection(
                    firstInvites.map(invite => [
                        invite.code,
                        new SimpleInvite(invite)
                    ])
                )
            )
        })
    }

    async onGuildMemberAdd(member: GuildMember) {
        const cachedInvites = this.invites.get(member.guild.id)!
        const newInvites = await member.guild.invites.fetch({ cache: false })
        console.log(cachedInvites, newInvites, member)
        try {
            const usedInvite = newInvites.find(
                inv =>
                    typeof inv.uses === 'number' &&
                    inv.uses >
                        (cachedInvites.get(inv!.code)?.uses || Number.MAX_VALUE)
            )
            console.log(usedInvite, ' INVITE WAS USED :O')
            const inviter = usedInvite!.inviterId
            if (!inviter) return
            await UserClass.incrementInvite(
                inviter,
                usedInvite!.guild!.id,
                'joins'
            )
        } catch (err) {
            console.error(err)
        }
    }

    async onInviteCreate(invite: Invite) {
        this.invites
            .get((invite.guild as Guild).id)!
            .set(invite.code, new SimpleInvite(invite))
    }
    async onInviteRemove(invite: Invite) {
        this.invites.get((invite.guild as Guild).id)!.delete(invite.code)
    }
}

const inviteManager = ((global as any).inviteManager = new InviteManager())
export default inviteManager

class SimpleInvite {
    uses: number
    code: string
    userId: string
    constructor(invite: Invite) {
        this.code = invite.code
        this.uses = invite.uses!
        this.userId = invite.inviterId!
    }
}
