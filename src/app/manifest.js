export default function manifest() {
    return {
        name: 'Musculator',
        short_name: 'Musculator',
        description: 'Have bigger muscle',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}