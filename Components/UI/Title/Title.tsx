import type { ReactElement } from 'react'

import { useTranslation } from 'next-i18next'

interface TitleProps {
	page: string
	opts?:Record<string, string>
}

const Title = (props: TitleProps): ReactElement => {
	const { page, opts } = props
	const { t } = useTranslation(page)

	return <h1>{t('title', opts)}</h1>
}

export default Title

