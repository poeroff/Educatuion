import { useState } from 'react';
import { Image, BoxWrap, Box, TMainHeaderInfoTypes, Textarea, PinchZoom, Question, Mark } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE00304 = () => {
  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo = {
    mark: 'correct',
    text: 'Look at the question and predict the content.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Question size={'small'}>1. What is the purpose of the speech?</Question>

      <BoxWrap height={'311px'}>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/A01/0001/01/P1-IMG-1.png'}
              width='450px'
              height='280px'
              alt='여학생이 연단에 서서 연설을 하는 모습'
              title='여학생이 연단에 서서 연설을 하는 모습'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea value={value} onChange={event => setValue(event.target.value)} placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00304;
