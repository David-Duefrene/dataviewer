import styles from './ColorKey.module.sass'

const ColorKey = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
	return <table className={styles.ColorKey}>
		<tbody>
			<tr>
				<td>Name</td>
				<td>Color</td>
			</tr>
			{children}
		</tbody>
	</table>
}

export default ColorKey

export const ColorRow = ({ name, color }: { name: string, color: string }) => {
	return (
		<tr className={styles.Row} key={`lineColor-${name}`}>
			<td>{name}</td>
			<td className={styles.Color} style={{ backgroundColor: color }} />
		</tr>
	)
}
