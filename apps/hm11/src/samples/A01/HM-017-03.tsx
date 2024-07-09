import { Box, Typography, Image, BoxWrap, Input } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01703 = () => {
  const [isShow] = useState<boolean>(false);
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBenefit',
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)'>
        <Typography
          useGap={false}
          color='var(--color-h-math-primary-normal)'
          fontSize='var(--font-size-36)'
          weight='var(--font-weight-extraBold)'
          lineHeight='48px'
        >
          1
        </Typography>
        &nbsp;&nbsp;다음은 <MathExpression equation={'$3\\leq x\\leq 5$'} />일 때, 이차함수는 <MathExpression equation={'$y=-x^2+6x$'} />의 최댓값과
        최솟값을 구하는 과정이다. 빈칸에 알맞은 수를 써넣으시오.
      </Typography>
      <BoxWrap marginTop='24px'>
        <Box>
          <Typography lineHeight='42px'>
            <MathExpression equation={'$y=-x^2+6x=-(x-3)^2+$'} />
            <Input inputSize='x-small' width='48px' onChange={() => {}} value='' ariaLabel='값 입력' textAlign='center' />
          </Typography>
          <Typography lineHeight='42px'>
            <MathExpression equation={'$3\\leq x\\leq 5$'} />일 때 꼭짓점의 <MathExpression equation={'$x$'} />
            좌표 3이 주어진 <MathExpression equation={'$x$'} />의 값의 범위에 포함되므로
          </Typography>
          <Box marginLeft='30px'>
            <Typography lineHeight='42px'>
              <MathExpression equation={'$x=3$'} />일 때&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MathExpression equation={'$y=$'} />
              <Input inputSize='x-small' width='48px' onChange={() => {}} value='' ariaLabel='값 입력' textAlign='center' />
              <br />
              <MathExpression equation={'$x=5$'} />일 때&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MathExpression equation={'$y=$'} />
              <Input inputSize='x-small' width='48px' onChange={() => {}} value='' ariaLabel='값 입력' textAlign='center' />
            </Typography>
          </Box>
          <Typography lineHeight='42px'>
            따라서 최댓값은 <Input inputSize='x-small' width='48px' onChange={() => {}} value='' ariaLabel='값 입력' textAlign='center' />
            이고 최솟값은 <Input inputSize='x-small' width='48px' onChange={() => {}} value='' ariaLabel='값 입력' textAlign='center' /> 이다.
          </Typography>
        </Box>
        <Box>
          <Image
            src='/example/HM-017-03/D1-2-2-02-04.png'
            width='257px'
            height='310px'
            alt='이차함수 y=-x^2+6x의 그래프입니다. x=0일 때, y=0이고, x는 3일 때, y=9이고, x=6일 때, y=0입니다.'
          />
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM01703;
