import { defineConfig, devices } from '@playwright/test'

import dotenv from 'dotenv'
dotenv.config()

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
	// Test Directory
	testDir: './__tests__/playwright',

	// Run tests in files in parallel
	fullyParallel: true,

	/* CI/CD specific settings */
	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,
	// Retry on CI only
	retries: process.env.CI ? 2 : 0,
	// Opt out of parallel tests on CI.
	workers: process.env.CI ? 1 : undefined,

	// Reporter to use. See https://playwright.dev/docs/test-reporters
	reporter: 'html',

	// Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
	use: {
		baseURL: 'http://localhost:3000',

		// Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
		trace: 'on-first-retry',
	},

	// Configure projects for major browsers
	projects: [
		// Desktop browsers
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },

		// Branded browsers
		{ name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
		{ name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },

		// Mobile browsers
		{ name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
		{ name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
	],

	webServer: { command: 'npm run start' },
})
