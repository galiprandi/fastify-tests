import { envToLogger, environment } from './logger'
import { type JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

import AutoLoad from '@fastify/autoload'
import Cors from '@fastify/cors'
import Fastify from 'fastify'
import { join } from 'node:path'

const { DEBUG = true } = process.env

export const appName = '🚀 APP:'

export function build() {
  const server = Fastify({
    disableRequestLogging: true,
    logger: envToLogger[environment] ?? true,
  }).withTypeProvider<JsonSchemaToTsProvider>()

  // server
  //   .register(AutoLoad, {
  //     dir: join(__dirname, 'plugins'),
  //     ignorePattern: /.*(test|spec)\.ts/,
  //   })
  //   .ready((err) => {
  //     err ? server.log.fatal(err) : server.log.info(`${appName} All Plugins ready!`)
  //   })

  void server.register(Cors, { origin: '*' }).ready((err) => {
    err ? server.log.fatal(err, `${appName} CORS Plugin failed!`) : server.log.info(`${appName} CORS Plugin ready!`)
  })

  server
    .register(AutoLoad, {
      dir: join(__dirname, '../../api'),
      options: { prefix: '/api' },
      ignorePattern: /.*(test|spec)\.ts/,
    })
    .ready((err) => {
      err ? server.log.fatal(err) : server.log.info(`${appName} All Plugins ready!`)
    })

  server.get(
    '/check',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            count: { type: 'string', default: 10 },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
            },
          },
        },
      } as const,
    },
    async ({ query: { count } }) => ({}),
  )

  server.ready(() => {
    DEBUG && server.log.info(server.printRoutes())
  })

  return server
}

export type APPServer = ReturnType<typeof build>
