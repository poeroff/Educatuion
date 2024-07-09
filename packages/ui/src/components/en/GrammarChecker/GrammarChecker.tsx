import ArrowLine from '../ArrowLine/ArrowLine';
import Style from './GrammarChecker.style';

export interface IGrammarCheckerProps {
  children: React.ReactNode;
  startRef: React.RefObject<HTMLElement>;
  endRef: React.RefObject<HTMLElement>;
}

export const GrammarChecker = ({ children, startRef, endRef }: IGrammarCheckerProps) => {
  return (
    <Style.GrammarCheckerWrap>
      <Style.GrammarCheckerText>{children}</Style.GrammarCheckerText>
      <ArrowLine
        startRef={startRef}
        endRef={endRef}
        color='gray'
        startArrow={true}
        endArrow={false}
        vLineLength={2}
        cornerRadius={15}
        thickness={2}
        offsetY={6}
      />
    </Style.GrammarCheckerWrap>
  );
};

export default GrammarChecker;
