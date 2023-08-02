import { appName, build } from './infra/server/server'

const { PORT = '8000', HOST = '0.0.0.0' } = process.env

const listenTextResolver = (address: string) => `${appName} Listening at ${address}/api/check`

;(function init() {
  const app = build()

  app.listen(
    {
      port: +PORT,
      host: HOST,
      listenTextResolver,
    },
    (err) => {
      if (err) {
        app.log.fatal(err)
        process.exit(1)
      }
    },
  )
})()
