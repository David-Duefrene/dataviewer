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
		await expect(page).toHaveTitle(p('headTitle'))
	})

	should('have a title on the page', async ({ page }) => {
		const title = await page.innerText('h1')
		const paragraph = await page.innerText('p')
		expect(title).toBe(p('title'))
		expect(paragraph).toBe(p('headDescription'))
	})

	should('have two ColorKey elements, Denver and El Paso by default', async ({ page }) => {
		const denver = page.getByText('Denver')
		const elPaso = page.getByText('El Paso')

		expect(denver).toBeTruthy()
		expect(elPaso).toBeTruthy()
	})
})

