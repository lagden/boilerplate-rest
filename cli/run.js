#!/usr/bin/env node

import '../server/reset.js'
import process from 'node:process'
import la from '@tadashi/local-access'
import * as debug from '@tadashi/debug'
import app from '../server/app.js'

const {
	PORT: port = 5001,
	HOSTNAME_CUSTOM: hostname = '0.0.0.0',
	VERSION = 'dev',
} = process.env

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
