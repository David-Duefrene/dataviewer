import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'

import Header from './Header'

describe('Header component', () => {
	test('renders without crashing', () => {
		render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)
	})

	test('displays the correct title', () => {
		const { getByText } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const titleElement = getByText('Test Title')
		expect(titleElement).toBeInTheDocument()
	})

	test('displays the correct description', () => {
		const { getByText } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const descriptionElement = getByText('Test Description')
		expect(descriptionElement).toBeInTheDocument()
	})

	test('displays the correct keywords', () => {
		const { getByText } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const keywordsElement = getByText('test, keywords')
		expect(keywordsElement).toBeInTheDocument()
	})

	test('renders the author meta tag', () => {
		const { container } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const authorMetaTag = container.querySelector(
			'meta[name="author"][content="David Duefrene"]',
		)
		expect(authorMetaTag).toBeInTheDocument()
	})

	test('renders the viewport meta tag', () => {
		const { container } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const viewportMetaTag = container.querySelector(
			'meta[name="viewport"][content="width=device-width, initial-scale=1.0"]',
		)
		expect(viewportMetaTag).toBeInTheDocument()
	})

	test('renders the favicon link', () => {
		const { container } = render(
			<Header
				title='Test Title'
				description='Test Description'
				keywords={[ 'test', 'keywords' ]}
			/>,
		)

		const faviconLink = container.querySelector('link[rel="icon"]')
		expect(faviconLink).toBeInTheDocument()
		expect(faviconLink).toHaveAttribute('href', '/favicon.ico')
	})
})

