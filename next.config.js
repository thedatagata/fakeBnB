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
    mapbox_key: 'pk.eyJ1IjoidGhlZGF0YWdhdGEiLCJhIjoiY2xwc3V6bm9kMDFrbTJwcGg1cGU3MzQ0eCJ9.qZC6e9M7PdILZ1ES4MhMVA',
    style_url: 'mapbox://styles/thedatagata/clqcwc3os009101qlf20e1n91'
  }
}

module.exports = nextConfig
