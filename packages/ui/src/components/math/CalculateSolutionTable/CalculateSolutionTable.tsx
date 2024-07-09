import styled from '@emotion/styled';
import incorrect_mark from '@maidt-cntn/assets/incorrect_mark.svg';
import { Box, EStyleTableTypes, ESvgType, SvgIcon, TBody, TD, TFoot, TH, THead, TR, Table, TableMathCaption } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { TMathExpression } from '../CalculateTable/CalculateTable';

export type TSolutionContent = number | '/' | '';

interface ICalculateSolutionTableProps {
  mathExpression: TMathExpression;
  solutionContents?: TSolutionContent[];
}

export const CalculateSolutionTable = ({ mathExpression, solutionContents }: ICalculateSolutionTableProps) => {
  const { symbol, firstNumber, secondNumber, answerString } = useMemo(() => {
    const symbol = mathExpression.includes('+') ? '+' : '-';
    const firstNumberString = mathExpression.split(symbol)[0];
    const secondNumberString = mathExpression.split(symbol)[1];
    const firstNumber = parseInt(firstNumberString);
    const secondNumber = parseInt(secondNumberString);

    const answer = symbol === '+' ? firstNumber + secondNumber : firstNumber - secondNumber;
    const answerString = answer.toString().split('');

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
          {gridColumns.map((_, index) => {
            const solutionContent = [...(solutionContents ?? [])].reverse()[index];
            return (
              <TD key={index}>
                <Box position='relative' display='flex' justifyContent='center'>
                  {firstNumber[firstNumber.length - index - 1]}
                  {typeof solutionContent === 'number' ? (
                    <RedSolutionFont>{solutionContent}</RedSolutionFont>
                  ) : solutionContent === '/' ? (
                    <CorrectMarkContainer>
                      <SvgIcon src={incorrect_mark} size='34px' type={ESvgType.IMG} />
                    </CorrectMarkContainer>
                  ) : null}
                </Box>
              </TD>
            );
          })}
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
            const content = answerString[answerString.length - index - 1];
            return <TD key={index}>{content}</TD>;
          })}
        </TR>
      </TFoot>
    </Table>
  );
};

const RedSolutionFont = styled.div`
  display: inline-block;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-pink-500);
  position: absolute;
  top: -100%;
`;

const CorrectMarkContainer = styled.div`
  position: absolute;
`;

export default CalculateSolutionTable;
