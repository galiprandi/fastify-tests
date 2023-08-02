import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'node:path'
import { envToLogger, environment } from './logger'

const { DEBUG = true } = process.env

export const appName = '🚀 APP:'

export function build() {
  const server = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  })

  server
    .register(AutoLoad, {
      dir: join(__dirname, 'plugins'),
    })
    .ready((err) => {
      err ? server.log.fatal(err) : server.log.info(`${appName} All Plugins ready!`)
    })

  server
    .register(AutoLoad, {
      dir: join(__dirname, '../../api'),
      options: { prefix: '/api' },
    })
    .ready((err) => {
      err ? server.log.fatal(err) : server.log.info(`${appName} All Plugins ready!`)
    })

  server.ready(() => {
    DEBUG && server.log.info(server.printRoutes())
  })

  return server
}
