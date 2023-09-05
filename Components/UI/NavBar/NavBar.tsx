import Link from 'next/link'
import Image from 'next/image'

import useVariableInterpolation from '../../../util/useVariableInterpolation'

import styles from './NavBar.module.sass'

const CHARTLIST = [ 'population', 'budget' ] as const

const NavBar = () => {
	const { t } = useVariableInterpolation('common')

	const charts = [
		<Link key='0' className={styles.Link} href='/population'>
			<Image src='/icons/population.svg' width='50' height='50' alt={t('chartList.population')} />{t('chartList.population')}
		</Link>,
		<Link key='1' className={styles.Link} href='/budget'>
			<Image src='/icons/budget.svg' width='50' height='50' alt={t('chartList.budget')} />{t('chartList.budget')}
		</Link>,
	]

	return <nav className={styles.NavBar}>{charts}</nav>
}

export default NavBar

