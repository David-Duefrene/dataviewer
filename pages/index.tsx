import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import type { NextPage } from 'next'

import styles from '../styles/index.module.sass'

export const getStaticProps = async ({ locale }: { locale: string }) => {
	return {
		props: {
			...await serverSideTranslations(locale, [ 'chartList' ]),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation('chartList')
	const charts = [
		<Link key='0' className={styles.Link} href='/population'>
			<Image src='/icons/population.svg' width='50' height='50' alt={t('population')} />{t('population')}
		</Link>,
		<Link key='1' className={styles.Link} href='/budget'>
			<Image src='/icons/budget.svg' width='50' height='50' alt={t('budget')} />{t('budget')}
		</Link>,
	]

	return (
		<>
			<Head>
				<title>Data Viewer App</title>
				<meta name='Data Viewer App' content='Various charts generated from data.colorado.gov' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<hgroup>
				<h1>Data Viewer App</h1>
				<h2>Various charts generated from data.colorado.gov</h2>
			</hgroup>

			<main>
				<nav className={styles.NavBar}>{charts}</nav>
			</main>
		</>
	)
}

export default Home
