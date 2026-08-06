import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

async function getPage(uid: string) {
  const client = createClient();
  return client.getByUID("page", uid).catch(() => notFound());
}

export default async function Page({ params }: PageProps<"/[uid]">) {
  const { uid } = await params;
  const page = await getPage(uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: PageProps<"/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const page = await getPage(uid);
  const image = asImageSrc(page.data.meta_image);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    ...(image ? { openGraph: { images: [{ url: image }] } } : {}),
  };
}
