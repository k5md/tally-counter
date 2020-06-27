/* eslint global-require: 0 */

import * as RNLocalize from 'react-native-localize';

const translations = [
  {
    languageTag: 'en',
    displayName: 'English',
    translation: require('./en.json'),
  },
];

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(translations.map(item => item.languageTag)) || fallback;

const { translation } = translations.find(item => item.languageTag === languageTag);

const translate = string => translation[string];

export { translate, translations };
