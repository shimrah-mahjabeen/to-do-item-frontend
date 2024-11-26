import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEN from './locales/en/common.json';
import signUpEN from './locales/en/signUp.json';
import todoEN from './locales/en/todo.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        signUp: signUpEN,
        todo: todoEN 
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;