/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/demo-runepunk',
  images: {
    unoptimized: true,
  },
  // Disable server-side features since we're doing static export
  trailingSlash: true,
}

module.exports = nextConfig
