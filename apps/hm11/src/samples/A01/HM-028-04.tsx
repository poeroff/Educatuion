import { Box, Typography, Scroll } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM02804 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Scroll tabIndex={0}>
        <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
          복소수에서도 대소 관계를 정할 수 있을까?
        </Typography>
        <Box marginTop='24px' hAlign='center'>
          <Typography>
            실수는 수직선 위에 나타낼 수 있으므로 대소 관계를 확인할 수 있다. 즉, 두 실수 <MathExpression equation={'\\(a\\)'} />와{' '}
            <MathExpression equation={'\\(b\\)'} />에 대하여 수직선 위에서 실수 <MathExpression equation={'\\(b\\)'} />를 나타내는 점이 실수{' '}
            <MathExpression equation={'\\(a\\)'} />를 나타내는 점보다 오른쪽에 있으면 <MathExpression equation={'\\(a<b\\)'} />와 같이 대소관계를
            정한다.
          </Typography>
        </Box>
        <Box marginTop='24px' hAlign='center'>
          <Typography>
            따라서 두 실수 <MathExpression equation={'\\(a\\)'} />와 <MathExpression equation={'\\(b\\)'} />에 대하여 반드시 오른쪽 세 가지 중 어느
            하나만 성립함을 알 수 있다.
          </Typography>
          <Box marginLeft='24px' padding='12px' border='1px solid var(--color-grey-300)' borderRadius='8px'>
            <Typography useGap={false} useSticker>
              <MathExpression equation={'\\(a>b, a=b, a<b\\)'} />
            </Typography>
          </Box>
        </Box>

        <Box marginTop='24px'>
          <Typography>또한, 실수에서의 대소 관계는 다음과 같은 성질을 갖는다.</Typography>
          <Box borderRadius='8px' background='var(--color-h-math-blue-gb)' margin='24px 0' padding='24px'>
            <Typography useGap={false} useSticker>
              세 실수 <MathExpression equation={'\\(a, b, c\\)'} />에 대하여 <br />
              ① <MathExpression equation={'\\(a>b\\)'} />
              이고 <MathExpression equation={'\\(c>0\\)'} />
              이면 <MathExpression equation={'\\(ac>bc\\)'} />
              <Typography width='145px'></Typography>
              ② <MathExpression equation={'\\(a>b\\)'} />
              이고 <MathExpression equation={'\\(c<0\\)'} />
              이면 <MathExpression equation={'\\(ac<bc\\)'} />
            </Typography>
          </Box>
          <Typography>그렇다면 복소수에서도 실수에서와 같이 위의 성질을 만족시키는 대소 관계를 정할 수 있을까?</Typography>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM02804;
