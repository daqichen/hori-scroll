import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';
import React from 'react';
import './HoriScroll.stories.css';
import {
  argTypes,
  ChildrenProp,
  ChildrenPropExample2,
  FoodOptionsWithMicrosoftEmojis,
} from './data';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'HoriScroll/Basic',
  component: HoriScroll,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: argTypes,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof HoriScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PassingInChildren: Story = {
  render: () => (
    <div>
      <HoriScroll
        animationSpeed="MEDIUM"
        enteringAnimationType="translate-down"
        blurredEdges
        className="storybook-company-logos"
        styles={{
          background: '#f7f7f9',
        }}
      >
        <ChildrenProp />
      </HoriScroll>
    </div>
  ),

  play: ({ canvasElement }) => playFn(canvasElement, 'Kebab dining'),
};

export const PassingInChildren_Paragraph: Story = {
  render: () => (
    <div>
      <HoriScroll
        animationSpeed="MEDIUM"
        enteringAnimationType="translate-down"
        // blurredEdges
        className="storybook-company-logos"
        styles={{ background: '#454955' }}
      >
        <ChildrenPropExample2 />
      </HoriScroll>
    </div>
  ),
  play: ({ canvasElement }) => playFn(canvasElement, 'What is Lorem Ipsum?'),
};

export const PassingInOptionsArray_FoodEmojis: Story = {
  args: {
    options: FoodOptionsWithMicrosoftEmojis,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'Steaming Bowl'),
};

export const AnimationDisabled: Story = {
  args: {
    options: FoodOptionsWithMicrosoftEmojis,
    animationEnabled: false,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'Steaming Bowl'),
};

export const PassingInOptionsArray_ClickableFoodEmojis: Story = {
  args: {
    options: FoodOptionsWithMicrosoftEmojis,
    isClickable: true,
  },
  play: ({ canvasElement }) => playFn(canvasElement, 'Steaming Bowl'),
};

const playFn = async (canvasElement: HTMLElement, match: string) => {
  const canvas = within(canvasElement);
  const listItem = canvas.getAllByText(match)[0] as HTMLElement;
  await userEvent.click(listItem);
};
