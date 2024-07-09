import { Box, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE00601 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Think and Talk',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'What do you think are the advantages and disadvantages of working with others? Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box hAlign='center'>
        <PinchZoom>
          <Image src={'/example/HE1-L01-C07-A04-P01.jpg'} width='696px' height='269px' />
          <Box type='hidden'>
            남학생과 여학생이 서로 마주보고 대화하는 장면 여학생: Personally, I think working with others is enjoyable and productive. It gives me the
            opportunity to hear different points of view and helps me come up with new ideas. 남학생: I think working with others is not always a good
            idea because you may have trouble communicating with them.
          </Box>
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default HE00601;
