import '../scss/_main.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
