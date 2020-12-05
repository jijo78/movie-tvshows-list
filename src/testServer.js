import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/person/38334?api_key=38334&append_to_response=movie_credits,tv_credits',
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            { attributes: { name: 'Stelvio', url: '/car-reviews/alfa-romeo/stelvio' } },
            { attributes: { name: 'Giulia', url: '/car-reviews/alfa-romeo/giulia' } },
            { attributes: { name: 'Giulietta', url: '/car-reviews/alfa-romeo/giulietta' } },
          ],
        })
      )
    }
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`)
    return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }))
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }
