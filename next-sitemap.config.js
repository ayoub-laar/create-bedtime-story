module.exports = {
  siteUrl: "https://www.CreateBedtimeStory.com",
  generateRobotsTxt: true, // (optional)
  // Default transformation for every path
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: "daily",
      priority: 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  // Exclude specific paths (optional)
  // exclude: ['/admin/**', '/login'],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // { userAgent: '*', disallow: '/admin' },
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/bedtime-story-three-little-pigs"),
    await config.transform(config, "/cinderella-bedtime-story"),
  ],
};
