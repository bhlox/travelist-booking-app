/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gpteawbghqdquxidtnqc.supabase.co" },
    ],
  },
};

export default nextConfig;
