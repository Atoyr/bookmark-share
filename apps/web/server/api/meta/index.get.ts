import { defineEventHandler } from 'h3';
import { z } from 'zod';
import { requireUser } from '../../auth/core/helpers';

const querySchema = z.object({
  url: z.url(),
});

function extractTitle(html: string): string | null {
  // og:title を優先
  const ogTitleMatch = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i
  ) ?? html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i
  );
  if (ogTitleMatch?.[1]) {
    return ogTitleMatch[1].trim();
  }

  // <title> タグにフォールバック
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch?.[1]) {
    return titleMatch[1].trim();
  }

  return null;
}

export default defineEventHandler(async (event) => {
  await requireUser(event);

  const query = getQuery(event);
  const result = querySchema.safeParse(query);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'url パラメータが不正です',
    });
  }

  const { url } = result.data;

  try {
    const html = await $fetch<string>(url, {
      responseType: 'text',
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkShare/1.0)',
        'Accept': 'text/html',
      },
    });

    const title = extractTitle(html);

    return {
      title: title ?? '',
      url,
    };
  } catch {
    return {
      title: '',
      url,
    };
  }
});
