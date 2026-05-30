import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
            protocol: "https", 
            hostname: "placehold.co",
        },
        {
            protocol: "https", 
            hostname: "cdn.dummyjson.com"
        }
    ],
  },

  // {
  //       hostname: "placehold.co",
  //     },
  //     {
  //       hostname:  "cdn.dummyjson.com"
  //     }







  // environment 
  env: {},
  // headers: () => {
  //   return []
  // }
  // cacheHandler: "./cache-handler.js",
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;