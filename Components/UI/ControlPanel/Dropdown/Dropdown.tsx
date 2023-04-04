import { Dispatch, SetStateAction, ChangeEvent } from 'react'

import styles from './Dropdown.module.sass'

interface DropdownProps {
	list: number[] | string[]
	selected: number | string
	setSelected: Dispatch<SetStateAction<any>>
}

const Dropdown = ({ list, selected, setSelected }: DropdownProps) => {
	const handleOnChange =
		(e: ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value)

	const options = list.map((item) => <option key={item} value={item}>{item}</option>)

	return (
		<select className={styles.Dropdown} value={selected} onChange={handleOnChange}>
			{options}
		</select>
	)
}

export default Dropdown
