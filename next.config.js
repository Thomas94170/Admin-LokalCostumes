module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '5400',
  //       pathname: '/account123/**',
  //     },
  //   ],
  // },
};

//lors du deploy hostname sera le serveur
// https://github.com/vercel/next.js/discussions/18311#discussioncomment-2934096
