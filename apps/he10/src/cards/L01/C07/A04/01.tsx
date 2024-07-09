import { Box, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo: IQuestionProps = {
    text: 'What do you think are the advantages and disadvantages of working with others? Check out the example.',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C07/A04/HE1-L01-C07-A04-P01.mp3',
    captionSrc: '/L01/C07/A04/HE1-L01-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box hAlign='center' useFull>
        <PinchZoom>
          <Image src='/L01/C07/A04/HE1-L01-C07-A04-P01.jpg' alt='' width='696px' height='274px' ariaDescribedby='img_desc' />
          <Box type='hidden' id='img_desc'>
            <p>남학생과 여학생이 서로 마주보고 대화하는 장면</p>
            <p>
              여학생: Personally, I think working with others is enjoyable and productive. It gives me the opportunity to hear different points of
              view and helps me come up with new ideas.
            </p>
            <p>남학생: I think working with others is not always a good idea because you may have trouble communicating with them.</p>
          </Box>
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
