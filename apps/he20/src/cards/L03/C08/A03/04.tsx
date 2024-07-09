import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Typography,
  Image,
  Question,
  Dropdown,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C08A03 } from './store';
import { studentAtom } from '@/stores/student';
const P04 = () => {
  const pageNumber = 'P04';
  const dropArr1 = ['because', 'due to'];

  const [showAnswer, setShowAnswer] = useState(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A03);
  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p04.isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      const isCorrect = cardData.p04.answer === cardData.p04.solution;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
              isCorrect: isCorrect,
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const handleDropdownClick = (value: string | undefined) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getSubmitLabel = () => (cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기');
  const getButtonColor = () => {
    if (!cardData.p04.isSubmitted) {
      return !cardData.p04.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const getDropDownSelectedValue = () => {
    return !cardData.p04.isSubmitted && !cardData.p04.answer ? '' : cardData.p04.answer;
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      submitLabel={getSubmitLabel()}
      onSubmit={() => handleSubmit()}
      submitDisabled={!cardData.p04.answer && !cardData.p04.isSubmitted}
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <PinchZoom pinchType={'image'}>
              <Image src={'/L03/C08/A03/HE2-L03-C08-A03-P01.jpg'} width={'900px'} alt='' />
              <Box type='hidden'>
                {`이 이미지는 퍼즐 조각 모양으로 나뉜 두 개의 문장을 보여준다.첫 번째 문장은 다음과 같다: 첫 번째 조각: "Although" (빨간색 글씨로 작성됨) 두 번째 조각: "he" 세 번째 조각: "became" 네 번째 조각: "a free man," 다섯 번째 조각: "he still faced racial discrimination." 이 조각들이 합쳐져서 "Although he became a free man, he still faced racial discrimination."라는 문장이 된다.
두 번째 문장은 다음과 같다: 첫 번째 조각: "Despite" (파란색 글씨로 작성됨) 두 번째 조각: "challenges in their lives," 세 번째 조각: "the artists never gave up on their art." 이 조각들이 합쳐져서 "Despite challenges in their lives, the artists never gave up on their art."라는 문장이 된다.`}
              </Box>
            </PinchZoom>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          <Box display='flex' alignItems='center' flexWrap='wrap'>
            <Question size={'small'}>4.</Question>
            <Typography style={{ whiteSpace: 'normal' }}>The team performed well </Typography>
            <Dropdown
              type='up'
              dropdownList={dropArr1}
              selectedValue={getDropDownSelectedValue()}
              width={'240px'}
              readOnly={cardData.p04.isSubmitted}
              isError={cardData.p04.isSubmitted ? cardData.p04.isCorrect !== true : false}
              onClick={value => handleDropdownClick(value)}
            />
          </Box>
          <Typography style={{ whiteSpace: 'normal' }}>the professional</Typography>
          <Typography useGap={false} style={{ whiteSpace: 'normal' }}>
            training that they had received for years.
          </Typography>
        </Box>
      </Box>
      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={showAnswer}
        closeOption={{ useYn: true, onClose: () => setShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p04.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
