"use strict";

/**
 *  admin controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::admin.admin", ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body.data;

    ctx.request.body = data;
    await strapi.controller("plugin::users-permissions.auth").register(ctx);

    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      ctx.throw(500, "User not found");
    }

    ctx.request.body = {
      data: {
        ...data,
        user: user.id,
      },
    };

    const admin = await super.create(ctx);

    const sanitized = await this.sanitizeOutput(admin, ctx);
    return this.transformResponse(sanitized);
  },
}));
