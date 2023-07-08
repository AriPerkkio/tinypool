class AbortError extends Error {
  constructor() {
    super('The task has been aborted')
  }

  get name() {
    return 'AbortError'
  }
}

class CancelError extends Error {
  constructor() {
    super('The task has been cancelled')
  }

  get name() {
    return 'CancelError'
  }
}

export const Errors = {
  ThreadTermination: () => new Error('Terminating worker thread'),
  FilenameNotProvided: () =>
    new Error('filename must be provided to run() or in options object'),
  TaskQueueAtLimit: () => new Error('Task queue is at limit'),
  NoTaskQueueAvailable: () =>
    new Error('No task queue available and all Workers are busy'),
  AbortError: () => new AbortError(),
  CancelError: () => new CancelError(),
}
