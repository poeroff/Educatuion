import { Box, EImageType, IAudioPlayerProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Think and talk about the ending of the story. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C07/A04/HE1-L02-C07-A04-P01.mp3',
    captionSrc: '/L02/C07/A04/HE1-L02-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box marginTop='20px' alignContent='center'>
        <PinchZoom>
          <Image
            src={'/L02/C07/A04/HE1-L02-C07-A04-P01.jpg'}
            alt='일곱명의 학생이 나란히 앉아 옆 사람들과 대화 나누는 모습
              여학생: How do you like the ending of the story?
              남학생: I think the ending is beautiful, because Nani Tama passed away happily surrounded by his family and villagers after he completed his task.'
            height='340px'
            style={{ objectFit: 'contain' }}
            type={EImageType.IMG}
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
