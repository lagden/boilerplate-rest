import {URLSearchParams} from 'node:url'
import {promisify} from 'node:util'
import {test} from 'node:test'
import assert from 'node:assert/strict'
import got from 'got'
import run from './helper/server.js'

test('app', async t => {
	const {baseUrl, server} = run()

	t.after(async () => {
		await promisify(server.close.bind(server))()
	})

	await t.test('hey', async () => {
		const r = await got.get(baseUrl, {
			throwHttpErrors: false,
			responseType: 'json',
		})

		assert.equal(r.statusCode, 200)
		assert.equal(r.body.data.message, 'Hey Joe')
	})

	await t.test('hey boilerplate', async () => {
		const r = await got.get(`${baseUrl}/boilerplate`, {
			throwHttpErrors: false,
			responseType: 'json',
		})

		assert.equal(r.statusCode, 200)
		assert.equal(r.body.data.message, 'Hey boilerplate')
	})

	await t.test('echo', async () => {
		const searchParams = new URLSearchParams([['source', 'boilerplate']])
		const r = await got.post(`${baseUrl}/echo`, {
			throwHttpErrors: false,
			responseType: 'json',
			searchParams,
			json: {xxx: true},
		})

		assert.equal(r.statusCode, 200)
		assert.equal(r.body.xxx, true)
	})

	await t.test('error', async () => {
		const r = await got.post(`${baseUrl}/notAllowed`, {
			throwHttpErrors: false,
			responseType: 'json',
			json: {xxx: true},
		})

		assert.equal(r.statusCode, 405)
		assert.equal(r.body.message, 'Method Not Allowed')
	})
})
