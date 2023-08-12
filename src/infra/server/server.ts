import { envToLogger, environment } from './logger'
import { type JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import AutoLoad from '@fastify/autoload'
import Env from '@fastify/env'
import Cors from '@fastify/cors'
import Fastify from 'fastify'
import { join } from 'node:path'
import { EnvOptions } from './configs/env'
import { CorsOptions } from './configs/cors'

export const appName = '🚀 APP:'

export async function build() {
  const srv = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  await srv.register(Env, EnvOptions)
  await srv.register(Cors, CorsOptions)
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
