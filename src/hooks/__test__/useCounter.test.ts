import { act, renderHook } from '@testing-library/react';

import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('Should increment and decrement couter properly', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));
    expect(result.current.value).toBe(0);
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
  });
  it('Should start with no-default initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    expect(result.current.value).toBe(10);
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(11);
  });
  it('Should reset value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));
    expect(result.current.value).toBe(0);
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe(0);
  });
});
