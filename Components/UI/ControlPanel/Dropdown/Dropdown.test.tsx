import { vi, describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import Dropdown from './Dropdown'

describe('Dropdown component', () => {
	const mockList = [ 'Option 1', 'Option 2', 'Option 3' ]
	const mockSelected = 'Option 2'
	const mockSetSelected = vi.fn()

	test('Dropdown renders with options', () => {
		const { getByText } = render(
			<Dropdown list={mockList} selected={mockSelected} setSelected={mockSetSelected} />,
		)

		// Check if the dropdown options are rendered
		mockList.forEach((option) => {
			const optionElement = getByText(option)
			expect(optionElement).toBeInTheDocument()
		})

		// Check if the selected option is displayed
		expect(getByText(mockSelected)).toBeInTheDocument()
	})

	test('Dropdown handles selection change', () => {
		const { getByRole } = render(
			<Dropdown list={mockList} selected={mockSelected} setSelected={mockSetSelected} />,
		)

		const dropdownElement = getByRole('combobox')

		// Simulate a change in the dropdown selection
		fireEvent.change(dropdownElement, { target: { value: 'Option 3' } })

		// Ensure that setSelected was called with the correct value
		expect(mockSetSelected).toHaveBeenCalledWith('Option 3')
	})

	test('Dropdown handles getTranslation function', () => {
		const getTranslationMock = vi.fn((key) => `Translated: ${key}`)
		const { getByText } = render(
			<Dropdown
				list={mockList}
				selected={mockSelected}
				setSelected={mockSetSelected}
				getTranslation={getTranslationMock}
			/>,
		)

		// Check if the translated options are displayed
		mockList.forEach((option) => {
			const translatedOption = `Translated: ${option}`
			const optionElement = getByText(translatedOption)
			expect(optionElement).toBeInTheDocument()
		})

		// Ensure that getTranslation was called for each option
		mockList.forEach((option) => {
			expect(getTranslationMock).toHaveBeenCalledWith(option)
		})
	})
})
