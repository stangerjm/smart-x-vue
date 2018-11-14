import format from 'date-fns/format';
import { getType } from './helpers';
import config from '../../../app.config';

/**
 * Formats a date object into the format specified in the app configuration.
 * Does NOT handle any construct other than a date object
 * @param date
 * @returns {string}
 */
export default function formatDate(date) {
  if (getType(date, true) !== Date) {
    return '';
  }

  return format(date, config.dateDisplayFormat, { awareOfUnicodeTokens: true });
}
