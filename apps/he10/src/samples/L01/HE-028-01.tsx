import { Box, ChipButton, EChipButtonType, IQuestionProps, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const HE02801 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '1 ',
    text: 'Arrange the sentences in the correct order.',
  };

  const data = [
    {
      text: `Jenny, you seem a bit down. What's wrong?`,
    },
    {
      text: `No. I'm worried it might harm our friendship.`,
    },
    {
      text: `I understand how you feel, Have you considered discussing your concerns with him openly?`,
    },
    {
      text: `You'v argued with each other before, but you've always made up and gotten along. I think he'll understand.`,
    },
    {
      text: `Well, my band's getting ready for the school festival, but Rory, the guiterist, is always late. I'm really stressed out.`,
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'start'}
      submitLabel={'완료 하기'}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Scroll>
        <List
          data={data}
          row={({ value, index }) => (
            <Box useFull hAlign={'start'}>
              <Box hAlign={'center'} marginRight={'8px'}>
                <ChipButton width='38px' height='38px' status={EChipButtonType.UP} />
              </Box>
              <Box hAlign={'center'} marginRight={'8px'}>
                <ChipButton width='38px' height='38px' status={EChipButtonType.DOWN} />
              </Box>
              <Typography>{index + '. ' + value?.text}</Typography>
            </Box>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default HE02801;
