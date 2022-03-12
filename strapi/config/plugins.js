module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  transformer: {
    enabled: true,
    config: {
      prefix: "/api/",
    },
  },
});
