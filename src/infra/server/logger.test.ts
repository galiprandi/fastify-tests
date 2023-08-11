import { test } from 'tap'
import { envToLogger } from './logger'

void test('Should be share a logger configuration options', async (t) => {
  t.ok(Object.keys(envToLogger).length, 'should have keys')
})
