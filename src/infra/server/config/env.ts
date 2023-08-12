import { type FastifyEnvOptions } from '@fastify/env'

export const EnvOptions: FastifyEnvOptions = {
  dotenv: true,
  confKey: 'env',
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      DEBUG: {
        type: 'boolean',
        default: true,
      },
      PORT: {
        type: 'string',
        default: 8008,
      },
      HOST: {
        type: 'string',
        default: '0.0.0.0',
      },
    },
  },
}

declare module 'fastify' {
  interface FastifyInstance {
    env: {
      // this should be same as the confKey in options
      DEBUG: boolean
      PORT: string
      HOST: string
    }
  }
}
