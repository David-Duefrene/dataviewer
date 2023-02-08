import Head from 'next/head'

import { useState } from 'react'

import ChartBox from '../Components/ChartBox/ChartBox'
import clientPromise from '../util/mongoClient'
import styles from '../styles/population.module.scss'

export const getServerSideProps = async () => {
	try {
		const client = await clientPromise
		const db = client.db('DataViewer')

		const dataSet = await db
			.collection('Budget')
			.find({ year: 2021 })
			.toArray()
		const json = JSON.parse(JSON.stringify(dataSet))[0]
		delete json._id

		return {
			props: { data: json },
		}
	} catch (e) {
		console.error(e)
		throw new Error('Failed to connect to database')
	}
}

type Props = {
	data: Record<string, any>;
}

const Budget = ({ data }: Props) => {
	const [ selection, setSelection ] = useState('cabinet_list')
	const [ subSelection, setSubSelection ] = useState('total')
	const [ dataSet, setDataSet ] = useState(data[selection])

	const selectionList = Object.keys(data).map((entry) => <option value={entry}>{entry}</option>)

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
				date: `2020-${day}-01`,
			})
		} else {
			chartData.push({
				value: dataSet[index + 1][subSelection],
				date: `2020-${day}-01`,
			})
		}
	}

	return (
		<>
			<Head>
				<title>Budget Charts</title>
				<meta name='Population chart for Colorado' content='generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<aside className={styles.SidePanel}>
					<select value={selection} onChange={(e) => {
						setSelection(e.target.value)
						setSubSelection('total')
						setDataSet(data[selection])
					}} >
						{selectionList}
					</select>
					<ul className={styles.SelectionList}>{subSelectionList}</ul>
				</aside>
				<ChartBox data={[ { data: chartData, name: selection } ]} title={`Colorado's ${selection} Budget`} />
			</main>
		</>
	)
}

export default Budget
