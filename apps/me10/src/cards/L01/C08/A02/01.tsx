import { Box, BoxWrap, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Across Cultures',
  };

  const questionInfo = {
    text: '선생님!',
  };

  const content = `우리는 선생님을 부를 때, “선생님!”이라고 말하죠? 영어에서는 선생님을 “Teacher!”라고 부르지 않아요. 남자 선생님은 성 앞에 Mr.를, 여자 선생님은 Ms.를 붙여서 불러야 해요.`;

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L01/C08/A02/ME1-L01-C08-A02-P01.jpg'}
              width='400px'
              height='240px'
              alt='남자아이가 선생님을 Ms. Johnson!이라고 부르며 인사한다.'
              title='남자아이가 선생님을 Ms. Johnson!이라고 부르며 인사한다.'
            />
          </PinchZoom>
        </Box>
        <Box hAlign='center'>
          <Box background='white' useRound>
            <Scroll height='100%'>
              <Typography>{content}</Typography>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
