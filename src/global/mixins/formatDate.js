import format from 'date-fns/format';
import config from '../../../app.config';

export default function formatDate(date) {
  return format(date, config.dateDisplayFormat, { awareOfUnicodeTokens: true });
}
