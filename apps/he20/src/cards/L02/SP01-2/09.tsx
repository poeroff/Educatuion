import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
  EStyleButtonTypes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P09 = () => {
  const PAGE_NUMBER = 'P09';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 뜻의 알맞은 영어 단어를 쓰세요.',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const providedWord = '개인의';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p09.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p09.isSubmitted) {
      const { answer } = cardData.p09;
      const isCorrect = isAnswer(answer, cardData.p09.solution);
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
              isCorrect: isAnswer(answer, cardData.p09.solution),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p09;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
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
      submitLabel={cardData.p09.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p09.isSubmitted || !cardData.p09.answer) && !cardData.p09.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center' gap={'48px'}>
        <Box vAlign='center' width='685px' padding='48px 16px' hAlign='center' background='white' borderRadius={24} useShadow>
          <Typography fontSize='var(--font-size-36)' lineHeight='54px' weight='var(--font-weight-bold)'>
            {providedWord}
          </Typography>
        </Box>

        <Box>
          <Input
            value={cardData.p09.answer}
            onChange={handleChangeAnswer}
            maxLength={100}
            width='100%'
            ariaLabel={`서술 답안 입력란`}
            placeholder='내용을 넣어 주세요.'
            status={
              cardData.p09.isSubmitted
                ? !isAnswer(cardData.p09.answer, cardData.p09.solution)
                  ? InputStatus.ERROR
                  : InputStatus.DEFAULT
                : InputStatus.ENABLE
            }
            readOnly={cardData.p09.isSubmitted}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              <Typography>{cardData.p09.solution}</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
