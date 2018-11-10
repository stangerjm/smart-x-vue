import { createWrapperGenerator } from './helpers';
import { toTitleCase } from '../../src/global/mixins';
import SmartDetails from '../../src/components/smart-details.vue';

const mountDetails = createWrapperGenerator(SmartDetails);

describe('smart-details.vue', () => {
  it('renders each detail passed in', () => {
    // Detail keys should be upper case, so they can match
    // smart-detail rendered keys that are cast to upper case
    const details = {
      Name: 'James',
      Age: 25,
      Birthday: new Date('09/11/1993'),
      IsEmployee: true,
    };

    const renderedDetails = {
      Name: 'James',
      Age: '25',
      Birthday: '09/11/1993',
      IsEmployee: true,
    };

    const wrapper = mountDetails({ propsData: { detailData: details } });
    const detailContainers = wrapper.findAll('.smart-details--detail');
    const detailKeys = Object.keys(details);

    expect(detailContainers.length).toBe(detailKeys.length);

    const found = detailKeys.every((key) => {
      const result = detailContainers.wrappers.find((currentWrapper) => {
        const keyElement = currentWrapper.find('.smart-details--detailKey');
        const valueElement = currentWrapper.find('.smart-details--detailValue');

        let renderedValue = valueElement.text();

        if (renderedValue === '') {
          renderedValue = valueElement.find('input').element.checked;
        }

        return (
          keyElement.text().trim() === toTitleCase(key).trim()
          &&
          renderedDetails[key] === renderedValue
        );
      });

      return result != null;
    });

    expect(found).toBeTruthy();
  });

  it('', () => {

  });
});
