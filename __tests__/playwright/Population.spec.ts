import {
	describe, beforeAll, beforeEach, expect, should,
} from './playwright'
import translate from './util/translate'
import type { Translate } from './util/translate'

describe('Population', async () => {
	let p: Translate

	beforeAll(async () => {
		p = await translate('population')
	})

	beforeEach(async ({ page }) => {
		await page.goto('/population')
	})

	should('have a title in the browser tab', async ({ page }) => {
		await expect(page).toHaveTitle(p('title'))
	})
})

