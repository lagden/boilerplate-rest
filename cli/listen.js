import process from 'node:process'
import la from '@tadashi/local-access'
import * as debug from '@tadashi/debug'
import app from '../server/app.js'

// prettier-ignore
const {
	PORT: port = 5001,
	HOSTNAME_CUSTOM: hostname = '127.0.0.1',
	VERSION = 'dev',
} = process.env

// prettier-ignore
const {
	local,
	network,
} = la({port, hostname})

app.listen(port, () => {
	debug.info('Server listening')
	debug.info('----------------')
	debug.info(`Local:    ${local}`)
	debug.info(`Network:  ${network}`)
	debug.info('----------------')
	debug.info(`Version:  ${VERSION}`)
})
