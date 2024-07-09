import { EInequalitySignStatus, IInequalitySignStyle } from '@maidt-cntn/ui';
import StyleInequalitySign from './InequalitySign.style';
import { forwardRef } from 'react';

export interface IInequalitySignProps extends IInequalitySignStyle {
  onClick?: () => void;
  toolTipId?: string;
}

export const InequalitySign = forwardRef<HTMLButtonElement, IInequalitySignProps>(
  ({ inequalitySignProps, status = EInequalitySignStatus.DEFAULT, onClick, toolTipId }, ref) => {
    const getLabel = (type: string) => {
      switch (type) {
        case 'equal':
          return '양쪽 같음';
        case 'notEqual':
          return '양쪽 다름';
        case 'biggerRight':
          return '오른쪽이 큼';
        case 'biggerOrEqualRight':
          return '오른쪽이 크거나 같음';
        case 'biggerLeft':
          return '왼쪽이 큼';
        case 'biggerOrEqualLeft':
          return '왼쪽이 크거나 같음';
        case 'empty':
          return '빈 칸';
        default:
          return '빈 칸, 부등호 선택하기';
      }
    };

    return (
      <StyleInequalitySign.Button
        type='button'
        aria-label={getLabel(inequalitySignProps.type)}
        onClick={onClick}
        data-tooltip-id={status !== 'isError' && status !== 'isCorrect' ? toolTipId : ''}
        ref={ref}
      >
        <StyleInequalitySign.Icon inequalitySignProps={inequalitySignProps} status={status} />
      </StyleInequalitySign.Button>
    );
  },
);

export default InequalitySign;
