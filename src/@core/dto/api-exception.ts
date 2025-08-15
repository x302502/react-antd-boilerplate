import { HttpStatusCode } from 'axios';

export class ApiException<T = any> {
  public type: string = 'DEFAULT';
  public httpCode?: HttpStatusCode;
  public businessCode?: number = -1;
  public message?: string;
  public errors?: T;

  constructor(
    message: string,
    httpCode: HttpStatusCode = HttpStatusCode.InternalServerError,
    errors: T = undefined as unknown as T,
    type: string = 'DEFAULT',
    businessCode: number = -1,
  ) {
    this.httpCode = httpCode;
    this.message = message;
    this.type = type;
    this.businessCode = businessCode;
    this.errors = errors;
  }
}
