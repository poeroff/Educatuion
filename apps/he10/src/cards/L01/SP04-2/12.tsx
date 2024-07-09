import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SP04_2 } from './store';

const P12 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP04_2);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
    markSize: 'middle',
    mark: cardData.p12.isSubmitted ? (cardData.p12.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'focus',
    },
    {
      text: 'focusing',
    },
    {
      text: 'focused',
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
    if (cardData.p12.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    } else {
      const isCorrect = cardData.p12.answer === cardData.p12.solution;
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p12.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitData('P12', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P12')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p12.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P12', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p12: { ...prev.p12, answer: index } }));
    changeData('P12', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P12');
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
      onSubmit={submitAnswer}
      submitLabel={cardData.p12.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p12.isSubmitted && cardData.p12.answer === 0}
      submitBtnColor={cardData.p12.answer === 0 ? EStyleButtonTypes.SECONDARY : !showAnswer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='920px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Box display='flex' flexDirection='row'>
              <Typography useGap={false}>All the participants listened carefully,&nbsp;</Typography>
              <Typography useGap={false} type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>
              <Typography useGap={false}>&nbsp;on her </Typography>
            </Box>
            <Typography useGap={false}>presentation.</Typography>
          </Box>
        </Box>
        <BoxWrap>
          {data.map((value, index) => {
            return (
              <Box flex='1' textAlign='center' key={index}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index + 1 === cardData.p12.answer}
                  defaultValue={index + 1 === cardData.p12.answer}
                  key={index}
                  onClick={() => handleChange(index + 1)}
                  disabled={cardData.p12.isSubmitted}
                  isError={cardData.p12.isSubmitted && cardData.p12.answer !== cardData.p12.solution}
                >
                  {value?.text}
                </Radio>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>focusing</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
