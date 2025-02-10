import { t } from 'elysia'
import { benchmark } from './utils'
import { sjs, attr } from 'slow-json-stringify'
import { makeStringifier } from 'worst-json-stringify'

const sjsSchema = sjs({
	id: attr('number'),
	name: attr('string'),
	bio: attr('string'),
	metadata: {
	  alias: attr('string'),
	  country: attr('string')
	}
  });

benchmark(
	t.Object({
		id: t.Number(),
		name: t.Literal('SaltyAom'),
		bio: t.String(),
		metadata: t.Object({
			alias: t.String(),
			country: t.String()
		})
	}),
	{
		id: 1,
		name: 'SaltyAom',
		bio: 'I like train',
		metadata: {
			alias: 'SaltyAom',
			country: 'Thailand'
		}
	},
	sjsSchema,
	{
		type: "struct",
		children: {
			id: { type: "number" },
			name: { type: "string" },
			bio: { type: "string" },
			metadata: {
				type: "struct",
				children: {
					alias: { type: "string" },
					country: { type: "string" }
				}
			},
		},
	}
)
