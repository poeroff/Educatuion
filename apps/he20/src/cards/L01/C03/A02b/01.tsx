import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setCorrect] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about? Choose the correct one for the blank.',
    mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const data = [
    {
      text: 'safety of drivers',
    },
    {
      text: 'wildlife crossings',
    },
    {
      text: 'road construction',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.mp3',
    captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.srt',
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCorrect(answer === 2);
  };

  const handleShowAnswer = () => {
    setShow(prev => !prev);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={() => {
        isSubmitted ? handleShowAnswer() : handleSubmit();
      }}
      submitDisabled={answer === null}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={answer !== null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull hAlign='center' gap='20px'>
        <Box width='610px' hAlign='center' display='flex' alignContent='center' height='50%' background='white' useRound>
          the importance of &nbsp;
          <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
            &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
          </Typography>
        </Box>
      </Box>

      <Box vAlign='center' useFull>
        <List gap={20} data={data}>
          {({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              isError={isSubmitted && answer !== 2}
              onClick={() => {
                setAnswer(index);
              }}
              disabled={isSubmitted}
            >
              <Box vAlign='center'>
                <Label value={index} /> <Typography>{value?.text}</Typography>
              </Box>
            </Radio>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>2</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
