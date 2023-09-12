import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
	const URL = '/'
	test.beforeEach(async ({ page }) => {
		await page.goto(URL)
	})

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Data Viewer App')
	})

	test('get started link', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Data Viewer App' })).toBeVisible()
	})
})
