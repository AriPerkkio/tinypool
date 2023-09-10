import * as path from 'path'
import { fileURLToPath } from 'url'
import { Tinypool } from 'tinypool'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test("{ runtime: 'worker_threads' } does not hang when worker exits", async () => {
  const pool = createPool({})

  await pool.run({})
})

test("{ runtime: 'child_process' } does not hang when worker exits", async () => {
  const pool = createPool({ runtime: 'child_process' })

  await expect(() => pool.run({})).rejects.toThrowError(
    'Worker exited unexpectedly'
  )
})

function createPool(options: Partial<Tinypool['options']>) {
  const pool = new Tinypool({
    filename: path.resolve(__dirname, 'fixtures/process-exit.js'),
    minThreads: 1,
    maxThreads: 1,
    terminateTimeout: 1_000,
    ...options,
  })

  return pool
}
