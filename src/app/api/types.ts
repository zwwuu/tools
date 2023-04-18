export type Response = {
  success: boolean;
};

export type SuccessResponse<T = undefined> = Response & {
  success: true;
  data: T;
};

export type ErrorResponse<T = any> = Response & {
  success: false;
  message: string;
  errors?: T;
};
