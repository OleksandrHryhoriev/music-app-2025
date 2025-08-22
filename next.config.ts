import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
};
module.exports = {
   images: {
      remotePatterns: [
         new URL("https://i.scdn.co/**"),
         new URL("https://mosaic.scdn.co/**"),
      ],
   },
};

export default nextConfig;
