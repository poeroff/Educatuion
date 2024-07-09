import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        6월 5일은 환경의 날!
        <br />
        오늘 깨끗한 마을 만들기 행사를 했어.
        <br />
        마을 쓰레기를 한 반에서 12자루씩 4개 반이 주웠지
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
            쓰레기를 모두 몇 자루 주운 걸까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image
            src={'/A04/0003/03/MA31402.png'}
            alt='3명의 학생이 마을 쓰레기를 주우려 하고 있습니다. – 꺠끗한 마을을 만들어요'
            width='560px'
            height='auto'
          />
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
