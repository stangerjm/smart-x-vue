import { mount } from '@vue/test-utils';
import BitPaging from '../../../src/components/bit-paging.vue';

describe('bit-paging.vue', () => {
  function getParentComponent({
    pageIdx = 0,
    testData = [
      { name: 'James' },
      { name: 'Jeremy' },
      { name: 'Kelli' },
    ],
  } = {}) {
    return {
      data() {
        return {
          testData,
          pageIdx,
        };
      },
      components: {
        BitPaging,
      },
      template: '<bit-paging v-model="pageIdx" :paged-data-length="Object.keys(testData).length"></bit-paging>',
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

  it('tracks the index of a list of data and starts at the index passed in', () => {
    const parentComponent = mount(getParentComponent({ testData: [] }));

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
