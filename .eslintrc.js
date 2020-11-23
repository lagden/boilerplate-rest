'use strict'

module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	env: {
		es2020: true,
		node: true
	},
	extends: ['xo', 'plugin:unicorn/recommended'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'no-console': 0,
		'no-debugger': 0,
		'no-unused-expressions': [
			'error',
			{allowShortCircuit: true, allowTernary: true}
		],
		camelcase: 0,
		'capitalized-comments': 0,
		'spaced-comment': 0,
		'padding-line-between-statements': 0,
		'no-undef-init': 0,
		'unicorn/filename-case': 0,
		'unicorn/prevent-abbreviations': 0,
		'unicorn/no-reduce': 0,
		'unicorn/prefer-includes': 0,
		'unicorn/no-useless-undefined': 0,
		'unicorn/no-zero-fractions': 0,
		'unicorn/import-style': [
			'error',
			{
				styles: {
					util: false,
					path: {
						named: true
					}
				}
			}
		],
		// Bug no ctx.body Koa
		'require-atomic-updates': 0
	}
}
