import { useState } from 'react';
import { Box, List, Typography, Input, Label } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM00903 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: number]: { sum: string; diff: string } }>({});

  const data = ['\\((a-b+2c)^2=\\)', '\\((2a-b)^3=\\)', '\\((x-2)(x^2+2x+4)=\\)', '\\((2x-3y)(4x^2-6xy+9y^2)=\\)'];

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
    <HContainer headerInfo={null} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => !isShow} useExtend>
      <Box vAlign='center' padding='7px 12px' whiteSpace='nowrap' marginLeft='12px'>
        <Box width='6px' height='28px' marginRight='8px' background='var(--color-h-math-primary-origin)' borderRadius='3px' />
        <Typography
          useGap={false}
          fontSize='var(--font-size-30)'
          lineHeight='45px'
          weight={'var(--font-weight-bold)'}
          color='var(--color-h-math-primary-normal)'
        >
          문제3
        </Typography>
        <Box marginLeft='12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
            다음 식을 전개하시오.&nbsp;
          </Typography>
        </Box>
      </Box>

      <Box hAlign='center' marginTop='17px' marginLeft='12px'>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Box key={index}>
              <Box vAlign='center'>
                <Box>
                  <Typography fontSize='var(--font-size-24)'>({index})</Typography>
                  <MathExpression equation={`${value}`} />
                  &nbsp;
                </Box>
                <Box>
                  <Input
                    placeholder=''
                    width='210px'
                    ariaLabel=''
                    value={answers[index]?.sum}
                    onChange={e => handleInputChange(index, 'sum', e.target.value)}
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

export default HM00903;
