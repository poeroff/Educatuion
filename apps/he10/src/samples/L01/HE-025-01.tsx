import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Dialog,
  Typography,
  PinchZoom,
  List,
  SvgIcon,
  EImageType,
  Image,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_right from '@/assets/icon/arrow_right.svg';

const HE02501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Create and Present',
  };

  const questionInfo = {
    text: 'Read Dr. Wise’s advice letter to Yuha and write the correct word from the word box.',
  };

  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState(false);

  const wordArr = ['memory', 'mind', 'map', 'prioritize', 'study', 'subjects'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      useExtend
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <PinchZoom pinchType={'image'}>
            <Image
              type={EImageType.IMG}
              src={'/L01/C09/A02/HE1-L01-C09-A02-P01.jpg'}
              alt="문단별로 구분 지어진 편지 글 Greeting: Dear Yuha, I'm sorry to hear that you're having a tough time studying so many subjects at your new school. Here are some tips that can assist you in studying more effectively."
              width='378px'
              height='266px'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Question size={'small'}>1. Who is this advice letter addressed to, and what is the problem?</Question>
          <Box hAlign='center' vAlign='flex-start'>
            <SvgIcon src={arrow_right} size='38px' />
            <Box flex={1}>
              <Typography> Yuha, Who is worried about having too many</Typography>
              <Input width='228px' value={value} onChange={e => setValue(e.target.value)} placeholder='내용을 넣어 주세요.' />
              <Typography>to study.</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <Box marginTop='20px'>
        <TextView title='보기'>
          <List align='horizontal' data={wordArr} row={({ value, index = 1 }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02501;
