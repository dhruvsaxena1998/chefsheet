// path: src/extensions/users-permissions/strapi-server.js
module.exports = (plugin) => {
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      reset_password_token,
      confirmationToken,
      confirmation_token,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ["admin"] }
    );

    const { admin, ...rest } = sanitizeOutput(user);

    ctx.body = {
      ...sanitizeOutput(admin),
      user: {
        data: {
          ...rest,
        },
      },
    };
  };

  return plugin;
};
