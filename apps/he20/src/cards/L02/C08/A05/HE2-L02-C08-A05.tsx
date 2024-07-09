import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  IQuestionProps,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { L02C08A05, TL02C08A05Keys } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IProps {
  pageKey: TL02C08A05Keys;
  beforeInput: React.ReactNode;
  afterInput: React.ReactNode;
  inputWidth: string;
  suggestion: string;
}

const HE2L02C08A05 = ({ pageKey, beforeInput, afterInput, inputWidth, suggestion }: IProps) => {
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => isNotEmptyString(cardData[pageKey].answer), [cardData, pageKey]);

  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, pageKey, isAllFilled, isShowAnswer]);

  const mark = useMemo(() => (cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none'), [cardData, pageKey]);

  const status = useMemo(
    () =>
      isNotEmptyString(cardData[pageKey].answer)
        ? !cardData[pageKey].isSubmitted || cardData[pageKey].solutions.some(sol => isAnswer(cardData[pageKey].answer, sol))
          ? InputStatus.ENABLE
          : InputStatus.ERROR
        : InputStatus.DEFAULT,
    [cardData, pageKey],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the correct forms of the given words.',
    mark: mark,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted: isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].isCorrect ?? false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      const isCorrect = cardData[pageKey].solutions.some(sol => isAnswer(cardData[pageKey].answer, sol));

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && !isAllFilled}
      onSubmit={handleSubmit}
      submitBtnColor={submitBtnColor}
    >
      <Box>
        <TextView title='보기'>
          <PinchZoom>
            <Image src={'/L02/C08/A05/HE2-L02-C08-A05-P01.jpg'} width={'636px'} alt='' ariaDescribedby='img_desc' />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            <p>이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
            <p>첫 번째 조각: "Critics suggest"는 "suggest"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
            <p>두 번째 조각: "that"는 검은색으로 표시되어 있다.</p>
            <p>
              세 번째 조각: "a marketing strategy create value for both companies and customers."는 "create"가 파란색으로 강조되어 있으며 나머지는
              검은색으로 표시되어 있다.
            </p>
            <p>위쪽에는 "(should)"라는 단어가 회색으로 추가되어 있다.</p>
          </Box>
        </TextView>
      </Box>
      <Box marginTop='35px'>
        {beforeInput}
        <Input
          value={cardData[pageKey].answer}
          onChange={event => handleInputChange(event.target.value)}
          placeholder='내용을 넣어 주세요.'
          width={inputWidth}
          maxLength={15}
          status={status}
          readOnly={cardData[pageKey].isSubmitted}
          ariaLabel='답란'
        />
        {afterInput}
      </Box>
      <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
        <Typography useGap={false} color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
          제시어 :&nbsp;{suggestion}
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData[pageKey].solutionDisplay}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE2L02C08A05;
