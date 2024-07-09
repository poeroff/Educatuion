import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EDefaultInequalitySignType,
  EInequalitySignStatus,
  EInequalitySignUsage,
  TInequalityTooltipPlace,
  TInequalitySignType,
  InequalitySign,
  InequalitySignTooltip,
} from '@maidt-cntn/ui';
import StyleInequalitySignBox from './InequalitySignBox.style';
import { TInequalitySignBox, IInequalitySignType } from '..';

export type TInequalitySignOnChange = ((type: EDefaultInequalitySignType, tooltipId: string) => void) | ((type: EDefaultInequalitySignType) => void);

export interface IInequalitySignBoxProps {
  type?: IInequalitySignType;
  size?: TInequalitySignBox;
  rightQuestionText?: string;
  leftQuestionText?: string;
  toolTipId: string;
  tooltipPlace?: TInequalityTooltipPlace;
  isError?: boolean;
  value?: EDefaultInequalitySignType;
  onChange?: TInequalitySignOnChange;
  readOnly?: boolean;
  signs?: Array<TInequalitySignType>;
}

export const InequalitySignBox = ({
  type = 'multi',
  size = 'medium',
  rightQuestionText,
  leftQuestionText,
  toolTipId,
  isError,
  value = EDefaultInequalitySignType.DEFAULT,
  onChange,
  readOnly,
  tooltipPlace = 'top',
  signs = ['>', '=', '<'],
}: IInequalitySignBoxProps) => {
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleOnClick = () => {
    if (!readOnly) {
      setTooltipOpen(!isTooltipOpen);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setTooltipOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleTooltipButtonOnClick = (tooltipType: EDefaultInequalitySignType) => {
    onChange?.(tooltipType, toolTipId);
    setTooltipOpen(false);
  };

  return (
    <StyleInequalitySignBox.Container type={type} size={size} isError={isError}>
      {leftQuestionText && <p>{leftQuestionText}</p>}
      <InequalitySign
        inequalitySignProps={{
          usage: EInequalitySignUsage.DEFAULT,
          type: value,
        }}
        status={isError ? EInequalitySignStatus.IS_ERROR : isTooltipOpen ? EInequalitySignStatus.ACTIVE : EInequalitySignStatus.DEFAULT}
        toolTipId={toolTipId}
        onClick={handleOnClick}
        ref={ref}
      />
      {rightQuestionText && <p>{rightQuestionText}</p>}
      {!readOnly && (
        <InequalitySignTooltip
          toolTipId={toolTipId}
          isTooltipOpen={isTooltipOpen}
          tooltipPlace={tooltipPlace}
          onClick={handleTooltipButtonOnClick}
          signs={signs}
        />
      )}
    </StyleInequalitySignBox.Container>
  );
};

export default InequalitySignBox;
