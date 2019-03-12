/**
 * Simulates a switch-like control structure by
 * accepting a lookup object of cases and a default value
 * and returning the value at a given key
 * @param {object} cases - Object containing cases and corresponding values
 * @returns {function(*) : function(string)}
 * Curried functions to gather the rest of the required values
 */
export default function switchCase(cases) {
  /**
   * Gathers the value for the default case
   * @param {*} defaultValue - The value for the default case
   * @returns {function(string): *} Returns a function that performs the lookup
   */
  return function gatherDefaultCase(defaultValue) {
    /**
     * Performs the lookup
     * @param {string} key - The key to use to check the cases object
     * @returns {*} The value at the given key
     */
    return function lookup(key) {
      return typeof cases === 'object'
        ? cases[key] || defaultValue
        : null;
    };
  };
}
