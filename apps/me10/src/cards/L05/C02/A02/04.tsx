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

const P04 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'View Ahead',
    headerPattern: 'icon',
    iconType: 'play',
  };

  const questionInfo: IQuestionProps = {
    text: 'What will Sophie say?',
    type: 'text',
  };

  const data: IListenAndAnswer[] = [
    {
      name: 'Sophie :',
      question: `Why don't you try this juice?`,
      answer: '이 주스를 마셔 보겠니?',
    },
    {
      name: 'A :',
      question: `Sure. Thanks.`,
      answer: '좋아. 고마워.',
    },
  ];

  const longNameWidth = 127;

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <BoxWrap height='354px'>
        <Box marginTop='14px'>
          <VideoPlayer videoSrc={'/L05/C02/A02/ME1-L05-C02-A02-P04.mp4'} srtFile={'/L05/C02/A02/ME1-L05-C02-A02-P04.srt'} width={465} />
        </Box>
        <Box height='340px'>
          <TextView title='B script' hAlign='start' padding='20px 16px'>
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

export default P04;
