import { act, renderHook } from '@testing-library/react';
import * as observerModule from 'observer-ts'; // ✅ para spyOn

import { useIsVisible } from '../useIsVisible';

vi.mock('observer-ts');

let triggerCallback: (entry: IntersectionObserverEntry) => void;

describe('useIsVisible', () => {
  const mockRef = { current: document.createElement('div') };
  const cleanup = vi.fn();

  beforeEach(() => {
    // Mock de observeElements: captura el callback y devuelve cleanup simulado
    vi.spyOn(observerModule, 'observeElements').mockImplementation((element, callback, options) => {
      triggerCallback = callback;

      return cleanup; // función de cleanup
    });
  });

  it('debe ejecutar el callback cuando el elemento se vuelve visible', () => {
    const { result } = renderHook(() => useIsVisible(mockRef, {}));

    // Simula que el elemento es visible
    act(() => {
      triggerCallback({
        target: document.createElement('div') as Element,
        isIntersecting: true,
      } as IntersectionObserverEntry);
    });

    expect(result.current).toBe(true);
  });

  it('no debe ejecutar el callback si el elemento no es visible', () => {
    const { result } = renderHook(() => useIsVisible(mockRef, {}));

    // Simula que el elemento no es visible
    act(() => {
      triggerCallback({
        target: document.createElement('div') as Element,
        isIntersecting: false,
      } as IntersectionObserverEntry);
    });

    expect(result.current).toBe(false);
  });

  it('debe limpiar la observación al desmontar', () => {
    const { unmount } = renderHook(() => useIsVisible(mockRef, {}));
    unmount();

    expect(cleanup).toHaveBeenCalled();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
