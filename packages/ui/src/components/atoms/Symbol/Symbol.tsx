import Style, { blankType } from './Symbol.style';
import correct from '@maidt-cntn/assets/icons/checkSymbol_O.svg';
import incorrect from '@maidt-cntn/assets/icons/checkSymbol_X.svg';
import rectangle from '@maidt-cntn/assets/icons/checkSymbol_reactangle.svg';
import triangle from '@maidt-cntn/assets/icons/checkSymbol_triangle.svg';
import rvs_triangle from '@maidt-cntn/assets/icons/checkSymbol_reverse_triangle.svg';

export type TSymbolType = 'correct' | 'incorrect' | 'rectangle' | 'triangle' | 'rvs_triangle' | 'blank' | 'none';

export interface ISymbol {
  type: TSymbolType;
  blankType?: blankType;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  ariaLabel?: string;
  cssStyle?: React.CSSProperties;
  onClick?: () => void;
}

export const Symbol = ({ type, ariaLabel = '', blankType = 'square', size, borderColor, borderWidth, cssStyle, onClick }: ISymbol) => {
  switch (type) {
    case 'correct':
      return (
        <Style.Wrap size={size} style={cssStyle} onClick={onClick}>
          <Style.Symbol src={correct} size={size} alt={ariaLabel || '동그라미표'} />
        </Style.Wrap>
      );
    case 'incorrect':
      return (
        <Style.Wrap size={size} style={cssStyle} onClick={onClick}>
          <Style.Symbol src={incorrect} size={size} alt={ariaLabel || '엑스표'} />
        </Style.Wrap>
      );
    case 'rectangle':
      return (
        <Style.Wrap size={size} style={cssStyle} onClick={onClick}>
          <Style.Symbol src={rectangle} size={size} alt={ariaLabel || '네모표'} />
        </Style.Wrap>
      );
    case 'triangle':
      return (
        <Style.Wrap size={size} style={cssStyle} onClick={onClick}>
          <Style.Symbol src={triangle} size={size} alt={ariaLabel || '세모표'} />
        </Style.Wrap>
      );
    case 'rvs_triangle':
      return (
        <Style.Wrap size={size} style={cssStyle} onClick={onClick}>
          <Style.Symbol src={rvs_triangle} size={size} alt={ariaLabel || '거꾸로된 세모표'} />
        </Style.Wrap>
      );
    case 'blank':
      return (
        <Style.Blank
          type={blankType}
          size={size}
          borderColor={borderColor}
          borderWidth={borderWidth}
          arial-label={ariaLabel || '빈칸'}
          style={cssStyle}
          onClick={onClick}
        />
      );
    case 'none':
    default:
      return <></>;
  }
};

export default Symbol;
