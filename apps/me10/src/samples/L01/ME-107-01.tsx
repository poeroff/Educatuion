import { useState } from 'react';
import {
  TMainHeaderInfoTypes,
  IQuestionProps,
  Box,
  Image,
  Input,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  SimpleAudioPlayer,
  Typography,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const ME10701 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Read and Write',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 참고하여 선생님의 질문에 대한 학생들의 대답을 완성해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='flex-end'>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound />
      </Box>
      <Box vAlign='center' marginTop='10px'>
        <Box marginRight='14px'>
          <Image src={'/example/ME1-L01-C07-A02-P01-01.png'} width='auto' height='150px' alt='단발머리 여자 선생님의 얼굴 ‘Ms.Seo‘' />
        </Box>
        <Box marginRight='14px'>
          <Balloon place='left' backgroundColor='var(--color-white)' isShadow>
            <Typography>
              I have my school survival kit. I feel okay with it.
              <br /> What do you want in your school survival kit?
            </Typography>
          </Balloon>
        </Box>
        <SimpleAudioPlayer audioSrc={''} />
      </Box>
      <Box vAlign='center' hAlign='flex-end' marginTop='10px'>
        <Box marginRight='14px'>
          <Balloon place='right' backgroundColor='var(--color-green-100)' isShadow>
            <Typography>For me, a</Typography>
            <Input width='243px' placeholder='내용을 넣어 주세요.' ariaLabel='답변 입력란' value={value} onChange={e => setValue(e.target.value)} />
            <Typography>.</Typography>
          </Balloon>
        </Box>
        <Image src={'/example/ME1-L01-C07-A02-P01-02.png'} width='auto' height='180px' alt='남학생의 얼굴과 주황색 공 ‘Jiwon' />
      </Box>
    </Container>
  );
};

export default ME10701;
