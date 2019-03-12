import { createWrapperGenerator } from '../helpers/index';
import { toTitleCase } from '../../../src/global/mixins';
import SmartDetails from '../../../src/components/smart-details.vue';

const mountDetails = createWrapperGenerator(SmartDetails);

/**
 * Renders the details passed in as a smart-details component
 * and checks each detail against the expected details object.
 * @param {object} details - The details to be rendered as a smart-details component
 * @param {object} expectedDetails - The expected values for each key in the above details object.
 */
function matchDetails(details, expectedDetails) {
  // Mount wrapper
  const wrapper = mountDetails({ propsData: { detailData: details } });

  // Get all details (keys and values)
  const detailContainers = wrapper.findAll('.smart-details--detail');

  // Get keys of expectedDetails object
  const expectedKeys = Object.keys(expectedDetails);

  // Check each detail to ensure the key and value are properly rendered
  const found = expectedKeys.every((key) => {
    // Find the element that matches the current key
    const result = detailContainers.wrappers.find((currentWrapper) => {
      const keyElement = currentWrapper.find('.smart-details--detailKey');

      return (
        keyElement.text().trim() === toTitleCase(key).trim()
      );
    });

    // If a detail matching the above key is found,
    // check that the value matches the expected detail value
    if (result != null) {
      // Get the rendered value
      const valueElement = result.find('.smart-details--detailValue');
      let renderedValue = valueElement.text();

      // If text from value node is blank, it is likely a checkbox. Get the value from the checkbox
      if (renderedValue === '') {
        renderedValue = valueElement.find('input').element.checked;
      }

      // Check that the value matches the expected detail value
      expect(renderedValue, `Value at ${key} did not match rendered value.`).toEqual(expectedDetails[key]);

      // A value has been found to match the expected detail value
      return true;
    }

    // A detail that matches the key above has not been found.
    expect(result, `There was no detail matching the key: ${key}`).not.toBeUndefined();
    return false;
  });

  expect(found, 'The expected details and rendered details did not match.').toBeTruthy();
}

describe('smart-details.vue', () => {
  it('renders each detail passed in', () => {
    // Detail keys should be upper case, so they can match
    // smart-detail rendered keys that are cast to upper case
    const details = {
      name: 'James',
      age: 25,
      birthday: new Date('09/11/1993'),
      isEmployee: true,
    };

    const expectedDetails = {
      name: 'James',
      age: '25',
      birthday: '09/11/1993',
      isEmployee: true,
    };

    const detailKeys = Object.keys(details);
    const wrapper = mountDetails({ propsData: { detailData: details } });

    // Get all details (keys and values)
    const detailContainers = wrapper.findAll('.smart-details--detail');

    // Component should have rendered each detail, check that the lengths are the same
    expect(detailContainers.length, 'The component did not render all the details passed in.').toBe(detailKeys.length);

    matchDetails(details, expectedDetails);
  });
});
