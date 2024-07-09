import { Box, BoxWrap, Input, List, Radio, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01805 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: (
      <>
        <Box backgroundColor='var(--color-h-math-blue-strong)' color='var(--color-white)' borderRadius='50px' padding='0 12px'>
          맞춤형
        </Box>
      </>
    ),
    headerTextColor: 'var(--color-white)',
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };
  const data = [{ equation: '(2+i)+(1-3i)=' }, { equation: '(6-i)-(7-4i)=' }];
  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => {}}>
      <Box useFull>
        <Box padding='7px 0'>
          <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)'>
            <Typography useGap={false} color='var(--color-grey-500)' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
              0
            </Typography>
            <Typography useGap={false} color='#D57E2F' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
              3
            </Typography>
            &nbsp;다음을 계산하시오
          </Typography>
        </Box>
        <BoxWrap>
          {data.map((value, idx) => {
            return (
              <BoxWrap marginTop={24} useFull>
                <Typography>
                  ({idx + 1})&nbsp;
                  <MathExpression equation={`$${value.equation}$`} />
                </Typography>
                <Input onChange={() => {}} ariaLabel='문제의 답' textAlign='center' width='100%' />
              </BoxWrap>
            );
          })}
        </BoxWrap>
        <BoxWrap>
          <BoxWrap marginTop={24} useFull>
            <Typography>
              (3)&nbsp;
              <MathExpression equation={`$(-3+i)(2-i)=$`} />
            </Typography>
            <Input onChange={() => {}} ariaLabel='문제의 답' textAlign='center' width='100%' />
          </BoxWrap>
          <BoxWrap marginTop={24} useFull>
            <Typography>
              (4)&nbsp;
              <MathExpression equation={`$\\frac{3+2i}{3-2i}+\\frac{3-2i}{3+2i}=$`} />
            </Typography>
            <Input onChange={() => {}} ariaLabel='문제의 답' textAlign='center' width='100%' />
          </BoxWrap>
        </BoxWrap>
      </Box>
    </HContainer>
  );
};

export default HM01805;
