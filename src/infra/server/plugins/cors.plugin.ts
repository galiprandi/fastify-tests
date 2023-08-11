import { type FastifyInstance } from 'fastify'
import Cors from '@fastify/cors'
import { appName } from '../server'

export const autoConfig = { name: 'CORS v2' }

export default async (app: FastifyInstance, { name }: typeof autoConfig) =>
  app.register(Cors, { origin: ['*', 'localhost'] }).ready((err) => {
    err ? app.log.fatal(err, `${appName} ${name} Plugin failed!`) : app.log.info(`${appName} ${name} Plugin ready!`)
  })
