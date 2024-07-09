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
import { L01SP04_2 } from './store';

const P18 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L01SP04_2);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '2. 각 문장의 괄호 안에서 어법에 맞는 표현으로 가장 적절한 것 끼리 짝지어 진 것을 고르시오.',
    markSize: 'middle',
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'Impressing – Following - staring',
    },
    {
      text: 'Impressing – Followed - staring',
    },
    {
      text: 'Impressed – Following - staring',
    },
    {
      text: 'Impressed – Followed - stared',
    },
    {
      text: 'Impressed – Following - stared',
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
    const pageId = pageIds.find(page => page.page === 'P18')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p18: {
            ...prev.p18,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p18.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P18', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p18.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p18.answer === cardData.p18.solution;
      setCardData(prev => ({ ...prev, p18: { ...prev.p18, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p18.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P18', userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
    changeData('P18', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P18');
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
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p18.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === 0}
      submitBtnColor={cardData.p18.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap>
        <Box height='358px' width='400px' background='white' lineHeight='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll tabIndex={0}>
            <BoxWrap>
              <Box>▪</Box>
              <Typography>[Impressing / Impressed] by the performance, they are going to watch it again.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>▪</Box>
              <Typography>[Following / Followed] these tips, you will be able to overcome the difficulty.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>▪</Box>
              <Typography>He was lying awake at night, [staring / stared] up at a sky.</Typography>
            </BoxWrap>
          </Scroll>
        </Box>
        <Box useFull height='358px' flex='1'>
          <List
            gap={10}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p18.answer}
                defaultValue={index === cardData.p18.answer}
                onClick={() => handleChange(index)}
                disabled={cardData.p18.isSubmitted}
                isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p18.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              분사구문 형태가 된 부사절의 동사 impress와 주절의 주어 they가 수동의 관계이므로, 과거분사 형태인 Impressed를 쓴다. 마찬가지로, 분사구문
              형태가 된 부사절의 동사 follow와 주절의 주어 you, 동사 stare와 주절의 주어 he는 모두 능동의 관계이므로 각각 현재분사 형태인 Following,
              staring으로 쓴다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>▪ 그 공연에 감명받아서, 그들은 그것을 다시 볼 예정이다.</Typography>
            <Typography>▪ 이 조언을 따르면, 너는 어려움을 극복할 수 있을 것이다.</Typography>
            <Typography>▪ 그는 하늘을 올려다보며, 밤에 깨어 있는 채로 누워 있었다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
