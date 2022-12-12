import React, { FunctionComponent } from 'react';
import { MainProps } from './api/types';
import { Container, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Main: FunctionComponent<MainProps> = (props: MainProps) => {
  return (
    <>
      <Container maxW="container.md">
        <Flex alignItems="center" h="72px">
          <Text fontSize="xl" color="gray.700" flexGrow={1}>
            Sprout Exam Web App
          </Text>
          <HStack spacing="24px">
            <Text fontSize="md" color="gray.500">
              Jhun Louie
            </Text>

            <Text
              fontSize="md"
              color="gray.500"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              Logout
            </Text>
          </HStack>
        </Flex>
      </Container>
      <Divider />
      <Container maxW="container.md" pt="24px">
        <Outlet />
      </Container>
    </>
  );
};

export default Main;
