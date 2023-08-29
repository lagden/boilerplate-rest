import base from '@tadashi/koa-base'
import routes from './routes/routes.js'
import * as debug from '@tadashi/debug'

const app = base({
	error: true,
	cors: {
		credentials: true,
	},
})

app
	.use(routes)
	.on('error', debug.error)

app.proxy = true

export default app
