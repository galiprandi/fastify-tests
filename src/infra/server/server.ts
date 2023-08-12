import { envToLogger, environment } from './logger'
import { type JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import AutoLoad from '@fastify/autoload'
import Env from '@fastify/env'
import Cors from '@fastify/cors'
import Helmet from '@fastify/helmet'
import Fastify from 'fastify'
import { join } from 'node:path'
import { EnvOptions } from './config/env'
import { CorsOptions } from './config/cors'
import { HelmetOptions } from './config/helmet'

export const appName = '🚀 APP:'

export async function build() {
  const srv = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  await srv.register(Env, EnvOptions)
  await srv.register(Cors, CorsOptions)
  await srv.register(Helmet, HelmetOptions)

  srv.env.DEBUG
    ? srv.log.info(`\n┌── ${appName} Plugins\n${srv.printPlugins()}`)
    : srv.log.info(`${appName} Plugins ready!`)

  await srv.register(AutoLoad, {
    dir: join(__dirname, '../../api'),
    options: { prefix: '/api' },
    ignorePattern: /.*(test|spec)\.ts/,
  })

  srv.env.DEBUG
    ? srv.log.info(`\n┌── ${appName} Routes\n${srv.printRoutes({ commonPrefix: false })}`)
    : srv.log.info(`${appName} Routes ready!`)

  srv.ready(() => {
    srv.env.DEBUG && srv.log.info('\n', srv.printRoutes())
  })

  return srv
}

export type APPServer = Awaited<ReturnType<typeof build>>
