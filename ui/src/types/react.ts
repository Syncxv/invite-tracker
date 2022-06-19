import React from 'react'

export type FunctionalComponent<T = {}> = React.FC<T & { children?: React.ReactNode }>
