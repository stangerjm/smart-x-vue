import { createWrapperGenerator } from '../helpers';
import BitMessage from '../../../src/components/bit-message.vue';

const mountBitMessage = createWrapperGenerator(BitMessage);
const messageText = 'This is a test';

describe('bit-message.vue', () => {
  it('renders a text element with a message passed in', () => {
    const wrapper = mountBitMessage({
      propsData: {
        messageType: 'success',
        messageText,
      },
    });

    expect(wrapper.text()).toEqual(messageText);
  });

  it('allows a message style to be passed in, rendering the message with a class based off of the style passed in', () => {
    ['notice', 'error', 'warning', 'success']
      .every((style) => {
        const wrapper = mountBitMessage({
          propsData: {
            messageType: style,
            messageText,
          },
        });

        expect(wrapper.classes()).toContain(`bit-message-${style}`);
        return true;
      });
  });
});
