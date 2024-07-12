import GhostContentAPI from '@tryghost/content-api';

export const api = new GhostContentAPI({
    url: import.meta.env.CONTENT_API_URL,
    key: import.meta.env.CONTENT_API_KEY,
    version: 'v5.0',
});

export const posts = api.posts
export const tags = api.tags
export const authors = api.authors
export const pages = api.pages
export const settings = api.settings
