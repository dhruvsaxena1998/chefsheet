import Logo from "./extensions/logo.png";
import Favicon from "./extensions/favicon.ico";

export default {
  config: {
    auth: {
      logo: Logo,
    },
    head: {
      favicon: Favicon,
    },
    menu: {
      logo: Logo,
    },
    theme: {},
    // Extend the translations
    translations: {
      en: {
        "Auth.form.welcome.title": "Chefsheet Login",
        "Auth.form.welcome.subtitle": "Login to your chefsheet account",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { release: false },
  },

  bootstrap() {},
};
