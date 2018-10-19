import InputType from "../constants/InputType";
import ModelTypes from "../constants/ModelType";

/**
 * Gets the appropriate input type depending on the value's data type.
 * @param item
 * @returns {string}
 */
export function getInputType(item) {
  let type = item.type;
  switch (type) {
    case Array.name:
      return InputType.SELECT;
    case Boolean.name:
      return InputType.CHECKBOX;
    case Number.name:
      return InputType.NUMBER;
    case Date.name:
      return InputType.DATE;
    case ModelTypes.Password.name:
      return InputType.PASSWORD;
    case ModelTypes.PhoneNumber.name:
      return InputType.PHONE;
    default:
      return InputType.TEXT;
  }
}
