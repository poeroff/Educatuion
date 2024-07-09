import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '나무 심기 행사에서 오늘 심을 나무는 325그루야. 함께 힘을 모아 오전에 168그루를 심었어.',
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Typography></Typography>
      <Box useFull>
        <Box display='flex' marginLeft={20} vAlign='center'>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-pink-900)' fontSize='var(--font-size-36)' lineHeight='50px'>
            오후에는 나무를 몇 그루 심어야 할까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A01/0007/03/MA31106_리터칭.png'} alt='남학생과 여학생이 나무를 심고 있습니다.' width='582px' height='462px' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  right: -31px;
  bottom: 59px;
`;

export default P01;
