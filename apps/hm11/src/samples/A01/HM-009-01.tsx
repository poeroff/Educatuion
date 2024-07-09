import { useState } from 'react';
import { Box, List, Typography, Input, TMainHeaderInfoTypes, Label } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const data = ['\\(A = 3x^3 + 2x - 1, B = 2x^3 - x^2 - x + 1\\)', '\\(A = x^2 + 3xy + 5y^2, B = 6x^2 - 9xy - y^2\\)'];

const HM00901 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: number]: { sum: string; diff: string } }>({});

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  const handleInputChange = (index: number, field: 'sum' | 'diff', value: string) => {
    setAnswers(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow} useExtend>
      <Box vAlign='center' padding='7px 0' whiteSpace='nowrap'>
        <Box width='6px' height='28px' marginRight='8px' background='var(--color-h-math-primary-origin)' borderRadius='3px' />
        <Typography
          useGap={false}
          fontSize='var(--font-size-30)'
          lineHeight='45px'
          weight={'var(--font-weight-bold)'}
          color='var(--color-h-math-primary-normal)'
        >
          문제2
        </Typography>
        <Box marginLeft='12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
            다음 두 다항식&nbsp;
            <MathExpression equation={`$A$`} />와 <MathExpression equation={`$B$`} />에 대하여 <MathExpression equation={`$A + B =$`} />와 &nbsp;
            <MathExpression equation={`$A - B =$`} />를 계산하시오.
          </Typography>
        </Box>
      </Box>

      <Box hAlign='center' useFull>
        <List gap={48} data={data}>
          {({ value, index = 1 }) => (
            <Box key={index}>
              <Box vAlign='center'>
                <Typography>({index})</Typography>
                <MathExpression equation={`${value}`} />
              </Box>
              <Box hAlign='flex-end' marginTop='12px'>
                <Box vAlign='center' marginRight='24px'>
                  <Label
                    size='x-small'
                    value='답'
                    shape='square'
                    color='var(--color-white)'
                    background='var(--color-h-math-primary-normal)'
                    lineColor='none'
                  />
                </Box>
                <Box marginRight='24px'>
                  <MathExpression equation={`$A + B =$`} />
                  &nbsp;
                  <Input
                    placeholder=''
                    width='210px'
                    ariaLabel='A+B의 입력란'
                    value={answers[index]?.sum}
                    onChange={e => handleInputChange(index, 'sum', e.target.value)}
                  />
                  <Typography useGap={false}>,</Typography>
                </Box>
                <Box>
                  <MathExpression equation={`$A - B =$`} />
                  &nbsp;
                  <Input
                    placeholder=''
                    width='210px'
                    ariaLabel='A-B의 입력란'
                    value={answers[index]?.diff}
                    onChange={e => handleInputChange(index, 'diff', e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </HContainer>
  );
};

export default HM00901;
