import { type FastifyServerOptions, type FastifyInstance, type RouteHandlerMethod } from 'fastify'
import { faker } from '@faker-js/faker'

export default async function (app: FastifyInstance, options: FastifyServerOptions) {
  app.get('', rootHandler)
}

const rootHandler: RouteHandlerMethod = async () => ({
  users,
})

const getRandomUser = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  city: faker.address.city(),
  country: faker.address.country(),
})

const users = faker.helpers.multiple(getRandomUser, { count: 10 })
