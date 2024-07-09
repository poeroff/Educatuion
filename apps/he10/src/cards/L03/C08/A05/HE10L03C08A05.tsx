import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
  BoxWrap,
  SvgIcon,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C08A05 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

export interface IHE10L03C08A05 {
  pageKey: string;
}
const HE10L03C08A05 = ({ pageKey }: IHE10L03C08A05) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A05);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

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

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }

    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [{ subKey: 1, type: 'TEXT', value: cardData[pageKey].answer }],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Rewrite the sentences using the structure above.',
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const getButtonColor = () => {
    return isNotEmptyString(cardData[pageKey].answer)
      ? isAnswerOpen
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.PRIMARY
      : EStyleButtonTypes.SECONDARY;
  };

  const getSubmitLabel = () => (cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');

  const handleInputChangeEvent = (value: string) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));
    changeData(pageKey, 1, 1, value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={submitAnswer}
      submitDisabled={!cardData[pageKey].answer}
      submitBtnColor={getButtonColor()}
    >
      <Box>
        <Box width='920px'>
          <TextView title='보기' height='120px'>
            <PinchZoom pinchType={'image'}>
              <Image src={'/L03/C08/A05/HE1-L03-C08-A05-P01.jpg'} width='900px' alt='' ariaDescribedby='img_desc' />
              <Box type='hidden' id='img_desc'>
                <p> 이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다: </p>
                <p> 첫 번째 조각: "It"</p>
                <p> 두 번째 조각: "is possible"는 검은색으로 표시되어 있다</p>
                <p> 세 번째 조각: "for drivers"는 파란색으로 강조되어 있다.</p>
                <p>
                  네 번째 조각: to focus on driving without being disturbed."는 빨간색으로 강조된 부분(“to focus”)과 검은색으로 표시된 부분이 있다.
                </p>
              </Box>
            </PinchZoom>
          </TextView>
        </Box>
      </Box>

      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='10px'>
        <Box width='920px'>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            {cardData[pageKey].text[0]}
          </Typography>
          &nbsp;{cardData[pageKey].text[1]}&nbsp;
        </Box>

        <Box hAlign='center' vAlign='flex-start'>
          <SvgIcon src={arrow_right} size='38px' style={{ marginTop: '8px' }} />
          <Box display='inline' useFull vAlign='center' hAlign='center'>
            <Typography>{cardData[pageKey].text[2]}</Typography>
            &nbsp;
            <Input
              width='450px'
              value={cardData[pageKey].answer}
              onChange={e => handleInputChangeEvent(e.target.value)}
              placeholder='내용을 넣어 주세요.'
              inputSize='x-small'
              maxLength={cardData[pageKey].solution.length + 5}
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted
                  ? cardData[pageKey].isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData[pageKey].answer)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='답란'
            />
            &nbsp;
            {cardData[pageKey].text[3]}
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE10L03C08A05;
