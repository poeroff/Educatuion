import style from './QuestionHorizontal.style';
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { EOperator } from '../../../type/Question/QuestionType';

export interface IQuestionHorizontal {
  firstValue?: number;
  secondValue?: number;
  operator: EOperator;
}

export const operatorDisplayMap = {
  [EOperator.Add]: '+',
  [EOperator.Subtract]: '-',
  [EOperator.Multiply]: '×',
  [EOperator.Divide]: '÷',
};

export const calculationMap = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
};

const useNumericInput = (initialValue: number | '') => {
  const [value, setValue] = useState<number | ''>(initialValue);
  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^[0-9]+$/.test(inputValue)) {
      setValue(inputValue === '' ? '' : Number(inputValue));
    }
  };
  return [value, handleNumericInput] as const;
};

const QuestionHorizontal = forwardRef(({ operator, firstValue, secondValue }: IQuestionHorizontal, ref) => {
  const EQUAL = '=';
  const [firstOperand, handleFirstOperandChange] = useNumericInput(firstValue || '');
  const [secondOperand, handleSecondOperandChange] = useNumericInput(secondValue || '');
  const [answer, handleAnswerChange] = useNumericInput('');
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const checkAnswer = () => {
    if (firstOperand && secondOperand) {
      setIsWrong(answer !== calculationMap[operator](firstOperand, secondOperand));
    }
  };

  const handleAnswerFocus = () => {
    setIsWrong(false);
  };

  useImperativeHandle(ref, () => ({
    checkAnswer,
  }));

  return (
    <>
      <style.QuestionContainer>
        {firstValue && secondValue ? (
          <style.Expression>{`${firstValue} ${operatorDisplayMap[operator]} ${secondValue} ${EQUAL}`}</style.Expression>
        ) : (
          <>
            <style.StyledInput value={firstOperand} onChange={handleFirstOperandChange} />
            <style.TextWrapper>{operatorDisplayMap[operator]}</style.TextWrapper>
            <style.StyledInput value={secondOperand} onChange={handleSecondOperandChange} />
            <style.TextWrapper>{EQUAL}</style.TextWrapper>
          </>
        )}
        <style.StyledInput
          value={answer}
          onChange={handleAnswerChange}
          style={{ color: isWrong ? '#FE5663' : 'black' }}
          onFocus={handleAnswerFocus}
        />
      </style.QuestionContainer>
    </>
  );
});

export default QuestionHorizontal;
