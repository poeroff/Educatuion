import { useMemo, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';
import { IWAI } from '@emotion/react';
import Style, { IStyleImage } from './Image.style';

export enum EImageType {
  IMG_BG = 'imgBg',
  IMG = 'img',
}
export interface IImage extends IStyleImage, IWAI {
  src?: string;
  role?: string;
  size?: string;
  color?: string;
  draggable?: boolean;
  style?: React.CSSProperties;
  type?: EImageType;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  isUrl?: boolean; // 이미지 경로가 cdn이 아닌 url일 경우 true
}

export const Image: React.FC<IImage> = ({
  src = '',
  alt,
  role = 'img',
  ariaHidden,
  style,
  type = EImageType.IMG,
  onClick,
  draggable = false,
  children,
  isUrl = false,
  ...rest
}) => {
  const prefix = import.meta.env.VITE_CDN_PATH;
  const [imageSrcHref, setImageSrcHref] = useState<string>('');
  const [{ accessToken }] = useRecoilState(tokenAtom);

  useEffect(() => {
    if (isUrl) {
      setImageSrcHref(src);
      return;
    }
    if (accessToken) {
      setImageSrcHref(getFileFromCDNWithToken(prefix + src, accessToken));
      return;
    }
    setImageSrcHref(prefix + src);
  }, [accessToken, src, isUrl]);

  const img = useMemo(() => {
    switch (type) {
      case EImageType.IMG:
        return (
          <>
            {imageSrcHref ? (
              <Style.StyledImg
                src={imageSrcHref}
                alt={alt}
                aria-hidden={ariaHidden}
                style={style}
                onClick={onClick}
                draggable={draggable}
                {...rest}
              />
            ) : (
              <Style.EmptyBox size={rest?.size} width={rest?.width} height={rest?.height} />
            )}
          </>
        );

      default:
        return (
          <Style.StyleImgBg backgroundSrc={imageSrcHref} aria-label={alt} role={role} style={style} onClick={onClick} draggable={draggable} {...rest}>
            {children}
          </Style.StyleImgBg>
        );
    }
  }, [type, imageSrcHref, children, alt]);

  return img;
};
export default Image;
