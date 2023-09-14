import {
	describe, beforeAll, beforeEach, expect, should,
} from './playwright'
import translate from './util/translate'
import type { Translate } from './util/translate'

describe('Homepage', async () => {
	let c: Translate
	let l: Translate

	beforeAll(async () => {
		c = await translate('common')
		l = await translate('chartList')
	})

	beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	should('have a title in the browser tab', async ({ page }) => {
		await expect(page).toHaveTitle(c('title'))
	})

	should('have the name of the app and the description', async ({ page }) => {
		await expect(page.getByRole('heading', { name: c('title') })).toBeVisible()
		await expect(page.getByRole('heading', { name: c('description') })).toBeVisible()
	})

	should('have a theme toggle', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Light' })).toBeVisible()
	})

	should('have links to budget and population', async ({ page }) => {
		await expect(page.getByRole('link', { name: l('budget') })).toBeVisible()
		await expect(page.getByRole('link', { name: l('population') })).toBeVisible()
	})

	// It should switch to dark mode when the theme toggle is clicked
	should('switch to dark mode when the theme toggle is clicked', async ({ page }) => {
		let themeToggle = page.getByRole('button', { name: 'Light' })
		await themeToggle.click()
		expect(page.getByText('Dark')).toBeTruthy()

		themeToggle = page.getByRole('button', { name: 'Dark' })
		await themeToggle.click()
		expect(page.getByText('Light')).toBeTruthy()
	})
})
