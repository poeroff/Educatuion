import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';
const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        동생과 함께 텃밭에 토마토 *모종을 심으려고 해.
        <br />
        토마토 모종 6개를 2명이 똑같이 나누어 심을 거야.
        <br />
        <Typography usePre color='var(--color-blue-500)' fontSize='30px'>
          * 모종: 옮겨 심으려고 가꾼 어린 식물.
        </Typography>
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull>
        <Box display='flex' marginLeft={20} position='relative' zIndex={1}>
          <SvgIcon src={EM00701question} size='35px' />
          <Typography usePre color='var(--color-red-900)' fontSize='31px'>
            한 명이 모종을 몇 개 심을 수 있을까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image
            src={'/A03/0002/03/MA31301_리터칭.png'}
            height='400px'
            width='100%'
            alt='학생이 모종이 든 화분을 들고 걸어가고 있습니다. 학생 뒤에는 모종을 키우는 비닐하우스가 있습니다.'
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
