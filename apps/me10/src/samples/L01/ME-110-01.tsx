import { useState } from 'react';

import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, DropZone, IChipButtonInfo } from '@maidt-cntn/ui/en';

const ME11001 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [clickedChipButtons, setClickedChipButtons] = useState<number[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'funActivity',
  };

  const questionInfo: IQuestionProps = {
    text: '카드를 조합하여 문장을 완성해 봅시다.',
  };

  const chipButtonInfo: IChipButtonInfo[] = [
    {
      text: 'don’t',
      backgroundColor: 'var(--color-yellow-200)',
    },
    {
      text: 'I',
      backgroundColor: 'var(--color-green-200)',
    },
    {
      text: 'eat lemon.',
      backgroundColor: 'var(--color-red-200)',
    },
    {
      text: 'He',
      backgroundColor: 'var(--color-blue-200)',
    },
    {
      text: 'have a mirror.',
      backgroundColor: 'var(--color-pink-300)',
    },
    {
      text: 'doesn’t',
      backgroundColor: 'var(--color-purple-200)',
    },
  ];

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
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <DropZone
        chipButtonInfo={chipButtonInfo}
        chipButtonOnClick={chipButtonOnClick}
        chipButtonMinWidth='248px'
        clickedChipButtons={clickedChipButtons}
        resetButtonOnClick={resetButtonOnClick}
      />
    </Container>
  );
};

export default ME11001;
