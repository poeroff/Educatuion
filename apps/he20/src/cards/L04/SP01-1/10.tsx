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

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
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
    text: '음원을 듣고 빈칸에 들어갈 알맞은 표현을 고르세요.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P10.mp3',
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
    () => (cardData.P10.answer as string[]).every((value, idx) => value === cardData.P10.solution[idx]),
    [cardData.P10.answer],
  );

  useEffect(() => {
    if (cardData.P10.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P10.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P10: {
            ...prev.P10,
            answer: userSubmissionList[0].inputData[0]?.value || prev.P10.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.P10.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData.P10.answer.every((a, idx = 0) => a === cardData.P10.solution[idx]);
    setCardData(prev => ({ ...prev, P10: { ...prev.P10, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.P10.answer,
            isAnswer: true,
            isCorrect: cardData.P10.isCorrect,
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
    const updatedAnswers = cardData.P10.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      P10: {
        ...prev.P10,
        answer: updatedAnswers,
      },
    }));
    changeData(_page.toUpperCase(), 1, 1, updatedAnswers);
  };

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.P10.answer?.some(value => value === '' || value === undefined);
    return isEmptyInputExist;
  }, [cardData.P10.answer]);

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
      submitLabel={cardData.P10.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box>
                <Typography>It’s quite simple. You can just press the button on the frame</Typography>
              </Box>
              <Box display='flex'>
                <Typography> for each</Typography>
                <Dropdown
                  dropdownList={cardData.P10.dropArr[0]}
                  selectedValue={cardData.P10.answer[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.P10.isSubmitted}
                  isError={cardData.P10.isSubmitted && cardData.P10.answer[0] !== cardData.P10.solution[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>. Also, the arms can be auto-</Typography>
              </Box>
              <Box display='flex'>
                <Typography> matically set for a more</Typography>
                <Dropdown
                  dropdownList={cardData.P10.dropArr[1]}
                  selectedValue={cardData.P10.answer[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.P10.isSubmitted}
                  isError={cardData.P10.isSubmitted && cardData.P10.answer[1] !== cardData.P10.solution[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>fit.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='M' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Box>
                <Typography>Really? Let me try it. Oh! The arms are moving! That’s</Typography>
              </Box>
              <Box>
                <Typography>really cool.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>There are other kinds of smart glasses with</Typography>
                <Dropdown
                  type='up'
                  dropdownList={cardData.P10.dropArr[2]}
                  selectedValue={cardData.P10.answer[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.P10.isSubmitted}
                  isError={cardData.P10.isSubmitted && cardData.P10.answer[2] !== cardData.P10.solution[2]}
                  ariaLabel='3번 답 입력란'
                />
              </Box>
              <Box>
                <Typography>features, too. My glasses don’t have this feature, but</Typography>
              </Box>
              <Box>
                <Typography>some of them can even take 3D photos.</Typography>
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
            {cardData.P10.solution
              .map((ans, index) => {
                if (index === cardData.P10.solution.length - 1) {
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
            <Typography>
              여: 아주 간단해. 기능별로 안경테에 있는 버튼을 누르기만 하면 돼. 또 편안한 착용감을 위해 안경다리가 자동으로 맞춰지기도 해.
            </Typography>
            <Typography>남: 정말? 내가 써볼게. 안경다리가 움직이네! 정말 멋지다.</Typography>
            <Typography>
              여: 첨단 기능을 갖춘 다른 종류의 스마트 안경들도 있어. 내 안경에는 이 기능이 없지만, 3D 사진을 찍을 수 있는 것도 있어.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
