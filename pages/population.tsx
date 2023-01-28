import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { useState } from 'react'

import data from './data.json';
import ChartBox from '../Components/ChartBox/ChartBox';
import styles from '../styles/population.module.scss'

interface ChartData {
	date: number;
	value: number;
}

const Home: NextPage = () => {
	const [county, setCounty] = useState(['Denver', 'El Paso']);
	const countyList = Object.keys(data).map(entry => {
		return (
			<li key={entry}>
				<button
					className={ `${styles.SelectionButton} ${county.includes(entry) ? styles.Active : ''}` }
					onClick={() => {
						if (county.includes(entry)) {
							if (county.length > 1) {
								setCounty(county.filter(c => c !== entry));
							}
							return;
						}
						setCounty([...county, entry]);
					}}
				>
					{entry}
				</button>
			</li>
		);
	});
	const dataSets: any = [];

	county.forEach(entry => {
		const newData = [];
        // @ts-ignore
        for (const dataPoint of data[entry]) {
			newData.push({
				date: dataPoint.year,
				value: dataPoint.totalPopulation
			});
		};
		newData.sort((a: ChartData, b: ChartData) => a.date - b.date);
		dataSets.push({data: newData, name: entry});
	});

  return (
    <>
      <Head>
        <title>Population Chart</title>
        <meta name="Population chart for Colorado" content="generated from data.colorado.gov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.App}>
	  	<aside className={styles.SidePanel}>
			<ul className={styles.SelectionList}>{countyList}</ul>
		</aside>
		<ChartBox data={dataSets} />
      </main>
    </>
  )
}

export default Home
