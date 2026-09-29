import { MessageCircle } from "lucide-react";
import { asLink, Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type FloatingWhatsAppProps = {
  settings: Content.SettingsDocument;
};

export default function FloatingWhatsApp({ settings }: FloatingWhatsAppProps) {
  const { wsp_activo: isActive, wsp_enlace: link } = settings.data;
  const destination = asLink(link);

  if (!isActive || !destination) return null;

  const label = settings.data.wsp_etiqueta;
  if (!label) return null;

  const tooltip = settings.data.wsp_tooltip || label;

  return (
    <PrismicNextLink
      field={link}
      aria-label={label}
      className="group fixed right-5 bottom-5 z-40 flex min-h-14 min-w-14 items-center justify-center rounded-full bg-whatsapp p-4 text-white shadow-lg transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6"
    >
      <MessageCircle
        aria-hidden="true"
        className="h-6 w-6"
        strokeWidth={2.25}
      />
      <span className="pointer-events-none absolute right-0 bottom-full z-50 mb-3 w-max max-w-[calc(100vw-2rem)] whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-left text-sm font-bold text-night opacity-0 shadow-xl transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:transform-none">
        {tooltip}
      </span>
    </PrismicNextLink>
  );
}
