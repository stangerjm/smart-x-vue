export default {
  /**
   * Accepted format for date parsing. This will be the accepted format when trying to
   * parse dates from strings.
   * Follows date-fns parse tokens: https://date-fns.org/v2.0.0-alpha.6/docs/parse
   */
  dateParseFormat: 'MM/dd/yyyy',
  /**
   * Placeholder for date inputs. Placeholder will display on-hover and as the user types.
   */
  dateInputPlaceholder: 'MM/DD/YYYY',
  /**
   * Input mask for date inputs. This will limit what the user can type in a date input field.
   * See: https://github.com/RobinHerbots/Inputmask
   */
  dateInputMask: '99/99/9999',
  /**
   * Placeholder for phone inputs. Placeholder will display on-hover and as the user types.
   */
  phoneInputPlaceholder: '(___) ___-____',
  /**
   * Input mask for phone number inputs. This will limit what the user can type in a phone input.
   * See: https://github.com/RobinHerbots/Inputmask
   */
  phoneInputMask: '(999) 999-9999',
};
