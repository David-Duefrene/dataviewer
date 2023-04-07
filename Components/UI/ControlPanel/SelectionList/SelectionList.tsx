import styles from './SelectionList.module.sass'

interface SelectionListProps {
	list: string[];
	selected: string[];
	setSelected: (s: string[]) => void;
}

const SelectionList = ({ list, selected, setSelected }: SelectionListProps) => {
	const listItems = list.map((entry) => {
		return (
			<li key={entry}>
				<button
					className={`${styles.SelectionButton} ${selected.includes(entry) ? styles.Active : ''}`}
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
					{entry}
				</button>
			</li>
		)
	})

	return <ul className={styles.SelectionList}>{listItems}</ul>
}

export default SelectionList