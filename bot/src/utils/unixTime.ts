export const unixTime = (date: string | Date) => {
    if (typeof date === 'string')
        return Math.floor(new Date(date).getTime() / 1000)
    return Math.floor(date.getTime() / 1000)
}
