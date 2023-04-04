import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/index.module.sass'

const Home: NextPage = () => {
	const charts = [
		<Link key='0' className={styles.Link} href='/population'>Population</Link>,
		<Link key='1' className={styles.Link} href='/budget'>Budget</Link>,
	]

	return (
		<>
			<Head>
				<title>Data Viewer App</title>
				<meta name='Data Viewer App' content='Various charts generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.App}>
				<nav className={styles.NavBar}>{charts}</nav>
			</main>
		</>
	)
}

export default Home
