import { useState } from 'react'

const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const ThemeToggle = () => {
	const [ theme, setTheme ] = useState(isDarkMode() ? 'Dark' : 'Light')

	const clickable = () => {
		const textColor = theme === 'Dark' ? 'white' : 'black'
		document.documentElement.style.setProperty('--text-color', textColor)

		const backgroundColor = theme === 'Dark' ? 'black' : 'white'
		document.documentElement.style.setProperty('--bg-color', backgroundColor)

		setTheme(theme === 'Dark' ? 'Light' : 'Dark')
	}

	return <button onClick={clickable} >{theme}</button>
}

export default ThemeToggle

