import React, { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { chakra } from '@chakra-ui/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export type DatePickerComponentProps = {
  onChange: (date: Date) => void;
  value: Date;
  isInvalid?: boolean;
  placeholder?: string;
  mr?: string;
  ml?: string;
  minDate?: Date;
  maxDate?: Date;
};

const DatePickerComponent: FunctionComponent<DatePickerComponentProps> = (
  props: DatePickerComponentProps
) => {
  const { onChange, value, placeholder, mr, ml, isInvalid, maxDate, minDate } =
    props;
  return (
    <chakra.div mr={mr} ml={ml}>
      <DatePicker
        selected={value}
        minDate={minDate}
        maxDate={maxDate}
        className={clsx(styles.datePicker, {
          [styles.datePickerInvalid]: isInvalid,
        })}
        placeholderText={placeholder}
        onChange={onChange}
      />
    </chakra.div>
  );
};

export default DatePickerComponent;
