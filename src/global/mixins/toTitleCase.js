/**
 * Separates a camel case string into words separated by a space and capitalizes each letter
 * @param text
 * @returns {string}
 */
export default function toTitleCase(text) {
  return (
    text
      // Separate words with spaces
      .replace(/([A-Z])/g, ' $1')
      // Capitalize the first letter of each word
      .replace(/^./, substr => substr.toUpperCase())
  );
}
