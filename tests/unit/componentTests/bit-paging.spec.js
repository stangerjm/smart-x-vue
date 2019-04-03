import { mount } from '@vue/test-utils';
import BitPaging from '../../../src/components/bit-paging.vue';

describe('bit-paging.vue', () => {
  function getParentComponent({
    pageIdx = 0,
    dataLength = 3,
  } = {}) {
    return {
      data() {
        return {
          dataLength,
          pageIdx,
        };
      },
      components: {
        BitPaging,
      },
      template: '<bit-paging v-model="pageIdx" :paged-data-length="dataLength"></bit-paging>',
    };
  }

  const parent = mount(getParentComponent());

  const wrapper = parent.find(BitPaging);
  const previousButton = wrapper.find('.bit-paging--previous');
  const nextButton = wrapper.find('.bit-paging--next');
  const currentPageNav = wrapper.find('.bit-paging--nav');

  function indexShouldBe(number) {
    const pageNumberElement = wrapper.find('.bit-paging--pageNumber.bit-paging--selectedPage');
    const pageNumber = number + 1;

    expect(parent.vm.pageIdx).toEqual(number);
    expect(currentPageNav.text()).toEqual(`Page ${pageNumber} of ${wrapper.props('pagedDataLength')}`);
    expect(pageNumberElement.text()).toEqual(String(pageNumber));
  }

  it('renders the first and last page numbers with an offset of two pages on either side of the current page and ellipsis for implied pages', () => {
    function extractPageNumbers(pageNumberWrapper) {
      return pageNumberWrapper.element.textContent.trim();
    }

    function getPageNumbersFromPagingEl(pageNumber, dataLength) {
      const pageIdx = pageNumber - 1;

      const paging = mount(getParentComponent({
        pageIdx,
        dataLength,
      }));

      return paging.findAll('.bit-paging--pageNumber').wrappers.map(extractPageNumbers);
    }

    const middleSelectedPageNumbers = getPageNumbersFromPagingEl(10, 50);
    expect(middleSelectedPageNumbers).toEqual(['1', '...', '8', '9', '10', '11', '12', '...', '50']);

    const endSelectedPageNumbers = getPageNumbersFromPagingEl(50, 50);
    expect(endSelectedPageNumbers).toEqual(['1', '...', '48', '49', '50']);

    const secondFromEndPageNumbers = getPageNumbersFromPagingEl(49, 50);
    expect(secondFromEndPageNumbers).toEqual(['1', '...', '47', '48', '49', '50']);

    const closeToEndPageNumbers = getPageNumbersFromPagingEl(45, 50);
    expect(closeToEndPageNumbers).toEqual(['1', '...', '43', '44', '45', '46', '47', '...', '50']);

    const closeToBeginningPageNumbers = getPageNumbersFromPagingEl(6, 50);
    expect(closeToBeginningPageNumbers).toEqual(['1', '...', '4', '5', '6', '7', '8', '...', '50']);

    const fifthFromBeginning = getPageNumbersFromPagingEl(5, 50);
    expect(fifthFromBeginning).toEqual(['1', '...', '3', '4', '5', '6', '7', '...', '50']);

    const fourthFromBeginning = getPageNumbersFromPagingEl(4, 50);
    expect(fourthFromBeginning).toEqual(['1', '2', '3', '4', '5', '6', '...', '50']);

    const thirdFromBeginning = getPageNumbersFromPagingEl(3, 50);
    expect(thirdFromBeginning).toEqual(['1', '2', '3', '4', '5', '...', '50']);

    const secondFromBeginning = getPageNumbersFromPagingEl(2, 50);
    expect(secondFromBeginning).toEqual(['1', '2', '3', '4', '...', '50']);

    const beginningPageNumbers = getPageNumbersFromPagingEl(1, 50);
    expect(beginningPageNumbers).toEqual(['1', '2', '3', '...', '50']);
  });

  it('tracks the index of a list of data and starts at the index passed in', () => {
    const parentComponent = mount(getParentComponent({ dataLength: 0 }));

    const pagingWrapper = parentComponent.find('.bit-paging');
    expect(pagingWrapper.exists()).toBeFalsy();
  });

  it('will not render if the pagedDataLength property is below 1', () => {
    indexShouldBe(0);
  });

  it('allows the next index to be accessed and emitted back up by pressing the next button, but will not allow the index to exceed the length of the data', () => {
    nextButton.trigger('click');
    indexShouldBe(1);

    nextButton.trigger('click');
    indexShouldBe(2);

    nextButton.trigger('click');
    indexShouldBe(2);
  });

  it('allows the previous index to be accessed and emitted back up by pressing the previous button, but will not allow the index to drop below zero', () => {
    previousButton.trigger('click');
    indexShouldBe(1);

    previousButton.trigger('click');
    indexShouldBe(0);

    previousButton.trigger('click');
    indexShouldBe(0);
  });

  it('allows the index to be changed by clicking on the desired page number, which also emits the index back to the parent', () => {
    const pageNumberButtons = wrapper.findAll('.bit-paging--pageNumber');

    pageNumberButtons.wrappers.every((pageButton, idx) => {
      pageButton.trigger('click');
      indexShouldBe(idx);
      return true;
    });
  });

  it('corrects the index passed in if it is out of bounds and emits valid index back to parent WHEN A BUTTON IS CLICKED', () => {
    const parentWithHighStartingIndex = mount(getParentComponent({ pageIdx: 10 }));

    const pagingWrapper = parentWithHighStartingIndex.find('.bit-paging');
    const previousBtn = pagingWrapper.find('.bit-paging--previous');

    previousBtn.trigger('click');
    expect(parentWithHighStartingIndex.vm.pageIdx).toEqual(2);
  });

  it('corrects the index passed in if it is below zero and emits valid index back to parent WHEN A BUTTON IS CLICKED', () => {
    const parentWithLowStartingIndex = mount(getParentComponent({ pageIdx: -10 }));

    const pagingWrapper = parentWithLowStartingIndex.find('.bit-paging');
    const nextBtn = pagingWrapper.find('.bit-paging--next');

    nextBtn.trigger('click');
    expect(parentWithLowStartingIndex.vm.pageIdx).toEqual(0);
  });
});
