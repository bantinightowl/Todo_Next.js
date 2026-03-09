/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler disabled - experimental and may cause issues
  // reactCompiler: true,
  
  // Output standalone for Docker deployment
  output: 'standalone',
  
  // Optimize for production
  productionBrowserSourceMaps: false,
  
  // Ensure these are included in standalone output
  serverExternalPackages: ['mongoose', 'bcrypt', 'jose'],
};

export default nextConfig;
