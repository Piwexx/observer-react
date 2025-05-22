# React Library Hooks Boilerplate 

Este repositorio es una template base para crear librerías en React con Hooks modernas usando TypeScript. Incluye una configuración lista para el desarrollo local, pruebas, publicación automatizada y convenciones de código profesionales.

## ✨ Tecnologías Incluidas

- ⚡️ **Vite** para empaquetar la librería y realizar el build.
- 🧠 **Semantic Release** para publicación automática con versionado semántico.
- ✅ **Husky** + **Commitlint** + **Commitizen** para validar mensajes de commit (usando Conventional Commits).
- 📝 **Vitest** para pruebas unitarias.
- 🧪**React Testing Library** para pruebas de componentes React.
- 🎨 **ESLint** para la calidad del código y la detección de errores.
- 🖋️ **Prettier** para el formateo automático del código.
- 🔗 **Lint-staged** para ejecutar linters solo en los archivos modificados.

## 🚀 Empezar

### Clonar el repositorio

1. **Clonar el repositorio**:

   ```bash
    git clone https://github.com/Piwexx/react-library-hooks.git nueva-libreria
    cd nueva-libreria
   ```

2. **Instalar las dependencias**:

   ```bash
   npm install
   ```
## 📋 Scripts Disponibles

El setup incluye una serie de scripts preconfigurados para facilitar el desarrollo. Estos son los principales:

- **`build`**: Compila la librería utilizando `vite`.

  ```bash
  npm run build
  ```

- **`dev`**: Compila y observa los cambios en tiempo real (modo watch).

  ```bash
  npm run dev
  ```

- **`test`**: Ejecuta las pruebas utilizando **vitest**.

  ```bash
  npm run test
  ```

- **`test:watch`**: Ejecuta las pruebas en modo observador.

  ```bash
  npm run test:watch
  ```

- **`lint`**: Linta el código utilizando **ESLint**.

  ```bash
  npm run lint
  ```

- **`lint:fix`**: Linta y arregla automáticamente los problemas de estilo y errores de código.

  ```bash
  npm run lint:fix
  ```

- **`format`**: Formatea el código utilizando **Prettier**.

  ```bash
  npm run format
  ```

- **`commit`**: Utiliza **Commitizen** para crear un commit siguiendo el estándar de **Conventional Commits**.
  ```bash
  npm run commit
  ```

## 🔑 Gestión de Versiones Automática con Semantic Release

Este repositorio está configurado con **Semantic Release** para un versionado semántico automatizado. Cada commit que siga las convenciones de **Conventional Commits** actualizará la versión automáticamente. **Semantic Release** actualizará la versión mayor, menor o de parche según el tipo de cambio realizado:

- **`major`**: Para cambios incompatibles.
- **`minor`**: Para nuevas funcionalidades compatibles.
- **`patch`**: Para correcciones compatibles.

**`Variables de entorno necesarias CI/CD GitHub`**

- NPM_TOKEN: Token de autenticación para publicar en npm. Puedes obtenerlo desde tu cuenta de npm.

- GH_TOKEN: Token de GitHub para interactuar con la API de GitHub (por ejemplo, para crear un release en GitHub).

### 🌍 Generación Automática de CHANGELOG.md

**Semantic Release** también se encarga de generar y actualizar el archivo **CHANGELOG.md** automáticamente con cada nueva versión.

## 🔗 Soporte para Desarrollo Local

Puedes usar **npm link** para desarrollar y probar tu librería localmente antes de publicarla. Primero ejecuta `npm link` en tu proyecto de librería:

```bash
npm link
```

Luego, en tu proyecto destino, puedes usar:

```bash
npm link nombre-de-tu-libreria
```
