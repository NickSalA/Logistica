import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { serverEnv } from "../../../config/env.server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== serverEnv.prismicRevalidateSecret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
