'use strict'

const hexID = require('@tadashi/hex-id')

const fixtures = [
	{id: '5c48b2d79b156cb4effe05c7', name: 'Sabrina', email: 'sabrina@lagden.in', phone: '+55 11 96812-1234'},
	{id: '5c48b2d79b156cb4effe05c8', name: 'Lucas', email: 'lucas@lagden.in', phone: '+55 11 96812-1235'},
	{id: '5c48b2d79b156cb4effe05c9', name: 'Thiago', email: 'thiago@lagden.in', phone: '+55 11 96812-1236'}
]

const mapUser = new Map()
for (const user of fixtures) {
	mapUser.set(user.id, {...user})
}

function save(data) {
	if (data && data.id && mapUser.has(data.id)) {
		mapUser.set(data.id, {...data})
		return mapUser.get(data.id)
	}
	const id = hexID()
	mapUser.set(id, {...data, id})
	return mapUser.get(id)
}

function find(id) {
	if (id && mapUser.has(id)) {
		return mapUser.get(id)
	}
	const users = []
	const usersIterator = mapUser.values()
	for (const user of usersIterator) {
		users.push(user)
	}
	return users
}

module.exports = {
	save,
	find
}
