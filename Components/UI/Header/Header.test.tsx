import { describe, test } from 'vitest'
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
})

