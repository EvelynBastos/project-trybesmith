export type Login = {
  username: 'string',
  password: 'string',
};

type ServiceErrorResponseType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceError = {
  status: ServiceErrorResponseType
  data: { message: string }
};

export type ServiceREsponseSuccessfull<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponse<T> = ServiceREsponseSuccessfull<T> | ServiceError;