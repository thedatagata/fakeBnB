/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com', 
      'images.unsplash.com',
      'unsplash.com',
    ]
  }, 
  env: {
    mapbox_key: 'pk.eyJ1IjoiZGFzZ2F0YSIsImEiOiJjbHBzdjc4bGcwNjlsMmltbzNpZW5wcDhqIn0.LdzmmormD0IJygyu84VvjA'
  }
}

module.exports = nextConfig
