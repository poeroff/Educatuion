import { ReactNode, useRef } from 'react';
import { Tooltip, TooltipRefProps } from 'react-tooltip';
import Style from './Overlay.style';
import { IWAI } from '@emotion/react';

type PlacesType = 'top' | 'right' | 'bottom' | 'left';

export type TType = 'cloud' | 'normal';

export interface IOverlayTooltip extends IWAI {
  id?: string;
  type?: TType;
  place?: PlacesType;
  children?: ReactNode;
  openOnClick?: boolean;
  isShow?: boolean;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  isShadow?: boolean;
  borderRadius?: string;
  showClose?: boolean;
  fontSize?: string;
}

export const OverlayTooltip = ({
  id,
  type = 'normal',
  children,
  openOnClick,
  isShow,
  place = 'bottom',
  color,
  backgroundColor,
  isShadow = false,
  padding,
  borderRadius,
  showClose = false,
  fontSize,
}: IOverlayTooltip) => {
  const tooltipRef = useRef<TooltipRefProps>(null);

  const handleClick = () => {
    if (tooltipRef.current) {
      tooltipRef.current.close();
    }
  };

  return (
    <>
      {type === 'cloud' ? (
        <Style.CloudTooltip place={place}>{children}</Style.CloudTooltip>
      ) : (
        <Style.StyleDiv
          fontSize={fontSize}
          type={type}
          color={color}
          backgroundColor={backgroundColor}
          isShadow={isShadow}
          padding={padding}
          borderRadius={borderRadius}
        >
          <Tooltip
            {...(openOnClick && { openOnClick: true, clickable: true })}
            isOpen={isShow}
            id={id}
            place={place}
            className='style'
            ref={tooltipRef}
            clickable={true}
          >
            {showClose && (
              <Style.CloseBox>
                <Style.CloseButton onClick={handleClick}>닫기</Style.CloseButton>
              </Style.CloseBox>
            )}
            {children}
          </Tooltip>
        </Style.StyleDiv>
      )}
    </>
  );
};

export default OverlayTooltip;
