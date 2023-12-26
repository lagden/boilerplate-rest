import '../cli/reset.js'

import {URL} from 'node:url'
import {promisify} from 'node:util'
import {createServer} from 'node:http'
import {after, describe, it} from 'node:test'
import assert from 'node:assert/strict'
import listen from 'test-listen'
import app from '../server/app.js'

const _options = {
	redirect: 'follow',
	method: 'GET',
}

describe('app', async () => {
	let server = createServer(app.callback())
	let prefixUrl = await listen(server)

	after(async () => {
		await promisify(server.close.bind(server))()
	})

	it('hey', async () => {
		const r = await globalThis.fetch(prefixUrl, _options)
		const d = await r.json()

		assert.equal(r.status, 200)
		assert.equal(d.data.message, 'Hey Joe')
	})

	it('hey boilerplate', async () => {
		const r = await globalThis.fetch(`${prefixUrl}/boilerplate`, _options)
		const d = await r.json()

		assert.equal(r.status, 200)
		assert.equal(d.data.message, 'Hey boilerplate')
	})

	it('echo', async () => {
		const url = new URL(`${prefixUrl}/echo`)
		url.searchParams.set('source', 'boilerplate')

		const r = await globalThis.fetch(url, {
			..._options,
			method: 'POST',
			headers: new Headers([['Content-Type', 'application/json']]),
			body: JSON.stringify({xxx: true}),
		})
		const d = await r.json()

		assert.equal(r.status, 200)
		assert.equal(d.xxx, true)
	})

	it('error', async () => {
		const r = await globalThis.fetch(`${prefixUrl}/notAllowed`, {
			..._options,
			method: 'POST',
			headers: new Headers([['Content-Type', 'application/json']]),
			body: JSON.stringify({xxx: true}),
		})
		const d = await r.json()

		assert.equal(r.status, 405)
		assert.equal(d.message, 'Method Not Allowed')
	})
})
