import rss from '@astrojs/rss';
import siteConfig from '@/site-config';
import { api } from '@/utils/ghost'

interface Context {
  site: string;
}

// Function to strip HTML tags
function stripHtml(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export async function GET(context: Context) {
  try {
    // Fetch posts from Ghost
    const posts = await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
      fields: ['id', 'title', 'slug', 'published_at', 'custom_excerpt', 'html']
    });

    return rss({
      title: siteConfig.title,
      description: siteConfig.description,
      site: context.site,
      items: posts.map((post) => ({
        title: post.title,
        description: post.custom_excerpt ? stripHtml(post.custom_excerpt) : '',
        link: `${context.site}posts/${post.slug}/`,
        pubDate: new Date(post.published_at),
        content: stripHtml(post.html),
        author: post.primary_author ? post.primary_author.name : siteConfig.author,
      })),
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
