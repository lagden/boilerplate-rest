'use strict'

const debug = require('./lib/debug')
const app = require('./app')

const {
	PORT = 5000,
	PORT_PUBLISHED = 5000
} = process.env

app.listen(PORT, () => {
	debug.info('Server listening')
	debug.info('----------------')
	debug.info(`Local:    http://127.0.0.1:${PORT}`)
	debug.info(`External: http://0.0.0.0:${PORT_PUBLISHED}`)
})
