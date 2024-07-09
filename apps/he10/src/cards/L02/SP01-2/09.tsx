import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02SP01_2 } from './store';
import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P09 = () => {
  const PAGE_NUMBER = 'P09';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 뜻의 알맞은 영어 단어를 쓰세요.',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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

  const cleanString = (str: string) => {
    return str
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
      .trim()
      .normalize();
  };

  const submitAnswer = () => {
    if (cardData.p09.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p09.answer, cardData.p09.solution);
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p09.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const value = userSubmissionList[0].inputData[0]?.value || cardData.p09.answer;
        if (value && value.trim() !== '') {
          setIsSubmittable(true);
        }

        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            answer: value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);

    if (value && value.trim() !== '') {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      submitLabel={cardData.p09.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === ''}
      submitBtnColor={
        cardData.p09.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='36px' weight='var(--font-weight-bold)'>
            예의
          </Typography>
        </Box>
        <BoxWrap>
          <Box flex='1' textAlign='center'>
            <Input
              name='value'
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              value={cardData.p09.answer.toString()}
              width='245px'
              readOnly={cardData.p09.isSubmitted}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              status={
                cardData.p09.isSubmitted
                  ? cardData.p09.isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : isNotEmptyString(cardData.p09.answer)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='1번 답 입력란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p09.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
