import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { FunctionalComponent } from '../types/react'
import { getGsapValues } from '../util/textTransform'
import { BorderButton } from './atoms/BorderButton'

export const Landing: FunctionalComponent = ({}) => {
    const timeline = useRef<gsap.core.Timeline | null>(null)
    const heroH1Text = useRef<HTMLHeadingElement | null>(null)
    const heroH1Text2 = useRef<HTMLHeadingElement | null>(null)
    const paragraphTextRef = useRef<HTMLParagraphElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        console.log(buttonRef)
        const paragraphValues = getGsapValues({ element: paragraphTextRef.current!, y: 200 })
        const h11 = getGsapValues({ element: heroH1Text.current!, y: 200 })
        const h12 = getGsapValues({ element: heroH1Text2.current!, y: 300 })
        const buttonThing = getGsapValues({ element: '#im-not-sorry', y: 400 })
        const tl = (timeline.current = gsap
            .timeline({ defaults: { duration: 2.3 } })
            .fromTo(h11.element, h11.from, h11.to)
            .fromTo(h12.element, h12.from, h12.to, '-=2.2')
            .fromTo(paragraphValues.element, paragraphValues.from, paragraphValues.to, '-=1.5')
            .fromTo('#im-not-sorry', buttonThing.from, buttonThing.to, '-=1.9'))
        return () => {
            tl.kill()
        }
    }, [])

    return (
        <main className="flex flex-col items-center h-screen mt-16">
            <div className="hero flex flex-col items-center  gap-6">
                <h1 ref={heroH1Text} className="text-9xl font-bold">
                    A Really
                </h1>
                <h1 ref={heroH1Text2} className="text-9xl font-bold">
                    Cool Bot
                </h1>
                {/* <p ref={paragraphTextRef} className="text-gray-300 w-1/2 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt!
                </p> */}
            </div>
            <BorderButton id="im-not-sorry" ref={buttonRef} variant="brand" className="mt-6 !text-2xl">
                Dashboard
            </BorderButton>
        </main>
    )
}
