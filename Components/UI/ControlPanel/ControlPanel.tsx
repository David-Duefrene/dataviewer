import styles from './ControlPanel.module.sass'

interface ControlPanelProps {
	children: React.ReactElement[] | React.ReactElement
}

const ControlPanel = ({ children }: ControlPanelProps) => {
	return (
		<aside className={styles.ControlPanel} >
			{children}
		</aside>
	)
}

export default ControlPanel
