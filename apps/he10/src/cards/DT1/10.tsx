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
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HE10DT1 } from './store';

const P10 = ({ _page = 'P10' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE10DT1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '언어형식 진단',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>빈 칸에 들어갈 알맞은 단어를 골라 봅시다.</Typography>,
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const data = [
    {
      text: 'am',
      id: 1,
    },
    {
      text: 'were',
      id: 2,
    },
    {
      text: 'had been',
      id: 3,
    },
  ];

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
    if (cardData.p10.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p10.answer === cardData.p10.solution;

      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p10.answer,
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
          p10: {
            ...prev.p10,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: number) => {
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer: value } }));
    changeData(_page, 1, 1, value);
    if (value > 0) {
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
    const { answer, isSubmitted } = cardData.p10;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p10.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p10.isSubmitted && cardData.p10.answer === 0}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' hAlign={'center'} background='white' useRound useShadow>
          <Typography>
            I am 16, but my grandmother still treats me as if I&nbsp;
            <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)' /> a baby.
          </Typography>
        </Box>
        <BoxWrap>
          <List
            align={'horizontal'}
            gap={25}
            data={data}
            row={({ value, index = 1 }) => (
              <Box flex='1' textAlign='center' width={287}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={value?.id === cardData.p10.answer}
                  onClick={() => handleChange(value ? value.id : 0)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.answer !== cardData.p10.solution}
                >
                  {value ? value.text : ''}
                </Radio>
              </Box>
            )}
          />
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{data.find(v => v.id === cardData.p10.solution)?.text}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
