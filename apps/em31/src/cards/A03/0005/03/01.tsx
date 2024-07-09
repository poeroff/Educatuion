import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        공원에 있는 자전거 보관대에 자전거 21대를 놓을 거야. 보관대 한 개에는 자전거를 7대씩 놓을 수 있대. 21÷7을 계산하면 필요한 자전거 보관대 수를
        알 수 있겠구나!
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='34px' lineHeight='50px'>
            그런데 21÷7의 몫은 어떻게
            <br /> 구할까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image role='img' src={'/A03/0005/03/MA31304_리터칭.png'} alt='공원에 자전거 보관대가 있습니다.' width='560px' height='auto' />
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
