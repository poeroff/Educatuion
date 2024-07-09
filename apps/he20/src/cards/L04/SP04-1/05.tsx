import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes, EStyleButtonTypes, BottomSheet, ETagLine, Tag } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { SP04_1 } from './store';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';

const P05 = ({ _page = 'P05' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(SP04_1);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
    markSize: 'middle',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'express',
    },
    {
      text: 'to express',
    },
    {
      text: 'that express',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setShowAnswer(!showAnswer);
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
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
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
      onSubmit={handleSubmit}
      submitLabel={!cardData.p05.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p05.isSubmitted && cardData.p05.answer === 0}
      submitBtnColor={cardData.p05.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box flexDirection='column' hAlign='center'>
        <Box vAlign='center' padding='48px 20px' hAlign={'center'} background='white' borderRadius={24} useShadow>
          <Box hAlign='center'>
            <Typography>Some teenagers find it thrilling </Typography>
            <Box width='100px' height='40px' borderBottom=' 2px solid black' />
            <Box type='hidden'>빈칸 영역</Box>
            <Typography>themselves on social media</Typography>
          </Box>
        </Box>
        <BoxWrap marginTop={48}>
          {data.map((value, index) => {
            return (
              <Box flex='1' textAlign='center' key={index + 1}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index + 1 === cardData.p05.answer}
                  defaultValue={index + 1 === cardData.p05.answer}
                  onClick={() => handleChange(index + 1)}
                  disabled={cardData.p05.isSubmitted}
                  isError={cardData.p05.isSubmitted && cardData.p05.answer !== cardData.p05.solution}
                >
                  {value?.text}
                </Radio>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>to express</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>일부 십 대들은 소셜 미디어에 자신을 표현하는 것을 재밌다고 생각한다 .</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
