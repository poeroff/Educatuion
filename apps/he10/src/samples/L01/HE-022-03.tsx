import { Box, TMainHeaderInfoTypes, TextView, PinchZoom, Image, EImageType, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE02303 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo = {
    text: 'Find songs that include the structures below.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull flexDirection='column'>
        <Box>
          <TextView title='보기' height='100px'>
            <Image
              src='/L01/C08/A07/HE1-L01-C08-A07-01.jpg'
              width='636px'
              alt='(When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와 선으로 연결되어 있다. '
            />
          </TextView>
        </Box>
        <Box marginTop='20px' useFull hAlign='center' vAlign='flex-start'>
          <PinchZoom>
            <Image src='/L01/C08/A07/HE1-L01-C08-A07-02.jpg' alt='' height='250px' type={EImageType.IMG} />
            <Box type='hidden'>
              <p>왼쪽 이미지 I Won't Give Up by Jason Mraz</p>
              <p>...</p>
              <p>I don't wanna be someone who walks away so easily.</p>
              <p>I'm here to stay and make the difference that I can make.</p>
              <p>...</p>
              <p>오른쪽 이미지 I Do Too by The Reklaws</p>
              <p>...</p>
              <p>Do you ever lie awake at night, staring up at a lonely sky, wondering if it's gonna drop on you, like a rock on you?</p>
              <p>Yeah I do too.</p>
              <p>...</p>{' '}
            </Box>
          </PinchZoom>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE02303;
