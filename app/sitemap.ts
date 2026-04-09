import { MetadataRoute } from 'next'

function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: 'https://avyronis.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: 'https://avyronis.com/innsikt', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: 'https://avyronis.com/tjenester', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://avyronis.com/arbeider', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://avyronis.com/kontakt', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    ]
}

export default sitemap