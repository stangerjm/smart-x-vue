import InputType from '../constants/InputType';
import { Password, PhoneNumber } from '../constants/CustomTypes';

/**
 * Gets the appropriate input type depending on the value's data type.
 * @param type
 * @returns {string}
 */
export default function getInputType(type) {
  switch (type) {
    case Array:
      return InputType.SELECT;
    case Boolean:
      return InputType.CHECKBOX;
    case Number:
      return InputType.NUMBER;
    case Date:
      return InputType.DATE;
    case Password:
      return InputType.PASSWORD;
    case PhoneNumber:
      return InputType.PHONE;
    default:
      return InputType.TEXT;
  }
}
