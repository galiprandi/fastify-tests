import { appName, build } from './infra/server/server'

const listenTextResolver = (address: string) => `${appName} Listening at ${address}/api/check`

async function init() {
  const app = await build()

  app.listen(
    {
      port: +app.env.PORT,
      host: app.env.HOST,
      listenTextResolver,
    },
    (err) => {
      if (err) {
        app.log.fatal(err)
        process.exit(1)
      }
    },
  )
}

void init()
