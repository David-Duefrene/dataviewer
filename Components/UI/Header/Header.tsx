import Head from 'next/head'

type HeaderProps = {
	title: string
	description: string
	keywords: string[]
}

const Header = ({ title, description, keywords }: HeaderProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='keywords' content={keywords.join(', ')} />
			<meta name='author' content='David Duefrene' />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	)
}

export default Header
