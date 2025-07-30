import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

const publicPaths = ["/", "/register"];
export default auth(async (req) => {
  const session = await auth();
  const { pathname } = req.nextUrl;
  // 1. Public routes
  if (publicPaths.includes(pathname)) {
    console.log(pathname);
    if (session) {
      const role = session.user?.user?.role;
      // Redirect logged-in user to role-based dashboard
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (role === "agent") {
        return NextResponse.redirect(new URL("/agent", req.url));
      }
      if (role === "customer") {
        return NextResponse.redirect(new URL("/customer", req.url));
      }
    }
    // Allow access to login or register if not logged in
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Optional: role-based access control
  const role = session.user?.user?.role;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/agent") && role !== "agent") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // don't exclude login/register here
};
