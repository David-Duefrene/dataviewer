import { useTranslation } from 'next-i18next'

const useVariableInterpolation = (namespace: string) => {
	const { t } = useTranslation(namespace)
	return {
		t: (key: string, options?: any) => t(key, {
			...options,
			interpolation: { skipOnVariables: false },
		}).toString(),
	}
}

export default useVariableInterpolation
