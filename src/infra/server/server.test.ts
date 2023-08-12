import { test } from 'tap'
import { appName, build } from './server'

void test('Build App and test core functionality', async (t) => {
  const app = await build()

  t.teardown(async () => {
    await app.close()
  })

  t.ok(app, 'returns an app')
  t.ok(app.listen, 'returns an app with a listen method')
  t.ok(appName, 'returns an app name')
})

void test('should work with fetch', async (t) => {
  const app = await build()

  t.teardown(async () => {
    await app.close()
  })

  const port = 3009
  await app.listen({ port })

  // @ts-expect-error - TS complains about the type of `fastify` but it's fine
  const response = await fetch(`http://localhost:${port}/api/check`)
  const body = await response.json()

  t.equal(response.status, 200)
  t.equal(response.headers.get('content-type'), 'application/json; charset=utf-8')
  t.same(body, { status: 'ok' })
})
