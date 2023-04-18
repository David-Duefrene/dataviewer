import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from '../pages'

test('home', () => {
	render(<Home />)
	const nav = within(screen.getByRole('navigation'))
	expect(nav.getByRole('link', { name: /population/i })).toBeDefined()
	expect(nav.getByRole('link', { name: /budget/i })).toBeDefined()
})
