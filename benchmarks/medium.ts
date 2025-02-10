import { t } from 'elysia'
import { benchmark } from './utils'
import { sjs, attr } from 'slow-json-stringify'

const sjsSchema = sjs({
	id: attr('number'),
	name: attr('string'),
	bio: attr('string'),
	user: {
	  name: attr('string'),
	  password: attr('string'),
	},
	playing: attr('string'),
	wishlist: attr('array'),
	games: attr('array', sjs({
	  id: attr('number'),
	  name: attr('string'),
	  hoursPlay: attr('number'),
	  tags: attr('array')
	})),
	metadata: {
	  alias: attr('string'),
	  country: attr('string'),
	  region: attr('string')
	},
	social: {
	  facebook: attr('string'),
	  twitter: attr('string'),
	  youtube: attr('string')
	}
  });

benchmark(
	t.Object({
		id: t.Number(),
		name: t.Literal('SaltyAom'),
		bio: t.String(),
		user: t.Object({
			name: t.String(),
			password: t.String()
		}),
		playing: t.Optional(t.String()),
		games: t.Array(
			t.Object({
				name: t.String(),
				hoursPlay: t.Number({ default: 0 }),
				tags: t.Array(t.String())
			})
		),
		metadata: t.Intersect([
			t.Object({
				alias: t.String()
			}),
			t.Object({
				country: t.Nullable(t.String())
			})
		]),
		social: t.Optional(
			t.Object({
				facebook: t.Optional(t.String()),
				twitter: t.Optional(t.String()),
				youtube: t.Optional(t.String())
			})
		)
	}),
	{
		id: 1,
		name: 'SaltyAom',
		bio: 'I like train',
		user: {
			name: 'SaltyAom',
			password: '123456'
		},
		games: [
			{
				name: 'MiSide',
				hoursPlay: 17,
				tags: ['Psychological Horror', 'Cute', 'Dating Sim']
			},
			{
				name: 'Strinova',
				hoursPlay: 365,
				tags: ['Free to Play', 'Anime', 'Third-Person Shooter']
			},
			{
				name: "Tom Clancy's Rainbow Six Siege",
				hoursPlay: 287,
				tags: ['FPS', 'Multiplayer', 'Tactical']
			}
		],
		metadata: {
			alias: 'SaltyAom',
			country: 'Thailand'
		},
		social: {
			twitter: 'SaltyAom'
		}
	},
	sjsSchema,
)
