import { Dispatch, SetStateAction } from 'react';
import {
  CreateEmployee,
  DeleteEmployee,
  GetAllEmployees,
  UpdateEmployee,
} from './api';
import { EmployeeModel } from './types';

export const HandleGetAllEmployees = async (
  setEmployees: Dispatch<SetStateAction<EmployeeModel[]>>,
  setLoadEmployee: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  const response = await GetAllEmployees();
  if (response) {
    setEmployees(response);
    setLoadEmployee(false);
  }
};

export const HandleCreateEmployee = async (
  request: EmployeeModel,
  employees: EmployeeModel[],
  setEmployee: (value: EmployeeModel[]) => void,
  setSubmitting: (value: boolean) => void,
  onClose: () => void
): Promise<void> => {
  setSubmitting(true);
  const response = await CreateEmployee(request);
  if (response) {
    setEmployee([response, ...employees]);
    setSubmitting(false);
  }
  onClose();
};

export const HandleUpdateEmployee = async (
  request: EmployeeModel,
  employees: EmployeeModel[],
  setEmployee: (value?: EmployeeModel[]) => void,
  setSubmitting: (value?: boolean) => void,
  onClose: () => void
): Promise<void> => {
  setSubmitting(true);
  const response = await UpdateEmployee(request);
  if (response) {
    setEmployee(
      employees.map((t) => {
        if (t.id === response.id) {
          t.fullName = response.fullName;
          t.birthdate = response.birthdate;
          t.tin = response.tin;
          t.type = response.type;
        }
        return t;
      })
    );
    setSubmitting(false);
  }
  onClose();
};

export const HandleDeleteEmployee = async (
  request: EmployeeModel,
  employees: EmployeeModel[],
  setEmployee: (value?: EmployeeModel[]) => void,
  setLoading: (value?: boolean) => void,
  onClose: () => void
): Promise<void> => {
  const response = await DeleteEmployee(request);
  if (response) {
    setEmployee(employees.filter((t) => t.id !== request.id));
    setLoading(false);
  }
  onClose();
};
