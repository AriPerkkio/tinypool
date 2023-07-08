interface AbortSignalEventTargetAddOptions {
  once: boolean
}

export interface AbortSignalEventTarget {
  addEventListener: (
    name: 'abort',
    listener: () => void,
    options?: AbortSignalEventTargetAddOptions
  ) => void
  removeEventListener: (name: 'abort', listener: () => void) => void
  aborted?: boolean
}

export interface AbortSignalEventEmitter {
  off: (name: 'abort', listener: () => void) => void
  once: (name: 'abort', listener: () => void) => void
}

export type AbortSignalAny = AbortSignalEventTarget | AbortSignalEventEmitter

export function onabort(abortSignal: AbortSignalAny, listener: () => void) {
  if ('addEventListener' in abortSignal) {
    abortSignal.addEventListener('abort', listener, { once: true })
  } else {
    abortSignal.once('abort', listener)
  }
}
