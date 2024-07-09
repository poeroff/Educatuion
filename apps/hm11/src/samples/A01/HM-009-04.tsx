import { useState } from 'react';
import { Box, Typography, Mark } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM00904 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

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
          문제4
        </Typography>
        <Box marginLeft='12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
            다음에서 다항식 <MathExpression equation={`\\(f(x)=x3-7x+6\\)`} />의 인수인 것을 모두 찾으시오.&nbsp;
          </Typography>
        </Box>
      </Box>

      <Box flexDirection='column' vAlign='center' marginLeft='12px'>
        <Box
          marginTop='17px'
          gap='12px'
          useRound
          hAlign='center'
          height='77px'
          padding='24px'
          border='1px solid var(--color-grey-300)'
          width='fit-content'
        >
          <Typography>
            <Mark size='middle' type='correct' markPosition='-25px 16px 0'>
              <MathExpression equation={`\\(x-1\\)`} />,
            </Mark>
          </Typography>
          <Typography>
            <MathExpression equation={`\\(x+1\\)`} />,
          </Typography>

          <Typography>
            <MathExpression equation={`\\(x-2\\)`} />,
          </Typography>

          <Typography>
            <MathExpression equation={`\\(x+3\\)`} />,
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00904;
