import { APP_ERRORS } from './http-constants';

export class HttpError {

  private _code: string;

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _message: string;

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  public static initWithCode(code: string | null): HttpError {
    const httpError = new HttpError();
    httpError.code = code;

    const appError = APP_ERRORS.find( item => item.code === code);
    if (appError) {
      httpError.title = appError.title;
      httpError.message = appError.message;
    }

    return httpError;
  }

}
