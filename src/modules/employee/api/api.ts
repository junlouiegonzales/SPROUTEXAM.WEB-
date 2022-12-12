import { AxiosError, AxiosResponse } from 'axios';
import {
  ExceptionResponse,
  ResponseMethod,
  SuccessResponse,
} from 'common/api/response';
import { EmployeeModel } from './types';
import { api } from 'common/api/sproutexam-base';

export const GetAllEmployees = async (
  callback?: () => void
): Promise<EmployeeModel[]> => {
  return await api
    .get(`api/employee`)
    .then((e: AxiosResponse<EmployeeModel[]>) =>
      SuccessResponse(e, ResponseMethod.Fetch)
    )
    .catch((e: AxiosError) => ExceptionResponse(e, callback));
};

export const CreateEmployee = async (
  request?: EmployeeModel,
  callback?: () => void
): Promise<EmployeeModel> => {
  return await api
    .post(`api/employee`, request)
    .then((e: AxiosResponse<EmployeeModel>) =>
      SuccessResponse(e, ResponseMethod.Create)
    )
    .catch((e: AxiosError) => ExceptionResponse(e, callback));
};

export const UpdateEmployee = async (
  request?: EmployeeModel,
  callback?: () => void
): Promise<EmployeeModel> => {
  return await api
    .put(`api/employee`, request)
    .then((e: AxiosResponse<EmployeeModel>) =>
      SuccessResponse(e, ResponseMethod.Update)
    )
    .catch((e: AxiosError) => ExceptionResponse(e, callback));
};

export const DeleteEmployee = async (
  request?: EmployeeModel,
  callback?: () => void
): Promise<boolean> => {
  return await api
    .delete(`api/employee`, { data: { id: request.id } })
    .then((e: AxiosResponse<boolean>) =>
      SuccessResponse(e, ResponseMethod.Delete)
    )
    .catch((e: AxiosError) => ExceptionResponse(e, callback));
};
