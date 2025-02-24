import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';
import React from 'react';
import './HoriScroll.stories.css';
import { FoodOptionsWithMicrosoftEmojis, SportsOptions } from './data';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'HoriScroll/Animation Variants',
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
    animationEnabled: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof HoriScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimationSpeedAndStyleVariant: Story = {
  render: () => (
    <>
      <h4>Translate Down & Slow Speed</h4>
      <HoriScroll
        options={FoodOptionsWithMicrosoftEmojis}
        styles={{
          background: '#717C89',
          buttonBackground: '#8AA2A9',
        }}
        enteringAnimationType="translate-down"
        animationSpeed="SLOW"
        isClickable
      />
      <h4>Scale Up & Medium Speed</h4>
      <HoriScroll
        options={SportsOptions}
        styles={{
          background: '#4D4861',
          buttonBackground: '#605770',
        }}
        enteringAnimationType="scale"
        animationSpeed="MEDIUM"
        isClickable
      />
      <h4>Translate Up & Fast Speed</h4>
      <HoriScroll
        options={FoodOptionsWithMicrosoftEmojis}
        styles={{
          background: '#E0E0E2',
          color: 'gray',
          buttonBackground: '#F4EDEA',
        }}
        enteringAnimationType="translate-up"
        animationSpeed="FAST"
        isClickable
      />
    </>
  ),
  play: ({ canvasElement }) => playFn(canvasElement, 'Steaming Bowl'),
};

const playFn = async (canvasElement: HTMLElement, match: string) => {
  const canvas = within(canvasElement);
  const listItem = canvas.getAllByText(match)[0] as HTMLElement;
  await userEvent.click(listItem);
};
