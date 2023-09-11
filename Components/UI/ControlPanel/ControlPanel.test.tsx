import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { describe, beforeAll, it, expect } from 'vitest'

import ControlPanel from './ControlPanel'

describe('ControlPanel', () => {
	beforeAll(() => {
		render(<ControlPanel>{<div>Hello World</div>}</ControlPanel>)
	})

	it('should toggle collapse on button click', () => {
		const collapseButton = screen.getByText('>')

		fireEvent.click(collapseButton)
		const controlPanel = screen.getByTestId('control-panel')
		expect(controlPanel.className).toContain('ControlPanel')
		expect(controlPanel.className).not.toContain('Collapsed')

		fireEvent.click(collapseButton)
		expect(controlPanel.className).toContain('Collapsed')
		expect(controlPanel.className).not.toContain('ControlPanel')
	})

	it('should have default state collapsed', () => {
		const controlPanel = screen.queryByTestId('control-panel')

		expect(controlPanel).toBe(null)
	})
})

