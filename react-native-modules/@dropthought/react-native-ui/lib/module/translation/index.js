import i18n from 'i18next'; // translations i18n

import en from './en.json';
import ar from './ar.json'; // init i18n

i18n.init({
  debug: false,
  fallbackLng: 'en',
  lng: 'en',
  ns: ['common', 'start-survey', 'survey'],
  resources: {
    en,
    ar
  },
  interpolation: {
    escapeValue: false // not needed for react

  },
  react: {
    wait: true
  }
});
export default i18n;
//# sourceMappingURL=index.js.map