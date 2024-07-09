export enum EInequalitySignUsage {
  DEFAULT = 'default',
  TOOLTIP = 'tooltip',
}

export enum EDefaultInequalitySignType {
  DEFAULT = 'default',
  EMPTY = 'empty',
  BIGGER_RIGHT = 'biggerRight',
  BIGGER_OR_EQUAL_RIGHT = 'biggerOrEqualRight',
  BIGGER_LEFT = 'biggerLeft',
  BIGGER_OR_EQUAL_LEFT = 'biggerOrEqualLeft',
  EQUAL = 'equal',
  NOT_EQUAL = 'notEqual',
}

export enum EInequalitySignStatus {
  DEFAULT = 'default',
  ACTIVE = 'active',
  IS_ERROR = 'isError',
  IS_CORRECT = 'isCorrect',
}

export interface IDefaultInequalitySignProps {
  usage: EInequalitySignUsage;
  type: EDefaultInequalitySignType;
  tooltipPlace?: TInequalityTooltipPlace;
}

export interface IInequalitySignStyle {
  inequalitySignProps: IDefaultInequalitySignProps;
  status?: EInequalitySignStatus;
}

export type TInequalityTooltipPlace = 'top' | 'bottom';

export type TInequalitySignType = '>=' | '>' | '=' | '<' | '<=';
