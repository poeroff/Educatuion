import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import type { Meta, StoryFn } from '@storybook/react';
import {
  TMainHeaderInfoTypes,
  Dialog,
  BoxWrap,
  Box,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  BottomSheet,
  Typography,
  Scroll,
  IAudioPlayerProps,
  Question,
  ChipButton,
  EChipButtonType,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';

const meta = {
  title: 'Molecules/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>;

export default meta;

const FullScreen = styled.div`
  height: 50vh;
  width: 50vw;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollDiv = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const Template: StoryFn<typeof BottomSheet> = ({ height, show, children, closeOption, ...rest }) => {
  return (
    <FullScreen id='fullScreen'>
      <BottomSheet bottomSheetTargetId='fullScreen' height={height} show={show} closeOption={closeOption}>
        {children}
      </BottomSheet>
    </FullScreen>
  );
};

export const Default: StoryFn<typeof BottomSheet> = Template.bind({});
Default.args = {
  show: true,
  height: '50%',
  children: <div>BottomSheet</div>,
  closeOption: {
    useYn: true,
  },
};

export const WithScroll: StoryFn<typeof BottomSheet> = Template.bind({});
WithScroll.args = {
  show: true,
  height: '50%',
  closeOption: {
    useYn: true,
    onClose: () => {
      console.log('on Close!');
    },
  },
  children: (
    <ScrollDiv>
      스크롤이 생기는 긴 내용입니다. 안녕하세요. <br />
      {Array.from({ length: 30 }).map((_, index) => {
        return <div>안녕하세요 : {index}</div>;
      })}
    </ScrollDiv>
  ),
};

const TargetSelectTemplate: StoryFn<typeof BottomSheet> = ({ height, bottomSheetTargetId = 'targetId1', show, marginTop, children, ...rest }) => {
  const [isShow, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isComplete, setComplete] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
  };

  const questionInfo = {
    text: '기존 내용을 아래에서 위로 밀어내는 Bottom Sheet입니다. ',
  };

  const data = [
    { text: 'to develop well and be successful' },
    { text: 'to have a good relationship with somebody' },
    { text: 'to work with others to achieve a common goal' },
  ];

  const handleRowClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handelModal = () => {
    setShow(!isShow);
  };

  const completeQnA = () => {
    setShow(false);
    setComplete(true);
  };

  return (
    <Box height='800px' width='1000px'>
      <Container
        bodyId='targetContainer'
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        submitLabel={isComplete ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
        submitDisabled={selectedIndex == null}
        onSubmit={handelModal}
        submitBtnColor={selectedIndex != null ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      >
        <Box useFull hAlign='center' padding='45px 0px' height='100%'>
          <Box useFull hAlign='center' flexDirection='column' gap='20px'>
            <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' height='45%' background='white' useRound>
              marginTop으로 간격을 늘릴 수 있습니다.
            </Box>

            <Scroll height='70%' width='910px'>
              <List
                gap={4}
                data={data}
                row={({ value, index = 1 }) => (
                  <Radio
                    type={'square'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    value={index - 1 === selectedIndex}
                    onClick={() => handleRowClick(index - 1)}
                  >
                    <Box>
                      <Label value={index} /> {value?.text}
                    </Box>
                  </Radio>
                )}
              />
            </Scroll>
          </Box>
        </Box>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && isComplete} marginTop={marginTop}>
          <Box>
            <Typography useGap={false}>[답변]</Typography>
          </Box>
          <Box>
            <Typography useGap={false}>[해설]</Typography>
          </Box>
        </BottomSheet>

        <Dialog
          width={400}
          height={200}
          useFooter
          isShow={isShow && !isComplete && selectedIndex !== null}
          closeLabel='아니오'
          confirmLabel='예'
          onClose={handelModal}
          onConfirm={completeQnA}
        >
          <div style={{ textAlign: 'center', marginTop: '40px' }}>완료하시겠습니까?</div>
        </Dialog>
      </Container>
    </Box>
  );
};

export const MoveUpWithScroll: StoryFn<typeof BottomSheet> = TargetSelectTemplate.bind({});
MoveUpWithScroll.args = {
  marginTop: 10,
};

const TargetSelectTemplate2: StoryFn<typeof BottomSheet> = ({ height, bottomSheetTargetId = 'targetId1', show, marginTop, children, ...rest }) => {
  interface Idata {
    contents: string;
    userAnswer: boolean | undefined;
  }

  const initialList: Idata[] = [
    { contents: '(1) The boy won the dance competition.', userAnswer: undefined },
    { contents: '(2) The girl performed a dance at the school festival last year.', userAnswer: undefined },
    { contents: '(3) The speakers feel so thankful to their team members.', userAnswer: undefined },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Check T (true) or F (false) according to the dialogue.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.mp3',
  };

  const [isShow, setShow] = useState(false);
  const [list, setList] = useState<Idata[]>(initialList);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('채점하기');
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  useEffect(() => {
    const allAnswered = list.every(item => item.userAnswer !== undefined);
    if (!isSubmitted) {
      setSubmitDisabled(!allAnswered);
    }
  }, [list]);

  const handleChangeValue = (newAnswer: boolean | undefined, index?: number) => {
    setList(prevList =>
      prevList.map((item, idx) => (idx === index ? { ...item, userAnswer: item.userAnswer === newAnswer ? undefined : newAnswer } : item)),
    );
  };

  const handleSubmit = () => {
    if (buttonLabel === '채점하기') {
      setShow(true);
    } else if (buttonLabel === '답안 보기') {
      setBottomSheetOpen(true);
      setButtonLabel('답안 닫기');
    } else if (buttonLabel === '답안 닫기') {
      setBottomSheetOpen(false);
      setButtonLabel('답안 보기');
    }
  };

  const handleDialogConfirm = () => {
    setShow(false);
    setIsSubmitted(true);
    setButtonLabel('답안 보기');
  };

  const submitBtnColor =
    buttonLabel === '답안 닫기' ? EStyleButtonTypes.SECONDARY : isSubmitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;

  return (
    <Box height='800px' width='800px'>
      <Container
        bodyId='targetContainer'
        headerInfo={headerInfo}
        audioInfo={audioInfo}
        questionInfo={questionInfo}
        submitLabel={buttonLabel}
        onSubmit={handleSubmit}
        submitDisabled={isSubmitDisabled}
        submitBtnColor={submitBtnColor}
      >
        <List data={list}>
          {({ value, index = 1 }) => (
            <BoxWrap justifyContent='space-between' useFull>
              <Box>
                <Question size={'small'}>{value?.contents}</Question>
              </Box>
              <Box vAlign='center'>
                <BoxWrap>
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.TRUE}
                    isActive={value?.userAnswer === true}
                    size={'32px'}
                    onClick={() => handleChangeValue(true, index - 1)}
                    disabled={isSubmitted}
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.FALSE}
                    isActive={value?.userAnswer === false}
                    size={'32px'}
                    onClick={() => handleChangeValue(false, index - 1)}
                    disabled={isSubmitted}
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isBottomSheetOpen} marginTop={marginTop}>
          <Box>
            <Typography useGap={false}>[정답]</Typography>
          </Box>
          <Box>
            <Typography useGap={false}>{`(1) T (2) F (3) T`}</Typography>
          </Box>
        </BottomSheet>

        <Dialog isShow={isShow} useFooter onConfirm={handleDialogConfirm} onClose={() => setShow(false)} confirmLabel='예' closeLabel='아니오'>
          제출하시겠습니까?
        </Dialog>
      </Container>
    </Box>
  );
};

export const MoveUp: StoryFn<typeof BottomSheet> = TargetSelectTemplate2.bind({});
MoveUp.args = {
  marginTop: 10,
};
