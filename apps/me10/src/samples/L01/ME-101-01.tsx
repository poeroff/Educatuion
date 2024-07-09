import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  IQuestionProps,
  BoxWrap,
  PinchZoom,
  TextView,
  SimpleAudioPlayer,
  Recorder,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME10101 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Warm Up',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 예시를 참고하여 반 친구들에게 자신을 소개하는 말을 해 봅시다.',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        <Box>
          <PinchZoom>
            <Image
              src='/example/ME1-L01-C01-A02-P01.png'
              width='582px'
              height='340px'
              alt='교실에 농구공을 가지고 있는 남학생과 그 짝꿍 , 과자를 먹으며 즐겁게 이야기를 나누고 있는 여학생 3명과 그 짝꿍 , 헤드폰을 끼고 음악을 듣고 있는 여학생과 그 짝꿍 , 안경을 끼고 책을 읽고 있는 여학생이 앉아 있는 그림과 그 짝꿍'
            />
          </PinchZoom>
        </Box>
        <Box>
          <TextView title='보기' height='238px'>
            <Typography align='left' useGap={false}>
              Hi, I'm Jiwon.
              <br />
              Nice to meet you.
              <br />
              Do you like basketball?
            </Typography>
            <Box marginTop='20px'>
              <SimpleAudioPlayer audioSrc={''} />
            </Box>
          </TextView>
          <Box hAlign='center' padding='24px' marginTop='10px'>
            <Recorder recorderIndex={0} />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME10101;
