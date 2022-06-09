import { Client, Collection, Guild, GuildMember, Invite } from 'discord.js'
import { client } from '..'
//https://anidiots.guide/coding-guides/tracking-used-invites/
//THIS GOES SO HARD
export class InviteManager {
    guildInvites: Map<string, Collection<string, number | null>> = new Map()

    constructor() {
        this.onGuildMemberAdd = this.onGuildMemberAdd.bind(this)
        this.onInviteCreate = this.onInviteCreate.bind(this)
    }

    async initalize(client: Client) {
        client.guilds.cache.forEach(async guild => {
            const firstInvites = await guild.invites.fetch()
            this.guildInvites.set(
                guild.id,
                new Collection(
                    firstInvites.map(invite => [invite.code, invite.uses])
                )
            )
        })
    }

    async onGuildMemberAdd(member: GuildMember) {
        const newInvites = await member.guild.invites.fetch()
        const oldInvites = this.guildInvites.get(member.guild.id)!
        const invite = newInvites.find(
            i =>
                typeof i.uses === 'number' &&
                i.uses > (oldInvites.get(i.code) || 99999)
        )!
        const inviter = await client.users.fetch(invite.inviter!.id)
        inviter
            ? console.log(
                  `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`
              )
            : console.log(
                  `${member.user.tag} joined but I couldn't find through which invite.`
              )
    }

    async onInviteCreate(invite: Invite) {
        this.guildInvites
            .get((invite.guild as Guild).id)
            ?.set(invite.code, invite.uses!)
    }
}

const inviteManager = ((global as any).inviteManager = new InviteManager())
export default inviteManager
