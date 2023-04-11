import type { AppProps } from 'next/app'

import { appWithTranslation } from 'next-i18next'

import '../styles/globals.sass'

const MyApp = function ({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
