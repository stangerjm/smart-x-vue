export function createLinkToRecord({
  linkContext = "",
  linkAction = "",
  destinationTable = [],
  destinationLookupKey = "",
  destinationIdKey = "id"
} = {}) {
  return function(lookupValue) {
    let targetCell = destinationTable.find(function(tableCell) {
      return tableCell[destinationLookupKey] === lookupValue;
    });

    if (targetCell == null) {
      return "/";
    }
    return `/${linkContext}/${linkAction}/${targetCell[destinationIdKey]}`;
  };
}
