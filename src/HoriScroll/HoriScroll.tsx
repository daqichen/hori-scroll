import { ComponentProps, Key, ReactNode, Ref, useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace HoriScroll {
  export interface ListItemProps<TValue>
    extends Omit<ComponentProps<'li'>, 'onClick' | 'value'> {
    onClick?: (value: TValue, key: Key) => void;
    value: TValue;
  }

  export interface PropsWithChildren<TValue>
    extends Omit<ComponentProps<'div'>, 'onClick'> {
    horiScrollRef?: Ref<HTMLDivElement>;
    onClick?: (value: TValue, key: Key) => void;
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
    <TValue>(props: PropsWithChildren<TValue>): ReactNode;
    <TValue>(props: PropsWithOptions<TValue>): ReactNode;
  }
}

// Type guard to check if option is TValue
// const isTValue = <TValue,>(option: any): option is TValue => {
// // Implement the type guard based on your TValue structure
//   return 'specificProperty' in option; // Replace 'specificProperty' with an actual property of TValue
// };

const HoriScroll: HoriScroll.Type = <TValue,>(
  props:
    | HoriScroll.PropsWithChildren<TValue>
    | HoriScroll.PropsWithOptions<TValue>,
): ReactNode => {
  const { options, onClick, horiScrollRef, ...baseProps } =
    props as HoriScroll.PropsWithOptions<TValue>;

  const renderOptions = useMemo(
    () => (
      <ul>
        {options?.map((option, ind) => {
          // eslint-
          const key = (option as HoriScroll.ListItemProps<TValue>).key || ind;
          const value =
            (option as HoriScroll.ListItemProps<TValue>).value || option;
          return (
            <li
              id={`hori__scroll__id__${ind}`}
              key={key}
              onClick={() => onClick && onClick(value as TValue, key)}
            >
              {JSON.stringify(value)}
            </li>
          );
        })}
      </ul>
    ),
    [options],
  );

  return (
    <div {...baseProps} ref={horiScrollRef}>
      {options
        ? renderOptions
        : (props as HoriScroll.PropsWithChildren<TValue>).children}
    </div>
  );
};

export { HoriScroll };
