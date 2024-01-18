import process from 'node:process'
import * as debug from '@tadashi/debug'
import ee from '@tadashi/ee'
import base from '@tadashi/koa-base'
import routes from './routes/routes.js'

// prettier-ignore
const {
	LOG_RESOURCE,
} = process.env

/* c8 ignore start */
if (LOG_RESOURCE) {
	await import(LOG_RESOURCE)
}
/* c8 ignore stop */

// prettier-ignore
const app = base({
	error: true,
	cors: {
		credentials: true,
	},
})

// prettier-ignore
app
	.use(routes)
	.on('error', error => {
		debug.error('app', error.message)
		/* c8 ignore start */
		if (error?.log) {
			debug.error('app | log', error.log)
			ee.emit('logger', error.log)
		}
		/* c8 ignore stop */
	})

app.proxy = true

export default app
