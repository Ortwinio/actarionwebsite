import en from './dictionaries/en.json';
import de from './dictionaries/de.json';
import nl from './dictionaries/nl.json';
import { Locale } from '../config/site';

const dictionaries: Record<Locale, any> = {
  en,
  de,
  nl,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale];
};