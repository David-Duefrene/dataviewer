import styles from './SelectionList.module.sass'

interface SelectionListProps {
	list: string[]
	selected: string[]
	setSelected: (s: string[]) => void
	getTranslation?: (key: string) => string
}

const SelectionList = ({ list, selected, setSelected, getTranslation = (e) => e }: SelectionListProps) => {
	const listItems = list.map((entry) => {
		return (
			<li key={entry}>
				<button
					className={`${styles.SelectionButton} ${selected.includes(entry) ? 'Active' : ''}`}
					onClick={() => {
						if (selected.includes(entry)) {
							if (selected.length > 1) {
								setSelected(selected.filter((c) => c !== entry))
							}
							return
						}
						setSelected([ ...selected, entry ])
					}}
				>
					{getTranslation(entry.toString())}
				</button>
			</li>
		)
	})

	return <ul className={styles.SelectionList}>{listItems}</ul>
}

export default SelectionList
