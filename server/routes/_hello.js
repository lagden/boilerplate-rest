'use strict'

const Router = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const debug = require('../lib/debug')

const router = new Router()

// GET
function hello(ctx) {
	const {
		name = 'World'
	} = ctx.params

	// Debug de exemplo
	debug.log('hello | name', name)

	ctx.body = {
		data: {
			hello: `Hello ${name}`
		}
	}
}

// POST
function echo(ctx) {
	const {
		body
	} = ctx.request

	// echo do post
	ctx.body = body
}

router
	.get(['/', '/:name'], hello)
	.post('/echo', bodyparser(), echo)

module.exports = router
