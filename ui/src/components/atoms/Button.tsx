import React, { forwardRef } from 'react'

type Props = {
    isIcon?: boolean
    variant?: 'normal' | 'brand'
} & React.HTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, Props>(
    ({ children, isIcon, className, variant = 'normal', ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                className={`text-white bg-accent-500 font-medium rounded-xl text-sm px-5 py-2.5 ${isIcon && 'p-3'} ${
                    className || ''
                }`.trim()}
            >
                {children}
            </button>
        )
    }
)
export default Button
