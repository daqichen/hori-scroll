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
} from '../utils/animate';
import { IconName } from '../material-icon-names';
import { updateIconRequest } from '../utils/icons';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HoriScroll {
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

// Type guard to check if option is TValue
// const isTValue = <TValue,>(option: any): option is TValue => {
// // Implement the type guard based on your TValue structure
//   return 'specificProperty' in option; // Replace 'specificProperty' with an actual property of TValue
// };

const HoriScroll: HoriScroll.Type = forwardRef<
  HTMLDivElement,
  HoriScroll.PropsWithChildren | HoriScroll.PropsWithOptions<unknown>
>(
  <TValue,>(
    props: HoriScroll.PropsWithChildren | HoriScroll.PropsWithOptions<TValue>,
    ref?: Ref<HTMLDivElement>,
  ) => {
    const {
      options,
      onClick,
      isClickable = false,
      blurredEdges = false,
      enteringAnimationType = 'none',
      animationSpeed = 'MEDIUM',
      className,
      ...baseProps
    } = props as HoriScroll.PropsWithOptions<TValue>;

    const horiscrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (horiscrollRef?.current) {
        horiscrollRef.current.scrollLeft = 0;
        if (baseProps.styles?.buttonBackground) {
          horiscrollRef.current.style.setProperty(
            '--horiscroll-li-button-surface',
            baseProps.styles.buttonBackground,
          );
        }
      }
      updateIconRequest();
    }, []);

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

    // const enteringAnimationCls = () =>

    const clsname = useMemo(
      () =>
        (isClickable ? 'is-button' : '') +
        ((): string => {
          switch (enteringAnimationType) {
            case 'none':
              return '';
            case 'scale':
              return ' with-scaling-entering-animation';
            case 'translate-down':
              return ' translate-down-entering-animation';
            case 'translate-up':
              return ' translate-up-entering-animation';
            default:
              return '';
          }
        })(),
      [isClickable, blurredEdges, enteringAnimationType],
    );

    const renderOptions = useMemo(
      () => (
        <>
          {['', '-copy', '-copy1', '-copy2', '-copy3'].map((obj) => (
            <ul className={'horiscroll-inner-list ' + clsname}>
              {options?.map((option, ind) => {
                const key =
                  (option as HoriScroll.ListItemProps<TValue>).key || ind;
                const value =
                  (option as HoriScroll.ListItemProps<TValue>).value || option;
                const icon =
                  (option as HoriScroll.ListItemProps<TValue>)
                    .materialIconName || null;
                return (
                  <li
                    id={`hori__scroll__id__${ind}${obj}`}
                    key={`hori__scroll__key__${key}${obj}`}
                    aria-label={value as string}
                    onClick={() =>
                      isClickable && onClick && onClick(value as TValue, key)
                    }
                  >
                    {icon ? (
                      <span className="horiscroll-material-symbols">
                        <span className="material-symbols-outlined">
                          {icon}
                        </span>
                        &nbsp;{value as string}
                      </span>
                    ) : (option as HoriScroll.ListItemProps<TValue>).icon ? (
                      <span className="horiscroll-material-symbols">
                        {(option as HoriScroll.ListItemProps<TValue>).icon}
                        &nbsp;{value as string}
                      </span>
                    ) : (
                      (value as string)
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </>
      ),
      [options],
    );

    const renderChildren = useMemo(
      () =>
        ['', '-copy', '-copy1', '-copy2', '-copy3'].map(() => (
          <div className={'horiscroll-inner-list ' + clsname}>
            {(props as HoriScroll.PropsWithChildren).children}
          </div>
        )),
      [(props as HoriScroll.PropsWithChildren).children],
    );

    return (
      <div style={{ display: 'grid' }}>
        <div
          className={
            'horiscroll-animation-container ' +
            (blurredEdges ? 'with-mask ' : '') +
            className
          }
          {...baseProps}
          style={{
            background: baseProps.styles?.background,
            color: baseProps.styles?.color,
            ...baseProps.style,
          }}
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
          {options ? renderOptions : renderChildren}
        </div>
      </div>
    );
  },
);

export { HoriScroll };
