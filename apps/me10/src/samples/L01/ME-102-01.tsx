import { useState } from 'react';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  ToggleButton,
  EStyleFontSizes,
  VideoPlayer,
  TextView,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import sampleVideoSource from '@maidt-cntn/assets/example/sample_video.mp4';

interface IListenAndAnswer {
  question: string;
  answer: string;
  name: string;
}

const ME10201 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'play',
    headerText: 'View Ahead',
  };

  const questionInfo: IQuestionProps = {
    text: 'What will Max say?',
  };

  const data: IListenAndAnswer[] = [
    {
      name: 'Judy :',
      question: 'Hi, I’m Judy. \n Nice to meet you.',
      answer: '안녕, 나는 Judy야. \n 만나서 반가워',
    },
    {
      name: 'Max :',
      question: 'Nice to meet you, too. \n My name is Max.',
      answer: '나도 만나서 반가워. \n 내 이름은 Max야.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <Box hAlign='flex-end'>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </Box>
      <BoxWrap height='354px'>
        <Box marginTop='14px'>
          <VideoPlayer videoSrc={sampleVideoSource} srtFile={''} width={465} />
        </Box>
        <Box height='340px'>
          <TextView title='A script' hAlign='start'>
            <Scroll tabIndex={0}>
              <List<IListenAndAnswer>
                data={data}
                row={({ value }) => (
                  <BoxWrap>
                    <Box marginRight='10px' whiteSpace='nowrap'>
                      <Typography weight='var(--font-weight-bold)'>{value?.name}</Typography>
                    </Box>

                    <Box flexDirection='column' textAlign='start'>
                      <Typography color='var(--color-grey-900)' align='left'>
                        {value?.question}
                      </Typography>
                      <Box height='72px'>
                        <Typography color='var(--color-blue-900)' fontSize='22px' lineHeight='32px'>
                          {isOpen && value?.answer}
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

export default ME10201;
