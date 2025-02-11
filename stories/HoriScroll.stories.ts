import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/HoriScroll',
  component: HoriScroll,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    options: { control: 'object' },
    onClick: { action: 'clicked', control: false }, //{ type: 'function', control: false }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof HoriScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: [1, 2, 3],
  },
  play: ({ canvasElement }) => playFn(canvasElement, '1'),
};

export const ClickableButtons: Story = {
  args: {
    options: ['hello', 'hi'],
    isClickable: true,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'hello'),
};

export const ClickableButtonsCustomKey: Story = {
  args: {
    options: [
      { value: 'Option 1 with key 10', key: '10' },
      { value: 'Option 2 with key 20', key: '20' },
      {
        value: 'Option 3 with key 30',
        key: '30',
      },
    ],
    isClickable: true,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'Option 1 with key 10'),
};

export const FastAnimationSpeedVariant: Story = {
  args: {
    options: ['This', 'is', 'faster'],
    isClickable: true,
    animationSpeed: 'FAST',
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'faster'),
};

export const SlowAnimationSpeedVariant: Story = {
  args: {
    options: ['This', 'is', 'slower'],
    isClickable: true,
    animationSpeed: 'SLOW',
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'slower'),
};

const playFn = async (canvasElement: HTMLElement, match: string) => {
  const canvas = within(canvasElement);
  const listItem = canvas.getAllByText(match)[0] as HTMLElement;
  await userEvent.click(listItem);
};
