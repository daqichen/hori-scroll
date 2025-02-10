import {
  ComponentProps,
  forwardRef,
  Key,
  ReactNode,
  Ref,
  useEffect,
  useMemo,
  useRef,
  // https://react.dev/reference/react/useImperativeHandle
  useImperativeHandle,
} from 'react';
import './HoriScroll.css';
import {
  ANIMATION_SPEED_DICT,
  ANIMATION_SPEED_TYPE,
  applyInitAnimation,
} from './animate';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HoriScroll {
  export interface ListItemProps<TValue>
    extends Omit<ComponentProps<'li'>, 'onClick' | 'value'> {
    onClick?: (value: TValue, key: Key) => void;
    value: TValue;
  }

  export interface PropsWithChildren<TValue>
    extends Omit<ComponentProps<'div'>, 'onClick'> {
    onClick?: (value: TValue, key: Key) => void;
    isClickable?: boolean;
    animationSpeed?: ANIMATION_SPEED_TYPE;
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
    const {
      options,
      onClick,
      isClickable = false,
      animationSpeed = 'MEDIUM',
      className,
      ...baseProps
    } = props as HoriScroll.PropsWithOptions<TValue>;

    const horiscrollRef = useRef<HTMLDivElement>(null);

    /**
    To access a ref while also forwarding it:

    Attach a ref created inside the component to the element
    Call the useImperativeHandle hook on the outer ref (which is being forwarded to) and pass a function that returns the current property of the inner ref, which is the value that will be set to the current property of the outer ref

    read more at https://stackoverflow.com/a/77055329/27329422

    @param of useImperativeHandle Hook:

    ref: The ref you received as a prop to the MyInput component.

    createHandle: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose. */
    useImperativeHandle(ref, () => horiscrollRef.current!, []);

    useEffect(
      () =>
        applyInitAnimation(
          horiscrollRef?.current,
          ANIMATION_SPEED_DICT[animationSpeed],
        ),
      [],
    );

    const renderOptions = useMemo(
      () => (
        <>
          <ul
            className={
              'horiscroll-inner-list ' +
              (isClickable ? 'is-button with-entering-animation' : '')
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
                  onClick={() =>
                    isClickable && onClick && onClick(value as TValue, key)
                  }
                >
                  {value as string}
                </li>
              );
            })}
          </ul>
          <ul
            className={
              'horiscroll-inner-list ' +
              (isClickable ? 'is-button with-entering-animation' : '')
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
                  onClick={() =>
                    isClickable && onClick && onClick(value as TValue, key)
                  }
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
        ref={
          horiscrollRef
          //   (ele) => {
          //   /**
          //       * The reason it works is that the ref prop accepts a callback, so you can execute whatever code you like when it triggers. Here, we're setting both the ref value (which we said can be a function, thus the if / else) and our innerRef.
          //       https://stackoverflow.com/a/76490038/27329422
          //       */
          //   horiscrollRef.current = ele;
          //   if (typeof ref === 'function') {
          //     ref(ele);
          //   } else if (ref) {
          //     ref.current = ele;
          //   }
          // }
        }
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
