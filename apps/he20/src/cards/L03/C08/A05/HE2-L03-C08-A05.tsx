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
  SvgIcon,
  ESvgType,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { useEffect, useMemo, useState } from 'react';
import { L03C08A05, TL03C08A05Keys } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

export interface IProps {
  pageKey: TL03C08A05Keys;
  sentence: string;
}

const HE2L03C08A05 = ({ pageKey, sentence }: IProps) => {
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A05);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => isNotEmptyString(cardData[pageKey].answer), [cardData, pageKey]);
  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, pageKey, isShowAnswer, isAllFilled]);
  const mark = useMemo(() => (cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none'), [cardData, pageKey]);
  const status = useMemo(
    () =>
      isNotEmptyString(cardData[pageKey].answer)
        ? !cardData[pageKey].isSubmitted || isAnswer(cardData[pageKey].answer, cardData[pageKey].solution)
          ? InputStatus.ENABLE
          : InputStatus.ERROR
        : InputStatus.DEFAULT,
    [cardData, pageKey],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Combine the two sentences using the structure above.',
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
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncatedValue } }));
    changeData(pageNo, 1, 1, truncatedValue);
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);

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
            <Image src={'/L03/C08/A05/HE2-L03-C08-A05-P01.jpg'} width={'636px'} alt='' ariaDescribedby='img_desc' />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            <p>이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
            <p>첫 번째 문장:</p>
            <p>첫 번째 조각: "She even studied abroad in Paris,"는 파란색으로 강조되어 있다.</p>
            <p>두 번째 조각: "which was unusual for women at the time."는 "which"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
            <p>두 번째 문장:</p>
            <p>
              첫 번째 조각: "Lewis went to live with her aunt in Digby,"는 "Digby"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
            </p>
            <p>두 번째 조각: "where she met her future husband."는 "where"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
          </Box>
        </TextView>
      </Box>
      <Box marginTop='35px'>
        <Typography>{sentence}</Typography>
      </Box>
      <Box marginTop='24px' vAlign='center'>
        <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
        <Input
          value={cardData[pageKey].answer}
          onChange={event => handleInputChange(event.target.value)}
          placeholder='내용을 넣어 주세요.'
          width='100%'
          maxLength={2000}
          status={status}
          readOnly={cardData[pageKey].isSubmitted}
          ariaLabel='답란'
          marginLeft={5}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData[pageKey].solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE2L03C08A05;
