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

  t.same(headers['access-control-allow-origin'], '*', 'returns access-control-allow-origin header')
})
