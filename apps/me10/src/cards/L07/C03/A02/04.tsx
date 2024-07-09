import { Box, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P04 = () => {
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
        <Typography weight='var(--font-weight-bold)' color='#EB6707'>
          인물 카드 B
        </Typography>
      </Box>
      <Box hAlign='center' useFull gap={10}>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P04-1.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                Leonardo da Vinci
                He is a famous artist.
                1. He is from Italy.
                2. He painted the Mona Lisa.'
          />
        </PinchZoom>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P04-2.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                Lionel Messi
                He is a famous soccer player.
                1. He is from Argentina.
                2. He won the 2022 World Cup.'
          />
        </PinchZoom>
        <PinchZoom>
          <Image
            src={'/L07/C03/A02/ME1-L07-C03-A02-P04-3.jpg'}
            width='310px'
            height='300px'
            alt='인물 카드 
                William Shakespeare
                He is a famous writer.
                1. He is from the UK.
                2. He wrote Romeo and Juliet.'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P04;
