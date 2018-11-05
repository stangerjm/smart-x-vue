/**
 * Transforms an object model (figure 1) into a form model (figure 2)
 * Figure 1:
 * {
 *   firstName: {
 *     type: String,
 *     required: true
 *   }
 * }
 * Figure 2:
 * {
 *   name: "firstName",
 *   type: String,
 *   required: true
 * }
 * @param model
 * @returns {Array}
 */
export default function transformIntoFormModel(model) {
  function includeNameInModelObject(accumulator, [key, value]) {
    return [...accumulator, { name: key, ...value }];
  }
  return Object.entries(model).reduce(includeNameInModelObject, []);
}
