'use strict'

const Router = require('@koa/router')

const router = new Router()

function index(ctx) {
	ctx.body = {
		data: {
			message: 'Faça o login: {"username": "user", "password": "passwd"})'
		}
	}
}

router
	.get('/', index)

module.exports = router
