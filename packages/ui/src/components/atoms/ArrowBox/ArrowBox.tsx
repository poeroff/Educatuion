import Style, { TArrowType } from './ArrowBox.style';

interface IArrowBox {
  type?: 'left' | 'right' | 'both' | 'none';
  direction?: 'up' | 'down';
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  rotate?: number;
  arrowColor?: string;
  arrowWeight?: number;
  centerContent?: React.ReactNode;
  leftArrow?: {
    size?: number;
    useTail?: boolean;
    tailType?: TArrowType;
  };
  rightArrow?: {
    size?: number;
    useTail?: boolean;
    tailType?: TArrowType;
  };
  children?: React.ReactNode;
}

const ArrowBoxChild = ({ width, height, leftArrow, rightArrow, centerContent, x, y, direction, children, ...rest }: IArrowBox) => {
  return (
    <Style.ArrowWrap width={width} height={height} left={x} top={y} direction={direction}>
      <Style.ArrowLeft height={height} size={leftArrow?.size || 7} {...leftArrow} {...rest} />
      <Style.ArrowCenter height={height} {...rest}>
        <Style.ArrowCenterText direction={direction}>{centerContent}</Style.ArrowCenterText>
      </Style.ArrowCenter>
      <Style.ArrowRight height={height} size={rightArrow?.size || 7} useTail={rightArrow?.useTail} tailType={rightArrow?.tailType} {...rest} />
    </Style.ArrowWrap>
  );
};

export const ArrowBox = ({ type = 'none', width = 100, height = 50, rotate, x, y, leftArrow, children, ...rest }: IArrowBox) => {
  return (
    <>
      {(type === 'both' && (
        <Style.Wrap>
          {children}
          <ArrowBoxChild width={width} height={height} leftArrow={leftArrow} x={x} y={y} {...rest} />
        </Style.Wrap>
      )) || (
        <Style.ArrowSingleWrap width={width} height={height} left={x} top={y} rotate={rotate}>
          <Style.ArrowLeft height={height} size={leftArrow?.size || 7} {...leftArrow} {...rest} />
        </Style.ArrowSingleWrap>
      )}
    </>
  );
};
