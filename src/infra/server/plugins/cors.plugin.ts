import { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { appName } from '../server'

const name = 'CORS'

export default async (app: FastifyInstance) =>
  app.register(cors, { origin: '*' }).ready((err) => {
    err ? app.log.fatal(err, `${appName} ${name} Plugin failed!`) : app.log.info(`${appName} ${name} Plugin ready!`)
  })
