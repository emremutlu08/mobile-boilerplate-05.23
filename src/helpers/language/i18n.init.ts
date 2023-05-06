import i18next from "i18next";
import { en, es, zh } from "./locales";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next.
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      zh: {
        translation: zh,
      },
    },
  });

export default i18next;
