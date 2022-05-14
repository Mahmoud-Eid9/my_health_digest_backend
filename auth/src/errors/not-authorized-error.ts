import { CustomError } from "./custom-error";

export class NotAthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAthorizedError.prototype);
  }
  serializeErrors(){
    return [{message: 'Not Authorized'}];
  }
}