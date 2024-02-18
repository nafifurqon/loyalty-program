const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 upper case, lowcase letter along with a number and special character.';

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const ResponseMessage = {
  OK: 'OK',
  FAILED: 'Failed',
  GET_OK: 'success get data',
  GET_FAILED: 'failed get data',
  CREATE_OK: 'data has been created',
  CREATE_FAILED: 'failed to create data',
  UPDATE_OK: 'data has been updated',
  UPDATE_FAILED: 'failed to update data',
  DELETE_OK: 'data has been created',
  DELETE_FAILED: 'failed to create data',
  ASYNC_OK: 'data is being processed',
  EMPTY_DATA: 'data is empty',
  NOT_FOUND: 'not found',
  PERMISSION_DENIED: 'permission denied',
  NOT_IMPLEMENTED: 'not implemented',
  UNKNOWN: 'unknown',
  RESOURCE_EXHAUSTED: 'resource exhausted',
  INVALID_ARGUMENT: 'invalid argument',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  UNAUTHENTICATED: 'unauthenticated',
  INTERNAL_SERVER_ERROR: 'internal server error',
  UNIMPLEMENTED: 'unimplemented',
  INVALID_REQUEST: 'invalid request',
  EXCEEDED_RATE_LIMIT: 'exceeded rate limit',
  LOGIN_OK: 'success login',
};
