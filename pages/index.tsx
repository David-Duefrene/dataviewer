import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useVariableInterpolation from '../util/useVariableInterpolation'

import type { NextPage } from 'next'

import styles from '../styles/index.module.sass'

export const getStaticProps = async ({ locale }: { locale: string }) => {
	return {
		props: {
			...await serverSideTranslations(locale, [ 'common' ]),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useVariableInterpolation('common')
	const charts = [
		<Link key='0' className={styles.Link} href='/population'>
			<Image src='/icons/population.svg' width='50' height='50' alt={t('chartList.population')} />{t('chartList.population')}
		</Link>,
		<Link key='1' className={styles.Link} href='/budget'>
			<Image src='/icons/budget.svg' width='50' height='50' alt={t('chartList.budget')} />{t('chartList.budget')}
		</Link>,
	]

	const title: string = t('title')
	const desc: string = t('description')

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name={title} content={desc} />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<hgroup>
				<h1>{title}</h1>
				<h2>{desc}</h2>
			</hgroup>

			<main>
				<nav className={styles.NavBar}>{charts}</nav>
			</main>
		</>
	)
}

export default Home
