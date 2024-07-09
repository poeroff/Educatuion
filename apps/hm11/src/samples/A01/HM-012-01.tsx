import { useState } from 'react';

import { Box, List, Typography, Input, Label, BoxWrap } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01201 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(2).fill(''));

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFormEvl',
  };

  const data = [
    {
      question: '2x^3 + xy^3 - 3x^2y^2 - 6y + 1',
      target: 'x',
    },
    {
      question: '2xy^2 + 3x^4 + 4 - x^2y + y^3',
      target: 'y',
    },
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((item, i) => (i === index ? value : item)));
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow}>
      <Box padding='7px 0'>
        <Typography useGap={false} fontSize='var(--font-size-32)'>
          <Typography useGap={false} color='var(--color-h-math-primary-normal)' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
            1
          </Typography>
          &nbsp; 다음 다항식을 &#91; &#93; 안의 방법으로 정리하시오.
        </Typography>
      </Box>
      <Box marginTop='24px' useFull>
        <List gap={24} data={data}>
          {({ value, index }) => (
            <Box key={index}>
              <Box vAlign='center'>
                ({index}) &nbsp;
                <MathExpression equation={`\\(${value?.question}\\)`} />
                <Box marginLeft={24}>
                  <Typography color='var(--color-grey-700)'>&#91;{value?.target}에 대하여 내림차순&#93;</Typography>
                </Box>
              </Box>
              <BoxWrap justifyContent='flex-end'>
                <Box vAlign='center'>
                  <Label
                    size='x-small'
                    value='답'
                    shape='square'
                    color='var(--color-white)'
                    background='var(--color-h-math-primary-normal)'
                    lineColor='none'
                  />
                </Box>
                <Box>
                  <Input width='257px' ariaLabel='답 입력란' value={inputValue[index!]} onChange={e => handleInputChange(index!, e.target.value)} />
                </Box>
              </BoxWrap>
            </Box>
          )}
        </List>
      </Box>
    </HContainer>
  );
};
export default HM01201;
