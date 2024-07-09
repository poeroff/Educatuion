import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Beauty of Poems',
  };

  const questionInfo = {
    text: 'Read the poems from Chile.',
  };

  const content = [
    { text: 'Give me your hand and\n' },
    { text: 'give me your love,\n' },
    { text: 'give me your hand and\n' },
    { text: 'dance with me.\n' },
    { text: 'A sing leflower, and nothing more,\n' },
    { text: 'a sing leflower is all we’ll be.\n' },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' useFull>
        <TextBoard color={'var(--color-yellow-500 )'} width='600px'>
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM} color='var(--color-white)' weight={'var(--font-weight-extraBold)'}>
              Give Me Your Hand
            </Typography>
          </Box>
          <Box>
            <Scroll height='300px' tabIndex={101}>
              <Box textAlign='right'>
                <Typography size={EStyleFontSizes.SMALL}>by Gabriela Mistral</Typography>
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

export default P03;
