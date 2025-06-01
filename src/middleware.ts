import { defineMiddleware } from "astro:middleware";
import siteConfig from "./site-config";

export const onRequest = defineMiddleware((context, next) => {
  const { url, request } = context;

  const response = next();

  // Add cache control headers for static assets
  const pathname = url.pathname;
  const isStaticAsset = pathname.match(
    /\.(css|js|woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg|ico|webp|avif)$/i,
  );

  if (isStaticAsset) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  }

  return response;
});
