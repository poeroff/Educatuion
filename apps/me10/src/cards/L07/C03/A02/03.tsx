import { Box, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Guess Who',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo: IQuestionProps = {
    text: '활동을 직접 해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center'>
        <Typography weight='var(--font-weight-bold)' color='var(--color-blue-600)'>
          인물 카드 A
        </Typography>
      </Box>
      <Box hAlign='center' useFull gap={10}>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P03-1.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                Marie Curie
                She is a famous scientist.
                1. She is from Poland.
                2. She won the Nobel Prize in
                1903 and 1911.'
          />
        </PinchZoom>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P03-2.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                Yuna Kim
                She is a famous skater.
                1. She is from Korea.
                2. She was the 2010 Olympic champion.'
          />
        </PinchZoom>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P03-3.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                Vincent van Gogh
                He is a famous painter.
                1. He is from the Netherlands.
                2. He painted Sunflowers.'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P03;
