import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        폐건전지를 행정 복지 센터에 가져가면
        <br />
        생활용품으로 바꿔 준대. 그동안 모은
        <br />
        폐건전지를 한 상자에 20개씩
        <br />
        담았더니 4상자가 되었어.
        <br />
        폐건전지를 모두 몇 개 모은 걸까?
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull>
        <Box display='flex' marginLeft={20} vAlign='center'>
          <Box marginTop='4px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' size={EStyleFontSizes['MEDIUM']}>
            그런데 21÷7의 몫은 어떻게 구할까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A04/0002/03/MA31401.png'} alt='' width='560px' height='auto' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  right: -16px;
  bottom: -10px;
`;

export default P01;
