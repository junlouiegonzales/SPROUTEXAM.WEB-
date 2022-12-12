import React, { FunctionComponent } from 'react';
import { Button, Flex, Input, Select, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import {
  EmployeeFormModalProps,
  EmployeeModel,
  EmployeeType,
  EmployeeTypeDescription,
} from '../api/types';
import { EmployeeFormValidations } from '../api/validations';
import { HandleCreateEmployee, HandleUpdateEmployee } from '../api/handlers';
import { toEnumToArray } from 'common/helpers';
import moment from 'moment';
import DatePicker from 'common/components/DatePicker';

export const EmployeeFormModal: FunctionComponent<EmployeeFormModalProps> = (
  props: EmployeeFormModalProps
) => {
  const {
    selectedEmployee = {},
    onClose,
    employees,
    setEmployees,
    isUpdate,
  } = props;
  const { id: employeeId, fullName, tin, birthdate, type } = selectedEmployee;

  const initialValues: EmployeeModel = {
    fullName,
    tin,
    birthdate: birthdate ? new Date(birthdate) : undefined,
    type: type || EmployeeType.Regular,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeFormValidations}
        onSubmit={async (value, { setSubmitting }): Promise<void> => {
          if (isUpdate) {
            await HandleUpdateEmployee(
              { id: employeeId, ...value },
              employees,
              setEmployees,
              setSubmitting,
              onClose
            );
          } else {
            await HandleCreateEmployee(
              value,
              employees,
              setEmployees,
              setSubmitting,
              onClose
            );
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          isSubmitting,
        }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Input
                variant="outline"
                placeholder="Fullname"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isInvalid={!!(errors.fullName && touched.fullName)}
              />
              <Input
                variant="outline"
                placeholder="TIN"
                name="tin"
                value={values.tin}
                onChange={handleChange}
                isInvalid={!!(errors.tin && touched.tin)}
              />
              <DatePicker
                mr="14px"
                value={values.birthdate}
                placeholder="Birthdate"
                minDate={moment().toDate()}
                maxDate={moment().add(6, 'months').toDate()}
                onChange={(date: Date): void => {
                  setFieldValue('birthdate', date);
                }}
                isInvalid={!!(errors.birthdate && touched.birthdate)}
              />
              <div>
                <Select
                  placeholder="Type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  isInvalid={!!(errors.type && touched.type)}
                >
                  {toEnumToArray(EmployeeType).map((t, i) => (
                    <option key={i} value={t}>
                      {EmployeeTypeDescription.get(t)}
                    </option>
                  ))}
                </Select>
              </div>
            </VStack>
            <Flex pb="8px" pt="16px" justifyContent="flex-end">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EmployeeFormModal;
