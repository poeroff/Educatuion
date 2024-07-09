import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes, Scroll } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Beauty of Poems',
  };

  const questionInfo = {
    text: 'Read the poems from the U.S.',
  };

  const content = [
    { text: 'The night is beautiful,\n' },
    { text: 'So the faces of my people.\n' },
    { text: 'The stars are beautiful,\n' },
    { text: 'So the eyes of my people.\n' },
    { text: 'Beautiful, also, is the sun.\n' },
    { text: 'Beautiful, also, are the souls of my people.\n' },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' useFull>
        <TextBoard color={'var(--color-yellow-500 )'} width='600px'>
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM} color='var(--color-white)' weight={'var(--font-weight-extraBold)'}>
              My People
            </Typography>
          </Box>
          <Box>
            <Scroll height='300px' tabIndex={101}>
              <Box textAlign='right'>
                <Typography size={EStyleFontSizes.SMALL}>by Langston Hughes</Typography>
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

export default P02;
