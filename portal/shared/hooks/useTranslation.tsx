import { useRouter } from "next/router";

import { strings as en } from "../../i18n/en-US";
import { strings as hi } from "../../i18n/hi-IN";

const locales = {
  "en-US": en,
  "hi-IN": hi,
};

export const useTranslation = () => {
  const { locale = "en-US" } = useRouter();

  console.log(locale)

  switch (locale) {
    case "en-us":
      return locales["en-US"];

    case "hi-IN":
      return locales["hi-IN"];
      
    default:
      return locales["en-US"];
  }
};
