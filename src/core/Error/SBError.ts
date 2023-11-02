import { SBErrorCode } from './ErrorCode';

export type SBErrorDetails = Record<string, unknown>;

export interface SBErrorOptions<ErrorCode extends SBErrorCode> {
  message: string;
  code: ErrorCode;
  details?: SBErrorDetails;
  cause?: Error;
}

export class SBError extends Error {
  public readonly name: string = 'SB Error';
  public readonly code: SBErrorCode;
  public readonly details?: SBErrorDetails;
  public readonly cause?: Error | SBError;
  public readonly isSBError = true;

  private static makeMessage = (message: string, code: SBErrorCode) => `[${code}] ${message}`;

  public constructor({ message, code, details, cause }: SBErrorOptions<SBErrorCode>) {
    // @ts-ignore Typescript does not recognise 'cause' ? OR we have wrong TS version
    super(SBError.makeMessage(message, code), { cause });

    // Set prototype manually, as required since Typescript 2.2: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, SBError.prototype);

    this.code = code;
    this.details = details;

    if (cause) {
      this.cause = cause;

      if ('stack' in cause) {
        this.stack = `${this.stack}\nCAUSE: ${cause.stack}`;
      }
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SBError);
    }
  }
}
