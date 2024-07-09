import { useEffect, useMemo, useState } from 'react';
import Style from './DotIndicator.style';
import { IWAI } from '@emotion/react';
export interface IDotIndicatorProps extends IWAI {
  length?: number;
  activeNumber?: number;
  onClick?: (activeNumber: number) => void;
  color?: string;
}

export const DotIndicator: React.FC<IDotIndicatorProps> = ({ length = 0, activeNumber = 0, onClick, color, ...rest }) => {
  const [active, setActive] = useState(activeNumber);

  const dots = useMemo(() => {
    const list = [];
    for (let index = 0; index < length; index++) {
      const element = (
        <Style.Dot
          key={`DotIndicator-${index}`}
          color={color}
          active={index === active}
          aria-label={`${index + 1} 페이지`}
          onClick={() => {
            onClick?.(index);
          }}
          {...rest}
        />
      );
      list.push(element);
    }
    return list;
  }, [active, length]);

  useEffect(() => {
    setActive(activeNumber);
  }, [activeNumber]);
  return <Style.Container>{dots}</Style.Container>;
};

export default DotIndicator;
