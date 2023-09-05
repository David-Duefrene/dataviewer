import Link from 'next/link'
import Image from 'next/image'

import useVariableInterpolation from '../../../util/useVariableInterpolation'

import styles from './NavBar.module.sass'

const CHARTLIST = [ 'population', 'budget' ] as const

const NavBar = (): JSX.Element => {
	const { t } = useVariableInterpolation('common')

	const charts: JSX.Element[] = CHARTLIST.map((chartName, index) => {
		const tChartName = t(`chartList.${chartName}`)
		return (
			<Link key={`Chart-${index}-${chartName}`} className={styles.Link} href={`/${chartName}`}>
				<Image src={`/icons/${chartName}.svg`} width='50' height='50' alt={tChartName} />
				{tChartName}
			</Link>
		)
	})

	return <nav className={styles.NavBar}>{charts}</nav>
}

export default NavBar

