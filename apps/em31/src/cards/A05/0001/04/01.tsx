import { EStyleFontSizes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM} align='center' width='100%'>
        이 단원을 공부하기 위해서는 <br />
        2학년 때 공부한 길이와 단위를 <br />
        알고 있어야 해요. <br />
        문제를 풀며 배운 내용을 떠올려 볼까요?
      </Typography>
    </Container>
  );
};

export default P01;
