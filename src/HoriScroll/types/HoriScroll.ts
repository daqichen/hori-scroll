import { ComponentProps, Key, ReactNode, Ref } from 'react';
import './HoriScroll.css';
import { ANIMATION_SPEED_TYPE } from '../utils/animate';
import { IconName } from './material-icon-names';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HoriScrollClass {
  export interface ListItemProps<TValue>
    extends Omit<ComponentProps<'li'>, 'onClick' | 'value'> {
    onClick?: (value: TValue, key: Key) => void;
    value: TValue;
    materialIconName?: IconName | string;
    icon?: ReactNode;
  }

  export interface PropsWithChildren
    extends Omit<ComponentProps<'div'>, 'onClick'> {
    /**
     * @prop `animationEnabled` -- auto-scroll animation applied?
     * @default true
     */
    animationEnabled?: boolean;
    /**
     * @prop `animationSpeed` -- the speed of auto-scroll animation
     * @default "MEDIUM"
     */
    animationSpeed?: ANIMATION_SPEED_TYPE;
    /**
     * @prop `blurredEdges` -- blurred edge effect applied?
     * @default false
     */
    blurredEdges?: boolean;
    /**
     * @prop `enteringAnimationType` -- type of entering effect
     * @default "none"
     */
    enteringAnimationType?:
      | 'none'
      | 'scale'
      | 'translate-up'
      | 'translate-down';
    /**
     * @prop `styles` -- different from `style` which is the native prop on HTML elements, `styles` are a set of tokens specifically set to be customizable internally
     */
    styles?: {
      background?: string;
      buttonBackground?: string;
      color?: string;
      gapBetweenElementsInPixels?: number;
    };
  }

  export interface PropsWithOptions<TValue>
    extends Omit<PropsWithChildren, 'children'> {
    onClick?: (value: TValue, key: Key) => void;
    /**
     * @prop `isClickable` -- options should be clickable? when `true`, the options will appear as buttons
     * @default false
     */
    isClickable?: boolean;
    options?: Array<
      | (TValue & Key)
      | (ListItemProps<TValue> & {
          key: Key;
        })
    >;
  }

  export interface Type {
    (props: PropsWithChildren, ref?: Ref<HTMLDivElement>): ReactNode;
    <TValue>(
      props: PropsWithOptions<TValue>,
      ref?: Ref<HTMLDivElement>,
    ): ReactNode;
  }
}
