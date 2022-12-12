import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { FunctionComponent, useState } from 'react';
import { HandleDeleteEmployee } from '../api/handlers';
import { EmployeeFormModalProps } from '../api/types';
import EmployeeFormModal from './employee-form';

export const CreateEmployeeModal: FunctionComponent<EmployeeFormModalProps> = (
  props: EmployeeFormModalProps
) => {
  const { onClose, isOpen, ...rest } = props;
  return (
    <Modal size="lg" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Employee</ModalHeader>
        <ModalBody>
          <EmployeeFormModal onClose={onClose} {...rest} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const UpdateEmployeeModal: FunctionComponent<EmployeeFormModalProps> = (
  props: EmployeeFormModalProps
) => {
  const { onClose, isOpen, ...rest } = props;
  return (
    <Modal size="lg" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Employee</ModalHeader>
        <ModalBody>
          <EmployeeFormModal onClose={onClose} {...rest} isUpdate={true} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const DeleteEmployeeModal: FunctionComponent<EmployeeFormModalProps> = (
  props: EmployeeFormModalProps
) => {
  const { onClose, isOpen, selectedEmployee, employees, setEmployees } = props;
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal size="lg" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Delete Employee?</ModalHeader>
        <ModalBody>Are you sure do you want to delete this employee?</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={loading}
            colorScheme="blue"
            onClick={async (): Promise<void> => {
              await HandleDeleteEmployee(
                selectedEmployee,
                employees,
                setEmployees,
                setLoading,
                onClose
              );
            }}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
