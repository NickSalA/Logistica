create table public.cotizaciones (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) <= 254),
  celular text not null check (char_length(celular) between 7 and 30),
  documento text not null check (char_length(documento) between 3 and 30),
  servicio text not null check (char_length(servicio) between 1 and 120),
  fecha_servicio date not null,
  mensaje text not null check (char_length(mensaje) between 1 and 2000),
  estado text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'en_cotizacion', 'ganado', 'descartado')),
  notas_internas text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.cotizaciones is 'Solicitudes comerciales recibidas desde el formulario público.';

create index cotizaciones_estado_created_at_idx
  on public.cotizaciones (estado, created_at desc);

alter table public.cotizaciones enable row level security;

revoke all on table public.cotizaciones from anon, authenticated;
grant all on table public.cotizaciones to service_role;
