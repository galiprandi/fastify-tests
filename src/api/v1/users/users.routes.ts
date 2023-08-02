import { type FastifyServerOptions, type FastifyInstance, type RouteHandlerMethod } from 'fastify'

export default async function (app: FastifyInstance, options: FastifyServerOptions) {
  app.get('', rootHandler)
}

const rootHandler: RouteHandlerMethod = async () => ({
  users: [
    { id: 1, name: 'John', lastName: 'Doe' },
    { id: 2, name: 'Jane', lastName: 'Doe' },
  ],
})
