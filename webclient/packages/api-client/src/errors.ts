export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export class NetworkError extends Error {
  constructor(message = 'Unable to reach the service. Check your connection and try again.') {
    super(message)
    this.name = 'NetworkError'
  }
}
