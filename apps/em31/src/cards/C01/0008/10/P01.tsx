import { Container } from '@maidt-cntn/ui/math';
import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='baseline' fontSize={28} fontWeight={'var(--font-weight-medium)'}>
        <Box marginRight={20}>[1~3]</Box>
        글을 읽고 물음에 답하세요.
      </Box>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <Typography lineHeight='48px'>
        봉투에 쌀을 담아 기부하는 행사를 했습니다. 이틀 동안 마을 사람들이 기부한 쌀 봉투가 1000개가 넘으면 행복 기업이 같은 양의 쌀을 기부하겠다고
        약속했습니다. 마을 사람들이 기부한 쌀 봉투는 첫째 날 496 개, 둘째 날 508 개입니다.
      </Typography>
    </Container>
  );
};

export default P01;
