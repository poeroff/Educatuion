import { Image, Box, TMainHeaderInfoTypes, TextView } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02200 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Refer to the example, put the word cards in the correct order.',
  };

  const [isShow, setShow] = useState(false);

  const chipButtonInfo: IChipButtonInfo[] = [
    {
      text: 'broke the world record',
    },
    {
      text: 'who',
    },
    {
      text: 'The athlete',
    },
    {
      text: 'has inspired other players.',
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
      <Box marginBottom='39px'>
        <TextView title='보기'>
          <Image
            src={'/HE1-L01-C08-A02.jpg'}
            width={'636px'}
            alt='(When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와 선으로 연결되어 있다'
          />
        </TextView>
      </Box>

      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />
    </Container>
  );
};

export default HE02200;
