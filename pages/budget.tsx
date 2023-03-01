import Head from 'next/head'
import useSWR from 'swr'

import { useState } from 'react'

import ChartBox from '../Components/ChartBox/ChartBox'
import styles from '../styles/population.module.scss'

const YEARS = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ]
const CATEGORIES = [ 'cabinet_list', 'department_list', 'grand_totals', 'fund_list', 'fund_category_list' ]

const Budget = () => {
	const [ year, setYear ] = useState(2021)
	const { data, error, isLoading } = useSWR(`/api/getBudget/${year}`, (url) => fetch(url).then((res) => res.json()))
	const [ selection, setSelection ] = useState('cabinet_list')
	const [ subSelection, setSubSelection ] = useState('total')

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	const dataSet = data[selection]

	const subSelectionList = Object.keys(dataSet[1]).map((entry) => {
		return (
			<li key={entry}>
				<button
					className={`${styles.SelectionButton} ${subSelection === entry ? styles.Active : ''}`}
					onClick={() => setSubSelection(entry) }
				>
					{entry}
				</button>
			</li>
		)
	})

	const chartData = []
	for (let index = 0; index < 12; index++) {
		// Pads 0 if less than 10, ex. 01, 02, 03
		const day = index < 9 ? `0${index + 1}` : index + 1
		if (selection === '') {
			chartData.push({
				value: dataSet[index + 1].total,
				date: `${year}-${day}-01`,
			})
		} else {
			chartData.push({
				value: dataSet[index + 1][subSelection],
				date: `${year}-${day}-01`,
			})
		}
	}

	return (
		<>
			<Head>
				<title>Budget Charts</title>
				<meta name='Budget chart for Colorado' content='generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<aside className={styles.SidePanel}>
					<select value={selection} onChange={(e) => {
						setSelection(e.target.value)
						setSubSelection('total')
					}} >
						{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
					</select>
					<select value={year} onChange={(e) => {
						setYear(parseInt(e.target.value))
					}}>
						{YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
					</select>
					<ul className={styles.SelectionList}>{subSelectionList}</ul>
				</aside>
				<ChartBox data={[ { data: chartData, name: selection } ]} title={`Colorado's ${selection} Budget`} />
			</main>
		</>
	)
}

export default Budget
