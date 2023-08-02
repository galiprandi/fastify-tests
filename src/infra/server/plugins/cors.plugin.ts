import { type FastifyPluginAsync } from 'fastify'
import cors from '@fastify/cors'
import { appName } from '../server'

const name = 'CORS'

const corsPlugin: FastifyPluginAsync = async (app) => {
  app.register(cors, { origin: '*' }).ready((err) => {
    err ? app.log.fatal(err, `${appName} ${name} Plugin failed!`) : app.log.info(`${appName} ${name} Plugin ready!`)
  })
}

export default corsPlugin
