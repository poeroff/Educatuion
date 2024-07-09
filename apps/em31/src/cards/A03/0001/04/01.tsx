import { Box, EStyleFontSizes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center'>
        <Typography size={EStyleFontSizes.MEDIUM} align='center'>
          이 단원을 공부하기 위해서는 <br />
          2학년 때 공부한 덧셈과 뺄셈, 곱셈, 곱셈구구를 <br />
          알고 있어야 해요. <br />
          문제를 풀며 배운 내용을 떠올려 볼까요?
        </Typography>
      </Box>
    </Container>
  );
};

export default P01;
