import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/' },
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'Googlebot-Extended', allow: '/' },
            { userAgent: 'CCBot', allow: '/' },
        ],
        sitemap: 'https://avyronis.com/sitemap.xml',
    }
}
