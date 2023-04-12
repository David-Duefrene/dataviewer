import { Dispatch, SetStateAction, ChangeEvent } from 'react'

import styles from './Dropdown.module.sass'

interface DropdownProps {
	list: number[] | string[]
	selected: number | string
	setSelected: Dispatch<SetStateAction<any>>
	getTranslation?: (key: string) => string
}

const Dropdown = ({ list, selected, setSelected, getTranslation = (e) => e }: DropdownProps) => {
	const handleOnChange =
		(e: ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value)

	const options = list.map((item) => <option key={item} value={item}>{getTranslation(item.toString())}</option>)

	return (
		<select className={styles.Dropdown} value={selected} onChange={handleOnChange}>
			{options}
		</select>
	)
}

export default Dropdown
