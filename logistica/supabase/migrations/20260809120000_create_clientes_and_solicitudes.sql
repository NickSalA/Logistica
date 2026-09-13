-- Base comercial peruana: clientes y solicitudes de cotización.
-- La tabla existente cotizaciones contiene solicitudes del formulario público,
-- por lo que se renombra para separar la solicitud de una cotización formal.

create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  pais char(2) not null default 'PE' check (pais = upper(pais)),
  tipo_persona text not null check (tipo_persona in ('natural', 'juridica')),
  tipo_documento text not null check (tipo_documento in ('dni', 'ruc')),
  numero_documento text not null check (char_length(numero_documento) between 8 and 11),
  nombre_completo text,
  nombres text,
  apellido_paterno text,
  apellido_materno text,
  razon_social text,
  direccion_fiscal text,
  ubigeo text check (ubigeo is null or char_length(ubigeo) = 6),
  departamento text,
  provincia text,
  distrito text,
  estado_contribuyente text,
  condicion_domicilio text,
  email_facturacion text check (email_facturacion is null or char_length(email_facturacion) <= 254),
  telefono text check (telefono is null or char_length(telefono) between 7 and 30),
  proveedor_verificacion text,
  datos_verificacion jsonb not null default '{}'::jsonb check (jsonb_typeof(datos_verificacion) = 'object'),
  verificado_at timestamptz,
  estado text not null default 'activo' check (estado in ('activo', 'inactivo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pais, tipo_documento, numero_documento)
);

comment on table public.clientes is 'Personas naturales o jurídicas verificadas para futuras operaciones comerciales y tributarias en Perú.';
comment on column public.clientes.datos_verificacion is 'Respuesta normalizada/original del proveedor fiscal; nunca contiene la API key.';

create index clientes_nombre_legal_idx on public.clientes (lower(coalesce(razon_social, nombre_completo)));
create index clientes_estado_idx on public.clientes (estado);

alter table public.cotizaciones rename to solicitudes_cotizacion;
alter table public.solicitudes_cotizacion rename column celular to telefono_contacto;
alter table public.solicitudes_cotizacion rename column documento to numero_documento_recibido;
alter table public.solicitudes_cotizacion
  add column cliente_id uuid references public.clientes(id) on delete set null,
  add column nombre_contacto text,
  add column pais char(2) not null default 'PE' check (pais = upper(pais)),
  add column tipo_documento_recibido text check (tipo_documento_recibido is null or tipo_documento_recibido in ('dni', 'ruc'));

comment on table public.solicitudes_cotizacion is 'Solicitudes comerciales recibidas desde el formulario público; todavía no representan una cotización formal.';
comment on column public.solicitudes_cotizacion.numero_documento_recibido is 'Documento informado al solicitar; puede no estar verificado ni corresponder aún a un cliente.';

create index solicitudes_cotizacion_cliente_idx on public.solicitudes_cotizacion (cliente_id);
create index solicitudes_cotizacion_pais_created_at_idx on public.solicitudes_cotizacion (pais, created_at desc);

alter table public.clientes enable row level security;
alter table public.solicitudes_cotizacion enable row level security;

revoke all on table public.clientes from anon, authenticated;
revoke all on table public.solicitudes_cotizacion from anon, authenticated;
grant all on table public.clientes to service_role;
grant all on table public.solicitudes_cotizacion to service_role;
