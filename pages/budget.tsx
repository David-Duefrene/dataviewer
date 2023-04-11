import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useVariableInterpolation from '../util/useVariableInterpolation'
import ChartBox from '../Components/ChartBox/ChartBox'
import ControlPanel from '../Components/UI/ControlPanel/ControlPanel'
import SelectionList from '../Components/UI/ControlPanel/SelectionList/SelectionList'
import Dropdown from '../Components/UI/ControlPanel/Dropdown/Dropdown'

const YEARS = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ]
const CATEGORIES = [ 'cabinet_list', 'department_list', /*'grand_totals',*/ 'fund_list', 'fund_category_list' ]

export const getStaticProps = async ({ locale }: { locale: string }) => {
	return {
		props: {
			...await serverSideTranslations(locale, [
				'budget',
			]),
		},
	}
}

const Budget = () => {
	const { t } = useVariableInterpolation('budget')

	const translatedCategories = CATEGORIES.map((category) => t(`selection.${category}`))

	const [ year, setYear ] = useState(2021)
	const { data, error, isLoading } = useSWR(`/api/getBudget/${year}`, (url) => fetch(url).then((res) => res.json()))
	const [ selection, setSelection ] = useState('cabinet_list')
	const [ subSelection, setSubSelection ] = useState([ 'total' ])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	const dataSet = [ data[selection] ]

	const chartData: { data: { date: string, value: number}[], name: string}[] = []
	subSelection.forEach((sub) => {
		const data = []
		for (let index = 0; index < 12; index++) {
			// Pads 0 if less than 10, ex. 01, 02, 03
			const day = index < 9 ? `0${index + 1}` : index + 1
			data.push({
				value: dataSet[0][index + 1][sub],
				date: `${year}-${day}-01`,
			})
		}
		chartData.push({ data, name: sub })
	})

	return (
		<>
			<Head>
				<title>Budget Charts</title>
				<meta name='Budget chart for Colorado' content='generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<ControlPanel>
					<Dropdown list={YEARS} selected={year} setSelected={setYear} />
					<Dropdown list={translatedCategories} selected={selection} setSelected={setSelection} />
					<SelectionList
						list={Object.keys(dataSet[0][1])}
						selected={subSelection}
						setSelected={setSubSelection}
					/>
				</ControlPanel>
				<ChartBox data={chartData} title={t('title', { selection: `$t(selection.${selection})` })} />
			</main>
		</>
	)
}

export default Budget
