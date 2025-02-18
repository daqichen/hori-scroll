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
    animationSpeed?: ANIMATION_SPEED_TYPE;
    blurredEdges?: boolean;
    enteringAnimationType?:
      | 'none'
      | 'scale'
      | 'translate-up'
      | 'translate-down';
    styles?: {
      background?: string;
      buttonBackground?: string;
      color?: string;
    };
  }

  export interface PropsWithOptions<TValue>
    extends Omit<PropsWithChildren, 'children'> {
    onClick?: (value: TValue, key: Key) => void;
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
