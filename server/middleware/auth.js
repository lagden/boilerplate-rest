'use strict'

const {verify, parse} = require('@tadashi/jwt')

const {SECRET_KEY} = require('../lib/keys')

function _authorization(authorization) {
	const [scheme, credentials] = authorization.split(' ')
	if (/^Bearer$/i.test(scheme)) {
		return credentials
	}
	return false
}

function _headers(ctx) {
	const {authorization = false} = ctx.request.headers
	return {authorization}
}

function _jwt(headers, ctx, next) {
	const {protocol, hostname} = ctx.request
	const {authorization} = headers

	const claims = Object.create(null)
	claims.aud = `${protocol}://${hostname}`

	const credentials = _authorization(authorization)
	if (credentials && verify(credentials, claims, SECRET_KEY)) {
		const {payload: {data}} = parse(credentials)
		ctx.state._payload = data
		return next()
	}
	ctx.throw(401, 'Bad Authorization')
}

function auth(ctx, next) {
	const headers = _headers(ctx)
	return _jwt(headers, ctx, next)
}

module.exports = auth
