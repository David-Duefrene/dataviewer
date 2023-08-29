import useSWR from 'swr'
import { useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useVariableInterpolation from '../util/useVariableInterpolation'
import ChartBox from '../Components/ChartBox/ChartBox'
import Header from '../Components/UI/Header/Header'
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

	const [ year, setYear ] = useState('2021')
	const { data, error, isLoading } = useSWR(`/api/getBudget/${year}`, (url) => fetch(url).then((res) => res.json()))
	const [ selection, setSelection ] = useState('cabinet_list')
	const translatedSelection = t(`selection.${selection}`)
	const [ subSelection, setSubSelection ] = useState([ 'total' ])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	const dataSet = [ data[selection] ]

	const chartData: { data: { date: string, value: number }[], name: string }[] = []
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
		chartData.push({ data, name: t(`${translatedSelection.toLowerCase()}.${sub}`) })
	})

	const keywords = [
		'Budget',
		'Colorado',
		'State budget',
		'Fiscal year',
		'Revenue',
		'Expenses',
		'Expenditures',
		'Tax revenue',
		'General fund',
		'Debt',
		'Trends',
		'Analysis',
		'Chart',
		'Graph',
		'Line chart',
		'Visualization',
	]

	return (
		<>
			<Header
				title={t('title', { selection: translatedSelection })}
				description={t('description', { selection: translatedSelection })}
				keywords={keywords}
			/>
			<main>
				<ControlPanel>
					<Dropdown list={YEARS} selected={year} setSelected={setYear} />
					<Dropdown list={CATEGORIES} selected={selection} setSelected={setSelection} getTranslation={(c) => t(`selection.${c}`)} />
					<SelectionList
						list={Object.keys(dataSet[0][1])}
						selected={subSelection}
						setSelected={setSubSelection}
						getTranslation={(c) => t(`${translatedSelection.toLowerCase()}.${c}`)}
					/>
				</ControlPanel>
				<h1>{t('title', { selection: translatedSelection })}</h1>
				<ChartBox data={chartData} />
			</main>
		</>
	)
}

export default Budget
