import { useState, useEffect } from 'react'

import styles from './ThemeToggle.module.sass'

const ThemeToggle = () => {
	const [ theme, setTheme ] = useState<'Dark' | 'Light'>('Light')

	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('Dark')
			document.documentElement.className = 'Dark'
		}
	}, [ ])

	const clickable = () => {
		const newTheme = theme === 'Dark' ? 'Light' : 'Dark'
		document.documentElement.className = newTheme
		setTheme(newTheme)
	}

	return <button className={styles.Button} onClick={clickable}>{theme}</button>
}

export default ThemeToggle

