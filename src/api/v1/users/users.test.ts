import { build } from '../../../infra/server/server'
import { test } from 'tap'

void test('requests the "/v1/users" route', async (t) => {
  const app = build()

  t.teardown(async () => {
    await app.close()
  })

  const { statusCode, json } = await app.inject({
    method: 'GET',
    url: '/api/v1/users',
  })
  t.equal(statusCode, 200, 'returns a status code of 200')
  t.hasProp(json(), 'users', 'returns a list of users')
  t.same(json().users.length, 10, 'returns 10 users')
})
