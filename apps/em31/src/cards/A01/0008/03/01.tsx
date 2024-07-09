import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <>오늘 우리 학교 3학년 학생이 모두 진로 체험관에 왔어.</>,
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull>
        <Box display='flex' marginLeft={20}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-pink-900)' fontSize='var(--font-size-36)'>
            어림셈을 이용하여 문제를 해결해 볼까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A01/0008/03/MA31107_리터칭 1.png'} alt='진로 체험관 앞에 학생들이 서 있습니다.' width='582px' height='auto' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  right: -16px;
  bottom: 0px;
`;

export default P01;
