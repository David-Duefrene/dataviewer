import { vi, describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

// Mock the 'useVariableInterpolation' hook
vi.mock('../../../util/useVariableInterpolation', () => ({
	__esModule: true,
	default: () => ({ t: vi.fn((key) => key) }), // Mock the 't' function
}))

describe('NavBar', () => {
	test('renders the NavBar component with links and icons', () => {
		render(<NavBar />)

		// Check if the correct number of links is rendered
		const links = screen.getAllByRole('link')
		expect(links).toHaveLength(2)

		// Check if link text and alt attributes are correct
		const populationLink = screen.getByText('chartList.population')
		const budgetLink = screen.getByText('chartList.budget')
		expect(populationLink).toBeInTheDocument()
		expect(budgetLink).toBeInTheDocument()

		// Check if image elements have the correct 'src' and 'alt' attributes
		const populationImage = screen.getByAltText('chartList.population')
		const budgetImage = screen.getByAltText('chartList.budget')
		expect(populationImage).toHaveAttribute('src', '/icons/population.svg')
		expect(budgetImage).toHaveAttribute('src', '/icons/budget.svg')
	})

	test('renders links with correct href attributes', () => {
		render(<NavBar />)

		const populationLink = screen.getByText('chartList.population')
		const budgetLink = screen.getByText('chartList.budget')
		expect(populationLink).toHaveAttribute('href', '/population')
		expect(budgetLink).toHaveAttribute('href', '/budget')
	})
})

