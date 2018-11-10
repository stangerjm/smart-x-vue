import { shallowMount } from '@vue/test-utils';

// eslint-disable-next-line
export function createWrapperGenerator(component) {
  return function wrapperGenerator(props) {
    return shallowMount(component, props);
  };
}
