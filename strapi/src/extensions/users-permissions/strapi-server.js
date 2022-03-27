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

  plugin.controllers.user.find = async (ctx) => {
    const { populate, ...params } = ctx.request.query;

    const users = await strapi
      .service("plugin::users-permissions.user")
      .fetchAll(params, populate);

    ctx.body = users.map(sanitizeOutput);
  };

  plugin.controllers.user.findOne = async (ctx) => {
    const { populate, ...params } = ctx.request.query;
    const { id } = ctx.request.params;

    const user = await strapi.service("plugin::users-permissions.user").fetch(
      {
        ...params,
        id,
      },
      populate
    );

    ctx.body = sanitizeOutput(user);
  };

  return plugin;
};
