import { Box, EStyleFontSizes, Input, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const data = [{ question: '(x2-3x+2)÷(x+1)' }, { question: '(x3-x2+3)÷(x-2)' }];

const HM00502 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPrepLearn',
  };

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow}>
      <Box vAlign='center' marginLeft='12px'>
        <Label value='2' color='var(--color-white)' background='var(--color-h-math-primary-normal)' lineColor='none' fontSize={30} lineHeight={30} />
        <Typography weight={700} fontSize='32px' lineHeight='50px'>
          &nbsp;다음 다항식의 나눗셈에서 몫과 나머지를 구하시오.
        </Typography>
      </Box>

      <Box useFull marginTop='24px'>
        {data.map((value, index = 1) => {
          return (
            <>
              <Box>
                <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-regular)' useGap={false}>
                  ({index + 1})
                </Typography>
                <Typography weight='var(--font-weight-regular)'>
                  <MathExpression equation={`$${value.question}$`} />
                </Typography>
              </Box>
              <Box hAlign='end'>
                <Label
                  size='x-small'
                  value='답'
                  shape='square'
                  type='paint'
                  background='var(--color-h-math-primary-normal)'
                  color='var(--color-white)'
                />
                <Box marginLeft='12px'>
                  <Typography size={EStyleFontSizes['X-MEDIUM']} weight='var(--font-weight-regular)'>
                    몫:
                  </Typography>
                  <Input width='100px' onChange={() => {}} value='' ariaLabel='다항식의 몫' textAlign='center' />
                  <Typography size={EStyleFontSizes['X-MEDIUM']} weight='var(--font-weight-regular)'>
                    ,
                  </Typography>
                  <Typography size={EStyleFontSizes['X-MEDIUM']} weight='var(--font-weight-regular)'>
                    나머지:
                  </Typography>
                  <Input width='100px' onChange={() => {}} value='' ariaLabel='다항식의 나머지' textAlign='center' />
                </Box>
              </Box>
            </>
          );
        })}
      </Box>
    </HContainer>
  );
};

export default HM00502;
