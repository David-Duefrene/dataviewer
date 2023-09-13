import {
	describe, beforeEach, expect, should,
} from './playwright'

import common from '../../public/locales/en/common.json'

describe('Homepage', () => {
	beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	should('have a title in the browser tab', async ({ page }) => {
		await expect(page).toHaveTitle(common.title)
	})

	should('have the name of the app and the description', async ({ page }) => {
		await expect(page.getByRole('heading', { name: common.title })).toBeVisible()
		await expect(page.getByRole('heading', { name: common.description })).toBeVisible()
	})

	should('have a theme toggle', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Light' })).toBeVisible()
	})
})
