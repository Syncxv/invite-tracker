import React from 'react'

interface Props {
    isIcon?: boolean
    variant?: 'normal' | 'brand'
}

const Button: React.FC<Props & React.HTMLAttributes<HTMLButtonElement>> = ({
    children,
    isIcon,
    className,
    variant = 'normal',
    ...props
}) => {
    return (
        <div className="wrapper">
            <button
                {...props}
                className={`text-white bg-accent-500 font-medium rounded-xl text-sm px-5 py-2.5 ${isIcon && 'p-3'} ${
                    className || ''
                }`.trim()}
            >
                {children}
            </button>
        </div>
    )
}
export default Button
