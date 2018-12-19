import { mount } from '@vue/test-utils';

export function createWrapperGenerator(component) {
  return function wrapperGenerator(props) {
    return mount(component, props);
  };
}

export function createComponentGenerator(component, options = {}) {
  const wrapperGenerator = createWrapperGenerator(component);
  return function componentGenerator(props) {
    return wrapperGenerator({
      propsData: props,
      ...options,
    });
  };
}

export function delay(time, value) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, value), time);
  });
}

export function findByElementName(nameValue) {
  return function findByName(input) {
    const {
      vm: {
        $el = null,
      } = {},
    } = input;

    if ($el == null) {
      return null;
    }

    return $el.getAttribute('name') === nameValue;
  };
}
