export default function createLinkToRecord({
  linkContext = '',
  linkAction = '',
  destinationTable = [],
  destinationLookupKey = '',
  destinationIdKey = 'id',
} = {}) {
  return function createLinks(lookupValue) {
    const targetCell =
      destinationTable.find(tableCell => tableCell[destinationLookupKey] === lookupValue);

    if (targetCell == null) {
      return '/';
    }
    return `/${linkContext}/${linkAction}/${targetCell[destinationIdKey]}`;
  };
}
