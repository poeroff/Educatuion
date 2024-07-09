import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_1 } from './store';
import { Container } from '@maidt-cntn/ui/en';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P09.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isCorrect: false,
          isAnswer: true,
        },
      ],
    },
  ];

  const isCorrect = useMemo(
    () => (cardData.P09.answer as string[]).every((value, idx) => value === cardData.P09.solution[idx]),
    [cardData.P09.answer],
  );

  useEffect(() => {
    if (cardData.P09.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P09.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P09: {
            ...prev.P09,
            answer: userSubmissionList[0].inputData[0]?.value || prev.P09.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.P09.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData.P09.answer.every((a, idx = 0) => a === cardData.P09.solution[idx]);
    setCardData(prev => ({ ...prev, P09: { ...prev.P09, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.P09.answer,
            isAnswer: true,
            isCorrect: cardData.P09.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.P09.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      P09: {
        ...prev.P09,
        answer: updatedAnswers,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, updatedAnswers);
  };

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.P09.answer?.some(value => value === '' || value === undefined);
    return isEmptyInputExist;
  }, [cardData.P09.answer]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={submitBtnColor}
      submitLabel={cardData.P09.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>When you take a picture of</Typography>
                <Dropdown
                  dropdownList={cardData.P09.dropArr[0]}
                  selectedValue={cardData.P09.answer[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.P09.isSubmitted}
                  isError={cardData.P09.isSubmitted && cardData.P09.answer[0] !== cardData.P09.solution[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>you don’t </Typography>
              </Box>
              <Box>
                <Typography> understand, the app tells you what it means in English.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' paddingTop={20}>
            <Box>
              <Label value='M' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>That would be wonderful! Can you show me</Typography>
                <Dropdown
                  dropdownList={cardData.P09.dropArr[1]}
                  selectedValue={cardData.P09.answer[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.P09.isSubmitted}
                  isError={cardData.P09.isSubmitted && cardData.P09.answer[1] !== cardData.P09.solution[1]}
                  ariaLabel='2번 답 입력란'
                />
              </Box>
              <Box display='flex'>
                <Typography>do that?</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' paddingTop={20}>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Box display='flex'>
                  <Typography>Okay. Let’s</Typography>
                  <Dropdown
                    type='up'
                    dropdownList={cardData.P09.dropArr[2]}
                    selectedValue={cardData.P09.answer[2]}
                    isOpen={openedIndex === 2}
                    onClick={value => handleDropdownClick(2, value)}
                    readOnly={cardData.P09.isSubmitted}
                    isError={cardData.P09.isSubmitted && cardData.P09.answer[2] !== cardData.P09.solution[2]}
                    ariaLabel='3번 답 입력란'
                  />
                </Box>
                <Box>
                  <Typography>the Italian title of this book.</Typography>
                </Box>
              </Box>
              <Box>
                <Typography>First, open the app, press the camera button here, and just wait. </Typography>
                <Typography>Look! It’s translated like this.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Scroll>
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.P09.solution
              .map((ans, index) => {
                if (index === cardData.P09.solution.length - 1) {
                  return ans;
                }
                return ans + ',';
              })
              .join('')}
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>여: 모르는 글자를 사진으로 찍으면 앱이 영어로 그 의미를 알려줘요.</Typography>
            <Typography>남: 그거 멋지구나! 어떻게 하는지 보여 줄 수 있니?</Typography>
            <Typography>
              여: 알았어요. 이 책의 이탈리아어 제목을 번역해 볼게요. 먼저 앱을 열고 여기 카메라 버튼을 누른 다음 기다리시면 돼요. 보세요! 이렇게
              번역됐어요.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
