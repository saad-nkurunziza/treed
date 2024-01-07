export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/activity",
    "/create-treed",
    "/search",
    "/treed/:path*",
    "/profile/:path*",
  ],
};
