/**
 * Finds the id property of an item and returns it.
 * @param {object} item
 * @returns {string | number | null}
 */
export default function getItemId(item) {
  const keys = Object.keys(item);
  const idKey = keys.find(id => id.toLowerCase() === 'id' || id.toLowerCase() === '_id');

  if (idKey != null) {
    return item[idKey];
  }

  // return null if no valid id is found
  return null;
}
