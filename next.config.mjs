/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/zh/devlog/2026-04-12-socrates-evolution",
        destination: "/zh/devlog/2026-05-08-from-beneficiary-to-builder",
        permanent: false,
      },
      {
        source: "/en/devlog/2026-04-12-socrates-evolution",
        destination: "/en/devlog/2026-05-08-from-beneficiary-to-builder",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
