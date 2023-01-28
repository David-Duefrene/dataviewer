import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from './index.module.scss'

interface ChartData {
	date: number;
	value: number;
}

const Home: NextPage = () => {
	const charts = [ <Link className={styles.Link} href='/population'>Population</Link> ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Viewer App</title>
        <meta name="Data Viewer App" content="Various charts generated from data.colorado.gov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.App}>
        <div className={styles.NavBar}>{charts}</div>
      </main>
    </div>
  )
}

export default Home
