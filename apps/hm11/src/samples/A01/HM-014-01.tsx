import { Box, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const expressions = [
  {
    content: (
      <>
        <MathExpression equation={`\\((x+1)^2 = x^2 + 2x + \\)`} />
        <Box
          position='absolute'
          width='18px'
          height='30px'
          useRound
          background='var(--color-h-math-blue-normal)'
          opacity='25%'
          zIndex='-1'
          top={6}
          left={172}
        />
        <Typography useSticker useGap={false} width='22px' fontSize='24px' weight='var(--font-weight-regular)' align='center'>
          <MathExpression equation={`\\(1 \\)`} />
        </Typography>
      </>
    ),
  },
  {
    content: (
      <>
        <MathExpression equation={`\\((x^2 + x + 1)^2 = x^4 + 2x^3 + \\)`} />
        <Typography useSticker useGap={false} width='22px' fontSize='24px' weight='var(--font-weight-regular)' align='center'>
          <Box
            position='absolute'
            width='22px'
            height='30px'
            useRound
            background='var(--color-h-math-blue-normal)'
            opacity='25%'
            zIndex='-1'
            top={5}
            left={1}
          />
          <MathExpression equation={`\\(3 \\)`} />
        </Typography>
        <MathExpression equation={`\\(x^2 + 2x + 1\\)`} />
      </>
    ),
  },
  {
    content: (
      <>
        <MathExpression equation={`\\((x^3 + x^2 + x + 1)^2 = x^6 + 2x^5 + 3x^4 + \\)`} />
        <Typography useSticker useGap={false} width='22px' fontSize='24px' weight='var(--font-weight-regular)' align='center'>
          <Box
            position='absolute'
            width='22px'
            height='30px'
            useRound
            background='var(--color-h-math-blue-normal)'
            opacity='25%'
            zIndex='-1'
            top={5}
            left={2}
          />
          <MathExpression equation={`\\(4 \\)`} />
        </Typography>
        <MathExpression equation={`\\(x^3 + x^2 + 2x + 1\\)`} />
      </>
    ),
  },
  {
    content: (
      <>
        <MathExpression equation={`\\((x^4 + x^3 + x^2 + x + 1)^2 = x^8 + 2x^7 + 3x^6 + 4x^5 + \\)`} />
        <Typography useSticker useGap={false} width='22px' fontSize='24px' weight='var(--font-weight-regular)' align='center'>
          <Box
            position='absolute'
            width='22px'
            height='30px'
            useRound
            background='var(--color-h-math-blue-normal)'
            opacity='25%'
            zIndex='-1'
            top={5}
            left={1}
          />
          <MathExpression equation={`\\(5 \\)`} />
        </Typography>
        <MathExpression equation={`\\(x^4 + 4x^3 + 3x^2 + 2x + 1\\)`} />
      </>
    ),
  },
];

const HM01401 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathInqConvg',
    headerText: '재미있는 다항식의 전개식!',
    headerTextColor: 'var(--color-header-purple)',
    headerSubTexts: ['inference', 'relation'],
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <Box vAlign='flex-end' flexDirection='column'>
        <Box>
          <Typography fontSize='32px' lineHeight='50px' weight='var(--font-weight-semiBold)'>
            &nbsp; 이때 위에서 둘째 등식부터 우변의 수는 아래 다항식의 전개식에서 각 항의 계수의 배열과 같음을 알 수 있다
          </Typography>
        </Box>
        <Box vAlign='flex-end' flexDirection='column' margin='12px 0 48px'>
          {expressions.map((expression, index) => (
            <Box key={index} useFull hAlign='center' marginTop={12}>
              <Typography useGap={false} width='auto' fontSize='24px' weight='var(--font-weight-regular)'>
                {expression.content}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography fontSize='32px' lineHeight='50px' weight='var(--font-weight-bold)'>
            &nbsp; 이 규칙에 따르면 <MathExpression equation={`\\((x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x + 1)^2 \\)`} />의 전개식을&nbsp;
            <MathExpression equation={`\\(x\\)`} />에 대하여 내림차순으로 정리했을 때의 각 항의 계수의 배열은,
            <MathExpression equation={`\\(111111111^2 = \\)`} />
            <Typography useSticker useGap={false} fontSize='32px' lineHeight='50px' weight='var(--font-weight-bold)'>
              12345678
              <Typography useGap={false} fontSize='32px' lineHeight='50px' weight='var(--font-weight-bold)'>
                <Box
                  position='absolute'
                  width='22px'
                  height='32px'
                  useRound
                  background='var(--color-h-math-blue-normal)'
                  opacity='25%'
                  zIndex='-1'
                  top={8}
                  left={-1}
                />
                987654321
              </Typography>
            </Typography>
            &nbsp;의 우변의 수와 같아진다.
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM01401;
