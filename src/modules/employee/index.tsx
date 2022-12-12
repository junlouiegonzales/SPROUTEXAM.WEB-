import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Icon,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  EmployeeModel,
  EmployeeProps,
  EmployeeTypeDescription,
} from './api/types';
import { MdOutlineAdd, MdOutlineMoreHoriz } from 'react-icons/md';
import { HandleGetAllEmployees } from './api/handlers';
import {
  CreateEmployeeModal,
  DeleteEmployeeModal,
  UpdateEmployeeModal,
} from './modals';
import moment from 'moment';
import LoadingIndicator from 'common/components/LoadingIndicator';

const Employee: FunctionComponent<EmployeeProps> = (props: EmployeeProps) => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel>(null);
  const [loadEmployees, setLoadEmployees] = useState<boolean>(true);

  useEffect(() => {
    (async (): Promise<void> => {
      if (loadEmployees) {
        await HandleGetAllEmployees(setEmployees, setLoadEmployees);
      }
    })();
  }, [loadEmployees]);

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  return (
    <>
      <Text fontSize="3xl" fontWeight="600">
        Employees
      </Text>
      <Text fontSize="md" color="gray.500" mb="24px">
        Showing all employee list from the server
      </Text>
      <Button
        colorScheme="blue"
        mb="24px"
        rightIcon={<Icon as={MdOutlineAdd} fontSize="20px" />}
        onClick={onOpenCreate}
      >
        Create
      </Button>
      <Divider />
      <TableContainer>
        {loadEmployees ? (
          <LoadingIndicator isTable />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Birthdate</Th>
                <Th>TIN</Th>
                <Th>Type</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees &&
                employees.map((t, i) => (
                  <Tr key={i}>
                    <Td>{t.fullName}</Td>
                    <Td>{moment(t.birthdate).format('MM/DD/YYYY')}</Td>
                    <Td>{t.tin}</Td>
                    <Td>{EmployeeTypeDescription.get(t.type)}</Td>
                    <Td isNumeric>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<Icon fontSize="lg" as={MdOutlineMoreHoriz} />}
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem
                            fontSize="md"
                            lineHeight="1.5em"
                            onClick={(): void => {
                              onOpenUpdate();
                              setSelectedEmployee(t);
                            }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem
                            fontSize="md"
                            lineHeight="1.5em"
                            onClick={(): void => {
                              onOpenDelete();
                              setSelectedEmployee(t);
                            }}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            fontSize="md"
                            lineHeight="1.5em"
                            onClick={(): void => {
                              console.log('Update');
                            }}
                          >
                            Calculate
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      <CreateEmployeeModal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        employees={employees}
        setEmployees={setEmployees}
      />

      <UpdateEmployeeModal
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        employees={employees}
        setEmployees={setEmployees}
        selectedEmployee={selectedEmployee}
      />

      <DeleteEmployeeModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        employees={employees}
        setEmployees={setEmployees}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};

export default Employee;
