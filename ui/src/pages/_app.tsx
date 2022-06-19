import '../scss/_main.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import gsap from 'gsap'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    useEffect(() => {
        const bruh = async () => {
            const mod = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(mod.ScrollTrigger)
        }
        bruh()
    }, [])
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
