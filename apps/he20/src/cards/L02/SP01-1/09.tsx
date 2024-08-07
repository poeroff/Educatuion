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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP01_1 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

interface pageType {
  _page?: string;
}

const P09 = ({ _page = 'P09' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_1);
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
    audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P09.mp3',
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
    () => (cardData.p09.answer as string[]).every((value, idx) => value === cardData.p09.solution[idx]),
    [cardData.p09.answer],
  );

  useEffect(() => {
    if (cardData.p09.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p09.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            answer: userSubmissionList[0].inputData[0]?.value || prev.p09.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p09.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData.p09.answer.every((a, idx = 0) => a === cardData.p09.solution[idx]);
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p09.answer,
            isAnswer: true,
            isCorrect: cardData.p09.isCorrect,
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
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p09.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p09: {
        ...prev.p09,
        answer: updatedAnswers,
      },
    }));
    changeData(_page, 1, 1, updatedAnswers);
  };

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.p09.answer?.some(value => value === '' || value === undefined);
    return isEmptyInputExist;
  }, [cardData.p09.answer]);

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
      submitLabel={cardData.p09.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll width={'100%'} height={'100%'}>
        <Box background={'white'} useRound hAlign={'center'} vAlign={'start'} flexDirection={'column'} gap={'12px'}>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Oh, I love it. How much is it? </Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box display='flex' flexDirection='column' marginLeft={'12px'}>
              <Box display='flex' useFull>
                <FlexTypography useGap={false}>
                  It was originally 50 dollars, but it’s
                  <Dropdown
                    dropdownList={cardData.p09.dropArr[0]}
                    selectedValue={cardData.p09.answer[0]}
                    isOpen={openedIndex === 0}
                    onClick={value => handleDropdownClick(0, value)}
                    readOnly={cardData.p09.isSubmitted}
                    isError={cardData.p09.isSubmitted && cardData.p09.answer[0] !== cardData.p09.solution[0]}
                    ariaLabel='1번 답 입력란'
                  />
                  off right now.
                </FlexTypography>
              </Box>
              <Box display='flex' flexDirection={'column'} useFull gap={'8px'}>
                <Typography useGap={false}>Plus, if you download our store app and become a member, </Typography>
                <FlexTypography useGap={false}>
                  you’ll get an additional
                  <Dropdown
                    dropdownList={cardData.p09.dropArr[1]}
                    selectedValue={cardData.p09.answer[1]}
                    isOpen={openedIndex === 1}
                    onClick={value => handleDropdownClick(1, value)}
                    readOnly={cardData.p09.isSubmitted}
                    isError={cardData.p09.isSubmitted && cardData.p09.answer[1] !== cardData.p09.solution[1]}
                    ariaLabel='2번 답 입력란'
                  />
                  discount coupon.
                </FlexTypography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box display='flex' useFull flexDirection={'column'} marginLeft={'12px'}>
              <FlexTypography useGap={false}>
                That’s a great
                <Dropdown
                  type='up'
                  dropdownList={cardData.p09.dropArr[2]}
                  selectedValue={cardData.p09.answer[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.answer[2] !== cardData.p09.solution[2]}
                  ariaLabel='3번 답 입력란'
                />
                !
              </FlexTypography>
              <Typography>I’ll sign up now and take the sweater.</Typography>
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
            {cardData.p09.solution
              .map((ans, index) => {
                if (index === cardData.p09.solution.length - 1) {
                  return ans;
                }
                return ans + ',';
              })
              .join('')}
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

export default P09;
