# 📡 observer-react-ts

**React hooks para observar visibilidad, mutaciones y cambios de tamaño de elementos DOM con una API declarativa y sencilla.**  
Basado en [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), y [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## 🚀 Instalación

```bash
npm install observer-react-ts
```

> ⚠️ Esta librería depende de `observer-ts`. Asegúrate de tenerla como dependencia o que venga incluida con esta.

---

## 📦 Hooks disponibles

### 1. `useIsVisible`

Observa si un elemento es visible dentro del viewport (usando `IntersectionObserver`).

#### Uso

```tsx
import { useIsVisible } from 'observer-react-ts';
import { useRef } from 'react';

const MyComponent = () => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref, { threshold: 0.5 });

  return (
    <div ref={ref}>
      {isVisible ? 'Elemento visible' : 'Elemento no visible'}
    </div>
  );
};
```

#### Parámetros

- `ref: React.RefObject<Element>`: Referencia del elemento a observar.
- `options: IntersectionObserverInit`: Opciones del `IntersectionObserver`.

#### Retorna

- `boolean`: `true` si el elemento está visible, `false` en caso contrario.

---

### 2. `useMutationObserver`

Observa cambios en el contenido o atributos de un elemento (usando `MutationObserver`).

#### Uso

```tsx
import { useMutationObserver } from 'observer-react-ts';
import { useRef } from 'react';

const MyComponent = () => {
  const ref = useRef(null);
  const content = useMutationObserver(ref, { childList: true, subtree: true });

  return (
    <div ref={ref}>
      Contenido actual: {content}
    </div>
  );
};
```

#### Parámetros

- `ref: React.RefObject<Element>`: Referencia del elemento a observar.
- `options?: MutationObserverInit`: Configuración del `MutationObserver`.
- `extractor?: (target: Element) => string`: Función opcional para extraer el valor deseado de cada mutación (por defecto devuelve el `textContent` del elemento).

#### Retorna

- `string`: El contenido actual extraído del elemento observado.

---

### 3. `useResizeObserver`

Observa cambios de tamaño en un elemento (usando `ResizeObserver`).

#### Uso

```tsx
import { useResizeObserver } from 'observer-react-ts';
import { useRef } from 'react';

const MyComponent = () => {
  const ref = useRef(null);
  const { width, height } = useResizeObserver(ref);

  return (
    <div ref={ref}>
      Tamaño actual: {width}px x {height}px
    </div>
  );
};
```

#### Parámetros

- `ref: React.RefObject<Element>`: Referencia del elemento a observar.
- `options?: ResizeObserverOptions`: Opciones del `ResizeObserver`.

#### Retorna

- `object`: `{ width: number | undefined, height: number | undefined }`

---

## 🧠 ¿Por qué usar `observer-react-ts`?

- ✅ Fácil de integrar con componentes React
- 🧩 Basado en APIs nativas de observación eficientes
- 💡 Minimalista y declarativo
- 🧪 Ideal para UI reactivas basadas en visibilidad, mutación o tamaño

---

## 🛠 Requisitos

- React 17+
- Navegadores que soporten:
  - [`IntersectionObserver`](https://caniuse.com/intersectionobserver)
  - [`MutationObserver`](https://caniuse.com/mutationobserver)
  - [`ResizeObserver`](https://caniuse.com/resizeobserver)

---

## 📄 Licencia

MIT