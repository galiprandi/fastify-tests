import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'
import { appName } from '../server'
import { log } from '../logger'

const task = new AsyncTask(
  'Server is running task',
  async () => {
    log.info(`${appName} Server is running!`)
  },
  (err) => {
    log.error(err)
  },
)
export const job = new SimpleIntervalJob({ minutes: 10 }, task, { id: 'server-is-running' })
