import { FC, Key } from 'react';
import { HoriScrollClass } from '../src/HoriScroll/types/HoriScroll';
import { ArgTypes } from '@storybook/react';
import { HoriScroll } from '../src/HoriScroll/HoriScroll';

export const argTypes: Partial<ArgTypes<typeof HoriScroll>> = {
  options: { control: 'object', description: 'Array of options to display in the horizontal scroll', table: { type: { summary: 'Array' } } },
  onClick: { action: 'clicked', control: false }, //{ type: 'function', control: false }
  animationSpeed: { 
    control: 'select', 
    options: ['SLOW', 'FAST', 'MEDIUM'], 
    description: 'Speed of the entering animation', 
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'MEDIUM' }
    }
  },
  enteringAnimationType: {
    control: 'select',
    options: ['none', 'scale', 'translate-up', 'translate-down'],
    description: 'Type of entering animation',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'none' },
    },
  },
  enteringAnimationDelay: {
    control: 'number',
    description: 'Delay before the entering animation starts',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 100 },
    },
  },
  styles: {
    control: 'object',
    description: 'Custom styles for the component',
    table: {
      type: {
        summary: 'object',
        detail: `
          background: string;
buttonBackground: string;
color: string;
gapBetweenElementsInPixels: number;
containerWidth: string;
        `,
      },
      defaultValue: {
        summary: '{ background: "#023047", color: "white", buttonBackground: "#415a77", gapBetweenElementsInPixels: 24, containerWidth: "80vw" }',
      },
    },
  },
  isClickable: { 
    control: 'boolean', 
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    description: 'Make the options clickable'
  },
  blurredEdges: { 
    control: 'boolean', 
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    description: 'Apply blurred edges effect to the component'
  },
  // This is a custom prop for the component, not a native HTML attribute
  animationEnabled: { 
    control: 'boolean', 
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    description: 'Enable or disable the auto-scroll animation' 
  },
};

export const SportsOptions = [
  {
    value: 'Hiking',
    key: 'hiking',
    materialIconName: 'hiking',
  },
  {
    value: 'Downhill skiing',
    key: 'downhill_skiing',
    materialIconName: 'downhill_skiing',
  },
  {
    value: 'Surfing',
    key: 'surfing',
    materialIconName: 'surfing',
  },
  {
    value: 'Skateboarding',
    key: 'skateboarding',
    materialIconName: 'skateboarding',
  },
  {
    value: 'Kayaking',
    key: 'kayaking',
    materialIconName: 'kayaking',
  },
];

export const FoodOptionsWithMicrosoftEmojis = [
  {
    value: 'Fried shrimp',
    key: 'fried_shrimp',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/fried-shrimp_1f364.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Green salad',
    key: 'green_salad',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/green-salad_1f957.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Shortcake',
    key: 'shortcake',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/shortcake_1f370.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Watermelon',
    key: 'watermelon',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/watermelon_1f349.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Popcorn',
    key: 'popcorn',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/popcorn_1f37f.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Falafel',
    key: 'falafel',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/falafel_1f9c6.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Pretzel',
    key: 'pretzel',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/pretzel_1f968.png"
        width="30"
        height="30"
      />
    ),
  },
  {
    value: 'Steaming Bowl',
    key: 'steaming-bowl',
    icon: (
      <img
        src="https://em-content.zobj.net/source/microsoft/407/steaming-bowl_1f35c.png"
        width="30"
        height="30"
      />
    ),
  },
];

export const ChildrenProp: FC = () => (
  <>
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
      <span className="material-symbols-outlined">grocery</span>
      &nbsp;Grocery
    </span>
    <span>
      <span className="material-symbols-outlined">tapas</span>&nbsp;Tapas
    </span>
    <span>
      <span className="material-symbols-outlined">set_meal</span>&nbsp;Set meal
    </span>
    <span>
      <span className="material-symbols-outlined">local_pizza</span>
      &nbsp;Local pizza
    </span>
    <span>
      <span className="material-symbols-outlined">kebab_dining</span>
      &nbsp;Kebab dining
    </span>
  </>
);

export const ChildrenPropExample2: FC = () => (
  <>
    {Array(3)
      .fill(null)
      .map(() => (
        <div
          style={{
            color: '#fafafa',
            width: '400px',
            whiteSpace: 'normal',
            margin: '1rem',
          }}
        >
          <h4>What is Lorem Ipsum?</h4>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            convallis, felis et sagittis luctus, purus nibh fermentum justo, at
            dictum diam erat congue justo. Praesent ut luctus enim. Phasellus
            maximus mollis nulla at interdum. Donec cursus lectus sit amet nisl
            rhoncus aliquet. Sed tellus metus, vestibulum ac elit id, laoreet
            blandit nisi. Nunc porta accumsan volutpat. Etiam posuere ultrices
            risus id sollicitudin. Nam pulvinar venenatis ipsum ac ullamcorper.
            Mauris nec sagittis ligula. Phasellus ac rhoncus arcu, id facilisis
            mi.
          </div>
        </div>
      ))}
  </>
);
