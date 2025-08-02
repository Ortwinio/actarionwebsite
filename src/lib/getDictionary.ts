const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'de' | 'nl') => {
  return dictionaries[locale]();
}; 