import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  IQuestionProps,
  List,
  ListHeader,
  Scroll,
  TMainHeaderInfoTypes,
  TextView,
  ToggleButton,
  Typography,
  VideoPlayer,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
  name: string;
}

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'View Ahead',
    headerPattern: 'icon',
    iconType: 'play',
  };

  const questionInfo: IQuestionProps = {
    text: 'What will Jenny say?',
    type: 'text',
  };

  const data: IListenAndAnswer[] = [
    {
      name: 'Jenny :',
      question: `What's the weather like today?`,
      answer: '오늘 날씨가 어때?',
    },
    {
      name: 'A :',
      question: `It's... cloudy. Oh, no... rainy.`,
      answer: '흐려... 오, 아니... 비가 와.',
    },
  ];

  const longNameWidth = 116;
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <BoxWrap height='354px'>
        <Box marginTop='14px'>
          <VideoPlayer videoSrc={'/L02/C02/A02/ME1-L02-C02-A02-P02.mp4'} srtFile={'/L02/C02/A02/ME1-L02-C02-A02-P02.srt'} width={465} />
        </Box>
        <Box height='340px'>
          <TextView title='A script' hAlign='start' padding='20px 16px'>
            <Scroll tabIndex={0}>
              <List<IListenAndAnswer>
                data={data}
                row={({ value }) => (
                  <BoxWrap>
                    <Box marginRight='10px' whiteSpace='nowrap' textAlign='right' width={longNameWidth}>
                      <Typography size={EStyleFontSizes.MEDIUM} weight='bold'>
                        {value?.name}
                      </Typography>
                    </Box>

                    <Box flexDirection='column' textAlign='start' width={371 - longNameWidth}>
                      <Typography color='var(--color-grey-900)' size={EStyleFontSizes.MEDIUM}>
                        {value?.question}
                      </Typography>

                      <Box height='72px'>
                        <Typography color='var(--color-blue-900)' fontSize='22px' lineHeight='32px'>
                          {isOpen ? value?.answer : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </BoxWrap>
                )}
              />
            </Scroll>
          </TextView>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
