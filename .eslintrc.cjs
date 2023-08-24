module.exports = {
	env: {
		'browser': true,
		'es2021': true,
	},
	extends: [
		'next/core-web-vitals',
		'eslint-config-vigilant-octo-train',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint' ],
	rules: {
		'react/react-in-jsx-scope': 0,
		'object-curly-newline': [ 'error', { 'minProperties': 5, 'multiline': true, 'consistent': true } ],
		// No implicit any
		'@typescript-eslint/no-explicit-any': 0,
	},
}
