/**
 * Compares two items. Returns -1, 1, or 0 if item one
 * is less than, greater than, or equal to the second item.
 * @param item1
 * @param item2
 * @returns {number}
 */
function compareItems(item1, item2) {
  // Cast compare items to lower case if they are strings
  if (typeof item1 === 'string' && typeof item2 === 'string') {
    item1 = item1.toLowerCase();
    item2 = item2.toLowerCase();
  }

  if (item1 < item2) {
    return -1;
  }

  if (item1 > item2) {
    return 1;
  }

  return 0;
}

/**
 * Returns a sorted copy of the data sorted by the column key passed in
 * @param data
 * @param columnKey
 * @param descending
 * @returns {Array}
 */
export default function getDataSortedByColumn(data, columnKey, descending) {
  /**
   * Sorting function that compares the items passed in
   * @param item1
   * @param item2
   * @returns {number}
   */
  function sortData(item1, item2) {
    // Set the keys to sort in the direction indicated
    if (descending) {
      return compareItems(item2[columnKey], item1[columnKey]);
    }

    return compareItems(item1[columnKey], item2[columnKey]);
  }

  // Return a copy of the data sorted
  return data.slice().sort(sortData);
}
