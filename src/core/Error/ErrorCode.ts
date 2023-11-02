export enum ErrorCode {
  // Generic Core error
  GENERIC_ERROR = 'E0001',
  // Error in validation check
  VALIDATION_ERROR = 'E0002',
  INVALID_ARGUMENT = 'E0003',
  REQUEST_ERROR = 'E0004',
  NO_DATA_FOUND = 'E0005',
  INVALID_DATA = 'E0006',
  CONFIG_INVALID_VALUE = 'E0007',
  CONFIG_KEY_NOT_EXIST = 'E0008',
  CONFIG_KEY_ALREADY_EXIST = 'E0009',

  NOT_IMPLEMENTED = 'E9000',
}

export type SBErrorCode = ErrorCode;
