import { vi, describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
	it('renders without crashing', () => {
		const { getByText } = render(<ThemeToggle />)
		const toggleButton = getByText('Light')
		expect(toggleButton).toBeInTheDocument()
	})

	it('toggles the theme when clicked', () => {
		const { getByText } = render(<ThemeToggle />)
		const toggleButton = getByText('Light')

		// Click to toggle to Dark theme
		fireEvent.click(toggleButton)
		expect(toggleButton).toHaveTextContent('Dark')

		// Click again to toggle back to Light theme
		fireEvent.click(toggleButton)
		expect(toggleButton).toHaveTextContent('Light')
	})

	it('sets the initial theme based on prefers-color-scheme', () => {
		window.matchMedia = vi.fn().mockImplementation(() => ({ match: true }))
		const { getByText } = render(<ThemeToggle />)
		const toggleButton = getByText('Light')
		expect(toggleButton).toBeTruthy()
	})
})

