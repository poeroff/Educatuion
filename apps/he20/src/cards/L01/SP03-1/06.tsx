import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';

const P06 = ({ _page = 'P06' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어  연습​',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>다음 뜻의 알맞은 영어 단어를 쓰세요.</Typography>,
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const pageName = _page.toUpperCase();

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

  const submitAnswer = () => {
    if (cardData.p06.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p06.answer, cardData.p06.solution);
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageName, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    if (!cardData.p06.isSubmitted && cardData.p06.answer) {
      setIsSubmittable(true);
    }
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p06.answer;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      if (!isSubmitted && defaultAnswer) {
        setIsSubmittable(true);
      }
      initData(pageName, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: value } }));
    }

    changeData(pageName, 1, subKey, value);

    if (value !== '') {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageName);
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
      submitLabel={cardData.p06.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p06.isSubmitted && cardData.p06.answer === ''}
      submitBtnColor={
        cardData.p06.isSubmitted
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
          <Typography fontSize='36px' lineHeight='50px' weight='var(--font-weight-bold)' align='center'>
            수의사
          </Typography>
        </Box>
        <BoxWrap>
          <Box flex='1' textAlign='center'>
            <Input
              name='value'
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              value={cardData.p06.answer.toString()}
              width='245px'
              readOnly={cardData.p06.isSubmitted}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              status={
                cardData.p06.isSubmitted
                  ? cardData.p06.isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : cardData.p06.answer
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
            <Typography>{cardData.p06.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
