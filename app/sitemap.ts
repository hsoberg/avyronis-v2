import { MetadataRoute } from 'next'

function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://avyronis.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ]
}

export default sitemap