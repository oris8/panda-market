/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000, // 10kb 미만의 파일은 인라인으로 처리
          name: "[name].[hash].[ext]",
          outputPath: "fonts/",
          publicPath: "/fonts/",
          esModule: false, // url-loader가 ES 모듈을 사용하지 않도록 설정
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
