export async function rewrites() {
    return [
        {
            source: '/api/*',
            destination: 'https://memome-srv.onrender.com/api/v1',
        },
    ]
}