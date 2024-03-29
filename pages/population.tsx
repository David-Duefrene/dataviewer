import { useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import clientPromise from '../util/mongoClient'

import ChartBox from '../Components/ChartBox/ChartBox'

import Header from '../Components/UI/Header/Header'
import ControlPanel from '../Components/UI/ControlPanel/ControlPanel'
import SelectionList from '../Components/UI/ControlPanel/SelectionList/SelectionList'

export const getServerSideProps = async ({ locale }: { locale: string }) => {
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
			props: {
				countyJSON: json,
				...await serverSideTranslations(locale, [
					'population',
				]),
			},
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)
		throw new Error('Failed to connect to database')
	}
}

interface PopData {
	year: number;
	totalPopulation: number;
}

interface HomeProps {
    countyJSON: Record<string, PopData[]>;
}

const Population = ({ countyJSON }: HomeProps) => {
	const { t } = useTranslation('population')

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

	const keywords = [
		'Population',
		'Colorado',
		'Historical data',
		'Current population',
		'Projected population',
		'Census',
		'Chart',
		'Graph',
		'Line chart',
		'Visualization',
	]

	return (
		<>
			<Header
				title={t('headTitle')}
				description={t('headDescription')}
				keywords={keywords}
			/>
			<main>
				<ControlPanel>
					<SelectionList list={Object.keys(countyJSON)} selected={county} setSelected={setCounty} />
				</ControlPanel>
				<ChartBox data={dataSets} title='population' />
			</main>
		</>
	)
}

export default Population
