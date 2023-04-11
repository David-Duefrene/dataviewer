import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import styles from '../styles/index.module.sass'

type HomeStaticProps = {
	locale: string
}

export const getStaticProps = async ({ locale }: HomeStaticProps) => {
	return {
		props: {
			...await serverSideTranslations(locale, [
				'chartList',
			]),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation('chartList')
	const charts = [
		<Link key='0' className={styles.Link} href='/population'>{t('population')}</Link>,
		<Link key='1' className={styles.Link} href='/budget'>{t('budget')}</Link>,
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
