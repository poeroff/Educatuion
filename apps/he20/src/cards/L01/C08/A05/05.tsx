import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  BoxWrap,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEventHandler, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A05 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05);
  const [isShow, setShow] = useState(false);

  const PAGE_ID = 'P05';

  const answerDisplay = 'put';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Fill in the blanks with the correct forms of the given words.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };

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

  const handleOnSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_ID, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData(PAGE_ID, 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleOnSubmit}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData.p05.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p05.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap flexDirection='column' useFull paddingTop='40px'>
        <TextView title='보기' height='106px'>
          <PinchZoom pinchType={'image'}>
            <Image
              src='/L01/C08/A05/HE2-L01-C08-A05-P01.jpg'
              width='100%'
              alt='이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:

첫 번째 조각: "Some dehydrated birds"는 검은색으로 표시되어 있다.
두 번째 조각: "had fallen out of the sky"는 "had fallen"이 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
세 번째 조각: "and"는 검은색으로 표시되어 있다.
네 번째 조각: "were brought to the center."는 "were brought"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.


'
            />
          </PinchZoom>
        </TextView>
        <Box marginTop='50px' flexDirection='row'>
          <Box>
            <Typography>5. The moment I tasted the cookies, I realized that the baker&nbsp;</Typography>
            <Box vAlign='flex-start' marginLeft='40px'>
              <Input
                width='350px'
                minWidth='350px'
                textAlign='start'
                placeholder='내용을 넣어 주세요.'
                ariaLabel='The moment I tasted the cookies, I realized that the baker 와 too much sugar in them. (put).  사이에 들어갈 문장'
                value={cardData.p05.answer}
                onChange={handleInputOnChange}
                maxLength={150}
                inputSize='x-small'
                readOnly={cardData.p05.isSubmitted}
                status={!cardData.p05.answer ? 'default' : cardData.p05.isSubmitted && !cardData.p05.isCorrect ? 'error' : 'enable'}
              />
              <Typography>too much sugar in them.</Typography>
            </Box>
          </Box>
          <Box marginTop='20px' backgroundColor='var(--color-blue-50)' width='100%' height='48px' vAlign='start' useRound>
            <SuggestedWord size={EStyleFontSizes.MEDIUM} color='var(--color-blue-800)'>
              제시어: {answerDisplay}
            </SuggestedWord>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <AnswerWord size={EStyleFontSizes.MEDIUM}>{cardData.p05.solution}</AnswerWord>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;

export const SuggestedWord = styled.div`
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-indent: 20px;
  display: flex;
  align-items: center;
  color: var(--color-blue-800);
`;

export const AnswerWord = styled.div`
  padding: 8 0;
`;
