const DIR = '../../../public/locales/en/'

const translate = async (file: string) => {
	const result = await import(`${DIR}${file}.json`)
	return (key: string) => result.default[key]
}

export default translate

