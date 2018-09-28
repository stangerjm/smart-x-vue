/**
 *
 * @param data
 * @param key
 * @param descending
 * @returns {*}
 */
export function getSortedData(data, key, descending) {
  // If all items are numbers, sort the opposite direction
  if (isArrayOfNumbers(data, key)) {
    descending = !descending;
  }

  // Sort the data
  return data.slice().sort(function(item1, item2) {
    let itemKey1;
    let itemKey2;

    // Set the keys to sort in the direction indicated
    if (descending) {
      itemKey1 = item1[key];
      itemKey2 = item2[key];
    } else {
      itemKey1 = item2[key];
      itemKey2 = item1[key];
    }

    return compareItems(itemKey1, itemKey2);
  });
}

/**
 * Determines if the passed in is an array of numbers
 * @param array
 * @param key
 * @returns {boolean}
 */
function isArrayOfNumbers(array, key) {
  return array.every(item => !isNaN(Number(item[key])));
}

/**
 * Compares two items. Returns -1, 1, or 0 if item one
 * is less than, greater than, or equal to the second item.
 * @param item1
 * @param item2
 * @returns {number}
 */
function compareItems(item1, item2) {
  if (item1 < item2) {
    return -1;
  }

  if (item1 > item2) {
    return 1;
  }

  return 0;
}
