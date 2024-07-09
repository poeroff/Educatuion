import { useMemo } from 'react';
import Style, { IStyleMainTitleHeaderProps } from './MainTitleHeader.style';
import { LargeIconType, THeaderLargeIconTypes } from '@maidt-cntn/ui';

export interface IMainTitleHeaderProps extends IStyleMainTitleHeaderProps {
  title?: React.ReactNode;
  titleColor?: string;
  iconType?: THeaderLargeIconTypes;
  altType?: 'aim' | 'preview' | 'review';
  number?: number;
  useExtend?: boolean;
}

export const MainTitleHeader = ({ pattern, title, titleColor, iconType, number, altType, useExtend }: IMainTitleHeaderProps) => {
  const alt = useMemo(() => {
    switch (altType) {
      case 'aim':
        return '학습목표';
      case 'preview':
        return '배울내용';
      case 'review':
        return '배운내용';
      default:
        return '';
    }
  }, [altType]);

  switch (pattern) {
    case 'number':
      return (
        <Style.MainTitleHeaderContainer titleColor={titleColor}>
          <Style.NumberCircle>
            <span>{number ?? 1}</span>
          </Style.NumberCircle>
          {title && <Style.Title pattern={'number'}>{title}</Style.Title>}
        </Style.MainTitleHeaderContainer>
      );
    case 'icon':
      return (
        <Style.MainTitleHeaderContainer titleColor={titleColor} useExtend={useExtend}>
          {iconType && <img src={LargeIconType[iconType]} alt={''} />}
          {title && <Style.Title pattern={'icon'}>{title}</Style.Title>}
        </Style.MainTitleHeaderContainer>
      );
    default:
      return (
        <Style.MainTitleHeaderContainer titleColor={titleColor}>
          <Style.Title pattern={'text'}>{title}</Style.Title>
        </Style.MainTitleHeaderContainer>
      );
  }
};

export default MainTitleHeader;
