import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';
import React from 'react';
import './HoriScroll.stories.css';

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
    animationSpeed: { control: 'select', options: ['SLOW', 'FAST', 'MEDIUM'] },
    enteringAnimationType: {
      control: 'select',
      options: ['none', 'scale', 'translate-up', 'translate-down'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof HoriScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PassingInChildrenPropsDemo: Story = {
  render: () => (
    <HoriScroll
      animationSpeed="FAST"
      enteringAnimationType="translate-down"
      blurredEdges
      className="storybook-company-logos"
    >
      <span>
        <span className="material-symbols-outlined">fastfood</span>
        &nbsp;Fastfood
      </span>
      <span>
        <span className="material-symbols-outlined">ramen_dining</span>
        &nbsp;Ramen Dining
      </span>
      <span>
        <span className="material-symbols-outlined">breakfast_dining</span>
        &nbsp;Breakfast dining
      </span>
      <span>
        <span className="material-symbols-outlined">grocery</span>&nbsp;Grocery
      </span>
      <span>
        <span className="material-symbols-outlined">tapas</span>&nbsp;Tapas
      </span>
      <span>
        <span className="material-symbols-outlined">set_meal</span>&nbsp;Set
        meal
      </span>
      <span>
        <span className="material-symbols-outlined">local_pizza</span>
        &nbsp;Local pizza
      </span>
      <span>
        <span className="material-symbols-outlined">kebab_dining</span>
        &nbsp;Kebab dining
      </span>
    </HoriScroll>
  ),
  play: ({ canvasElement }) => playFn(canvasElement, 'Kebab dining'),
};

export const Basic: Story = {
  args: {
    options: [1, 2, 3],
  },
  play: ({ canvasElement }) => playFn(canvasElement, '1'),
};

export const ClickableOptions: Story = {
  args: {
    options: ['hello', 'hi'],
    isClickable: true,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'hello'),
};

export const OptionsWithCustomKey: Story = {
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

export const AnimationAndBlurCustomization: Story = {
  args: {
    options: ['This', 'is', 'faster'],
    isClickable: true,
    animationSpeed: 'FAST',
    enteringAnimationType: 'translate-up',
    blurredEdges: true,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'faster'),
};

const playFn = async (canvasElement: HTMLElement, match: string) => {
  const canvas = within(canvasElement);
  const listItem = canvas.getAllByText(match)[0] as HTMLElement;
  await userEvent.click(listItem);
};
