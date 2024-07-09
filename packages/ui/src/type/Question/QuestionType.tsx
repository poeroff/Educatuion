export enum EQuestionVerticalTypes {
  COLOR = 'color',
  INPUT = 'input',
  TEXT = 'text',
}

export enum EQuestionDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum EOperator {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
}

export type TMarkSize = 'middle' | 'large' | 'small';
export type TMarkType = 'correct' | 'incorrect' | 'wrong' | 'star' | 'none';
