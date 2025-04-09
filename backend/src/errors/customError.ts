class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name; // Ensure correct error name
    this.statusCode = statusCode;

    // Maintain proper prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404); // NOT FOUND
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400); // BAD REQUEST
  }
}

export class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, 401); // UNAUTHORIZED
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 403); // FORBIDDEN
  }
}
