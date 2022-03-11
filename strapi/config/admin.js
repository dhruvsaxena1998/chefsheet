module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3227bc67a962740baa7bdc5e07782a52'),
  },
});
