import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        나와 지수는 건강을 위해 매일 줄넘기를 해.
        <br />
        나는 줄넘기를 41회 했는데
        <br />
        지수는 나의 3배만큼 했대.
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
            지수는 줄넘기를 몇 회 한 걸까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A04/0004/03/MA31403.png'} alt='학생 두 명이 줄넘기를 하고 있습니다.' width='560px' height='auto' />
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
