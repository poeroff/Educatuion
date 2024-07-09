import { Box, BoxWrap, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Spin! Spin! Spin!',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo: IQuestionProps = {
    text: '활동을 직접 해 봅시다.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/ME1-L02-C03-A02-P02.mp3',
    captionSrc: '/L02/C03/A02/ME1-L02-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L02/C03/A02/ME1-L02-C03-A02-P03-1.jpg'}
              width='410px'
              alt='10~30점이 쓰여진 다트판
                10: eat ice cream, buy umbrella 
                20: drink hot chocolate, skate
                30: surf, ride bikes'
            />
          </PinchZoom>
        </Box>
        <Box hAlign='center' flexDirection='column' useFull>
          <PinchZoom>
            <Image src={'/L02/C03/A02/ME1-L02-C03-A02-P03-2.jpg'} width='400px' height='150px' alt='hot 더운, snowy 눈 오는, sunny 맑은' />
          </PinchZoom>
          <PinchZoom>
            <Image
              src={'/L02/C03/A02/ME1-L02-C03-A02-P03-3.jpg'}
              width='400px'
              height='150px'
              alt='rainy 비 오는, windy 바람 부는, cold 추운, cloudy 흐린'
            />
          </PinchZoom>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P03;
