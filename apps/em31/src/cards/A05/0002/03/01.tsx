import EM00701question from '@/assets/icon/EM00701question-mark.svg';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box marginTop={40}>
        <Typography fontSize='25px'>
          할아버지께서 수박을 주셨어.
          <br /> 앗! 수박을 먹다가 수박씨를 떨어뜨렸네.
          <br /> 수박씨의 길이는 약 1 cm구나.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='26px' lineHeight='50px'>
            수박씨의 길이를 더 정확하게 나타낼 수 있을까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A05/0002/03/MA31502_리터칭.png'} alt='수박씨가 자 위로 떨어졌습니다.' width='auto' height='500' />
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
