import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useVariableInterpolation from '../util/useVariableInterpolation'

import NavBar from '../Components/UI/NavBar/NavBar'

import type { NextPage } from 'next'
import ThemeToggle from '../Components/UI/ThemeToggle/ThemeToggle'

export const getStaticProps = async ({ locale }: { locale: string }) => {
	return {
		props: {
			...await serverSideTranslations(locale, [ 'common' ]),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useVariableInterpolation('common')

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
				<ThemeToggle />
			</hgroup>

			<main>
				<NavBar />
			</main>
		</>
	)
}

export default Home

