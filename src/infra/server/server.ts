import Fastify from 'fastify'
import { envToLogger, environment } from './logger'
import { type JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import AutoLoad from '@fastify/autoload'
import Env from '@fastify/env'
import { EnvOptions } from './config/env'
import { join } from 'node:path'
import Cors from '@fastify/cors'
import { CorsOptions } from './config/cors'
import Helmet from '@fastify/helmet'
import { HelmetOptions } from './config/helmet'

export const appName = '🚀 APP:'

export async function build() {
  const srv = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  await srv
    .register(Env, EnvOptions)
    .register(Cors, CorsOptions)
    .register(Helmet, HelmetOptions)
    .register(AutoLoad, {
      dir: join(__dirname, '../../api'),
      options: { prefix: '/api' },
      ignorePattern: /.*(test|spec)\.ts/,
    })

  srv.ready(() => {
    if (srv.env.DEBUG) {
      srv.log.info(`\n┌── ${appName} Plugins\n${srv.printPlugins()}`)
      srv.log.info(`\n┌── ${appName} Routes\n${srv.printRoutes({ commonPrefix: false })}`)
    } else {
      srv.log.info(`${appName} Plugins ready!`)
      srv.log.info(`${appName} Routes ready!`)
    }
  })

  return srv
}

export type APPServer = Awaited<ReturnType<typeof build>>
