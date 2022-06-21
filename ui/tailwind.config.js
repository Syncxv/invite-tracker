module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-900': '#02010A',
                'secondary-500': '#7209B7',
                'accent-500': '#F72585'
            }
        }
    },
    plugins: [
        require('tailwindcss/plugin')(function ({ addVariant }) {
            addVariant('em', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.em\\:${rule.selector.slice(1)}`
                    rule.walkDecls(decl => {
                        decl.value = decl.value.replace('rem', 'em')
                    })
                })
            })
        })
    ]
}
