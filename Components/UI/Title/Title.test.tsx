import React from 'react'
import { vi, describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import Title from './Title'

vi.mock('next-i18next', () => ({
	useTranslation: (page: string) => ({
		t: (key: string) => `${page}.${key}`,
	}),
}))

describe('Title Component', () => {
	it('renders with the correct title and description', () => {
		const page = 'testPage'
		const opts = { param1: 'value1', param2: 'value2' }

		const { getByText } = render(<Title page={page} opts={opts} />)

		expect(getByText(`${page}.title`)).toBeInTheDocument()
		expect(getByText(`${page}.headDescription`)).toBeInTheDocument()
	})

	it('renders with default props when opts is not provided', () => {
		const page = 'testPage'

		const { getByText } = render(<Title page={page} />)

		expect(getByText(`${page}.title`)).toBeInTheDocument()
		expect(getByText(`${page}.headDescription`)).toBeInTheDocument()
	})

	it('renders without crashing with empty opts', () => {
		const page = 'testPage'
		const opts = {}

		expect(() => render(<Title page={page} opts={opts} />)).not.toThrowError()
	})
})

