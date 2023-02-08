import Head from 'next/head'

import { useState } from 'react'

import ChartBox, { ChartData } from '../Components/ChartBox/ChartBox'
// import clientPromise from '../util/mongoClient'
import data from './budget.json'
import styles from '../styles/population.module.scss'

const Budget = () => {
    const [selection, setSelection] = useState('cabinet_list')
    const [dataSet, setDataSet]: [ChartData, any] = useState(data[selection])

    const chartData = [];
    for (let index = 0; index < 12; index++) {
        // Pads 0 if less than 10, ex. 01, 02, 03
        const day = index < 9 ? `0${index + 1}` : index + 1;
        if (selection === '') {
            chartData.push({
                value: dataSet[index + 1].total,
                date: `2020-${day}-01`,
            });
        } else {
            console.log('Date: ', new Date(`2020-${day}-01`))
            chartData.push({
                value: dataSet[index + 1]["Department of Agriculture (B)"],
                date: `2020-${day}-01`,
            });
        }
    }

    console.log('chartData: ', chartData)
    return (
        <ChartBox data={[{ data: chartData, name: selection}]} />
    )

}

export default Budget
