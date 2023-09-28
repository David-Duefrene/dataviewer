import {
	describe, beforeAll, beforeEach, expect, should,
} from './playwright'

import translate from './util/translate'
import type { Translate } from './util/translate'

describe('Budget', () => {
	let p: Translate

	beforeAll(async () => {
		p = await translate('budget')
	})

	beforeEach(async ({ page }) => {
		await page.goto('/budget')
	})

	should('have a title in the browser tab', async ({ page }) => {
		await expect(page).toHaveTitle(p('headTitle', { selection: 'Cabinet' }))
	})
})
