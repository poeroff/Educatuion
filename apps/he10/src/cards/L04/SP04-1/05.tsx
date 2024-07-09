import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes, EStyleButtonTypes, BottomSheet, Tag, ETagLine, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import L04SP041State from './store';

const P05 = ({ _page = 'P05' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L04SP041State);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
    markSize: 'middle',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'follow',
    },
    {
      text: 'followed',
    },
    {
      text: 'following',
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
              isAnswer: true,
              isCorrect: isCorrect,
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
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='920px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center'>
            <Typography>
              The man took a walk in the park, with a cat <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>{' '}
              him.
            </Typography>
          </Box>
        </Box>
        <BoxWrap>
          <List
            align='horizontal'
            data={data}
            gap={25}
            row={({ value, index = 1 }) => (
              <Box width='286px' textAlign='center'>
                <Radio
                  type={'box'}
                  align='vertical'
                  label={value?.text}
                  ariaLabel={value?.text}
                  value={index === cardData.p05.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p05.isSubmitted}
                  isError={cardData.p05.isSubmitted && cardData.p05.answer !== cardData.p05.solution}
                >
                  {value?.text}
                </Radio>
              </Box>
            )}
          />
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>following</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
