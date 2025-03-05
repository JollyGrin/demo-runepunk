/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/webgl/Build/Builds.data.br",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
        ],
      },
      {
        source: "/webgl/Build/Builds.framework.js.br",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
        ],
      },
      {
        source: "/webgl/Build/Builds.wasm.br",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
