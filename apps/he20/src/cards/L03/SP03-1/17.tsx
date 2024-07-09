import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP03_1 } from './store';

const P17 = ({ _page = 'P17' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>1. (A), (B), (C)의 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(A)because - (B)where - (C)Used',
    },
    {
      text: '(A)because - (B)that - (C)Using',
    },
    {
      text: '(A)because - (B)where - (C)Using',
    },
    {
      text: '(A)due to - (B)that - (C)Using',
    },
    {
      text: '(A)due to - (B)where - (C)Used',
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
    if (cardData.p17.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p17.answer === cardData.p17.solution;
      setCardData(prev => ({ ...prev, p17: { ...prev.p17, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p17.answer,
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
          p17: {
            ...prev.p17,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p17.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
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

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p17.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === 0}
      submitBtnColor={
        cardData.p17.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull display='flex'>
          <Box background='white' useRound marginRight='8px' flex='0.5'>
            <Scroll height='360px'>
              <Typography>
                &nbsp;&nbsp;The first artist we’re going to examine is Bill Traylor. Traylor was born into slavery in the U.S. in 1853 and spent his
                early life working on a cotton farm in Alabama. Although he became a free man after the American Civil War, he still had to face
                racial discrimination, working for very low wages on the farm. Later, when he was around 70 years old, Traylor moved to the city of
                Montgomery, Alabama, where he found a job in a factory. It wasn’t until he was 85 years old and became too ill to work that he turned
                to drawing to express his life experiences. Now, we’re going to look at some of his paintings, starting with Mean Dog and Man and
                Large Dog. Traylor had a strong fear of dogs (A) [because / due to] they had often been used on farms to watch and hunt slaves. His
                fear of dogs is expressed strongly in these pieces. In contrast, Woman with Purse and Man with Umbrella portrays the free lives of
                African Americans (B) [where / that] he observed on the streets of Montgomery. (C) [Using / Used] simple shapes and colors, Traylor
                captured complex moments in American history from slavery to freedom. As a result, he’s now considered an important figure in American
                folk art.
              </Typography>
            </Scroll>
          </Box>
          <Box flex='0.5'>
            <Scroll height='400px'>
              <List
                data={data}
                row={({ value, index = 1 }) => (
                  <Radio
                    type={'square'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    value={index === cardData.p17.answer}
                    onClick={() => handleChange(index)}
                    readOnly={cardData.p17.isSubmitted}
                    isError={cardData.p17.isSubmitted && cardData.p17.answer !== cardData.p17.solution}
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
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p17.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (A) because는 절과 함께 쓰이는 접속사이고 due to는 구와 함께 쓰이는 전치사이다. they had often been used on farms to watch and hunt
                slaves는 절이므로 because가 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (B) he observed on the streets of Montgomery는 (B) 앞의 the free lives of African Americans를 선행사로 하는 불완전한 절이므로,
                관계부사 where가 아닌 목적격 관계대명사 that이 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (C) 분사구문 형태가 된 부사절의 동사 use와 주절의 주어 Traylor가 능동의 관계이므로, 현재분사 형태인 Using이 적절하다.
              </Box>
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                &nbsp;&nbsp;
                {`첫 번째로 살펴볼 예술가는 Bill Traylor입니다. Traylor는 1853년 미국에서 노예로 태어나 앨라배마주의 목화 농장에서 일하며 어린 시절을 보냈습니다. 그는 미국 남북전쟁 이후 자유인이 되었지만, 농장에서 매우 낮은 임금을 받고 일하며 여전히 인종차별을 겪어야 했습니다. 이후 70세가 되던 해, Traylor는 앨라배마주 몽고메리시로 이주하여 공장에서 일자리를 얻었습니다. 85세가 되고 몸이 너무 아파서 일을 할 수 없게 된 후에야 그는 자신의 인생 경험을 표현하기 위해 그림으로 눈을 돌렸습니다. 이제 <비열한 개>와 <인간과 큰 개>를 시작으로 그의 그림 몇 점을 살펴보겠습니다. Traylor는 개가 농장에서 노예를 감시하고 추격하는 데 자주 사용되었기 때문에 개에 대한 두려움이 컸습니다. 이 작품들에는 개에 대한 그의 두려움이 강하게 표현되어 있습니다. 이와 대조적으로 <지갑을 든 여자와 우산을 든 남자>는 몽고메리 거리에서 관찰한 아프리카계 미국인의 자유로운 삶을 묘사합니다. Traylor는 단순한 형태와 색채를 사용하여 노예제에서 자유에 이르는 미국 역사의 복잡한 순간을 포착했습니다. 그 결과 그는 현재 미국 민속 예술의 중요한 인물로 여겨지고 있습니다.`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
