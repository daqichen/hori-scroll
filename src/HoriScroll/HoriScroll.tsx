import {
  ComponentProps,
  forwardRef,
  Key,
  ReactNode,
  Ref,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import './HoriScroll.css';
import { applyInitAnimation } from './animate';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HoriScroll {
  export interface ListItemProps<TValue>
    extends Omit<ComponentProps<'li'>, 'onClick' | 'value'> {
    onClick?: (value: TValue, key: Key) => void;
    value: TValue;
  }

  export interface PropsWithChildren<TValue>
    extends Omit<ComponentProps<'div'>, 'onClick'> {
    // horiScrollRef?: Ref<HTMLDivElement>;
    onClick?: (value: TValue, key: Key) => void;
    isClickable?: boolean;
  }

  export interface PropsWithOptions<TValue>
    extends Omit<PropsWithChildren<TValue>, 'children'> {
    options?: Array<
      | (TValue & Key)
      | (ListItemProps<TValue> & {
          key: Key;
        })
    >;
  }

  export interface Type {
    <TValue>(
      props: PropsWithChildren<TValue>,
      ref?: Ref<HTMLDivElement>,
    ): ReactNode;
    <TValue>(
      props: PropsWithOptions<TValue>,
      ref?: Ref<HTMLDivElement>,
    ): ReactNode;
  }
}

// Type guard to check if option is TValue
// const isTValue = <TValue,>(option: any): option is TValue => {
// // Implement the type guard based on your TValue structure
//   return 'specificProperty' in option; // Replace 'specificProperty' with an actual property of TValue
// };

const HoriScroll: HoriScroll.Type = forwardRef<
  HTMLDivElement,
  HoriScroll.PropsWithChildren<unknown> | HoriScroll.PropsWithOptions<unknown>
>(
  <TValue,>(
    props:
      | HoriScroll.PropsWithChildren<TValue>
      | HoriScroll.PropsWithOptions<TValue>,
    ref?: Ref<HTMLDivElement>,
  ) => {
    const { options, onClick, isClickable, className, ...baseProps } =
      props as HoriScroll.PropsWithOptions<TValue>;

    const horiscrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => applyInitAnimation(horiscrollRef?.current), []);

    const renderOptions = useMemo(
      () => (
        <>
          <ul
            className={
              'horiscroll-inner-list ' + (isClickable ? 'is-button' : '')
            }
          >
            {options?.map((option, ind) => {
              const key =
                (option as HoriScroll.ListItemProps<TValue>).key || ind;
              const value =
                (option as HoriScroll.ListItemProps<TValue>).value || option;
              return (
                <li
                  id={`hori__scroll__id__${ind}`}
                  key={`hori__scroll__key__${key}`}
                  aria-label={value as string}
                  onClick={() => onClick && onClick(value as TValue, key)}
                >
                  {value as string}
                </li>
              );
            })}
          </ul>
          <ul
            className={
              'horiscroll-inner-list ' + (isClickable ? 'is-button' : '')
            }
          >
            {options?.map((option, ind) => {
              const key =
                (option as HoriScroll.ListItemProps<TValue>).key || ind;
              const value =
                (option as HoriScroll.ListItemProps<TValue>).value || option;
              return (
                <li
                  id={`hori__scroll__id__${ind}-copy`}
                  key={`hori__scroll__key__${key}-copy`}
                  aria-label={value as string}
                  onClick={() => onClick && onClick(value as TValue, key)}
                >
                  {value as string}
                </li>
              );
            })}
          </ul>
        </>
      ),
      [options],
    );

    return (
      <div
        className={'horiscroll-animation-container ' + className}
        {...baseProps}
        ref={(ele) => {
          horiscrollRef.current = ele;
          if (typeof ref === 'function') {
            ref(ele);
          } else if (ref) {
            ref.current = ele;
          }
        }}
      >
        {options
          ? renderOptions
          : (props as HoriScroll.PropsWithChildren<TValue>).children}
      </div>
    );
  },
);

export { HoriScroll };

// export const check = () => {
//   return (
//     <HoriScroll options={[1, 2]} onClick={(value, key) => alert(`Clicked ${value} with key ${key}`)} />
//     //   <div></div>
//     // </HoriScrollInternal>
//   );
// };
