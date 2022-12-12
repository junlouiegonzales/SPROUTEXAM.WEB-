import * as Yup from 'yup';

export const EmployeeFormValidations = Yup.object().shape({
  fullName: Yup.string().required('Please enter Employee Fullname'),
  tin: Yup.string().required('Please enter Employee TIN'),
  type: Yup.string().required('Please enter Employee Type'),
  birthdate: Yup.date().required('Please enter Employee Birthdate'),
});
