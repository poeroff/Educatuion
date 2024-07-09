import { EStyleTableTypes, Input, Table, TableMathCaption, TBody, TD, TFoot, TH, THead, TR } from '@maidt-cntn/ui';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useCallback, useMemo } from 'react';

interface IMathTable {
  expression: string;
  answer: string;
  solution?: string[];
  values?: string[];
  onChange?: (values: string[]) => void;
  isSubmitted?: boolean;
}

const places = ['일의 자리', '십의 자리', '백의 자리', '천의 자리'];

const MathTable = ({ expression, answer, solution, values, onChange, isSubmitted = false }: IMathTable) => {
  const [number1, number2] = useMemo(() => expression.split('+'), [expression]);
  const maxLength = useMemo(() => Math.max(number1.length, number2.length), []);

  const handleInput = useCallback(
    (index: number, value: string) => {
      if (!values) return;

      const newValues = values.slice();
      newValues[index] = value;
      onChange?.(newValues);
    },
    [values, onChange],
  );

  const renderRows = useCallback((value: string[], isAnswer = false) => {
    return value
      .slice()
      .reverse()
      .map((num, index) => (
        <TD key={index} fontColor={isAnswer ? 'var(--color-blue-800)' : undefined}>
          {num}
        </TD>
      ));
  }, []);

  return (
    <Table color={EStyleTableTypes.MATH}>
      <TableMathCaption caption='세로셈' math={[number1, '+', number2]} />
      <THead hidden>
        <TR>
          {places.slice(0, maxLength).map((place, index) => (
            <TH key={index} scope='col'>
              {place}
            </TH>
          ))}
          <TH scope='col'>연산 기호</TH>
        </TR>
      </THead>
      <TBody>
        {solution && (
          <TR isMathSolution>
            {renderRows(solution)}
            <TD></TD>
          </TR>
        )}
        <TR>
          {renderRows(number1.split(''))}
          <TD></TD>
        </TR>
        <TR>
          {renderRows(number2.split(''))}
          <TD>+</TD>
        </TR>
      </TBody>
      <TFoot>
        <TR>
          {values ? (
            Array.from({ length: answer.length }, (_, index) => answer.length - index - 1).map(index => (
              <TD key={index}>
                <Input
                  type='number'
                  value={values[index]}
                  onChange={e => handleInput(index, e.target.value)}
                  ariaLabel={`${places[index]}의 답`}
                  maxLength={1}
                  status={isSubmitted && getInputStatus(answer[index].toString() === values[index], values[index])}
                  readOnly={isSubmitted}
                />
              </TD>
            ))
          ) : (
            <>{renderRows(answer.split(''), true)}</>
          )}
          {Array.from({ length: maxLength + 1 - answer.length }).map((_, index) => (
            <TD key={index}></TD>
          ))}
        </TR>
      </TFoot>
    </Table>
  );
};

export default MathTable;
