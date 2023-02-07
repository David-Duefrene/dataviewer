import Head from 'next/head'

import { useState } from 'react'

import ChartBox from '../Components/ChartBox/ChartBox'
import clientPromise from '../util/mongoClient'
import styles from '../styles/population.module.scss'

interface PopData {
	year: number;
	totalPopulation: number;
}

interface ChartData {
    date: number;
    value: number;
}

export const getServerSideProps = async () => {
    try {
        const client = await clientPromise
        const db = client.db('DataViewer')

        const dataSet = await db
            .collection('population')
            .find({})
            .toArray()
        const json =  JSON.parse(JSON.stringify(dataSet))[0]
        delete json._id


        return {
            props: { countyJSON: json },
        }
    } catch (e) {
        console.error(e)
        throw new Error('Failed to connect to database')
    }
}

interface HomeProps {
    countyJSON: Record<string, PopData[]>;
}


const Home = ({ countyJSON }: HomeProps) => {
	const [county, setCounty] = useState(['Denver', 'El Paso']);

	const countyList = Object.keys(countyJSON).map(entry => {
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
        for (const dataPoint of countyJSON[entry]) {
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
