import process from 'node:process'
import * as debug from '@tadashi/debug'

// prettier-ignore
const {
	APP_ENV,
	GITLAB_ENVIRONMENT_NAME,
} = process.env

/* c8 ignore next */
process.env.APP_ENV = APP_ENV ?? GITLAB_ENVIRONMENT_NAME ?? 'production'

debug.info('reset.js | process.env', process.env)
