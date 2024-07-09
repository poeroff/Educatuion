import { useState } from 'react';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, Typography, Drawing, Button, ETagLine, Tag, EStyleButtonTypes } from '@maidt-cntn/ui';

const HM01505 = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} submitLabel='풀이' onSubmit={() => {}} vAlign='flex-start'>
      <BoxWrap>
        <Box>
          <Typography fontSize='var(--font-size-32)' lineHeight='48px'>
            오른쪽은&nbsp;
            <MathExpression equation={`$-1\\le x \\le0$`} />
            &nbsp; 일때, 이차함수 &nbsp;
            <MathExpression equation={`$y=-2x^2+4x+3$`} />
            &nbsp;의 최댓값과 최솟값을 구한 것이다. 잘못된 부분을 찾아 바르게 고쳐보자.
          </Typography>
        </Box>
        <Box minWidth={407} maxWidth={407} background='var(--color-yellow-100)' padding='20px 12px' useRound>
          <Typography fontSize='var(--font-size-20)' lineHeight='30px'>
            <MathExpression equation={`$y=-2x^2+4x+3=-2(x-1)2+5$`} /> 이므로
            <BoxWrap marginLeft='40px'>
              <Box width='40%'>
                <MathExpression equation={`$x=-1$`} /> 일 때
              </Box>
              <Box>
                <MathExpression equation={`$y=-3$`} />
              </Box>
            </BoxWrap>
            <BoxWrap marginLeft='40px'>
              <Box width='40%'>
                <MathExpression equation={`$x=0$`} /> 일 때
              </Box>
              <Box>
                <MathExpression equation={`$y=3$`} />
              </Box>
            </BoxWrap>
            <BoxWrap marginLeft='40px'>
              <Box width='40%'>
                <MathExpression equation={`$x=1$`} />일 때
              </Box>
              <Box>
                <MathExpression equation={`$y=5$`} />
              </Box>
            </BoxWrap>
            따라서 최댓값은 5이고 최솟값은 -3이다.
          </Typography>
        </Box>
      </BoxWrap>
      <Box hAlign='center' marginTop='24px'>
        <Drawing height='220px' width='952px' />
      </Box>
      <Box marginTop='40px'>
        <Button color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
          <Tag type={ETagLine.GREEN} label='풀이' fontSize='24px' height='38px' useTypoPadding={false} />
        </Button>
        {show && (
          <Box marginTop='22px'>
            <Typography weight='var(--font-weight-medium)'>
              이차함수
              <MathExpression equation={'$y=-2x^2+4x+3$'} />의 그래프의 꼭짓점의&nbsp;
              <MathExpression equation={'$x$'} /> 좌표 1은 주어진 <MathExpression equation={'$x$'} />
              값의 범위&nbsp;
              <MathExpression equation={'$-1 \\le x \\le 0$'} />에 포함되지 않으므로&nbsp;
              <MathExpression equation={'$x=1$'} />
              에서의 함숫값 5는 최댓값이 아니다. <br />
              <MathExpression equation={'$-1 \\le x \\le 0$'} />
              일때, 이차함수&nbsp;
              <MathExpression equation={'$y=-2x^2+4x+3$'} />의 최댓값은 3이다.
            </Typography>
          </Box>
        )}
      </Box>
    </HContainer>
  );
};

export default HM01505;
