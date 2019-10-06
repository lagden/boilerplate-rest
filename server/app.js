'use strict'

const base = require('@tadashi/koa-base')
const debug = require('./lib/debug')
const routes = require('./routes')

const app = base({error: true})

app
	.use(routes)
	.on('error', debug.error)

app.proxy = true

module.exports = app
