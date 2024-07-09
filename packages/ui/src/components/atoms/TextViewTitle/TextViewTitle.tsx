import { ETextViewColor } from '@maidt-cntn/ui';
import { ITextViewStyle } from '../TextView/TextView.style';
import Style from './TextViewTitle.style';

interface ITextViewTitleProps extends ITextViewStyle {
  title: string;
  titleColor?: string;
}

export const TextViewTitle = ({ title, type = ETextViewColor.DEFAULT, icon, titleColor }: ITextViewTitleProps) => {
  return (
    <Style.Title type={type} icon={icon} titleColor={titleColor}>
      {title}
    </Style.Title>
  );
};

export default TextViewTitle;
