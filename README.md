# Obenkyo Words
## **Nota:** 🚧🚧 El proyecto aún está en construcción. 🚧🚧
![Obenkyo Words Hero](/public/images/hero-image.webp)

Una aplicación interactiva para aprender vocabulario japonés mediante tarjetas, organizada según los 5 niveles del Noken (JLPT).

## Tabla de Contenidos

- [Obenkyo Words](#obenkyo-words)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Tecnologías](#tecnologías)
  - [Instalación](#instalación)
  - [Ejecución y Desarrollo](#ejecución-y-desarrollo)
  - [Construcción para Producción](#construcción-para-producción)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)

## Descripción

**Obenkyo Words** es una aplicación web diseñada para ayudarte a dominar el vocabulario japonés de forma práctica y divertida. Utilizando tarjetas de estudio, la aplicación agrupa el vocabulario en los 5 niveles del Noken (JLPT), facilitando así un aprendizaje progresivo y enfocado. La interfaz moderna y dinámica permite:

- Repasar palabras clave de cada nivel.
- Evaluar tu progreso mediante modos de práctica interactiva.
- Visualizar el progreso de aprendizaje en tiempo real.

Esta herramienta es ideal tanto para principiantes como para estudiantes avanzados que desean mejorar su dominio del idioma japonés.

## Tecnologías

El proyecto se ha desarrollado utilizando:

- **React**: Para construir una interfaz de usuario interactiva.
- **TypeScript**: Para un código más robusto y mantenible.
- **Vite**: Entorno de desarrollo rápido y eficiente.
- **ESLint**: Garantizando la calidad y consistencia del código.
- **Babel/SWC**: Integrados con Vite para mejorar la experiencia en el desarrollo.
- **react-router-dom**: Manejo de rutas y navegación.
- **shadcn UI**: Componentes UI modernos y personalizables.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RogerCiv/obenkyo-words
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd obenkyo-Words
   ```
3. Instala las dependencias:
   ```bash
   pnpm install
   ```

## Ejecución y Desarrollo

Para iniciar el servidor de desarrollo con Hot Module Replacement (HMR), ejecuta:

```bash
pnpm dev
```

Accede a la aplicación en `http://localhost:3000` (o el puerto configurado en tu entorno).

## Construcción para Producción

Genera los archivos optimizados para producción ejecutando:

```bash
pnpm build
```

Para previsualizar la versión en producción, utiliza:

```bash
pnpm serve
```

## Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Realiza un fork del repositorio.
2. Crea tu feature branch: `git checkout -b feature/mi-nueva-funcionalidad`.
3. Realiza commit de tus cambios con mensajes claros.
4. Realiza un push a tu branch: `git push origin feature/mi-nueva-funcionalidad`.
5. Abre un Pull Request explicando tus cambios.

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.
