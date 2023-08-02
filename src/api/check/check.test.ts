import { build } from '../../infra/server/server'
import { test } from 'tap'

void test('requests the "/check" route', async (t) => {
  const app = build()

  t.teardown(async () => {
    await app.close()
  })

  const { statusCode, json } = await app.inject({
    method: 'GET',
    url: '/api/check',
  })
  t.equal(statusCode, 200, 'returns a status code of 200')
  t.hasProp(json(), 'status', 'returns a status')
  t.same(json().status, 'ok', 'returns ok')
})
