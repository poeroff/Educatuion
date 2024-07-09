import { useState } from 'react';
import { Box, Typography, Input, Label, BoxWrap, Image, Button, EStyleButtonTypes, EStyleFontSizes, EStyleSizes, Scroll } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM00905 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => !isShow}>
      <Scroll tabIndex={0}>
        <BoxWrap>
          <Box flexDirection='column' vAlign='start'>
            <Typography weight={'var(--font-weight-semiBold)'} fontSize='var(--font-size-32)' lineHeight='48px'>
              <Box display='inline-flex' marginRight='8px'>
                <Box width='6px' height='28px' margin='8px 8px 8px 0' background='var(--color-h-math-primary-origin)' borderRadius='3px' />
                <Typography
                  useGap={false}
                  fontSize='var(--font-size-30)'
                  lineHeight='45px'
                  weight={'var(--font-weight-bold)'}
                  color='var(--color-h-math-primary-normal)'
                >
                  문제7
                </Typography>
              </Box>
              오른쪽 그림과 같이 임피던스의 값이 각각 <MathExpression equation={`\\(Z_1\\)`} />과 <MathExpression equation={`$Z_2$`} />인 저항을
              병렬로 연결한 교류 회로에서 임피던스 <MathExpression equation={`\\(Z\\)`} />는
            </Typography>
            <Box useFull hAlign='center'>
              <Typography fontSize='var(--font-size-32)' lineHeight='48px'>
                <MathExpression equation={`$\\frac{1}{z}=\\frac{1}{z_1}+\\frac{1}{z_2}$`} />
              </Typography>
            </Box>
            <Typography weight={'var(--font-weight-semiBold)'} fontSize='var(--font-size-32)' lineHeight='48px'>
              로 주어진다. <MathExpression equation={`$Z_1=1+3i$`} />
              이고 <MathExpression equation={`$Z_2=2+i$`} />일 때, 이 회로의 임피던스 <MathExpression equation={`$z$`} />를 구하시오.
            </Typography>
          </Box>
          <Box>
            <Image
              src='/example/HM-009-05/M1-2-1-01-01.png'
              alt='오른쪽 그림과 같이 임피던스의 값이 각각 Z1과 Z2인 저항을 병렬로 연결한 교류 회로가 있습니다.'
              width='225px'
              height='189px'
            />
          </Box>
        </BoxWrap>
        <Box hAlign='flex-end' marginTop='24px'>
          <Box vAlign='center' marginRight='8px'>
            <Label
              size='x-small'
              value='답'
              shape='square'
              fontSize={20}
              type='paint'
              background='var(--color-h-math-primary-normal)'
              color='var(--color-white)'
            />
          </Box>
          <Input placeholder='' width='210px' ariaLabel={`답 입력란`} onChange={() => {}} />
        </Box>
        <BoxWrap marginTop='24px'>
          <Box>
            <Image src='/example/HM-009-05/M1P-2-1-01-03 1.png' alt='빨간색, 노란색, 초록색, 파란색 전선이 있습니다.' width='225px' height='216px' />
          </Box>
          <Box vAlign='center'>
            <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
              <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
            </Button>
            <Box opacity={show ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                교류 회로에서 전류가 흐르기 어려운 정도를 나타내는 임피던스는 복소수 <MathExpression equation={`$a+bi$`} />의 꼴로 나타낸다.
              </Typography>
            </Box>
          </Box>
        </BoxWrap>
      </Scroll>
    </HContainer>
  );
};

export default HM00905;
