const scopes = ['guilds', 'guilds.members.read', 'identify'].join(' ')

const AUTH_LINK = `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.NEXT_PUBLIC_CLIENT_ID
}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=${encodeURI(
    scopes
)}`

export { AUTH_LINK }
