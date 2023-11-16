import hexId from '@tadashi/hex-id'
import toPort from 'hash-to-port'
import app from '../../server/app.js'

const port = toPort(hexId())

export default function run(p = port) {
	const server = app.listen(p)
	return {
		server,
		baseUrl: `http://127.0.0.1:${p}`,
	}
}
