import { useState } from 'react'

import styles from './ControlPanel.module.sass'

interface ControlPanelProps {
	children: React.ReactElement[] | React.ReactElement
}

const ControlPanel = ({ children }: ControlPanelProps) => {
	const [ isCollapsed, setIsCollapsed ] = useState(true)
	const toggleCollapse = () => setIsCollapsed(!isCollapsed)

	return (
		<aside className={isCollapsed ? styles.Collapsed : styles.ControlPanel}>
			<button className={`${styles.CollapseButton}`} onClick={toggleCollapse}>{isCollapsed ? '>' : '<'}</button>
			<div className={`${isCollapsed ? styles.Collapsed : null}`}>{children}</div>
		</aside>
	)
}

export default ControlPanel
