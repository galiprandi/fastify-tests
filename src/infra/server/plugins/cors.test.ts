import { build } from '../server'
import { test } from 'tap'

void test('Check CORS headers', async (t) => {
  const app = build()

  t.teardown(async () => {
    await app.close()
  })

  const { headers } = await app.inject({
    method: 'GET',
    url: '/api/check',
  })

  t.ok(headers['access-control-allow-origin'], 'returns access-control-allow-origin header')
  t.ok(headers['access-control-allow-methods'], 'returns access-control-allow-methods header')
  t.ok(headers['access-control-allow-headers'], 'returns access-control-allow-headers header')
  t.ok(headers['access-control-allow-credentials'], 'returns access-control-allow-credentials header')
  t.ok(headers['access-control-max-age'], 'returns access-control-max-age header')
})
