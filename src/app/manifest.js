export default function manifest() {
    return {
        name: 'Musculator',
        short_name: 'Musculator',
        description: 'Have bigger muscle',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}