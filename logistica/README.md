# Logística Trasandes

Plataforma web corporativa para **Logística Trasandes**, desarrollada con **Next.js**, **Tailwind CSS v4** y **Prismic CMS** (Slice Machine).

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **CMS Headless:** [Prismic CMS](https://prismic.io/) + [Slice Machine](https://prismic.io/docs/slice-machine)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Lenguaje:** TypeScript
- **Gestor de paquetes:** `pnpm`

---

## 🛠️ Comenzando

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y `pnpm`:

```bash
npm install -g pnpm
```

### Instalación

Clona el repositorio e instala las dependencias:

```bash
pnpm install
```

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🎨 Prismic Slice Machine

Para administrar las rebanadas (Slices), tipos personalizados y conectarte con el panel de Prismic:

```bash
pnpm slicemachine
```

Abre [http://localhost:9999](http://localhost:9999) para gestionar los componentes visuales e integrar campos de Prismic CMS.

---

## 📜 Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo Next.js con Turbopack |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta el linter (ESLint) |
| `pnpm slicemachine` | Inicia la interfaz local de Prismic Slice Machine |

---

## 📐 Guía de Diseño y Estilos

El proyecto implementa una paleta de colores semántica y un sistema de diseño con Tailwind CSS v4 para mantener la consistencia estética y evitar transiciones bruscas ("stitches").

Consulta la documentación detallada del sistema de diseño en [gemini.md](file:///home/daminin/Documents/Repositorios/Logistica/logistica/gemini.md).
