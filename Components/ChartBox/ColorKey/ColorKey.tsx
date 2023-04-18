import styles from './ColorKey.module.sass'

type Props = {
	children: JSX.Element[] | JSX.Element
}

const ColorKey = ({ children }: Props) => {
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
