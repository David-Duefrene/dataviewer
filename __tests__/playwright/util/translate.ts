const DIR = '../../../public/locales/en/'

const translate: (file: string) => Promise<Translate> = async (file: string) => {
	const result = await import(`${DIR}${file}.json`)

	return (key: string, variable: Record<string, string>) => {
		let translation: string = result.default[key]
		const matches: string[] | null = translation.match(/\{\{([^{}]+)\}\}/g)
		matches?.forEach((match: string) => {
			translation = translation.replace(match, variable[match.slice(2, -2)])
		})

		return translation
	}
}

export default translate

export type Translate = (key: string, variable: Record<string, string>) => string
