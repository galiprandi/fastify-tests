import { type FastifyServerOptions, type FastifyInstance, type RouteHandlerMethod, type FastifySchema } from 'fastify'
import { faker } from '@faker-js/faker'

export default async function (app: FastifyInstance, options: FastifyServerOptions) {
  app.get('', { schema: rootGetSchema }, rootHandler)
}

const rootHandler: RouteHandlerMethod = async () => ({
  users,
})

const getRandomUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  city: faker.location.city(),
  country: faker.location.country(),
})

const users = faker.helpers.multiple(getRandomUser, { count: 10 })

const rootGetSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              lastName: { type: 'string' },
              phone: { type: 'string' },
              email: { type: 'string' },
              avatar: { type: 'string' },
              city: { type: 'string' },
              country: { type: 'string' },
            },
          },
        },
      },
    },
  },
}
