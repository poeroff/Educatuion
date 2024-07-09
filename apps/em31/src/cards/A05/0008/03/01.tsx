import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '../../../../assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <>우리 가족은 217번 버스를 타고 놀이공원에 갈 거야.</>,
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            시간의 덧셈과 뺄셈을 {'\n'}해 볼까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image
            src={'/A05/0008/03/MA31506-1.png'}
            alt='버스 정류장의 디지털 표시판에 현재 시각이 8시 5분 10초로 나타나있고 15번 버스는 5분 45초 후 , 217번 버스는 2분 20초 후 , 9010번 버스는 14분 30초 후 도착 예정임이 표시된 이미지입니다.'
            width='700px'
            height='521px'
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
