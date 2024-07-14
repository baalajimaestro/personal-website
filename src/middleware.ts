import { defineMiddleware } from "astro:middleware";
import siteConfig from "./site-config";

export const onRequest = defineMiddleware((context, next) => {
  const { url, request } = context;
  
  if (import.meta.env.PROD) {
    const configuredUrl = new URL(siteConfig.siteUrl);
    
    if (url.hostname !== configuredUrl.hostname) {
      const newUrl = new URL(url.pathname + url.search, configuredUrl);
      
      return Response.redirect(newUrl.toString(), 301);
    }
  }
  
  return next();
});
