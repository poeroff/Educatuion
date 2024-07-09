import { Box, BoxWrap, Input, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01804 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: (
      <>
        평가문제
        <Box backgroundColor='var(--color-h-math-blue-strong)' color='var(--color-white)' borderRadius='50px' padding='0 12px' marginLeft='12px'>
          맞춤형
        </Box>
      </>
    ),
    headerTextColor: 'var(--color-black)',
    headerPattern: 'icon',
    iconType: 'mathFinale',
    useExtend: true,
  };
  const data = [{ equation: '(2+i)+(1-3i)=' }, { equation: '(6-i)-(7-4i)=' }];
  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => {}}>
      <Box useFull>
        <Box padding='7px 0' whiteSpace='pre-line'>
          <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='48px'>
            <Typography
              useGap={false}
              color='var(--color-h-math-primary-normal)'
              fontSize='var(--font-size-36)'
              weight='var(--font-weight-extraBold)'
            >
              5
            </Typography>
            &nbsp;이차방정식 <MathExpression equation={`$f(x)$`} />를 <MathExpression equation={`$x^2-2kx+3=0$`} />의 두 근을 α와 β라 할때,{'\n'}α
            <MathExpression equation={`$^2$`} />
            +αβ+α+β이다. α<MathExpression equation={`$^2$`} />
            +β
            <MathExpression equation={`$^2$`} />의 값을 구하시오.
          </Typography>
        </Box>
        <Box hAlign='end'>
          <Typography fontSize='var(--font-size-24)' lineHeight='36px'>
            (단, <MathExpression equation={'$k$'} />는 실수)
          </Typography>
        </Box>
        <BoxWrap marginTop={24} justifyContent='end'>
          <Box vAlign='center' marginRight='12px'>
            <Label
              value='답'
              type='paint'
              size='x-small'
              shape='square'
              fontSize={20}
              background='var(--color-h-math-primary-normal)'
              color='var(--color-white)'
            />
            <Input width='210px' textAlign='center' onChange={() => {}} ariaLabel='α제곱과 β제곱의 합의 답' marginLeft={24} />
          </Box>
        </BoxWrap>
      </Box>
    </HContainer>
  );
};

export default HM01804;
