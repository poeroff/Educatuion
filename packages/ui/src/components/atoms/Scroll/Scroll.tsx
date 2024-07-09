import { ReactNode, forwardRef, useEffect } from 'react';
import Style, { IScrollStyle } from './Scroll.style';

interface IScrollProps extends IScrollStyle {
  children?: ReactNode;
  tabIndex?: number;
  bodyId?: string;
}

export const Scroll = forwardRef<HTMLDivElement, IScrollProps>(({ tabIndex, useScroll = true, bodyId, children, ...rest }: IScrollProps, ref) => {
  return (
    <Style.Container tabIndex={tabIndex} useScroll={useScroll} id={bodyId} {...rest} ref={ref}>
      {children}
    </Style.Container>
  );
});

export default Scroll;
