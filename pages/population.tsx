import Head from 'next/head'

import { useState } from 'react'

import clientPromise from '../util/mongoClient'

import ControlPanel from '../Components/UI/ControlPanel/ControlPanel'
import ChartBox from '../Components/ChartBox/ChartBox'
import SelectionList from '../Components/UI/ControlPanel/SelectionList/SelectionList'

interface PopData {
	year: number;
	totalPopulation: number;
}

export const getServerSideProps = async () => {
	try {
		const client = await clientPromise
		const db = client.db('DataViewer')

		const dataSet = await db
			.collection('population')
			.find({})
			.toArray()
		const json = JSON.parse(JSON.stringify(dataSet))[0]
		delete json._id

		return {
			props: { countyJSON: json },
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)
		throw new Error('Failed to connect to database')
	}
}

interface HomeProps {
    countyJSON: Record<string, PopData[]>;
}

const Population = ({ countyJSON }: HomeProps) => {
	const [ county, setCounty ] = useState([ 'Denver', 'El Paso' ])

	const dataSets: { data: { date: string, value: number}[], name: string}[] = []

	county.forEach((entry) => {
		const newData = []
		for (const dataPoint of countyJSON[entry]) {
			newData.push({
				date: `${dataPoint.year}-01-01`,
				value: dataPoint.totalPopulation,
			})
		}
		newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		dataSets.push({ data: newData, name: entry })
	})

	return (
		<>
			<Head>
				<title>Population Chart</title>
				<meta name='Population chart for Colorado' content='generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<ControlPanel>
					<SelectionList list={Object.keys(countyJSON)} selected={county} setSelected={setCounty} />
				</ControlPanel>
				<ChartBox data={dataSets} title='Colorado Population & Projected Growth' />
			</main>
		</>
	)
}

export default Population
