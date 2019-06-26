import { createComponentGenerator } from '../helpers';
import BlockMessages from '../../../src/components/block-messages.vue';
import BitMessage from '../../../src/components/bit-message.vue';

function sleep(ms) {
  if (typeof ms !== 'number') return Promise.resolve();

  return new Promise(resolve => setTimeout(resolve, ms));
}

const mountBlockMessages = createComponentGenerator(BlockMessages);

const messageList = ['Hello', 'Goodbye', 'Test', 'Welcome'];

const blockMessages = mountBlockMessages({
  messages: messageList,
});

describe('block-messages.vue', () => {
  it('displays a list of error messages passed in', () => {
    const messages = blockMessages.findAll('.block-messages--message');

    expect(messages.length).toEqual(4);

    messages.wrappers.map((message, idx) => expect(message.text()).toEqual(messageList[idx]));
  });

  it('does not display if no messages passed in', () => {
    const messageListWithNoMessages = mountBlockMessages({
      messages: [],
    });

    const messages = messageListWithNoMessages.findAll('.block-messages--message');

    expect(messages.length).toEqual(0);
  });

  it('allows a message type to be set, which will determine how the message will look', () => {
    const errorMessageList = mountBlockMessages({
      messages: messageList,
      messageType: 'error',
    });

    const firstMessage = errorMessageList.find(BitMessage);

    expect(firstMessage.props('messageType')).toEqual('error');
  });

  it('renders messages as warning messages by default', () => {
    const firstMessage = blockMessages.find(BitMessage);

    expect(firstMessage.props('messageType')).toEqual('warning');
  });

  it('renders messaged passed in after initial mount', () => {
    const newMessages = ['There was a problem', 'Something did not go right', 'Uh oh'];

    blockMessages.setProps({
      messages: newMessages,
    });

    const messages = blockMessages.findAll('.block-messages--message');

    expect(messages.length).toEqual(3);

    messages.wrappers.map((message, idx) => expect(message.text()).toEqual(newMessages[idx]));
  });

  it('allows messages to be left-aligned', () => {
    const leftAlignedMessages = mountBlockMessages({
      messages: messageList,
      alignLeft: true,
    });

    const alignedMessages = leftAlignedMessages.findAll('.block-messages--message.block-messages--alignedMessage');

    expect(alignedMessages.length).toEqual(messageList.length);
  });

  it('allows a timeout to be set which will clear the messages', async () => {
    // jest.setTimeout(5000);
    const timeout = 1;
    const messagesWithTimeout = mountBlockMessages({
      messages: messageList,
      messageTimeout: timeout,
    });

    const messageNodes = messagesWithTimeout.findAll(BitMessage);

    expect(messageNodes.length).toEqual(messageList.length);

    // Wait an extra second for messages to disappear
    await sleep((timeout * 1000) + 1000);

    const messageNodesAfterTimeout = messagesWithTimeout.findAll(BitMessage);

    expect(messageNodesAfterTimeout.length).toEqual(0);
  });
});
