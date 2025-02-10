import { bench, run, barplot, summary, compact } from 'mitata'

import { createAccelerator } from 'json-accelerator'
import fastJson from 'fast-json-stringify'
import type { TAnySchema } from '@sinclair/typebox'
import {type SjsSerializer } from 'slow-json-stringify'
import { makeStringifier } from 'worst-json-stringify'
import { dequal } from 'dequal';

export const benchmark = <T extends TAnySchema>(
	model: T,
	value: T['static'],
	sjsSerializer?: SjsSerializer,
	wjsModel?: any,
) => {
	const fastJsonStringify = fastJson(model)
	const encode = createAccelerator(model)
	let slowJsonStringify = null
	let worstJsonStringify = null

	if(sjsSerializer) {
		slowJsonStringify = sjsSerializer
	}

	if(wjsModel) {
		worstJsonStringify = makeStringifier(wjsModel)
	}

	if (encode(value) !== JSON.stringify(value) && !dequal(JSON.parse(encode(value)), JSON.parse(JSON.stringify(value)))) {
		console.log(encode(value))
		throw new Error('Invalid result from JSON Accelerator')
	}

	if (fastJsonStringify(value) !== JSON.stringify(value) && !dequal(JSON.parse(fastJsonStringify(value)), JSON.parse(JSON.stringify(value)))) {
		console.log(console.log({
			fjs: fastJsonStringify(value),
			jsonStringify: JSON.stringify(value)
		}))

		throw new Error('Invalid result from Fast Json Stringify')
	}

	if(slowJsonStringify) {
		if (slowJsonStringify(value) !== JSON.stringify(value) && !dequal(JSON.parse(slowJsonStringify(value)), JSON.parse(JSON.stringify(value)))) {
			console.log({
				sjs: slowJsonStringify(value),
				jsonStringify: JSON.stringify(value)
			})

			throw new Error('Invalid result from Slow Json Stringify')
		}
	}

	if(worstJsonStringify) {
		if (worstJsonStringify(value) !== JSON.stringify(value) && !dequal(JSON.parse(worstJsonStringify(value)), JSON.parse(JSON.stringify(value)))) {
			console.log({
				wjs: worstJsonStringify(value),
				jsonStringify: JSON.stringify(value)
			})

			throw new Error('Invalid result from Worst Json Stringify')
		}
	}

	if (process.env.DEBUG) {
		console.log(encode.toString())
		console.log(encode(value))
	}

	compact(() => {
		barplot(() => {
			summary(() => {
				bench('JSON Stingify', () => {
					return JSON.stringify(value)
				})

				bench('Fast Json Stringify', () => {
					return fastJsonStringify(value)
				})

				bench('JSON Accelerator', () => {
					return encode(value)
				})

				if(slowJsonStringify) {
					bench('Slow Json Stringify', () => {
						return slowJsonStringify(value)
					})
				}

				if(worstJsonStringify) {
					bench('Worst Json Stringify', () => {
						return worstJsonStringify(value)
					})
				}
			})
		})
	})

	run()
}
