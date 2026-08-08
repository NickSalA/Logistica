# Supabase — Cotizaciones

## Estado actual

La migración inicial ya está aplicada y la tabla `public.cotizaciones` está operativa. El flujo completo desde el formulario hasta Supabase fue verificado manualmente.

## Aplicar la migración inicial

1. Abre el proyecto en Supabase Dashboard.
2. Ve a **SQL Editor** y crea una consulta nueva.
3. Copia y ejecuta el contenido de [`migrations/20260806120000_create_cotizaciones.sql`](./migrations/20260806120000_create_cotizaciones.sql).
4. Comprueba que la tabla `public.cotizaciones` existe en **Table Editor**.

La migración:

- Crea la tabla de solicitudes comerciales.
- Añade estados para el seguimiento inicial del pseudo-CRM.
- Crea un índice para listar leads por estado y fecha.
- Activa RLS.
- Revoca el acceso de `anon` y `authenticated`; las inserciones se realizan solo desde la API de Next.js con `SUPABASE_SECRET_KEY`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

`SUPABASE_SECRET_KEY` nunca debe llevar el prefijo `NEXT_PUBLIC_`, ni compartirse con el navegador.

## Verificación funcional

Después de aplicar la migración:

1. Inicia la app con `pnpm dev`.
2. Envía una cotización de prueba desde la web.
3. Confirma que aparece una fila con estado `nuevo` en `public.cotizaciones`.
4. Revisa la terminal: se mostrará una notificación de correo simulada con el ID de la cotización, sin datos personales.

El correo todavía no se envía. El punto de integración futuro está en `src/server/cotizaciones/notifications.ts`.

## Arquitectura de acceso

- `src/app/api/cotizaciones/route.ts` recibe y valida el HTTP request.
- `src/server/cotizaciones/repository.ts` usa `SUPABASE_SECRET_KEY` para guardar el lead.
- `src/server/cotizaciones/notifications.ts` implementa la notificación mock.
- Los componentes cliente no acceden directamente a la tabla ni conocen la clave privilegiada.

El ID de cada cotización es un `bigint` incremental interno. Los listados futuros deben filtrar por `estado` y ordenar por `created_at`, aprovechando el índice creado en la migración.
