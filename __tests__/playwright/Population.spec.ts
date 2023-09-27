import { ElementHandle } from '@playwright/test'
import {
	describe, beforeAll, beforeEach, expect, should,
} from './playwright'
import translate from './util/translate'
import type { Translate } from './util/translate'

type tElement = ElementHandle<HTMLElement | SVGElement>
const checkStrokes = async (elements: tElement | tElement[] | undefined): Promise<void> => {
	if (!elements) expect(elements).toBeTruthy()
	else if (!Array.isArray(elements)) elements = [ elements ]

	elements?.forEach(async (element: ElementHandle<HTMLElement | SVGElement>, index: number) => {
		const strokeName = `var(--line-color-${index%10})`
		const stroke = await element.getAttribute('stroke')
		expect(stroke).toBe(strokeName)
	})
}

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

	should('render a svg with 2 paths', async ({ page }) => {
		const svg = await page.$('svg')
		expect(svg).toBeTruthy()

		const paths = await svg?.$$('path')
		expect(paths?.length).toBe(2)

		await checkStrokes(paths)
	})

	should('render a svg with 3 paths', async ({ page }) => {
		let collapseButton = page.getByText('>')
		await collapseButton.click()

		const tellerCounty = page.getByText('Teller')
		await tellerCounty.click()
		collapseButton = page.getByText('<')
		await collapseButton.click()

		const svg = await page.$('svg')
		expect(svg).toBeTruthy()

		const paths = await svg?.$$('path')
		expect(paths?.length).toBe(3)

		const teller = page.getByText('Teller')
		expect(teller).toBeTruthy()

		await checkStrokes(paths)
	})

	should('render a svg with 12 paths', async ({ page }) => {
		let button = page.getByText('>')
		await button.click()

		const countyList = [ 'Teller', 'Arapahoe', 'Jefferson', 'Douglas', 'Adams', 'Boulder', 'Broomfield', 'Clear Creek', 'Gilpin', 'Park' ]
		for (let index = 0; index < 10; index++) {
			button = page.getByText(countyList[index])
			await button.click()
		}

		button = page.getByText('<')
		await button.click()
		const svg = await page.$('svg')
		expect(svg).toBeTruthy()

		const paths = await svg?.$$('path')
		expect(paths?.length).toBe(12)

		for (let index = 0; index < 10; index++) {
			const key = page.getByText(countyList[index])
			expect(key).toBeTruthy()
		}
	})
})

