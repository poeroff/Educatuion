import styled from '@emotion/styled';
import { InequalitySign, OverlayTooltip, EDefaultInequalitySignType, EInequalitySignUsage, TInequalitySignType } from '@maidt-cntn/ui';

export interface ISignTooltipProps {
  toolTipId: string;
  isTooltipOpen: boolean;
  tooltipPlace: 'top' | 'bottom';
  onClick: (type: EDefaultInequalitySignType) => void;
  signs: Array<TInequalitySignType>;
}

export const InequalitySignTooltip = ({ toolTipId, isTooltipOpen, tooltipPlace, signs, onClick }: ISignTooltipProps) => {
  const signType: Record<TInequalitySignType, EDefaultInequalitySignType> = {
    '>=': EDefaultInequalitySignType.BIGGER_OR_EQUAL_LEFT,
    '>': EDefaultInequalitySignType.BIGGER_LEFT,
    '=': EDefaultInequalitySignType.EQUAL,
    '<': EDefaultInequalitySignType.BIGGER_RIGHT,
    '<=': EDefaultInequalitySignType.BIGGER_OR_EQUAL_RIGHT,
  };

  return (
    <OverlayTooltip id={toolTipId} isShow={isTooltipOpen} openOnClick place={tooltipPlace === 'top' ? 'bottom' : 'top'}>
      <SignWrap>
        {signs.map((sign, idx) => {
          return (
            <InequalitySign
              key={idx}
              inequalitySignProps={{ usage: EInequalitySignUsage.TOOLTIP, type: signType[sign] }}
              onClick={() => onClick(signType[sign])}
            />
          );
        })}
      </SignWrap>
    </OverlayTooltip>
  );
};

const SignWrap = styled.div`
  display: flex;

  & > button {
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
