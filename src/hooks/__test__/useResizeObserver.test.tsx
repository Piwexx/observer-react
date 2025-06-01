import { act, renderHook } from '@testing-library/react';
import * as observerModule from 'observer-ts'; // ✅ para spyOn

import { useResizeObserver } from '../useResizeObserver';

vi.mock('observer-ts');

let triggerCallback: (entry: ResizeObserverEntry) => void;

describe('useResizeObserver', () => {
  const mockRef = { current: document.createElement('div') };
  const cleanup = vi.fn();

  beforeEach(() => {
    // Mock de resizeElements: captura el callback y devuelve cleanup simulado
    vi.spyOn(observerModule, 'resizeElements').mockImplementation((element, callback, options) => {
      triggerCallback = callback;

      return cleanup; // función de cleanup
    });
  });

  it('debe iniciar el observer y actualizar el tamaño cuando cambia el elemento', () => {
    const { result } = renderHook(() => useResizeObserver(mockRef, {}));

    // Simulamos resize
    const mockEntry = {
      contentRect: { width: 123, height: 456 },
    } as ResizeObserverEntry;

    act(() => {
      triggerCallback(mockEntry);
    });

    expect(result.current).toEqual({ width: 123, height: 456 });
  });

  it('debe limpiar el observer al desmontar', () => {
    const { unmount } = renderHook(() => useResizeObserver(mockRef, {}));

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
