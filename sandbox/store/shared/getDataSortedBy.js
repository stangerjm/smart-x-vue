export function getSortedData(data, key, descending) {
  if (isArrayOfNumbers(data, key)) {
    descending = !descending;
  }

  return data.slice().sort(function(item1, item2) {
    let itemKey1;
    let itemKey2;

    if (descending) {
      itemKey1 = item1[key];
      itemKey2 = item2[key];
    } else {
      itemKey1 = item2[key];
      itemKey2 = item1[key];
    }

    return compare(itemKey1, itemKey2);
  });
}

function isArrayOfNumbers(array, key) {
  return array.every(item => !isNaN(Number(item[key])));
}

function compare(item1, item2) {
  if (item1 < item2) {
    return -1;
  }

  if (item1 > item2) {
    return 1;
  }

  return 0;
}
