import { shallowMount } from '@vue/test-utils';

export function createWrapperGenerator(component) {
  return function wrapperGenerator(props) {
    return shallowMount(component, props);
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
