import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        도움 로봇과 마음 로봇은 아플 때 우리를 도와줘. 몸의 움직임이 불편한 환자를 도와주는 도움 로봇이 244대 있고, 마음을 헤아려 소통할 수 있는 마음
        로봇이 112대 있어.
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
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            도움 로봇은 마음 로봇보다
            <br /> 몇대 더 많을까?
          </Typography>
        </Box>
        <Box marginTop={200}>
          <BackgroundImage>
            <Image
              src={'/A01/0005/03/MA31104_리터칭.png'}
              alt='도움 로봇이 몸의 움직임이 불편한 환자를 도와주고, 마음 로봇이 할머니와 소통하고 있습니다.'
              width='460px'
              height='auto'
            />
          </BackgroundImage>
        </Box>
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
