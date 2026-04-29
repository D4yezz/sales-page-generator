import { updateSession } from "./lib/supabase/middleware/middleware";

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/generate/:path*", "/history/:path*"],
};
