import styles from './ColorKey.module.sass'

const ColorKey = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
	return (
		<div className={styles.ColorKey}>
			{children}
		</div>
	)
}

export default ColorKey

export const ColorRow = ({ name, color }: { name: string, color: string }) => {
	return (
		<div className={styles.Color} style={{ backgroundColor: color }} key={`lineColor-${name}`}>
			{name}
		</div>
	)
}
