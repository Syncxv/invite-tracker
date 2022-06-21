import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Button, { ButtonProps } from '../Button'
export const BorderButton = forwardRef<HTMLButtonElement | null, ButtonProps>(
    ({ children, isIcon, className = '', ...rest }, ref) => {
        const [isHovered, setHoverd] = useState(false)
        const innerRef = useRef<HTMLButtonElement>(null)

        useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement)
        return (
            <button
                ref={ref}
                {...rest}
                className={`relative text-white bg-accent-500 font-medium rounded-xl text-sm em:px-5 em:py-2.5 ${
                    isIcon && 'p-3'
                } ${className || ''}`.trim()}
                onMouseOver={() => {
                    setHoverd(true)
                    setTimeout(() => {
                        setHoverd(false)
                    }, 1000)
                }}
            >
                {children}
                <div className={`lines ${isHovered && 'start'}`}>
                    <div className="bruh">
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                    </div>
                    <div className="bruh">
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg
                            className="line"
                            viewBox={`0 0 ${innerRef.current?.clientWidth} ${innerRef.current?.clientHeight}`}
                        >
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                        <svg className="line" viewBox="0 0 139 48">
                            <rect x="0" y="0" width="100%" height="100%" rx="11" ry="11" pathLength="10"></rect>
                        </svg>
                    </div>
                </div>
            </button>
        )
    }
)
