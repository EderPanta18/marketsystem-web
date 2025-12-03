// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decideMiddleware } from "@/middleware/flow";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const decision = await decideMiddleware(req);

  if (decision.kind === "next") {
    return NextResponse.next();
  }

  return NextResponse.redirect(decision.url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
