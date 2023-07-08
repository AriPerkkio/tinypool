import assert from 'assert'
import { kQueueOptions } from './common'

export class ArrayTaskQueue implements TaskQueue {
  tasks: Task[] = []

  get size() {
    return this.tasks.length
  }

  shift(): Task | null {
    return this.tasks.shift() as Task
  }

  push(task: Task): void {
    this.tasks.push(task)
  }

  remove(task: Task): void {
    const index = this.tasks.indexOf(task)
    assert.notStrictEqual(index, -1)
    this.tasks.splice(index, 1)
  }

  cancel(): void {
    while (this.tasks.length > 0) {
      const task = this.tasks.pop()
      task?.cancel()
    }
  }
}

export interface Task {
  readonly [kQueueOptions]: object | null
  cancel(): void
}

export interface TaskQueue {
  readonly size: number
  shift(): Task | null
  remove(task: Task): void
  push(task: Task): void
  cancel(): void
}

export function isTaskQueue(value: any): value is TaskQueue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'size' in value &&
    typeof value.shift === 'function' &&
    typeof value.remove === 'function' &&
    typeof value.push === 'function'
  )
}
