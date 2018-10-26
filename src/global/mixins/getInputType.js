import InputType from '../constants/InputType';
import ModelType from '../constants/ModelType';

/**
 * Gets the appropriate input type depending on the value's data type.
 * @param item
 * @returns {string}
 */
export default function getInputType(item) {
  const { type } = item;
  switch (type) {
    case Array.name:
      return InputType.SELECT;
    case Boolean.name:
      return InputType.CHECKBOX;
    case Number.name:
      return InputType.NUMBER;
    case Date.name:
      return InputType.DATE;
    case ModelType.Password.name:
      return InputType.PASSWORD;
    case ModelType.PhoneNumber.name:
      return InputType.PHONE;
    default:
      return InputType.TEXT;
  }
}
