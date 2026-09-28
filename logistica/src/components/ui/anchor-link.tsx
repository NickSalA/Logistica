"use client";

import type { LinkField } from "@prismicio/client";
import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import type { MouseEventHandler, ReactNode } from "react";

type AnchorLinkProps = {
  field: LinkField;
  className?: string;
  children: ReactNode;
  onClickAction?: MouseEventHandler<HTMLAnchorElement>;
};

export default function AnchorLink({
  field,
  className,
  children,
  onClickAction,
}: AnchorLinkProps) {
  function handleClick(
    event: Parameters<NonNullable<MouseEventHandler<HTMLAnchorElement>>>[0],
  ) {
    onClickAction?.(event);

    const destination = asLink(field);
    if (!destination?.startsWith("#")) return;

    const target = document.getElementById(destination.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus({ preventScroll: true });
    window.history.replaceState(null, "", destination);
  }

  return (
    <PrismicNextLink field={field} className={className} onClick={handleClick}>
      {children}
    </PrismicNextLink>
  );
}
