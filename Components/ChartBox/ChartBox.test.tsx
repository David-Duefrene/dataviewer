import React from 'react'
import {
	vi, describe, afterEach, it, expect,
} from 'vitest'
import { render, screen } from '@testing-library/react'
import ChartBox from './ChartBox'

// Mock ThemeToggle
vi.mock('../UI/ThemeToggle/ThemeToggle')

// Mock LineChart
vi.mock('./LineChart.ts')

describe('ChartBox', () => {
	const mockData = [
		{
			name: 'Series 1',
			data: [ { date: '2023-01-01', value: 10 } ],
		},
		{
			name: 'Series 2',
			data: [ { date: '2023-01-01', value: 20 } ],
		},
	]

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders with default dimensions', () => {
		render(<ChartBox data={mockData} title='Test Chart' />)

		// Check if the SVG element is rendered with default dimensions
		const svgElement = screen.getByTestId('chart-svg')
		expect(svgElement).toBeInTheDocument()
		expect(svgElement).toHaveAttribute('width', '888')
		expect(svgElement).toHaveAttribute('height', '633')
	})
})

