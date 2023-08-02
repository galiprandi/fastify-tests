import { type FastifyServerOptions, type FastifyInstance, type RouteHandlerMethod } from 'fastify'

export default async function (app: FastifyInstance, options: FastifyServerOptions) {
  app.get('', rootHandler)
}

const rootHandler: RouteHandlerMethod = async (request) => ({ status: 'ok' })
