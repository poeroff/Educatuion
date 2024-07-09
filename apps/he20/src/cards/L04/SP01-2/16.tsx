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

interface pageType {
  _page?: string;
}

const P16 = ({ _page = 'P16' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_2);
  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };
  const STORE_NUMBER = 'P16'

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 빈칸에 들어갈 알맞은 표현을 고르세요.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-2/HE2-L04-SP01-1-P10.mp3',
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
    () => (cardData[STORE_NUMBER].answer as string[]).every((value, idx) => value === cardData[_page].solution[idx]),
    [cardData[STORE_NUMBER].answer],
  );

  useEffect(() => {
    if (cardData[STORE_NUMBER].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[STORE_NUMBER].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [STORE_NUMBER]: {
            ...prev[STORE_NUMBER],
            answer: userSubmissionList[0].inputData[0]?.value || prev[STORE_NUMBER].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[STORE_NUMBER].isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData[STORE_NUMBER].answer.every((a, idx = 0) => a === cardData[STORE_NUMBER].solution[idx]);
    setCardData(prev => ({ ...prev, [STORE_NUMBER]: { ...prev[STORE_NUMBER], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[STORE_NUMBER].answer,
            isAnswer: true,
            isCorrect: cardData[STORE_NUMBER].isCorrect,
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
      const updatedAnswers = cardData[STORE_NUMBER].answer.map((ans, idx) => (idx === index ? value : ans));
      setCardData(prev => ({
        ...prev,
        [STORE_NUMBER]: {
          ...prev[STORE_NUMBER],
          answer: updatedAnswers,
        },
      }));
      changeData(_page, 1, 1, updatedAnswers);
    }

  };

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData[STORE_NUMBER].answer?.some(value => value === '' || value === undefined);
    return isEmptyInputExist;
  }, [cardData[STORE_NUMBER].answer]);

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
      submitLabel={cardData[STORE_NUMBER].isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll width={'100%'} height={'100%'}>
        <Box background={'white'} useRound hAlign={'center'} vAlign={'start'} flexDirection={'column'} gap={'12px'}>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box display='flex' flexDirection='column' marginLeft={'12px'}>
              <Box display='flex' useFull>
                <FlexTypography useGap={false}>
                  Today, I’ll talk about the future of food. People are worried that,
                </FlexTypography>
              </Box>
              <Box display='flex' useFull>
                <FlexTypography useGap={false}>
                  in the future, the soil might lose
                  <Dropdown
                    dropdownList={cardData[STORE_NUMBER].dropArr[0]}
                    selectedValue={cardData[STORE_NUMBER].answer[0]}
                    isOpen={openedIndex === 0}
                    onClick={value => handleDropdownClick(0, value)}
                    readOnly={cardData[STORE_NUMBER].isSubmitted}
                    isError={cardData[STORE_NUMBER].isSubmitted && cardData[STORE_NUMBER].answer[0] !== cardData[STORE_NUMBER].solution[0]}
                    ariaLabel='1번 답 입력란'
                  />
                  <Typography>or the</Typography>
                </FlexTypography>
              </Box>
              <Box display='flex' useFull>
                <FlexTypography useGap={false}>
                  <Dropdown
                    dropdownList={cardData[STORE_NUMBER].dropArr[1]}
                    selectedValue={cardData[STORE_NUMBER].answer[1]}
                    isOpen={openedIndex === 1}
                    onClick={value => handleDropdownClick(1, value)}
                    readOnly={cardData[STORE_NUMBER].isSubmitted}
                    isError={cardData[STORE_NUMBER].isSubmitted && cardData[STORE_NUMBER].answer[1] !== cardData[STORE_NUMBER].solution[1]}
                    ariaLabel='2번 답 입력란'
                  />
                  <Typography>could change in such a way that we won’t be</Typography>
                </FlexTypography>
              </Box>

              <Box display='flex' useFull>
                <FlexTypography>
                  able to grow crops. However, thanks to technology, we will be

                </FlexTypography>

              </Box>
              <Box display='flex' useFull>
                <FlexTypography>
                  able to grow crops under LED lights in
                  <Dropdown
                    dropdownList={cardData[STORE_NUMBER].dropArr[2]}
                    selectedValue={cardData[STORE_NUMBER].answer[2]}
                    isOpen={openedIndex === 2}
                    onClick={value => handleDropdownClick(2, value)}
                    readOnly={cardData[STORE_NUMBER].isSubmitted}
                    isError={cardData[STORE_NUMBER].isSubmitted && cardData[STORE_NUMBER].answer[2] !== cardData[STORE_NUMBER].solution[2]}
                    ariaLabel='3번 답 입력란'
                  />
                </FlexTypography>

              </Box>
              <Box display='flex' useFull>
                <FlexTypography>
                  buildings rather than on land.

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
            {cardData[STORE_NUMBER].solution
              .map((ans, index) => {
                if (index === cardData[STORE_NUMBER].solution.length - 1) {
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
            <Typography>여: 오늘은 식량의 미래에 관해 이야기해 보겠습니다. 사람들은 미래에 토양이 영양분을 잃거나 기후가 변화하여 작물을 재배할 수 없게 될까 봐 걱정하고 있습니다. 하지만 기술 덕분에 우리는 땅이 아닌 AI가 제어하는 건물의 LED 조명 아래서 작물을 재배할 수 있을 것입니다.

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

export default P16;
