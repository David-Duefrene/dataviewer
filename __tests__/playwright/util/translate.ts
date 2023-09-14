const DIR = '../../../public/locales/en/'

const translate: (file: string) => Promise<Translate> = async (file: string) => {
	const result = await import(`${DIR}${file}.json`)
	return (key: string) => result.default[key]
}

export default translate

export type Translate = (key: string) => string
