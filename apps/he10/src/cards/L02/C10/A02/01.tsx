import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Beauty of Poems',
  };

  const questionInfo = {
    text: 'Read the poems from Spain.',
  };

  const content = [
    { text: 'Traveler, your footprints\n' },
    { text: 'are the only road, nothing else.\n' },
    { text: 'Traveler, there is no road;\n' },
    { text: 'you make your own path as you walk.\n' },
    { text: 'As you walk, you make your own road,\n' },
    { text: 'and when you look back\n' },
    { text: 'you see the path\n' },
    { text: 'you will never travel again.\n' },
    { text: 'Traveler, there is no road;\n' },
    { text: 'only a ship’s wake on the sea.\n' },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' useFull>
        <TextBoard color={'var(--color-yellow-500 )'} width='600px'>
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM} color='var(--color-white)' weight={'var(--font-weight-extraBold)'}>
              Traveler, Your Footprints
            </Typography>
          </Box>
          <Box>
            <Scroll height='300px' tabIndex={101}>
              <Box textAlign='right'>
                <Typography size={EStyleFontSizes.SMALL}>by Antonio Machado</Typography>
              </Box>
              <Box display='flex' flexDirection='column'>
                {content.map((value, idx: number) => (
                  <Typography key={idx}>{value?.text}</Typography>
                ))}
              </Box>
            </Scroll>
          </Box>
        </TextBoard>
      </Box>
    </Container>
  );
};

export default P01;
