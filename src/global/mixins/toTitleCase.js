function capitalize(word) {
  if (typeof word !== 'string') return '';

  return word.replace(/^./, firstLetter => firstLetter.toUpperCase());
}

function capitalizeTitleWord(word) {
  if (typeof word !== 'string') return '';

  const noCapitalize = [
    'a', 'an', 'the', 'for', 'and', 'nor', 'but', 'or', 'yet',
    'so', 'by', 'for', 'from', 'of', 'on', 'to', 'with', 'at',
    'if', 'in', 'into',
  ];

  return noCapitalize.includes(word.toLowerCase())
    ? word.toLowerCase()
    : capitalize(word);
}

/**
 * Separates a camel case string into words separated by a space and capitalizes each letter
 * @param text
 * @returns {string}
 */
export default function toTitleCase(text) {
  function filterGaps(element) {
    return element != null
           && element !== '';
  }

  const [firstWord, ...restWords] = text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .filter(filterGaps);

  const lastWord = restWords.pop();

  const capWords = restWords.map(capitalizeTitleWord);

  return [
    capitalize(firstWord),
    ...capWords,
    capitalize(lastWord),
  ].join(' ');
}
