import { useState, useEffect } from 'react'

import styles from './ThemeToggle.module.sass'

const ThemeToggle = () => {
	const isDarkMode: boolean = false
	const [ theme, setTheme ] = useState<'Dark' | 'Light'>(isDarkMode ? 'Dark' : 'Light')

	useEffect(() => {
		const updateTheme = () => setTheme(isDarkMode ? 'Dark' : 'Light')
		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

		if (matchMedia.matches) setTheme('Dark')
		matchMedia.addEventListener('change', updateTheme)

		return () => matchMedia.removeEventListener('change', updateTheme)
	}, [ isDarkMode ])

	const clickable = () => {
		const textColor = theme === 'Dark' ? 'black' : 'white'
		document.documentElement.style.setProperty('--text-color', textColor)

		const backgroundColor = theme === 'Dark' ? 'white' : 'black'
		document.documentElement.style.setProperty('--bg-color', backgroundColor)

		setTheme(theme === 'Dark' ? 'Light' : 'Dark')
	}

	return <button className={styles.Button} onClick={clickable}>{theme}</button>
}

export default ThemeToggle

