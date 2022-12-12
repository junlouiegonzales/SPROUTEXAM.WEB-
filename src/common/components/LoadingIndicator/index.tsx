import React, { FunctionComponent } from 'react';
import { Spinner, Text, chakra } from '@chakra-ui/react';
import { DefaultProps } from 'common/types';
import clsx from 'clsx';
import styles from './styles.module.scss';

export type LoadingIndicatorProps = {
  isTable?: boolean;
  isButton?: boolean;
  isModal?: boolean;
  size?: string;
  loadingText?: string;
  px?: string;
  py?: string;
  pl?: string;
  pr?: string;
  pt?: string;
  toolTip?: string;
} & DefaultProps;

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = (
  props: LoadingIndicatorProps
) => {
  const {
    toolTip,
    isTable,
    isModal,
    isButton,
    py,
    px,
    pl,
    pr,
    pt,
    size = 'xl',
    loadingText,
  } = props;
  let thickness = '4px';

  switch (size) {
    case 'md':
      thickness = '3px';
      break;
    case 'xl':
    default:
      thickness = '4px';
      break;
  }

  return (
    <chakra.div
      title={toolTip}
      pt={pt}
      px={px}
      py={py}
      pl={pl}
      pr={pr}
      className={clsx({
        [styles.tableWrapper]: isTable,
        [styles.buttonWrapper]: isButton,
        [styles.modalWrapper]: isModal,
      })}
    >
      <Spinner
        thickness={thickness}
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size={size}
      />
      {loadingText && (
        <Text ml="14px" color="gray.500" fontSize="sm">
          {loadingText}
        </Text>
      )}
    </chakra.div>
  );
};

export default LoadingIndicator;
