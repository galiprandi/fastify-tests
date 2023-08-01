import { PinoLoggerOptions } from 'fastify/types/logger.js'

export const environment = process.env.NODE_ENV ?? 'development'

export const envToLogger: Record<string, PinoLoggerOptions | boolean> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}
