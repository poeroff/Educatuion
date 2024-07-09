import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  ETextViewColor,
  List,
  RecordButton,
  TMainHeaderInfoTypes,
  TextView,
  Textarea,
  Typography,
  IQuestionProps,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE00302 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Write your hope for this year and share it to the class.',
    mark: 'correct',
  };
  const wordArr = ['I hope I can complete a 5km race.', 'I hope my family can go camping together.'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='제출하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        <Box useFull height='195px'>
          <TextView type={ETextViewColor.DEFAULT} title={'e.g'}>
            <List
              data={wordArr}
              row={({ value }) => (
                <Box textAlign='left'>
                  <Question size='small' type='dot'>
                    <Typography size={EStyleFontSizes['X-MEDIUM']}>{value}</Typography>
                  </Question>
                </Box>
              )}
            />
          </TextView>
        </Box>
        <Box useFull vAlign='center'>
          <Textarea height='195px' placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
      <BoxWrap marginTop='20px'>
        <Box useFull display='flex' justifyContent='center'>
          <RecordButton label={'listen'} />
        </Box>
        <Box useFull display='flex' justifyContent='center'>
          <RecordButton label={'speak'} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00302;
