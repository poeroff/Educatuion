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
  List,
  Label,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HE10DT1 } from './store';

const P05 = ({ _page = 'P05' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE10DT1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '의사소통기능 진단',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 봅시다.</Typography>,
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p05.answer === cardData.p05.solution;

      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p05.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
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
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRadioClick = (index: number) => {
    if (cardData.p05.isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      p05: {
        ...prev.p05,
        answer: choices?.[index],
      },
    }));
    changeData(_page, 1, 1, choices?.[index]);
    if (index > 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p05;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const choices = ['Well, I already made a plan for this year.', 'Personally, I hope I’ll start to learn Spanish.'];

  const nodes: React.ReactNode[] = [
    <List
      align='horizontal'
      data={choices}
      gap={0}
      row={({ value, index = 1 }) => (
        <Box width='920px' height={'60px'} textAlign='center'>
          <Radio
            type={'box'}
            align='vertical'
            name={'radio-question-A'}
            label={value}
            ariaLabel={value}
            value={value === cardData.p05.answer}
            onClick={() => handleRadioClick(index - 1)}
            isError={cardData.p05?.isSubmitted && cardData.p05?.answer !== cardData.p05?.solution}
            readOnly={cardData.p05?.isSubmitted}
          >
            {value}
          </Radio>
        </Box>
      )}
      key='list'
    />,
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p05.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <Box marginBottom='20px' useRound background='white' padding='10px'>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex' hAlign='vertical'>
            <Label value='A' type='paint' background='var(--color-blue-100)' />
            <Typography>What do you hope for this year?</Typography>
          </Box>

          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              &nbsp;
              <Typography type='blank' width='500px' title='빈칸' boxColor='var(--color-black)'></Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <BoxWrap marginTop={'40px'}>{nodes}</BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p05.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
