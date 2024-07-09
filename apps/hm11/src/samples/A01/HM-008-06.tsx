import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, Image, Question, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM00806 = () => {
  const [show, setShow] = useState<boolean>(false);

  const expressions = [
    {
      content: <MathExpression equation={`$\\{(a+b)+c\\}^2$`} />,
    },
    {
      content: (
        <>
          <Button height='32px' color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명' style={{ padding: 0 }}>
            <Typography width='110px' useGap={false} useSticker>
              <MathExpression equation={`$(a+b)^2$`} />
            </Typography>
          </Button>
          <MathExpression equation={`$+ 2(a+b)c+c^2$`} />
        </>
      ),
    },
    {
      content: <MathExpression equation={`$a^2+2ab+b^2+2ac+2bc+c^2$`} />,
    },
    {
      content: <MathExpression equation={`$a^2+b^2+c^2+2ab+2bc+2ca$`} />,
    },
  ];

  const expression_learn = [
    ['$(a+b)^2=a^2+2ab+b^2, \n (a-b)^2=a^2-2ab+b^2$'],
    ['$(a+b)(a-b)=a^2-b^2$'],
    ['$(x+a)(x+b) \n =x^2+(a+b)x+ab$'],
    ['$(ax+b)(cx+d) = acx^2+(ad+bc)x+bd$'],
  ];

  const headerInfo: THighLevelMainHeaderInfoTypes = { headerPattern: 'text' };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Typography>
        &nbsp; 특별한 형태의 다항식의 곱을 전개할 때, 다항식의 곱셈에 대한 성질과 중학교에서 배운 곱셈 공식을 이용하면 편리하다. <br />
        &nbsp; 예를 들어 <MathExpression equation={`$(a+b+c)^2$`} />을 전개하면 다음과 같다.
      </Typography>
      <Box marginTop='24px' hAlign='space-between'>
        <Box width='67%' vAlign='center' justifyContent='flex-end'>
          <Box vAlign='baseline' padding='4px 12px 18px 12px'>
            <MathExpression equation={`$(a+b+c)^2$`} />
            &nbsp;
            <Box vAlign='center' flexDirection='column'>
              {[...Array(expressions.length)].map((_, index) => {
                return (
                  <Typography key={index} style={{ marginTop: '16px' }} useGap={false}>
                    =
                  </Typography>
                );
              })}
            </Box>
          </Box>
          <Box vAlign='flex-start' flexDirection='column' gap='12px'>
            {expressions.map((item, _) => (
              <Typography useGap={false} useSticker>
                {item.content}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box>
          <Image src='../../assets/example/HM-008-06/M1-1-1-02-01.png' width='243px' height='245px' />
          <Box type='hidden'>
            왼쪽 상단부터 가로 및 세로가 a인 넓이가 a제곱인 사각형, 가로가 b이고 세로가 a인 넓이가 ab인 사각형, 가로가 c이고 세로가 a인 넓이가 ca인
            사각형, 가로가 a이고 세로가 b인 넓이가 ab인 사각형, 가로와 세로가 b인 넓이가 b제곱인 사각형, 가로가 c이고 세로가 b인 넓이가 bc인 사각형,
            가로가 a이고 세로가 c인 넓이가 ca인 사각형, 가로가 b이고 세로가 c인 넓이가 bc인 사각형, 가로 및 세로가 c인 넓이가 c제곱인 사각형 총 9개가
            있습니다.
          </Box>
        </Box>
      </Box>
      <Box display={show ? 'block' : 'none'} flex={1} marginTop={24} padding='12px 24px' background='var(--color-h-math-blue-gb)' useRound>
        <Typography>
          {expression_learn.map((ex, index) => (
            <>
              <Question key={index} subject='math' type='dot' size='small'>
                {ex.map((eq, eqIndex) => (
                  <>
                    <MathExpression equation={eq} />
                    {eqIndex < ex.length - 1 && <Typography>, </Typography>}
                  </>
                ))}
              </Question>
              <br />
            </>
          ))}
        </Typography>
      </Box>
    </HContainer>
  );
};

export default HM00806;
