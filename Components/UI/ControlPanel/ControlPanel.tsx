import { useState } from 'react'

import styles from './ControlPanel.module.sass'

interface ControlPanelProps {
	children: React.ReactElement[] | React.ReactElement
}

const ControlPanel = ({ children }: ControlPanelProps) => {
	const [ isCollapsed, setIsCollapsed ] = useState(true)
	const toggleCollapse = () => setIsCollapsed(!isCollapsed)

	return (
		<>
			<button className={`${styles.CollapseButton}`} onClick={toggleCollapse} data-testid='collapse-button'>{isCollapsed ? '>' : '<'}</button>
			<aside className={isCollapsed ? styles.Collapsed : styles.ControlPanel} data-testid='control-panel'>
				<div className={`${isCollapsed ? styles.Collapsed : null}`}>{children}</div>
			</aside>
		</>
	)
}

export default ControlPanel

