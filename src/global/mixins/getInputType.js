import { InputTypes } from "../constants/inputTypes";

/**
 * Gets the appropriate input type depending on the value's data type.
 * @param item
 * @returns {string}
 */
export function getInputType(item) {
  let type = item.type;
  switch (type) {
    case Array.name:
      return InputTypes.SELECT;
    case Boolean.name:
      return InputTypes.CHECKBOX;
    case Number.name:
      return InputTypes.NUMBER;
    case Date.name:
      return InputTypes.DATE;
    default:
      return InputTypes.TEXT;
  }
}
