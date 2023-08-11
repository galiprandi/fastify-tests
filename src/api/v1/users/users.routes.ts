import { type FastifyServerOptions } from 'fastify'
import { faker } from '@faker-js/faker'
import { type APPServer } from '../../../infra/server/server'

export default async function (app: APPServer, options: FastifyServerOptions) {
  app.get('', { schema }, ({ query: { count = 10 } }) => ({
    users: getUsers(count),
    count,
  }))
}

const schema = {
  querystring: {
    type: 'object',
    properties: {
      count: { type: 'number' },
    },
  },
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
        count: { type: 'number' },
      },
    },
  },
} as const

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

const getUsers = (count: number) => faker.helpers.multiple(getRandomUser, { count })
