await import('../cli/reset.js')

import {URL} from 'node:url'
import {promisify} from 'node:util'
import {createServer} from 'node:http'
import {after, before, test} from 'node:test'
import assert from 'node:assert/strict'
import listen from 'test-listen'
import app from '../server/app.js'

const _options = {
	redirect: 'follow',
	method: 'GET',
}

const headers = new Headers([['Content-Type', 'application/json']])

let server
let prefixUrl

before(async () => {
	server = createServer(app.callback())
	prefixUrl = await listen(server)
})

after(async () => {
	await promisify(server.close.bind(server))()
})

test('hey', async () => {
	const r = await globalThis.fetch(prefixUrl, _options)
	const d = await r.json()

	assert.equal(r.status, 200)
	assert.equal(d.data.message, 'Hey Joe')
})

test('hey boilerplate', async () => {
	const r = await globalThis.fetch(`${prefixUrl}/boilerplate`, _options)
	const d = await r.json()

	assert.equal(r.status, 200)
	assert.equal(d.data.message, 'Hey boilerplate')
})

test('echo', async () => {
	const url = new URL(`${prefixUrl}/echo`)
	url.searchParams.set('source', 'boilerplate')

	const r = await globalThis.fetch(url, {
		..._options,
		method: 'POST',
		headers,
		body: JSON.stringify({xxx: true}),
	})
	const d = await r.json()

	assert.equal(r.status, 200)
	assert.equal(d.xxx, true)
})

test('error', async () => {
	const r = await globalThis.fetch(`${prefixUrl}/notAllowed`, {
		..._options,
		method: 'POST',
		headers,
		body: JSON.stringify({xxx: false}),
	})
	const d = await r.json()

	assert.equal(r.status, 405)
	assert.equal(d.message, 'Method Not Allowed')
})
