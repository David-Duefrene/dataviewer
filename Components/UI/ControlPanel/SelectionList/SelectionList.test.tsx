import React from 'react'

import {
	describe, test, expect, vi, afterAll,
} from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'

import SelectionList from './SelectionList'

describe('SelectionList component', () => {
	const list = [ 'Item 1', 'Item 2', 'Item 3' ]
	const selected = [ 'Item 2' ]

	afterAll(() => {
		cleanup()
	})

	test('renders the list items', () => {
		const { getByText } = render(<SelectionList list={list} selected={selected} setSelected={() => {}} />)

		list.forEach((item) => {
			const listItem = getByText(item)
			expect(listItem).toBeInTheDocument()
		})
	})

	test('applies "Active" class to selected items', () => {
		const { getByText } = render(<SelectionList list={list} selected={selected} setSelected={() => {}} />)

		list.forEach((item) => {
			const listItem = getByText(item)
			if (item === 'Item 2') {
				expect(listItem).toHaveClass('Active')
			} else {
				expect(listItem).not.toHaveClass('Active')
			}
		})
	})

	test('clicking on a selected item calls setSelected', () => {
		const setSelected = vi.fn()
		render(<SelectionList list={list} selected={selected} setSelected={setSelected} />)
		fireEvent.click(screen.getByText('Item 1'))
		expect(setSelected).toHaveBeenCalledWith([ 'Item 2', 'Item 1' ])
	})

	test('getTranslation function is called for each item', () => {
		const getTranslation = vi.fn((key) => key)
		const { getByText } = render(
			<SelectionList list={list} selected={selected} setSelected={() => {}} getTranslation={getTranslation} />,
		)

		list.forEach((item) => {
			const listItem = getByText(item)
			expect(getTranslation).toHaveBeenCalledWith(item)
			expect(listItem.textContent).toBe(item)
		})
	})
})

