import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import L04SP041State from './store';

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L04SP041State);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '2. 다음 우리말을 알맞게 영작한 것을 고르시오.',
    markSize: 'middle',
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'We believe that this change is a problem not an opportunity.',
    },
    {
      text: 'We believe that this change is a problem but an opportunity.',
    },
    {
      text: 'We believe that this change is not a problem and an opportunity.',
    },
    {
      text: 'We believe that this change is not a problem but an opportunity.',
    },
    {
      text: 'We believe that this change is not only a problem but also an opportunity.',
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
          p10: {
            ...prev.p10,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p10.isSubmitted) {
      setShowAnswer(!showAnswer);
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
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer: index } }));
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
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p10.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p10.isSubmitted && cardData.p10.answer === 0}
      submitBtnColor={cardData.p10.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap flexDirection='column'>
        <Box height='100%' width='910px' background='white' lineHeight='48px' useRound paddingRight='10px' marginRight='20px'>
          <Box>
            <Scroll tabIndex={0}>
              <Typography>우리는 이러한 변화가 문제가 아니고 기회라고 생각한다.</Typography>
            </Scroll>
          </Box>
        </Box>
        <Box useFull flex='1'>
          <Scroll tabIndex={0}>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p10.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.answer !== cardData.p10.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {cardData.p10.solution}
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              ‘~가 아니고 ...다’를 의미하는 상관접속사 {'<'}not A but B{'>'}를 활용하여, “We believe that this change is not a problem but an opportunity.”라고 영작하는 것이 적절하다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
