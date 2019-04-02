/**
 * Generates a random sequence of strings
 * @returns {string} Randomly generated string
 */
export default function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}
