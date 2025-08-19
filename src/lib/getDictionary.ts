import en from './dictionaries/en.json';
import de from './dictionaries/de.json';
import nl from './dictionaries/nl.json';

const dictionaries: Record<'en' | 'de' | 'nl', any> = {
  en,
  de,
  nl,
};

export const getDictionary = async (locale: 'en' | 'de' | 'nl') => {
  return dictionaries[locale];
};