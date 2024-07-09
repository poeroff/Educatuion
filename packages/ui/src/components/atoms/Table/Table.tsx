import { tables } from '../../../styles/tokens';
import { EStyleFontSizes, EStyleTableTypes, TStyleHorizontalAlign, TStyleVerticalAlign } from '../../../styles/types';
import Style, { TBgColors } from './Table.style';
import incorrect_mark from '../../../assets/incorrect_mark.svg';
import { MathExpression } from '../../math/MathExpression/MathExpression';

export type TScope = 'row' | 'col';

export interface ITable {
  width?: number;
  marginTop?: number;
  marginLeft?: number;
  color?: EStyleTableTypes;
  bgColors?: TBgColors[];
  useHover?: boolean;
  sizes?: string[];
  fontSize?: EStyleFontSizes;
  useMathBorder?: boolean;
  caption?: React.ReactNode;
  children?: React.ReactNode;
}
export interface ITd {
  scope?: TScope;
  width?: string;
  height?: string;
  color?: EStyleTableTypes;
  fontColor?: string;
  hAlign?: TStyleHorizontalAlign;
  vAlign?: TStyleVerticalAlign;
  colSpan?: number;
  rowSpan?: number;
  bgColor?: string;
  required?: boolean;
  hiddenLabel?: React.ReactNode;
  isMathCheck?: boolean;
  children?: React.ReactNode;
}
export interface ITh extends ITd {
  scope: TScope;
}

export interface ICaption {
  hidden?: boolean;
  caption?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IMathCaption extends ICaption {
  math: string[];
}

export const TableCaption: React.FC<ICaption> = ({ hidden, caption = '', children }) => {
  return (
    <Style.Caption hidden={hidden}>
      {caption}
      {children}
    </Style.Caption>
  );
};

export const TableMathCaption: React.FC<IMathCaption> = ({ hidden, caption = '', math, children }) => {
  return (
    <TableCaption hidden={hidden} caption={caption}>
      <MathExpression equation={math.join(' ')} />
      {children}
    </TableCaption>
  );
};

export const THead: React.FC<{ hidden?: boolean; children?: React.ReactNode }> = ({ hidden, children }) => {
  return <Style.THead hidden={hidden}>{children}</Style.THead>;
};
export const TBody: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Style.TBody>{children}</Style.TBody>;
};
export const TFoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Style.TFooter>{children}</Style.TFooter>;
};
export const TSummary: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Style.TBody>
      <Style.Summary>{children}</Style.Summary>
    </Style.TBody>
  );
};
export const TR: React.FC<{
  children?: React.ReactNode;
  isActive?: boolean;
  isMathSolution?: boolean;
  isDivideExp?: boolean;
  isDivideExpLine?: boolean;
  divideExpGap?: number;
  height?: number;
}> = ({ children, isActive, isMathSolution, isDivideExp, isDivideExpLine, divideExpGap, height }) => {
  return (
    <Style.TR
      isActive={isActive}
      isMathSolution={isMathSolution}
      isDivideExp={isDivideExp}
      isDivideExpLine={isDivideExpLine}
      divideExpGap={divideExpGap}
      height={height}
    >
      {children}
    </Style.TR>
  );
};
export const TH: React.FC<ITh> = ({ scope, color = EStyleTableTypes.SECONDARY, hiddenLabel, children, ...rest }) => {
  const colors = tables;
  return (
    <Style.TH scope={scope} style={{ ...colors[color].th }} {...rest}>
      {hiddenLabel && <span>{hiddenLabel}</span>}
      {children}
    </Style.TH>
  );
};
export const TD: React.FC<ITd> = ({ hiddenLabel = '', width, height, color = EStyleTableTypes.SECONDARY, isMathCheck, children, ...rest }) => {
  const colors = tables;
  return (
    <Style.TD style={{ ...colors[color].td }} {...rest} width={width} height={height}>
      {hiddenLabel && <span>{hiddenLabel}</span>}
      {children}
      {isMathCheck && (
        <Style.MathCheck>
          <img src={incorrect_mark} width='32px' height='32px' />
        </Style.MathCheck>
      )}
    </Style.TD>
  );
};
export const Table: React.FC<ITable> = ({
  caption = '',
  width,
  marginTop,
  marginLeft,
  color = EStyleTableTypes.SECONDARY,
  useHover = false,
  sizes = [],
  bgColors = [],
  fontSize,
  useMathBorder = true,
  children,
}) => {
  const colors = tables;
  return (
    <Style.Wrap width={width} marginTop={marginTop} marginLeft={marginLeft}>
      {!!bgColors.length && bgColors.map((val, idx) => <Style.BgColor key={`table-row-bg-${idx}`} color={val} index={idx} />)}
      <Style.Table
        useHover={useHover}
        cssStyle={colors[color].cssStyle}
        style={{ ...colors[color].table }}
        useMathBorder={useMathBorder}
        fontSize={fontSize}
      >
        {!!sizes.length && (
          <colgroup>
            {sizes.map((val, idx) => (
              <col key={`table-col-${idx}`} width={val} />
            ))}
          </colgroup>
        )}
        {caption && <TableCaption caption={caption} />}
        {children}
      </Style.Table>
    </Style.Wrap>
  );
};
