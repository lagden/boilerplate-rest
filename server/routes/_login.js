'use strict'

const crypto = require('crypto')
const Router = require('@koa/router')
const {sign} = require('@tadashi/jwt')
const bodyparser = require('koa-bodyparser')
const debug = require('../lib/debug')
const {SECRET_KEY} = require('../lib/keys')

const router = new Router()

function _hash(value) {
	return crypto.createHash('sha256').update(value).digest()
}

function login(ctx) {
	try {
		const {body, protocol, hostname} = ctx.request
		const {username, password} = body
		if (crypto.timingSafeEqual(_hash(`${username}_${password}`), _hash('user_passwd'))) {
			const jwt = sign({name: 'Visitante'}, {jti: true, aud: `${protocol}://${hostname}`}, SECRET_KEY)
			ctx.body = {
				data: {jwt}
			}
			return
		}
		ctx.throw(401, 'Bad Login')
	} catch (error) {
		debug.error('login', error)
		ctx.throw(500, 'Login fail')
	}
}

router
	.post('/login', bodyparser(), login)

module.exports = router
