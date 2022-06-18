import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { getRandomized, rawTransform } from '../util/textTransform'

export const AnimatedText: React.FC<{ children: React.ReactNode; className: string }> = ({
    children,
    className = ''
}) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const timeline = useRef()
    useEffect(() => {
        gsap.set(ref.current!, {
            transform: getRandomized(200),
            opacity: 0,
            willChange: 'transform'
        })
        gsap.to(ref.current, {
            scrollTrigger: {
                trigger: ref!.current,
                start: 'top bottom'
            },
            duration: 2.3,
            stagger: 0.15,
            ease: 'expo.out',
            y: 0,
            opacity: 1,
            transform: 'translate(0px, 0px)',
            willChange: 'auto'
        })
    }, [ref])
    return (
        <div className={`perspective ${className}`}>
            <p ref={ref}>{children}</p>
        </div>
    )
}