import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import * as debug from '@tadashi/debug'

const router = new Router()

// GET
function hey(ctx) {
	const {name = 'Joe'} = ctx.params

	// Debug de exemplo
	debug.info('hey | name', name)

	ctx.body = {
		data: {
			message: `Hey ${name}`,
		},
	}
}

// POST
function echo(ctx) {
	const {body} = ctx.request

	// echo do post
	ctx.body = body
}

// prettier-ignore
router
	.get(['/', '/:name'], hey)
	.post('/echo', bodyparser(), echo)

export default router
