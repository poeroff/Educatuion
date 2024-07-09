import { ReactNode } from 'react';
import Style, { ITextViewStyle, TAlign } from './TextView.style';
import { ETextViewColor } from '@maidt-cntn/ui';
import TextViewTitle from '../TextViewTitle/TextViewTitle';

interface ITextViewProps extends ITextViewStyle {
  title: string;
  children: ReactNode;
  height?: string;
  vAlign?: TAlign;
  hAlign?: TAlign;
  padding?: string;
  themeColor?: string;
}

export const TextView = ({
  title,
  children,
  height = '100%',
  type = ETextViewColor.DEFAULT,
  isBorder = true,
  icon,
  vAlign = 'center',
  hAlign = 'center',
  padding,
  themeColor,
}: ITextViewProps) => {
  return (
    <Style.Container isBorder={isBorder} height={height} type={type} padding={padding} borderColor={themeColor}>
      <Style.TextViewTitleWrap type={type}>
        <TextViewTitle title={title} icon={icon} type={type} titleColor={themeColor} />
      </Style.TextViewTitleWrap>
      <Style.Content vAlign={vAlign} hAlign={hAlign}>
        {children}
      </Style.Content>
    </Style.Container>
  );
};

export default TextView;
