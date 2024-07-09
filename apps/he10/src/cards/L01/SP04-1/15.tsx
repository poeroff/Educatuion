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
import { L01SP04_1 } from './store';

const P15 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L01SP04_1);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '3. 다음 중 어법상 옳은 것만으로 묶인 것을 고르시오.',
    markSize: 'middle',
    mark: cardData.p15.isSubmitted ? (cardData.p15.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'a, c',
    },
    {
      text: 'b, c',
    },
    {
      text: 'b, d',
    },
    {
      text: 'c, d',
    },
    {
      text: 'd, e',
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
    const pageId = pageIds.find(page => page.page === 'P15')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p15: {
            ...prev.p15,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p15.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P15', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p15.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p15.answer === cardData.p15.solution;
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p15.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P15', userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p15: { ...prev.p15, answer: index } }));
    changeData('P15', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P15');
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
      submitLabel={!cardData.p15.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p15.isSubmitted && cardData.p15.answer === 0}
      submitBtnColor={cardData.p15.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap>
        <Box height='398px' width='400px' background='white' lineHeight='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll tabIndex={0}>
            <Typography>a. Max gave me some advice whom was really helpful.</Typography>
            <Typography>b. Discussing the issue, they had lunch together.</Typography>
            <Typography>c. Powering by electricity, the bus is environmentally friendly.</Typography>
            <Typography>d. She felt grateful for her team members who supported her.</Typography>
            <Typography>e. He is taking a walk, worried about tomorrow.</Typography>
          </Scroll>
        </Box>
        <Box useFull height='398px' flex='1'>
          <List gap={10} data={data}>
            {({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p15.answer}
                defaultValue={index === cardData.p15.answer}
                onClick={() => handleChange(index)}
                disabled={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.answer !== cardData.p15.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p15.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>a. “whom ~ helpful”은 some advice를 수식하는 주격 관계대명사절로, whom을 which 또는 that으로 고쳐야 한다.</Typography>
            <Typography>
              c. 주절의 주어인 the bus와 분사구문 형태가 된 부사절의 동사 power는 수동의 관계이므로, Powering을 Powered로 고쳐야 한다.
            </Typography>
            <Typography>
              e. 주절의 주어인 He와 분사구문 형태가 된 부사절의 동사 worry는 능동의 관계이므로, worried를 worrying으로 고쳐야 한다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>a. Max는 내게 매우 도움이 되는 조언을 해 줬다.</Typography>
            <Typography>b. 그 문제에 대해 논의하며, 그들은 같이 점심을 먹었다.</Typography>
            <Typography>c. 전기로 작동되므로, 그 버스는 환경친화적이다.</Typography>
            <Typography>d. 그녀는 그녀를 지지한 팀원들에게 고마움을 느꼈다.</Typography>
            <Typography>e. 그는 내일에 대해 걱정하면서 산책을 하고 있다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P15;
