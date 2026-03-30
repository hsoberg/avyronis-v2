import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        // Viktig: Her må det stå /sitemap.xml til slutt
        sitemap: 'https://avyronis.com',
    }
}
