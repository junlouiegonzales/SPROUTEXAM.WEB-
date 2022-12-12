import { DefaultProps } from 'common/types';
import { Dispatch, SetStateAction } from 'react';

export type EmployeeProps = DefaultProps;

export enum EmployeeType {
  Regular = 'Regular',
  Contractual = 'Contractual',
}

export type EmployeeModel = {
  id?: number;
  fullName?: string;
  birthdate?: Date;
  tin?: string;
  type?: EmployeeType;
};

export type EmployeeFormModalProps = {
  selectedEmployee?: EmployeeModel;
  employees?: EmployeeModel[];
  setEmployees?: Dispatch<SetStateAction<EmployeeModel[]>>;
  onClose?: () => void;
  isOpen?: boolean;
  isUpdate?: boolean;
};

export const EmployeeTypeDescription = new Map<string, string>([
  [EmployeeType.Regular, 'Regular'],
  [EmployeeType.Contractual, 'Contractual'],
]);
