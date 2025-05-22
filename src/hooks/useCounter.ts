import React from 'react';

interface UseCounter {
  value: number;
  increment: (num?: number) => void;
  decrement: (num?: number) => void;
  reset: () => void;
}

interface UseCounterProps {
  initialValue?: number;
}

export const useCounter = ({ initialValue = 0 }: UseCounterProps): UseCounter => {
  const [value, setValue] = React.useState(initialValue);

  const increment = (num = 1) => setValue(value + num);
  const decrement = (num = 1) => setValue(value - num);
  const reset = () => setValue(initialValue);

  return {
    increment,
    decrement,
    reset,
    value,
  };
};
