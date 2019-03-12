import { createComponentGenerator } from '../helpers';
import BitTableCell from '../../../src/components/bit-tableCell.vue';

function getBitTableCell({
  cellValue = {
    type: 'String',
    typeConstructor: String,
    value: 'Test',
    errored: false,
  },
  cellTitle = 'Test',
  isTableKey = true,
} = {}) {
  const componentGenerator = createComponentGenerator(BitTableCell);
  return componentGenerator({
    cellValue,
    cellTitle,
    isTableKey,
  });
}

const alphabeticValue = 'Test';
const alphabeticTableCell = getBitTableCell({
  cellValue: {
    type: 'String',
    typeConstructor: String,
    value: alphabeticValue,
    errored: false,
  },
});

const numericValue = 10;
const numericTableCell = getBitTableCell({
  cellValue: {
    type: 'Number',
    typeConstructor: Number,
    value: numericValue,
    errored: false,
  },
});

const binaryValue = true;
const binaryTableCell = getBitTableCell({
  cellValue: {
    type: 'Boolean',
    typeConstructor: Boolean,
    value: binaryValue,
    errored: false,
  },
});

const dateValue = new Date('01/01/2001');
const dateTableCell = getBitTableCell({
  cellValue: {
    type: 'Date',
    typeConstructor: Date,
    value: dateValue,
    errored: false,
  },
});

describe('bit-tableCell.vue', () => {
  it('allows the cell to be flagged as a table key', () => {
    const keyTableCell = getBitTableCell({ isTableKey: true });
    expect(keyTableCell.classes()).toContain('smart-table--key');

    const normalTableCell = getBitTableCell({ isTableKey: false });
    expect(normalTableCell.classes()).not.toContain('smart-table--key');
  });

  it('centers the cell if cellValue is a number or a boolean', () => {
    expect(numericTableCell.classes()).toContain('smart-table--centeredCell');

    expect(binaryTableCell.classes()).toContain('smart-table--centeredCell');

    expect(alphabeticTableCell.classes()).not.toContain('smart-table--centeredCell');
  });

  it('renders an inline title in the cell', () => {
    const cellTitle = 'This is a test';
    const tableCell = getBitTableCell({ cellTitle });
    const inlineTitle = tableCell.find('.smart-table--inlineHeading');

    expect(inlineTitle.text()).toEqual(`${cellTitle}:`);
  });

  it('renders a checkbox in the cell if cellValue is a boolean', () => {
    const checkbox = binaryTableCell.find('input');

    expect(checkbox.exists()).toBeTruthy();
    expect(checkbox.element.checked).toEqual(binaryValue);
  });

  it('renders a formatted date in the cell if cellValue is a date', () => {
    expect(dateTableCell.text()).toContain('01/01/2001');
  });

  it('renders text in the cell if cellValue is not a boolean, date, or object', () => {
    expect(alphabeticTableCell.text()).toContain(alphabeticValue);
  });
});
