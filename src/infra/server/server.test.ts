import { test } from 'tap'
import { build } from './server'

void test('Build App and test core functionality', async (t) => {
  const app = build()

  t.teardown(async () => {
    await app.close()
  })

  t.ok(app, 'returns an app')
  t.ok(app.listen, 'returns an app with a listen method')
})
