import { EStyleTableTypes, Input, InputStatus, TBody, TD, TFoot, TH, THead, TR, Table, TableMathCaption } from '@maidt-cntn/ui';
import { isNumber } from '@maidt-cntn/util/CommonUtil';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type TMathExpression = `${number}${'+' | '-'}${number}`;

interface ICalculateTableProps {
  mathExpression: TMathExpression;
  onChange?: (value: string) => void;
  submitted?: boolean;
  defaultValue?: string;
}

export const CalculateTable = ({ mathExpression, onChange, submitted, defaultValue }: ICalculateTableProps) => {
  const { symbol, firstNumber, secondNumber, answer, answerString } = useMemo(() => {
    const symbol = mathExpression.includes('+') ? '+' : '-';
    const firstNumberString = mathExpression.split(symbol)[0];
    const secondNumberString = mathExpression.split(symbol)[1];
    const firstNumber = parseInt(firstNumberString);
    const secondNumber = parseInt(secondNumberString);

    const answer = symbol === '+' ? firstNumber + secondNumber : firstNumber - secondNumber;
    const answerString = answer.toString().split('').reverse();

    return {
      symbol,
      firstNumber: firstNumberString,
      secondNumber: secondNumberString,
      answer,
      answerString,
    };
  }, [mathExpression]);

  const gridColumns = useMemo(() => {
    const numberOfDigits = Math.max(firstNumber.length, secondNumber.length) + 1;
    return Array.from({ length: numberOfDigits }, () => `${100 / numberOfDigits}%`);
  }, [firstNumber.length, secondNumber.length]);

  const decimalNumberWord = useMemo(() => ['일', '십', '백', '천'], []);
  const [answerValue, setAnswerValue] = useState<string[]>(defaultValue?.split('').reverse() ?? []);
  const handleAnswerChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>, digitNumber: number) => {
    isNumber(value) &&
      setAnswerValue(prev => {
        const copyAnswerValue = [...prev];
        copyAnswerValue[digitNumber] = value;
        return copyAnswerValue;
      });
  }, []);

  useEffect(() => {
    onChange?.([...answerValue].reverse().join(''));
  }, [answerValue, onChange]);

  return (
    <Table color={EStyleTableTypes.MATH} sizes={gridColumns}>
      <TableMathCaption caption='세로셈' math={[firstNumber, symbol, secondNumber]} />
      <THead hidden>
        <TR>
          {gridColumns.map((_, index) => {
            const isLast = index === gridColumns.length - 1;
            const content = isLast ? '연산 기호' : `${decimalNumberWord[index]}의 자리`;
            return (
              <TH key={index} scope='col'>
                {content}
              </TH>
            );
          })}
        </TR>
      </THead>
      <TBody>
        <TR>
          {gridColumns.map((_, index) => (
            <TD key={index}>{firstNumber[firstNumber.length - index - 1]}</TD>
          ))}
        </TR>
        <TR>
          {gridColumns.map((_, index) => {
            const isLast = index === gridColumns.length - 1;
            const content = isLast ? symbol : secondNumber[secondNumber.length - index - 1];
            return <TD key={index}>{content}</TD>;
          })}
        </TR>
      </TBody>
      <TFoot>
        <TR>
          {gridColumns.map((_, index) => {
            const ariaLabel = `${decimalNumberWord[index]}의 자리의 답`;
            const digitNumber = 10 ** index;
            const isExistInput = digitNumber <= answer;
            const submittedStatus = answerString[index] === answerValue[index] ? InputStatus.ENABLE : InputStatus.ERROR;
            const submitBeforeStatus = answerValue[index] ? InputStatus.ENABLE : InputStatus.DEFAULT;
            const status = submitted ? submittedStatus : submitBeforeStatus;
            return (
              <TD key={index}>
                {isExistInput && (
                  <Input
                    type='number'
                    ariaLabel={ariaLabel}
                    value={answerValue[index] ?? ''}
                    maxLength={1}
                    onChange={event => handleAnswerChange(event, index)}
                    readOnly={submitted}
                    status={status}
                  />
                )}
              </TD>
            );
          })}
        </TR>
      </TFoot>
    </Table>
  );
};

export default CalculateTable;
