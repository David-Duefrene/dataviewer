import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { describe, beforeAll, it, expect } from 'vitest'

import ControlPanel from './ControlPanel'

describe('ControlPanel', () => {
	beforeAll(() => {
		render(<ControlPanel>{<div>Hello World</div>}</ControlPanel>)
	})

	it('should toggle collapse on button click', () => {
		const collapseButton = screen.getByTestId('collapse-button')
		const controlPanel = screen.getByTestId('control-panel')

		fireEvent.click(collapseButton)
		expect(controlPanel.className).toContain('ControlPanel')
		expect(controlPanel.className).not.toContain('Collapsed')

		fireEvent.click(collapseButton)
		expect(controlPanel.className).toContain('Collapsed')
		expect(controlPanel.className).not.toContain('ControlPanel')
	})

	it('should render children when not collapsed', () => {
		const collapseButton = screen.getByTestId('collapse-button')
		fireEvent.click(collapseButton)

		expect(screen.getByText('Hello World')).toBeTruthy()
	})

	it('should have default state collapsed', () => {
		const controlPanel = screen.getByTestId('control-panel')

		expect(controlPanel.className).toContain('ControlPanel')
		expect(controlPanel.className).not.toContain('Collapsed')
	})
})

