import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text:
      '우주 과학관에 현장 체험 학습을 왔어. ' + '에어 로켓 발사 체험을 하려고 ' + '줄을 섰더니 17명씩 4줄이 되었어. ' + '모두 몇 명이 줄을 선 걸까?',
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Typography></Typography>
      <Box useFull>
        <Box display='flex' marginLeft={20} vAlign='center'>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            모두 몇 명이 줄을 선 걸까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image
            src={'/A04/0005/03/MA31404.png'}
            alt='학생들이 우주 과학관에서 에어 로켓 발사 체험을 하려고 줄을 서고 있습니다.'
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
