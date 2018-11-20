import { createComponentGenerator } from '../helpers';
import BlockTableHeading from '../../../src/components/block-tableHeading.vue';

function test() {}

const mountBlockTableHeading = createComponentGenerator(BlockTableHeading);

const tableHeadings = ['test', 'name', 'age', 'birthday', 'more'];

const unsearchableHeadings = ['test', 'more'];

const tableHeading = mountBlockTableHeading({
  tableHeadings,
  unsearchableHeadings,
  sortMethod: test,
  includeActionContainer: true,
});

const allHeadings = tableHeading.findAll('.smart-table--heading');

const headingsSansActions = allHeadings
  .wrappers
  .filter(heading => heading.text() !== 'Actions');

const sortableHeadings = allHeadings
  .wrappers
  .filter(heading => heading.find('.smart-table--link').exists());

describe('block-tableHeading.vue', () => {
  it('renders a heading for each table heading passed in', () => {
    expect(headingsSansActions.length).toEqual(tableHeadings.length);
  });

  it('renders each heading as a clickable sort button unless they are flagged to NOT be searchable', () => {
    headingsSansActions.every((heading, idx) => {
      const headingText = heading.text().trim().toLowerCase();
      const sortLink = heading.find('.smart-table--link');

      if (unsearchableHeadings.includes(headingText)) {
        expect(sortLink.exists()).toBeFalsy();
        expect(headingText).toEqual(tableHeadings[idx]);
        return true;
      }

      expect(sortLink.text().trim().toLowerCase()).toEqual(tableHeadings[idx]);
      return true;
    });
  });

  it('renders a heading for the action container if flagged to do so', () => {
    const findActionHeading = heading => heading.text() === 'Actions';
    const allTableHeadings = tableHeading.findAll('.smart-table--heading');
    const actionContainer = allTableHeadings.wrappers.find(findActionHeading);

    expect(actionContainer.exists()).toBeTruthy();

    const tableHeadingWithoutActions = mountBlockTableHeading({
      tableHeadings,
      unsearchableHeadings,
      sortMethod: test,
      includeActionContainer: false,
    });

    const allTableHeadingsWithoutActions = tableHeadingWithoutActions.findAll('.smart-table--heading');
    const missingActionContainer = allTableHeadingsWithoutActions.wrappers.find(findActionHeading);
    expect(missingActionContainer).toBeUndefined();
  });

  it('renders a tooltip for each sortable heading', () => {
    sortableHeadings.every((heading) => {
      const link = heading.find('.smart-table--link');

      expect(link.attributes('title')).not.toBeUndefined();
      return true;
    });
  });
});
