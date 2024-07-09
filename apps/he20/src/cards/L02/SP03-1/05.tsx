import {
  Box,
  IQuestionProps,
  Typography,
  TMainHeaderInfoTypes,
  Input,
  InputStatus,
  EStyleButtonTypes,
  ETagLine,
  BottomSheet,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { L02SP03_1 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = ({ _page = 'P05' }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 말하기 연습',
    headerPattern: 'text',
  };

  const PAGE_NUMBER = _page;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p05.answer,
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const answerChecker = (answer: string, solution: string) => {
    const formattedInput = answer.replace(/\s+/g, '').toLowerCase();
    const formattedAnswer = solution.replace(/\s+/g, '').toLowerCase();

    if (answer.trim().includes(' ')) {
      return false;
    }

    return formattedInput === formattedAnswer;
  };

  const handleSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p05;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer, solution);
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
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

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p05;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 단어의 알맞은 뜻을 고르세요.',
    markSize: 'middle',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p05.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p05.isSubmitted || !cardData.p05.answer) && !cardData.p05.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center'>
        <Box vAlign='center' width='685px' padding='48px 16px' hAlign='center' background='white' borderRadius={24} useShadow>
          <Typography fontSize='36px' lineHeight='50px' weight='var(--font-weight-bold)'>
            조종하는
          </Typography>
        </Box>
        <Box marginTop='25px'>
          <Input
            width='385px'
            value={cardData.p05.answer}
            onChange={handleAnswerChange}
            placeholder='내용을 넣어 주세요.'
            maxLength={200}
            status={
              cardData.p05.answer
                ? cardData.p05.isSubmitted
                  ? cardData.p05.isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData.p05.isSubmitted}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>manipulative</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
