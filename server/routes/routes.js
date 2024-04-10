import {URL} from 'node:url'
import {readdir} from 'node:fs/promises'
import compose from 'koa-compose'

// const currentDir = import.meta?.dirname ?? new URL('.', import.meta.url)
const currentDir = new URL('.', import.meta.url)
const pattern = /^_[\w-]+\.js/
const dir = await readdir(currentDir)
const files = dir.filter(f => pattern.test(f)).map(f => new URL(f, currentDir).href)

async function* importFilesGenerator() {
	for (const file of files) {
		yield import(file)
	}
}

const middleware = []
for await (const {default: mod} of importFilesGenerator()) {
	middleware.push(mod.routes(), mod.allowedMethods({throw: true}))
}

export default compose(middleware)
