import { IWAI } from '@emotion/react';
import Style, { IBoxStyle, TBoxBg, TBoxType } from './Box.style';
import { CSSProperties } from 'react';
import { Property } from 'csstype';

interface IBoxProps extends React.PropsWithChildren<IBoxStyle & IWAI & CSSProperties> {
  children?: React.ReactNode;
  useFull?: boolean;
  boxGap?: number;
}

export interface IBoxItemProps extends IBoxProps {
  id?: string;
  useRound?: boolean;
  background?: TBoxBg;
  hAlign?: Property.AlignContent;
  vAlign?: Property.AlignContent;
  useShadow?: boolean;
  onClick?: () => void;
  backgroundImg?: string;
  type?: TBoxType;
}

export const BoxWrap = ({ children, tabIndex, title, useFull, boxGap = 24, ...rest }: IBoxProps) => {
  const props = {
    tabIndex,
    title,
    useFull,
    boxGap,
  };
  return (
    <Style.BoxWrap style={rest} {...props}>
      {children}
    </Style.BoxWrap>
  );
};

export const Box = ({
  id,
  tabIndex,
  title,
  useFull,
  useRound = false,
  useShadow = false,
  background,
  type,
  hAlign,
  vAlign,
  onClick,
  backgroundImg,
  children,
  ...rest
}: IBoxItemProps) => {
  const props = {
    id,
    tabIndex,
    title,
    useFull,
    useRound,
    useShadow,
    background,
    type,
    hAlign,
    vAlign,
    backgroundImg,
  };

  if (type === 'hidden') {
    return <Style.HiddenBox id={id}>{children}</Style.HiddenBox>;
  }

  return (
    <Style.Box style={rest} onClick={() => onClick?.()} {...props}>
      {children}
    </Style.Box>
  );
};

export default BoxWrap;
