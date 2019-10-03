'use strict'

import test from 'ava'
import app from './helpers/server'

let user
const fixture = {name: 'Rita', email: 'rita@lagden.in', phone: '+55 11 96812-1237'}

test.serial('get users', async t => {
	const r = await app.get('/user')
	const {result} = r.body.data
	t.is(r.status, 200)
	t.is(result.length, 3)
})

test.serial('get user', async t => {
	const r = await app.get('/user/5c48b2d79b156cb4effe05c8')
	const {result} = r.body.data
	t.is(r.status, 200)
	t.is(result.name, 'Lucas')
})

test.serial('add user', async t => {
	const r = await app
		.post('/user')
		.set('content-type', 'application/json')
		.send(fixture)
	const {result} = r.body.data
	user = {...result}
	t.is(r.status, 200)
	t.is(result.name, 'Rita')
})

test.serial('update user', async t => {
	user.name = 'Rita de Cássia'
	const r = await app
		.post('/user')
		.set('content-type', 'application/json')
		.send(user)
	const {result} = r.body.data
	t.is(r.status, 200)
	t.is(result.name, 'Rita de Cássia')
})
