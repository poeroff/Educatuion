import { Box, IAudioPlayerProps, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Bingo',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo: IQuestionProps = {
    text: '활동을 직접 해 봅시다.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C03/A02/ME1-L06-C03-A02-P02.mp3',
    captionSrc: '/L06/C03/A02/ME1-L06-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box hAlign='center' useFull>
        <PinchZoom>
          <Image
            src={'/L06/C03/A02/ME1-L06-C03-A02-P01.jpg'}
            width='410px'
            height='400px'
            alt='나의 관심사(노란색 칸)과 나의 장래희망(연두색 칸)을 적을 수 있도록 가로 4칸, 세로 4칸씩 16칸으로 구성된 빙고판'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P03;
