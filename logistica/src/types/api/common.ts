export type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "SERVICE_UNAVAILABLE"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND";

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode;
    message: string;
  };
};
