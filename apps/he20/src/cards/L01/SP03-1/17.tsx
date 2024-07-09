import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';

const P17 = ({ _page = 'P17' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        1. 다음 글의 밑줄 친 부분 중, 어법상 <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>틀린</u> 것을 고르시오.
      </Typography>
    ),
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const pageName = _page.toUpperCase();

  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
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
      submitDataWithResult(pageName, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (cardData.p17.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p17.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p17: {
            ...prev.p17,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultCorrect,
          },
        }));
      }
      initData(pageName, userSubmissionList, defaultSubmission, isSubmitted);

      if (defaultAnswer > 0) {
        setIsSubmittable(true);
      }
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
    changeData(pageName, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageName);
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  return (
    <Container
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
      <Box useFull>
        <Box>
          <Box width='100%' background='white' lineHeight='48px' useRound>
            <Typography tabIndex={101}>
              &nbsp;&nbsp;&nbsp;&nbsp; Our club arrived at the Free Animals sanctuary. Jane, the staff member in charge of animal care, welcomed us
              with a big smile and gave us a tour of the facility. It was amazing to see bears and elephants (1)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>moving</u> freely in a large field. Our tasks for the day
              included cleaning the shelter and preparing food for the animals. While (2){' '}
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>cleaning</u> the habitats, we checked if there were any
              hazards that could harm the animals. Then, we helped (3)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>prepare</u> the food by cutting up fruits and vegetables and
              dividing them into several large baskets. For old elephants with weak teeth, we chopped bananas instead of the sugarcane (4)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>that</u> they usually eat. Spending the whole day helping out
              with the animals (5)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>were</u> an incredible experience for me.
              It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.
            </Typography>
          </Box>
          <Box marginTop={20}>
            <List
              gap={2}
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
                    <Typography tabIndex={110 + index}>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
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
                  5번이 포함된 문장의 주어는 Spending the whole day helping out with the animals이다. 동명사구 주어는 단수 취급하므로, 복수동사 were를
                  단수동사 was로 고쳐야 한다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  우리 동아리는 Free Animals 보호 구역에 도착했다. 동물을 보살피는 일을 담당하는 직원인 Jane은 활짝 웃으며 우리를 환영했고 우리에게
                  시설을 구경시켜 주었다. 넓은 벌판에서 곰과 코끼리가 자유롭게 다니는 것을 보는 것은 놀라웠다. 그날 우리의 임무는 주거지를 청소하고
                  동물들을 위해 음식을 준비하는 것이었다. 서식지를 청소하는 동안 우리는 동물들에게 해를 끼칠 수 있는 위험 요소들이 있는지 확인했다.
                  그러고 나서, 우리는 과일과 채소를 자르고 그것들을 몇 개의 큰 바구니로 나누어서 먹이를 준비하는 것을 도왔다. 치아가 약한 나이 든
                  코끼리들을 위해서 우리는 그들이 주로 먹는 사탕수수 대신 바나나를 잘게 썰었다. 동물들을 돕는 데 하루 종일 시간을 보내는 것은 나에게
                  놀라운 경험이었다. 그것은 보람 있는 경험이었고, 나는 직원들이 모든 동물에게 쏟는 애정이 인상 깊었다.
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </Box>
    </Container>
  );
};

export default P17;
