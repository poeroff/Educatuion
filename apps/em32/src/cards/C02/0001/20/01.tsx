import { Container } from '@maidt-cntn/ui/math';
import { Box, SvgIcon, IQuestionProps, Image, BoxWrap, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>원 알아보기</Box>
      </>
    ),
  };

  return (
    <Container bodyId='targetContainer' headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box useFull>
        <Typography>그림과 같은 모양의 도형을 원이라고 합니다.</Typography>
      </Box>
      <BoxWrap justifyContent='center'>
        <Box marginBottom={90} width='90%' hAlign='center' flexDirection='column'>
          <Image src='/C02/0001/20/DEC322I01.png' alt='왼쪽부터 크기가 가장 큰 원부터 차례로 크기가 서로 다른 원이 3개의 그림입니다.' height='60%' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
