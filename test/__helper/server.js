import {promisify} from 'node:util'
import {createServer} from 'node:http'
import listen from 'test-listen'
import app from '../../server/app.js'

export async function start() {
	const server = createServer(app.callback())
	const prefixUrl = await listen(server)
	return {
		server,
		prefixUrl,
	}
}

export async function stop(server) {
	await promisify(server.close.bind(server))()
}
