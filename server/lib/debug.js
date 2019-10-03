'use strict'

const debug = require('debug')

const {DEBUG_PREFIX = 'api_rest'} = process.env

const error = debug(`${DEBUG_PREFIX}:error`)
const log = debug(`${DEBUG_PREFIX}:log`)
const info = debug(`${DEBUG_PREFIX}:info`)

module.exports = {
	error,
	log,
	info
}
