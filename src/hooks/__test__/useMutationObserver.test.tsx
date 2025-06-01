import { act, renderHook } from '@testing-library/react';
import * as observerModule from 'observer-ts'; // ✅ para spyOn

import { useMutationObserver } from '../useMutationObserver';

vi.mock('observer-ts');

let triggerCallback: (entry: MutationRecord) => void;

describe('useMutationObserver', () => {
  const mockRef = { current: document.createElement('div') };
  const cleanup = vi.fn();

  beforeEach(() => {
    // Mock de mutationElements: captura el callback y devuelve cleanup simulado
    vi.spyOn(observerModule, 'mutationElements').mockImplementation(
      (element, callback, options) => {
        triggerCallback = callback;

        return cleanup; // función de cleanup
      },
    );
  });

  it('debe iniciar el observer y actualizar el valor cuando cambia el elemento', () => {
    const { result } = renderHook(() =>
      useMutationObserver(mockRef, {}, (el) => el.textContent || ''),
    );

    // Simulamos un cambio
    mockRef.current.textContent = 'Hola Test';

    act(() => {
      const mockMutation = {
        target: mockRef.current,
      } as MutationRecord;

      triggerCallback(mockMutation);
    });

    expect(result.current).toBe('Hola Test');
  });

  it('no debería actualizar el estado si el contenido no cambia', () => {
    const { result } = renderHook(() =>
      useMutationObserver(mockRef, {}, (el) => el.textContent || ''),
    );

    // 1. Simulamos un valor inicial
    mockRef.current.textContent = 'Sin cambio';

    // 2. Trigger del observer
    act(() => {
      triggerCallback({ target: mockRef.current } as MutationRecord);
    });

    const firstValue = result.current;

    // 3. Volvemos a simular el mismo contenido
    act(() => {
      triggerCallback({ target: mockRef.current } as MutationRecord);
    });

    //4. El contenido es el mismo
    expect(result.current).toBe(firstValue);
  });

  it('no debería lanzar error si ref.current es null', () => {
    const nullRef = { current: null };

    expect(() =>
      renderHook(() => useMutationObserver(nullRef, {}, (el) => el.textContent || '')),
    ).not.toThrow();
  });

  it('debería volver a observar si cambian las opciones', () => {
    const spy = vi.spyOn(observerModule, 'mutationElements');

    //Renderizamos el hook con opciones iniciales
    const { rerender } = renderHook(
      ({ options }) => useMutationObserver(mockRef, options, (el) => el.textContent || ''),
      {
        initialProps: { options: { attributes: true } },
      },
    );

    //Verificamos que se llamó con las opciones iniciales
    expect(spy).toHaveBeenCalledWith(mockRef.current, expect.any(Function), { attributes: true });

    //Cambiamos las opciones y volvemos a renderizar el hook
    rerender({ options: { childList: true } });

    //Verificamos que se llamó otra vez con las nuevas opciones
    expect(spy).toHaveBeenCalledWith(mockRef.current, expect.any(Function), { childList: true });
  });

  it('debe limpiar el observer al desmontar', () => {
    const { unmount } = renderHook(() =>
      useMutationObserver(mockRef, {}, () => el.textContent || ''),
    );

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
