import { IWAI } from '@emotion/react';
import Style, { TDirection } from './List.style';
import { useMemo } from 'react';

interface IListRowProps<T> extends IWAI {
  index?: number;
  value?: T;
  onClick?: (state: T) => void;
}

export interface IListProps<T> extends IListRowProps<T> {
  data: T[];
  row?: React.ComponentType<IListRowProps<T>>;
  gap?: number;
  align?: TDirection;
  children?: React.ReactNode | ((props: IListRowProps<T>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>);
}

export function List<T>({ data, row, gap, align = 'vertical', children, onClick }: IListProps<T>) {
  const Row = useMemo(() => {
    return row;
  }, [row]);
  return (
    <Style.List>
      {Row &&
        data.map((val, idx) => (
          <Style.ListItem key={`list-row-${idx}`} gap={gap} align={align}>
            <Row onClick={onClick} index={idx + 1} value={val} />
          </Style.ListItem>
        ))}
      {typeof children === 'function'
        ? data?.map((val, idx) => (
            <Style.ListItem key={`list-row-${idx}`} gap={gap} align={align}>
              {children({
                index: idx + 1,
                value: val,
              })}
            </Style.ListItem>
          ))
        : children}
    </Style.List>
  );
}

export default List;
