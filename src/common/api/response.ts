/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';

export enum ResponseMethod {
  Delete = 'Deleted',
  Create = 'Created',
  Update = 'Updated',
  Fetch = 'Get',
}

interface ResponseModel {
  data: any;
}

export const SuccessResponse = (
  response: ResponseModel,
  method: ResponseMethod,
  successText = 'Successfull!'
): any => {
  if (response.data) {
    method !== ResponseMethod.Fetch && toast.success(successText);
    return response.data;
  }
};

export const ExceptionResponse = (error: any, callback?: () => void): void => {
  callback && callback();
  toast.error(error.message);
};
