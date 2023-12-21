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
    mapbox_key: 'pk.eyJ1IjoidGhlZGF0YWdhdGEiLCJhIjoiY2xxZWgyMHRtMDBtMDJrcDR0YWZndnhhNSJ9.0ytNeCFt3J6ZXhVCUiusTw',
    style_url: 'mapbox://styles/mapbox/streets-v11'
  }
}

module.exports = nextConfig
