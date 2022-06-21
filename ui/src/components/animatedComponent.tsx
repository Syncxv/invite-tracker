import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { getRandomized } from '../util/textTransform'

export const AnimatedComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    const ref = useRef<HTMLDivElement | null>(null)
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
            <div ref={ref}>{children}</div>
        </div>
    )
}
