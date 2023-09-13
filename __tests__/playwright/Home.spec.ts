import {
	describe, beforeAll, beforeEach, expect, should,
} from './playwright'
import translate from './util/translate'

describe('Homepage', async () => {
	let t: (key: string) => string
	beforeAll(async () => {
		t = await translate('common')
	})

	beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	should('have a title in the browser tab', async ({ page }) => {
		await expect(page).toHaveTitle(t('title'))
	})

	should('have the name of the app and the description', async ({ page }) => {
		await expect(page.getByRole('heading', { name: t('title') })).toBeVisible()
		await expect(page.getByRole('heading', { name: t('description') })).toBeVisible()
	})

	should('have a theme toggle', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Light' })).toBeVisible()
	})
})
