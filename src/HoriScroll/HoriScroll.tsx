import {
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useRef,
  // https://react.dev/reference/react/useImperativeHandle
  useImperativeHandle,
} from 'react';
import './HoriScroll.css';
import { Animation, ANIMATION_SPEED_DICT } from './utils/animate';
import { updateIconRequest } from './utils/icons';
import { HoriScrollClass } from './types/HoriScroll';

// Type guard to check if option is TValue
// const isTValue = <TValue,>(option: any): option is TValue => {
// // Implement the type guard based on your TValue structure
//   return 'specificProperty' in option; // Replace 'specificProperty' with an actual property of TValue
// };

const HoriScroll: HoriScrollClass.Type = forwardRef<
  HTMLDivElement,
  HoriScrollClass.PropsWithChildren | HoriScrollClass.PropsWithOptions<unknown>
>(
  <TValue,>(
    props:
      | HoriScrollClass.PropsWithChildren
      | HoriScrollClass.PropsWithOptions<TValue>,
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
    } = props as HoriScrollClass.PropsWithOptions<TValue>;

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

      const { init, destroy } = horiscrollRef.current
        ? Animation(horiscrollRef.current, ANIMATION_SPEED_DICT[animationSpeed])
        : { init: () => null, destroy: () => null };

      if (horiscrollRef.current) {
        init();
      }

      return () => {
        destroy();
      };
    }, []);

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
                  (option as HoriScrollClass.ListItemProps<TValue>).key || ind;
                const value =
                  (option as HoriScrollClass.ListItemProps<TValue>).value ||
                  option;
                const icon =
                  (option as HoriScrollClass.ListItemProps<TValue>)
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
                    ) : (option as HoriScrollClass.ListItemProps<TValue>)
                        .icon ? (
                      <span className="horiscroll-material-symbols">
                        {(option as HoriScrollClass.ListItemProps<TValue>).icon}
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
            {(props as HoriScrollClass.PropsWithChildren).children}
          </div>
        )),
      [(props as HoriScrollClass.PropsWithChildren).children],
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
