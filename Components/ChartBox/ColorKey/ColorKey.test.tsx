import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import ColorKey, { ColorRow } from './ColorKey'

describe('ColorKey', () => {
	afterEach(cleanup)

	test('ColorKey renders blank with no children', () => {
		render(<ColorKey />)

		const name = screen.getByText('Name')
		const color = screen.getByText('Color')
		expect(name.innerHTML).toBe('Name')
		expect(color.innerHTML).toBe('Color')
	})

	test('ColorKey renders with children', () => {
		render(
			<ColorKey>
				<ColorRow name='Test' color='red' />
				<ColorRow name='Test2' color='blue' />
			</ColorKey>,
		)

		const test = screen.getByText('Test')
		const test2 = screen.getByText('Test2')
		expect(test.innerHTML).toBe('Test')
		expect(test2.innerHTML).toBe('Test2')
	})
})
