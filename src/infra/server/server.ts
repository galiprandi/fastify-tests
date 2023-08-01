import Fastify from 'fastify'
import routes from '@fastify/routes'
import autoLoad from '@fastify/autoload'
import { join } from 'node:path'
import { envToLogger, environment } from './logger'

// import { dirname, join } from 'node:path'
// import { URL, fileURLToPath } from 'node:url'

// const { __dirname } = fileDirName(import.meta)

export function build() {
  const server = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  })

  server.register(routes)

  server
    .register(autoLoad, {
      dir: join(__dirname, 'plugins'),
    })
    .ready(err =>
      err
        ? server.log.fatal(err)
        : server.log.info(`${appName} All Plugins ready!`)
    )

  server
    .get('/check', async ({ log }) => {
      log.info(server.routes, `${appName} Available routes`)
      return { status: 'ok' }
    })
    .ready(error => error && server.log.fatal(error))

  return server
}

export type Server = ReturnType<typeof build>

export const appName = '🚀 APP:'

const result = JSON.parse('{}')
