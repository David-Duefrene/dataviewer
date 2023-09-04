import { useTranslation } from 'next-i18next'

import ThemeToggle from '../ThemeToggle/ThemeToggle'

import type { ReactElement } from 'react'

import styles from './Title.module.sass'

interface TitleProps {
	page: string
	opts?:Record<string, string>
}

const Title = (props: TitleProps): ReactElement => {
	const { page, opts } = props
	const { t } = useTranslation(page)

	return <hgroup className={styles.Main}>
		<ThemeToggle />
		<div>
			<h1>{t('title', opts)}</h1>
			<p>{t('headDescription', opts)}</p>
		</div>
	</hgroup>
}

export default Title

