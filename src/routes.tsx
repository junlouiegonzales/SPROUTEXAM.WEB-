import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import AsyncComponent from './common/components/AsyncComponent';
import { DefaultProps } from './common/types';

const Main = AsyncComponent(import('modules/main'));
const Employee = AsyncComponent(import('modules/employee'));

const RouteComponent: FunctionComponent<DefaultProps> = (
  props: DefaultProps
) => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Employee />} />
      </Route>
    </Routes>
  );
};

export default RouteComponent;
