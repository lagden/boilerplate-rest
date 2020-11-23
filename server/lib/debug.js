'use strict'

const supportsColor = require('supports-color')
const debug = require('debug')

/* istanbul ignore next */
const {DEBUG_PREFIX = 'boilerplate_rest'} = process.env

const error = debug(`${DEBUG_PREFIX}:error`)
const info = debug(`${DEBUG_PREFIX}:info`)
const log = debug(`${DEBUG_PREFIX}:log`)

/* istanbul ignore next */
const colors = supportsColor.stdout.has256 ? [7, 54, 58] : [0, 2, 5]

log.color = debug.colors[colors[0]]
info.color = debug.colors[colors[1]]
error.color = debug.colors[colors[2]]

module.exports = {
	error,
	info,
	log
}
