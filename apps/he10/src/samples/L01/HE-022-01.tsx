import { Box, TMainHeaderInfoTypes, Dialog, Label, Typography, Scroll } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02201 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Refer to the example, put the word cards in the correct order.',
  };

  const chipButtonInfo: IChipButtonInfo[] = [
    {
      text: 'who',
    },
    {
      text: 'that’s',
    },
    {
      text: 'beautiful',
    },
    {
      text: 'poetry',
    },
    {
      text: 'makes',
    },
  ];
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);

  const chipButtonOnClick = (index: number) => {
    if (clickedChipButtons.includes(index)) {
      setClickedChipButtons(prev => prev.filter(value => value !== index));
    } else {
      setClickedChipButtons([...clickedChipButtons, index]);
    }
  };

  const resetButtonOnClick = () => {
    setClickedChipButtons([]);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box marginBottom='24px' useRound height='137px' background='white' padding='10px'>
        <Scroll tabIndex={0}>
          <Box display='flex'>
            <Box marginTop='6px'>
              <Label value='M' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography lineHeight='42px'>
              Well, It’s said that there was a cold-blooded king named Lang Darma, who had a black tongue. To prove they
            </Typography>
          </Box>
          <Box display='flex' marginTop='10px'>
            <Box marginTop='6px'>
              <Label value='M' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography lineHeight='42px'>
              Well, It’s said that there was a cold-blooded king named Lang Darma, who had a black tongue. To prove they
            </Typography>
          </Box>
        </Scroll>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02201;
