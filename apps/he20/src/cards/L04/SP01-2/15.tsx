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
import { L04SP01_2 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';



const P15 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_2);
  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);
  const _page = 'P15'
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
    audioSrc: '/L04/SP01-2/HE2-L04-SP01-2-P15.mp3',
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
    () => (cardData[_page].answer as string[]).every((value, idx) => value === cardData[_page].solution[idx]),
    [cardData[_page].answer],
  );

  useEffect(() => {
    if (cardData[_page].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[_page].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [_page]: {
            ...prev[_page],
            answer: userSubmissionList[0].inputData[0]?.value || prev[_page].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[_page].isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData[_page].answer.every((a, idx = 0) => a === cardData[_page].solution[idx]);
    setCardData(prev => ({ ...prev, [_page]: { ...prev[_page], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[_page].answer,
            isAnswer: true,
            isCorrect: cardData[_page].isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleDropdownClick = (index: number, value: string | undefined) => {

    setOpenedIndex(index);
    if (value !== undefined) {
      const updatedAnswers = cardData[_page].answer.map((ans, idx) => (idx === index ? value : ans));
      setCardData(prev => ({
        ...prev,
        [_page]: {
          ...prev[_page],
          answer: updatedAnswers,
        },
      }));
      changeData(_page, 1, 1, updatedAnswers);
    }

  };

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData[_page].answer?.some(value => value === '' || value === undefined);
    return isEmptyInputExist;
  }, [cardData[_page].answer]);

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
      submitLabel={cardData[_page].isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll width={'100%'} height={'100%'}>
        <Box background={'white'} useRound hAlign={'center'} vAlign={'start'} flexDirection={'column'} gap={'12px'}>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box display='flex' flexDirection='column' marginLeft={'12px'}>
              <Box display='flex' useFull>
                <FlexTypography useGap={false}>
                  Some experts say that people will be able to live up to



                </FlexTypography>

              </Box>
              <Box display='flex' useFull>
                <Dropdown
                  dropdownList={cardData[_page].dropArr[0]}
                  selectedValue={cardData[_page].answer[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData[_page].isSubmitted}
                  isError={cardData[_page].isSubmitted && cardData[_page].answer[0] !== cardData[_page].solution[0]}
                  ariaLabel='1번 답 입력란'
                />
                <FlexTypography>
                  years in the near future thanks to nanobots.
                </FlexTypography>
              </Box>

            </Box>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>Oh, really? That sounds interesting. How will nanobots make it possible?
              </Typography>
            </Box>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box display='flex' useFull flexDirection={'column'} marginLeft={'12px'}>
              <Box display='flex'>
                <FlexTypography useGap={false}>
                  They’ll be
                  <Dropdown
                    type='up'
                    dropdownList={cardData[_page].dropArr[1]}
                    selectedValue={cardData[_page].answer[1]}
                    isOpen={openedIndex === 1}
                    onClick={value => handleDropdownClick(1, value)}
                    readOnly={cardData[_page].isSubmitted}
                    isError={cardData[_page].isSubmitted && cardData[_page].answer[1] !== cardData[_page].solution[1]}
                    ariaLabel='2번 답 입력란'
                  />
                </FlexTypography>
                <Typography>into our bodies to treat diseases. </Typography>
              </Box>
              <Box display='flex'>
                <FlexTypography useGap={false}>
                  Nanobots will be able to
                  <Dropdown
                    type='up'
                    dropdownList={cardData[_page].dropArr[2]}
                    selectedValue={cardData[_page].answer[2]}
                    isOpen={openedIndex === 2}
                    onClick={value => handleDropdownClick(2, value)}
                    readOnly={cardData[_page].isSubmitted}
                    isError={cardData[_page].isSubmitted && cardData[_page].answer[2] !== cardData[_page].solution[2]}
                    ariaLabel='3번 답 입력란'
                  />
                </FlexTypography>
                <Typography>and destroy cancer</Typography>
              </Box>
              <Box display='flex'>
                <FlexTypography useGap={false}>
                  cells in the body, for example.

                </FlexTypography>

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
            {cardData[_page].solution
              .map((ans, index) => {
                if (index === cardData[_page].solution.length - 1) {
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
            <Typography>남: 일부 전문가들은 나노봇 덕분에 가까운 미래에 사람들이 150년까지 살 수 있을 거라고 말하더라.
            </Typography>
            <Typography>여: 정말? 흥미롭게 들리네. 나노봇이 어떻게 그런 일을 가능하게 할까?
            </Typography>
            <Typography>남: 나노봇이 병을 치료하기 위해 우리 몸에 주입될 거래. 예를 들어 나노봇이 우리 몸의 암세포를 표적으로 삼아 파괴할 수 있을 거라고 하더라.
            </Typography>

          </Box>



        </Box>
      </BottomSheet>
    </Container>
  );
};

const FlexTypography = styled(Typography)`
  display: flex;
  align-items: center;
`;

export default P15;
