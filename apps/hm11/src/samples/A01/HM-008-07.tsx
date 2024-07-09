import { Box, Image, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM00807 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '다항식의 나눗셈',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-h-math-primary-strong)',
    iconType: 'thinkOpen',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Typography lineHeight='42px'>
        &nbsp; 다항식의 나눗셈은 각 다항식을 내림차순으로 정리한 다음 자연수의 나눗셈과 같은 방법으로 계산한다.
      </Typography>

      <Box position='relative' paddingRight='329px' marginTop='28px'>
        <Typography width='100%' fontSize='32px' lineHeight='48px'>
          &nbsp; 예를 들어 다항식의 나눗셈{' '}
          <Box hAlign='center'>
            <MathExpression equation={`\\((3x^2-5x+6)÷(x-1)\\)`} />
          </Box>{' '}
          은 오른쪽과 같이 계산한다.
        </Typography>
        <Box position='absolute' top='0' right='0'>
          <Image src='/example/HM-008-07/HM_008_07.png' width='329px' alt='3x²-5x+6을 x-1로 나누었을 때의 몫은 3x-2이고 나머지는 4입니다.' />
        </Box>
        <Typography fontSize='32px' lineHeight='48px'>
          &nbsp; 따라서 <MathExpression equation={`\\(3x^2-5x+6\\)`} />을 <MathExpression equation={`\\(x-1\\)`} />로 나누었을 때의 몫은{' '}
          <Typography useSticker useGap={false} fontSize='32px'>
            <MathExpression equation={`\\(3x-2\\)`} />
          </Typography>
          이고 나머지는{' '}
          <Typography useSticker useGap={false} fontSize='32px'>
            &nbsp;
            <MathExpression equation={`\\(4\\)`} />
            &nbsp;
          </Typography>
          이다.
        </Typography>
        <Box marginTop='28px'>
          <Typography width='100%' lineHeight='42px'>
            그러므로{' '}
            <Box hAlign='center'>
              <MathExpression equation={`\\(3x^2-5x+6=\\)`} />
              <Typography useSticker useGap={false}>
                <MathExpression equation={`\\((x-1)(3x-2)+4\\)`} />
                &nbsp;
              </Typography>
            </Box>
            로 나타낼 수 있다.
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00807;
