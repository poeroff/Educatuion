import { EStyleFontSizes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM} align='center' width='100%'>
        이 단원을 공부하는 데 <br />
        필요한 내용을 <br />
        스스로 문제를 풀며 확인해 볼까요?
      </Typography>
    </Container>
  );
};

export default P01;
