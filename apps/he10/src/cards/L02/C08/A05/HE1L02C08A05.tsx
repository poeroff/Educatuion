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
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L02C08A05 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IHE1L02C08A05Props {
  pageNumber: number;
  text1: string;
  text2: string;
}

type CardData = {
  [key: string]: {
    answer: string;
    solution: string;
    givenWord: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

const HE1L02C08A05 = ({ pageNumber, text1, text2 }: IHE1L02C08A05Props) => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState<CardData>(L02C08A05 as unknown as RecoilState<CardData>);
  const [isShow, setShow] = useState(false);
  const pageKey = `P0${pageNumber}`;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the correct forms of the given words.',
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

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
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleOnSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(show => !show);
    } else {
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
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageKey, 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[pageKey].answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <Box width='920px'>
          <TextView title='보기' height='120px'>
            <PinchZoom>
              <Image src='/L02/C08/A05/HE1-L02-C08-A05-P01.jpg' width='900px' alt='' ariaDescribedby='img_desc' />
            </PinchZoom>
            <Box type='hidden' id='img_desc'>
              <p>이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
              <p>첫 번째 조각: "I felt"</p>
              <p>두 번째 조각: "as if people from the past were looking over the shoulders of the old men."</p>
              <p>문장 아래에 회색 글씨로 추가 설명이 있다: "(→ In fact, they were not looking.)"</p>
            </Box>
          </TextView>
        </Box>
      </Box>

      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='40px'>
        <Box width='920px' height='88px'>
          <Typography>{text1}</Typography>
          <Input
            width='245px'
            value={cardData[pageKey].answer}
            onChange={e => handleChange(e.target.value)}
            maxLength={cardData[pageKey].solution.length + 3}
            readOnly={cardData[pageKey].isSubmitted}
            placeholder='내용을 넣어 주세요.'
            status={
              cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                ? InputStatus.ERROR
                : isNotEmptyString(cardData[pageKey].answer)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            ariaLabel={`${pageNumber}번 문제의 답란`}
          />
          <Typography> {text2}</Typography>
        </Box>

        <Box marginTop='20px' backgroundColor='var(--color-blue-50)' width='920px' height='48px' vAlign='start' useRound>
          <Typography color='var(--color-blue-800)'>제시어: {cardData[pageKey].givenWord}</Typography>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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

export default HE1L02C08A05;
