import { Box, IQuestionProps, Image, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '1 cm보다 작은 단위 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />1 cm보다 작은 단위를 알아보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' flexDirection='column'>
        <Image src={'/A05/0002/04/MC31502.png'} width='426px' height='165px' alt='자를 살펴보면 눈금 0과 1 사이에 10칸이 있습니다.' />
        <Box width='80%' margin='24px 0'>
          <Typography useGap={false} align='center' lineHeight='42px'>
            1 cm를 10칸으로 똑같이 나누었을 때 작은 눈금 한 칸의 길이를{' '}
            <Typography color='var(--color-red-700)' weight='var(--font-weight-bold)' useGap={false} title='빨간색 글자'>
              1 mm
            </Typography>
            라 쓰고&nbsp;
            <Typography color='var(--color-red-700)' weight='var(--font-weight-bold)' useGap={false} title='빨간색 글자'>
              1 밀리미터
            </Typography>
            라고 읽습니다.
          </Typography>
        </Box>
        <Box backgroundColor='var(--color-white)' padding='4px 24px' borderRadius={16}>
          <Typography fontSize='36px' lineHeight='54px'>
            1 cm = 10 mm
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
