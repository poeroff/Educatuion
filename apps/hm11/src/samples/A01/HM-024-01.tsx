import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, ESvgType, SvgIcon, Input, Typography, Label } from '@maidt-cntn/ui';

import icPredicate from '@maidt-cntn/assets/icons/icPredicate.svg';

const HM02401 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: (
      <BoxWrap boxGap={12}>
        <Box>평가문제</Box>
        <Box>
          <SvgIcon src={icPredicate} type={ESvgType.IMG} alt='발전' />
        </Box>
      </BoxWrap>
    ),
    headerTextColor: 'var(--color-black)',
    headerPattern: 'icon',
    iconType: 'mathFinale',
    headerSubTexts: ['predicate'],
    useExtend: true,
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => {}}>
      <Box>
        <Typography fontSize='var(--font-size-32)' lineHeight='50px' fontWeight='var(--font-weight-semiBold)'>
          <Label type='level' level='low'>
            <Typography color='var(--color-h-math-primary-normal)' fontSize='var(--font-size-36)' fontWeight='var(--font-weight-extraBold)'>
              15
            </Typography>
          </Label>
          다항식
          <MathExpression equation={`\\(f(x)\\)`} />를 <MathExpression equation={`$x2+x+1$`} />로 나누었을 때의 나머지는{' '}
          <MathExpression equation={`$x+4$`} />
          이다. <MathExpression equation={`$f(x)$`} />를 <MathExpression equation={`$x3-1$`} />로 나누었을 때의 나머지를{' '}
          <MathExpression equation={`$ax2+b$`} />라 할 때, 다음에 답하시오.
        </Typography>
      </Box>
      <BoxWrap>
        <Box width='50%'>
          <Box>
            <Typography fontSize='var(--font-size-24)' lineHeight={'36px'}>
              (1) 상수 <MathExpression equation={'$a$'} />와 <MathExpression equation={'$b$'} />의 값을 구하시오.
            </Typography>
          </Box>
          <Box paddingLeft='12px' height='200px'>
            그리기도구
          </Box>
          <BoxWrap paddingLeft='12px' paddingTop='12px'>
            <Box>
              <MathExpression equation={`$a$`} />
              <Typography fontSize='var(--font-size-24)'>=</Typography>
              <Input onChange={() => {}} value='' width='100px' />
              <Typography fontSize='var(--font-size-24)'>,</Typography>
            </Box>
            <Box>
              <MathExpression equation={`$b$`} />
              <Typography fontSize='var(--font-size-24)'>=</Typography>
              <Input onChange={() => {}} value='' width='100px' />
            </Box>
          </BoxWrap>
        </Box>
        <Box width='50%'>
          <Box>
            <Typography fontSize='var(--font-size-24)' lineHeight={'36px'} letterSpacing='-2px'>
              (2) <MathExpression equation={'$f(x)$'} />를 <MathExpression equation={'$x-1$'} />로 나누었을 때의 나머지를 구하시오.
            </Typography>
          </Box>
          <Box paddingLeft='12px' height='200px'>
            그리기도구
          </Box>
          <Box paddingLeft='12px' paddingTop='12px'>
            <MathExpression equation={`$a$`} />
            <Typography fontSize='var(--font-size-24)'>=</Typography>
            <Input onChange={() => {}} value='' />
          </Box>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM02401;
