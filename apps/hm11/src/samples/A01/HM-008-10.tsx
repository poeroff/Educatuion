import { Box, Typography, ArrowBox } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM00810 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <Box>
        <Typography>
          &nbsp;하나의 다항식을{' '}
          <Typography useSticker useGap={false}>
            두 개 이상의 다항식의 곱
          </Typography>
          으로 나타내는 인수분해는 다음과 같이 다항식의 전개 과정을 거꾸로 생각한 것과 같다.
        </Typography>

        <Box marginTop='24px' hAlign='center' height='200px' padding='24px'>
          <ArrowBox
            type='both'
            width={220}
            height={20}
            x={100}
            y={-20}
            arrowColor='var(--color-red-700)'
            leftArrow={{ useTail: true }}
            rightArrow={{ useTail: true, tailType: 'none' }}
            centerContent={<>인수분해</>}
            direction='up'
          >
            <ArrowBox
              type='both'
              width={220}
              height={20}
              x={100}
              y={50}
              arrowColor='var(--color-blue-700)'
              leftArrow={{ useTail: true }}
              rightArrow={{ useTail: true, tailType: 'none' }}
              centerContent={<>전개</>}
            >
              <MathExpression equation={`\\(a^3+3a^2b+3ab^2+b^3=(a+b)^3\\)`} />
            </ArrowBox>
          </ArrowBox>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00810;
