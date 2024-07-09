import Style, { IStyleSvgIcon } from './SvgIcon.style';
import { useMemo } from 'react';

export enum ESvgType {
  IMG_BG = 'imgBg',
  IMG = 'img',
}

export interface ISvgIcon extends IStyleSvgIcon {
  type?: ESvgType;
  ariaHidden?: boolean;
  title?: string;
  src?: string;
  alt?: string;
  color?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export const SvgIcon: React.FC<ISvgIcon> = ({ src = '', alt = '', ariaHidden, size, style, type = ESvgType.IMG_BG, onClick, ...rest }) => {
  const img = useMemo(() => {
    switch (type) {
      case ESvgType.IMG:
        return <Style.StyledImg src={src} alt={alt} style={style} size={size} onClick={onClick} aria-hidden={ariaHidden} {...rest} />;
      default:
        return <Style.StyleImgBg backgroundSrc={src} style={style} size={size} onClick={onClick} {...rest} />;
    }
  }, [type, src]);
  return <>{img}</>;
};

export default SvgIcon;
