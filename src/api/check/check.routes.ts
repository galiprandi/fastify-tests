import { type FastifyServerOptions, type FastifyInstance, type RouteHandlerMethod, type FastifySchema } from 'fastify'

export default async function (app: FastifyInstance, options: FastifyServerOptions) {
  app.get('', { schema: rootGetSchema }, rootHandler)
}

// Move to controllers folder
const rootHandler: RouteHandlerMethod = async (request) => ({ status: 'ok' })

// Move to schemas folder
const rootGetSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
  },
}
